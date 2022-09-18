/**
 * @enum {string}
 */
export const Status = {
  /**
   * ゲーム開始合図待ち
   * @param {string} waiting
   */
  WAITING: "waiting",

  /**
   * 質問を投げかけ返答待ち
   * @param {string} asking
   */
  ASKING: "asking",

  /**
   * 予測結果を投げかけ返答待ち
   * @param {string} guessing
   */
  GUESSING: "guessing",

  /**
   * ゲーム終了後データ更新中
   * @param {string} updating
   */
  UPDATING: "updating",
} as const;

export const STATUS_PATTERN = Object.values(Status);
