import { Position } from "../shared";

export interface PlayerModel {
    id: string;
    clubId: string;
    name: string;
    surname: string;
    value: number;
    position: Position;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}