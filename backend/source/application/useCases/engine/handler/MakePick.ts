import { Message as EmiterMessage } from "@domain/interfaces/engine/emiters";
import {
    Handler,
    Message as HandlerMessage,
} from "@domain/interfaces/engine/handlers";
import { Subject } from "rxjs";

import { rooms, sanitizeRoom } from "./CreateRoom";
import { Pick } from "@domain/entities/player/types";
import { getLoosers, getWinners, isTie } from "@application/services/engine/rockPaperScissors";
import { EmiterType } from "@domain/interfaces/engine/types";
import { Verdict } from "@domain/entities/room";

type Payload = {
    roomId: string;
    socketId: string;
    pick: Pick;
};

export class MakePickHandler implements Handler {
    eventBus: Subject<EmiterMessage>;

    constructor(eventBus: Subject<EmiterMessage>) {
        this.eventBus = eventBus;
    }
    handle(message: HandlerMessage) {
        const payload = message.payload as Payload;

        console.log('MakePickHandler payload', payload)

        const { socketId: currentPlayerId, roomId: currentRoomId } = payload;


        const index = rooms.findIndex((room) => room.id === currentRoomId);

        if (index < 0) throw Error(`Room ${currentRoomId} dosent exists`);

        const { players } = rooms[index]


        const currentPlayer = players.find(
            ({ id }) => id === currentPlayerId
        );

        if (!currentPlayer) throw Error(`Player ${currentPlayerId} dosent exists`);

        currentPlayer.isOptionPicked = true;
        currentPlayer.option = payload.pick;

        const allPlayerPicked = players.every(
            ({ isOptionPicked }) => isOptionPicked
        );

        console.log(players, 'MakePickHandler players')

        if (allPlayerPicked) {

            //check for tie
            const tie = isTie(players);

            if (tie) {
                //send tie results
                rooms[index].roundIsOver = true;

                this.eventBus.next({
                    type: EmiterType.FINISH_ROUND,
                    payload: {
                        roomId: rooms[index].id,
                        targets: players,
                        room: {
                            ...sanitizeRoom(rooms[index]),
                            // change it
                            roundResults: { verdict: Verdict.TIE, opponentsPick: players.map((player) => ({ id: player.id, pick: player.option })) },
                        },
                    },
                });



                setTimeout(() => {
                    rooms[index].roundIsOver = false;
                    rooms[index].players = rooms[index].players.map((player) => ({ ...player, option: null, isOptionPicked: false }));

                    this.eventBus.next({
                        type: EmiterType.START_GAME,
                        payload: {
                            roomId: rooms[index].id,
                            targets: players,
                            room: {
                                ...sanitizeRoom(rooms[index]),
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
            // add points to winners
            const winnersWithAddedPoint = winners.map((player) => ({ ...player, score: player.score + 1 }));


            // if some have 3 points finish game
            const checkFor3Points = winnersWithAddedPoint.some(({ score }) => score >= 3)

            if (checkFor3Points) {
                // finish game
                rooms[index].isGameOver = true;
                rooms[index].roundIsOver = true;

                // get all players with 3 or more points
                const playersWith3OrMorePoints = players.filter(({ score }) => (score >= 3));
                const playersWithLess3Points = players.filter(({ score }) => (score < 3));

                rooms[index].players = [...winnersWithAddedPoint, ...playersWithLess3Points];


                this.eventBus.next({
                    type: EmiterType.FINISH_GAME,
                    payload: {
                        roomId: rooms[index].id,
                        targets: [...playersWith3OrMorePoints],
                        room: {
                            ...sanitizeRoom(rooms[index]),
                            // change it
                            roundResults: { verdict: Verdict.WIN, opponentsPick: players.map((player) => ({ id: player.id, pick: player.option })) },
                        },
                    },
                });


                // get all players with less than 3 points


                this.eventBus.next({
                    type: EmiterType.FINISH_GAME,
                    payload: {
                        roomId: rooms[index].id,
                        targets: [...playersWithLess3Points],
                        room: {
                            ...sanitizeRoom(rooms[index]),
                            // change it
                            roundResults: { verdict: Verdict.LOSE, opponentsPick: players.map((player) => ({ id: player.id, pick: player.option })) },
                        },
                    },
                });

                return;
            }

            rooms[index].roundIsOver = true;

            // send results
            this.eventBus.next({
                type: EmiterType.FINISH_ROUND,
                payload: {
                    roomId: rooms[index].id,
                    targets: [...winnersWithAddedPoint],
                    room: {
                        ...sanitizeRoom(rooms[index]),
                        // change it
                        roundResults: { verdict: Verdict.WIN, opponentsPick: players.map((player) => ({ id: player.id, pick: player.option })) },
                    },
                },
            });

            const loosers = getLoosers(players);

            rooms[index].players = [...winnersWithAddedPoint, ...loosers];

            this.eventBus.next({
                type: EmiterType.FINISH_ROUND,
                payload: {
                    targets: [...loosers],
                    roomId: rooms[index].id,
                    room: {
                        ...sanitizeRoom(rooms[index]),
                        // change it
                        roundResults: { verdict: Verdict.LOSE, opponentsPick: players.map((player) => ({ id: player.id, pick: player.option })) },
                    },
                },
            });


            setTimeout(() => {
                rooms[index].roundIsOver = false;
                rooms[index].players = rooms[index].players.map((player) => ({ ...player, option: null, isOptionPicked: false }));

                this.eventBus.next({
                    type: EmiterType.START_GAME,
                    payload: {
                        roomId: rooms[index].id,
                        targets: players,
                        room: {
                            ...sanitizeRoom(rooms[index]),
                            // change it
                            roundResults: undefined,
                        },
                    },
                });
            }, 3000)

            return;
        }

        this.eventBus.next({
            type: EmiterType.UPDATE_PICK,
            payload: {
                targets: players,
                room: sanitizeRoom(rooms[index]),
                roomId: rooms[index].id
            },
        });
        console.log(message, "MadeAPickHandler");
    }
}
