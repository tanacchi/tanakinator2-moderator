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
   * 再開するかの選択待ち.
   * @param {string} resuming
   */
  RESUMING: "resuming",

  /**
   * 候補を出して正解を選んでもらって回答待ち.
   * @param {string} begging
   */
  BEGGING: "begging",

  /**
   * 正解を文字列で尋ねて返答待ち.
   * @param {string} reporting
   */
  REPORTING: "reporting",

  /**
   * ゲーム終了後データ更新中
   * @param {string} updating
   */
  UPDATING: "updating",
} as const;

export const STATUS_PATTERN = Object.values(Status);
