export interface QueueRepository {
    addPlayer(socketId: string): Promise<void>;
    getPlayer(withoutId: string): Promise<string | undefined>;
    removePlayer(socketId: string): Promise<void>;
}