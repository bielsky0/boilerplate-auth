import { Room } from "@domain/entities/room"

// {
//     'rooms': {
//         'ROOMID-dasdsadasdsad': {
//             id: 'dasdasdasd',
//                 playesr: ////
//         },
//         'ROOMID-dasdsadasdsad': {
//             id: 'dasdasdasd',
//                 playesr: ////
//         }
//     }
// }

export interface RoomRepository {
    setRoom(value: Room): Promise<void>;
    getRoom(key: string): Promise<Room | null>;
    removeRoom(key: string): Promise<void>;
    getAllRooms(): Promise<Room[]>;
}
