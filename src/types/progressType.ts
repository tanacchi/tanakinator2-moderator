import { Status } from "../constants/status";

export type StatusType = typeof Status[keyof typeof Status];

export interface ProgressSimple {
    key: string,
    value: string,
    status: StatusType,
}

export type ProgressDetail = string;

export type ProgressPost = string;
