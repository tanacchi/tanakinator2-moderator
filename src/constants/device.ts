/**
 * @enum {string}
 */
export const Device = {
  /**
   * Web ブラウザからのアクセス
   * @param {string} web
   */
  WEB: "web",
  /**
   * LINE Bot からのアクセス
   * @param {string} line
   */
  LINE: "line",
} as const;

export const DEVICE_PATTERN = Object.values(Device);
