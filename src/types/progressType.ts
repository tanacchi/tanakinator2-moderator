import { Device } from "../constants/device";
import { Status } from "../constants/status";

export type StatusType = typeof Status[keyof typeof Status];
export type DeviceType = typeof Device[keyof typeof Device];

export interface ProgressSimple {
  userId: string;
  device: DeviceType;
  status: StatusType;
}

export interface ProgressDetail {
  device: DeviceType;
  status: StatusType;
  questions?: Array<number>;
  answers?: Array<number>;
  nextAnswerTo?: number;
  guessingThat?: number;
}

export interface ProgressPost {
  device: DeviceType;
  status: StatusType;
  newQuestion?: number;
  newAnswer?: number;
  nextAnswerTo?: number;
  guessingThat?: number;
}

export function initProgress(): ProgressDetail {
  return {
    device: Device.WEB,
    status: Status.WAITING,
  } as ProgressDetail;
}

export function appendIfExists<T>(
  property: Array<T> | undefined,
  elem: T | undefined
): Array<T> {
  if (!elem) {
    return property ?? [];
  }
  return property?.concat(elem) || [elem];
}
