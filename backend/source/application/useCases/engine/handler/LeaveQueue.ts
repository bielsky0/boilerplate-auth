import { Message as EmiterMessage } from "@domain/interfaces/engine/emiters";
import {
    Handler,
    Message as HandlerMessage,
} from "@domain/interfaces/engine/handlers";
import { Subject } from "rxjs";

import { QueueRepository } from "@domain/interfaces";

export class LeaveQueueHandler implements Handler {
    eventBus: Subject<EmiterMessage>;
    queueRepository: QueueRepository;

    constructor(eventBus: Subject<EmiterMessage>, queueRepository: QueueRepository) {
        this.eventBus = eventBus;
        this.queueRepository = queueRepository;
    }

    async handle(message: HandlerMessage) {
        const { socketId: playerId } = message.payload

        await this.queueRepository.removePlayer(playerId);
    }
}
