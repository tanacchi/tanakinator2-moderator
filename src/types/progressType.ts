import { Device } from "../constants/device";
import { Status } from "../constants/status";

/**
 * @typedef {string} StatusType 状態ラベル
 */
export type StatusType = typeof Status[keyof typeof Status];
/**
 * @typedef {string} DeviceType デバイスラベル
 */
export type DeviceType = typeof Device[keyof typeof Device];

/**
 * 進行状況サマリ
 * @prop {string} userId
 * @prop {DeviceType} device
 * @prop {StatusType} status
 */
export interface ProgressSimple {
  userId: string;
  device: DeviceType;
  status: StatusType;
}

/**
 * 進行状況サマリ
 * @prop {DeviceType} device
 * @prop {StatusType} status
 * @prop {Array<number>} questions
 * @prop {Array<number>} answers
 * @prop {number} nextAnswerTo
 * @prop {number} guessingThat
 */
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
