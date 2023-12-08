import { Message as EmiterMessage } from "@domain/interfaces/engine/emiters";
import {
    Handler,
    Message as HandlerMessage,
} from "@domain/interfaces/engine/handlers";
import { Subject } from "rxjs";

import { sanitizeRoom } from "./CreateRoom";
import { Pick } from "@domain/entities/player/types";
import { getLoosers, getWinners, isTie } from "@application/services/engine/rockPaperScissors";
import { EmiterType } from "@domain/interfaces/engine/types";
import { Verdict } from "@domain/entities/room";
import { RoomRepository } from "@domain/interfaces";

type Payload = {
    roomId: string;
    socketId: string;
    pick: Pick;
};

export class MakePickHandler implements Handler {
    eventBus: Subject<EmiterMessage>;
    roomRepository: RoomRepository;

    constructor(eventBus: Subject<EmiterMessage>, roomRepository: RoomRepository) {
        this.eventBus = eventBus;
        this.roomRepository = roomRepository;
    }
    async handle(message: HandlerMessage) {
        const payload = message.payload as Payload;

        console.log('MakePickHandler payload', payload)

        const { socketId: currentPlayerId, roomId: currentRoomId } = payload;

        const room = await this.roomRepository.getRoom(currentRoomId);

        if (!room) throw Error(`Room ${currentRoomId} dosent exists`);

        const { players } = room;

        const currentPlayer = players.find(
            ({ id }) => id === currentPlayerId
        );

        if (!currentPlayer) throw Error(`Player ${currentPlayerId} dosent exists`);

        currentPlayer.isOptionPicked = true;
        currentPlayer.option = payload.pick;

        const allPlayerPicked = players.every(
            ({ isOptionPicked }) => isOptionPicked
        );

        if (allPlayerPicked) {

            //check for tie
            const tie = isTie(players);

            if (tie) {
                //send tie results
                room.roundIsOver = true;

                await this.roomRepository.setRoom(room);

                this.eventBus.next({
                    type: EmiterType.FINISH_ROUND,
                    payload: {
                        roomId: room.id,
                        targets: players,
                        room: {
                            ...sanitizeRoom(room),
                            // change it
                            roundResults: { verdict: Verdict.TIE, opponentsPick: players.map((player) => ({ id: player.id, pick: player.option })) },
                        },
                    },
                });



                setTimeout(async () => {
                    room.roundIsOver = false;
                    room.players = room.players.map((player) => ({ ...player, option: null, isOptionPicked: false }));

                    await this.roomRepository.setRoom(room);

                    this.eventBus.next({
                        type: EmiterType.START_GAME,
                        payload: {
                            roomId: room.id,
                            targets: players,
                            room: {
                                ...sanitizeRoom(room),
                                // change it
                                roundResults: undefined,
                            },
                        },
                    });
                }, 3000)

                return;
            }


            // get all players who won
            const winners = getWinners(players);

            // get all players who lost
            const loosers = getLoosers(players);

            // add points to winners
            const winnersWithAddedPoint = winners.map((player) => ({ ...player, score: player.score + 1 }));


            // if some have 3 points finish game
            const checkFor3Points = winnersWithAddedPoint.some(({ score }) => score >= 3)

            if (checkFor3Points) {
                // finish game
                room.players = [...winnersWithAddedPoint, ...loosers];
                room.isGameOver = true;
                room.roundIsOver = true;

                // get all players with 3 or more points
                const playersWith3OrMorePoints = room.players.filter(({ score }) => (score >= 3));
                const playersWithLess3Points = room.players.filter(({ score }) => (score < 3));

                await this.roomRepository.setRoom(room);

                this.eventBus.next({
                    type: EmiterType.FINISH_GAME,
                    payload: {
                        roomId: room.id,
                        targets: [...playersWith3OrMorePoints],
                        room: {
                            ...sanitizeRoom(room),
                            // change it
                            roundResults: { verdict: Verdict.WIN, opponentsPick: room.players.map((player) => ({ id: player.id, pick: player.option })) },
                        },
                    },
                });


                // get all players with less than 3 points
                this.eventBus.next({
                    type: EmiterType.FINISH_GAME,
                    payload: {
                        roomId: room.id,
                        targets: [...playersWithLess3Points],
                        room: {
                            ...sanitizeRoom(room),
                            // change it
                            roundResults: { verdict: Verdict.LOSE, opponentsPick: room.players.map((player) => ({ id: player.id, pick: player.option })) },
                        },
                    },
                });

                return;
            }

            room.roundIsOver = true;

            await this.roomRepository.setRoom(room);

            // send results
            this.eventBus.next({
                type: EmiterType.FINISH_ROUND,
                payload: {
                    roomId: room.id,
                    targets: [...winnersWithAddedPoint],
                    room: {
                        ...sanitizeRoom(room),
                        // change it
                        roundResults: { verdict: Verdict.WIN, opponentsPick: players.map((player) => ({ id: player.id, pick: player.option })) },
                    },
                },
            });


            room.players = [...winnersWithAddedPoint, ...loosers];

            await this.roomRepository.setRoom(room);

            this.eventBus.next({
                type: EmiterType.FINISH_ROUND,
                payload: {
                    targets: [...loosers],
                    roomId: room.id,
                    room: {
                        ...sanitizeRoom(room),
                        // change it
                        roundResults: { verdict: Verdict.LOSE, opponentsPick: players.map((player) => ({ id: player.id, pick: player.option })) },
                    },
                },
            });


            setTimeout(async () => {
                room.roundIsOver = false;
                room.players = room.players.map((player) => ({ ...player, option: null, isOptionPicked: false }));
                await this.roomRepository.setRoom(room);

                this.eventBus.next({
                    type: EmiterType.START_GAME,
                    payload: {
                        roomId: room.id,
                        targets: players,
                        room: {
                            ...sanitizeRoom(room),
                            // change it
                            roundResults: undefined,
                        },
                    },
                });
            }, 3000)

            return;
        }

        await this.roomRepository.setRoom(room);

        this.eventBus.next({
            type: EmiterType.UPDATE_PICK,
            payload: {
                targets: players,
                room: sanitizeRoom(room),
                roomId: room.id
            },
        });
    }
}
