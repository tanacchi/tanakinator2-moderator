import { Status } from "../constants/status";

export type StatusType = typeof Status[keyof typeof Status];

export interface ProgressSimple {
    key: string,
    value: string,
    status: StatusType,
}

export interface ProgressDetail {
    device: string,
    status: StatusType,
    questions?: Array<number>,
    answers?: Array<number>,
    nextAnswerTo?: number,
    guessingThat?: number,
};

export interface ProgressPost {
    device: string,
    status: StatusType,
    newQuestion?: number,
    newAnswer?: number,
    nextAnswerTo?: number,
    guessingThat?: number,
};

export function initProgress(): ProgressDetail {
    return {
        device: "web",
        status: Status.WAITING,
    } as ProgressDetail;
}

export function appendIfExists<T>(property: Array<T>|undefined, elem: T|undefined): Array<T> {
    if (!elem) {
        return property;
    }
    return property?.concat(elem) || [ elem ];
}
