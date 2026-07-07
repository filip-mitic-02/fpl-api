import { Position } from "../enums";

export interface CreatePlayerRequest {
    clubId: string;
    name: string;
    surname: string;
    value: number;
    position: Position;
}