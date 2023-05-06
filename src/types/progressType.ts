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
 * @prop {number} next_answer_to
 * @prop {number} guessing_that
 */
export interface ProgressDetail {
  device: DeviceType;
  status: StatusType;
  questions?: Array<number>;
  answers?: Array<number>;
  next_answer_to?: number;
  guessing_that?: number;
}

export interface ProgressPost {
  device: DeviceType;
  status: StatusType;
  new_question?: number;
  new_answer?: number;
  next_answer_to?: number;
  guessing_that?: number;
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
