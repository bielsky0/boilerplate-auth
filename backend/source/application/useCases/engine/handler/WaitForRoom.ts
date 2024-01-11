import { QueueRepository, RoomRepository } from "@domain/interfaces";
import { Handler, Message } from "@domain/interfaces/engine/handlers";
import { Subject } from "rxjs";
import { Message as EmiterMessage } from "@domain/interfaces/engine/emiters";
import { Room } from "@domain/entities/room";
import { EmiterType } from "@domain/interfaces/engine/types";
import { sanitizeRoom } from "./CreateRoom";
import crypto from 'crypto'


type Payload = {
    socketId: string;
};

export class WaitForRoomHandler implements Handler {
    eventBus: Subject<EmiterMessage>;
    queueRepository: QueueRepository;
    roomRepository: RoomRepository;

    constructor(eventBus: Subject<EmiterMessage>, queueRepository: QueueRepository, roomRepository: RoomRepository) {
        this.eventBus = eventBus;
        this.queueRepository = queueRepository;
        this.roomRepository = roomRepository
    }


    async handle(message: Message) {
        console.log(message, 'WaitForRoomHandler');

        const payload = message.payload as Payload;

        const playerId = await this.queueRepository.getPlayer(payload.socketId);

        console.log(playerId, 'playerId');
        if (playerId) {

            const newRoom: Room = {
                id: crypto.randomUUID(),
                roomIsFull: false,
                players: [],
                roomIsAvaible: false,
                roundIsOver: false,
                isGameOver: false,
            };

            newRoom.players.push({
                id: payload.socketId,
                score: 0,
                isOptionPicked: false,
                option: null,
                isWaitingForRoom: false
            });

            newRoom.players.push({
                id: playerId,
                score: 0,
                isOptionPicked: false,
                option: null,
                isWaitingForRoom: false
            });

            await this.roomRepository.setRoom(newRoom);

            this.eventBus.next({
                type: EmiterType.START_GAME,
                payload: {
                    targets: newRoom.players,
                    room: sanitizeRoom(newRoom),
                    roomId: newRoom.id,
                },
            });

            await this.queueRepository.removePlayer(playerId);
            await this.queueRepository.removePlayer(payload.socketId);


            //if there is already player waiting in queue
            // create room
            // start game

            return;
        }



        //add player to queue
        await this.queueRepository.addPlayer(payload.socketId);
    }
}