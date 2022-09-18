export const Status = {
    WAITING: "waiting",
    ASKING: "asking",
    GUESSING: "guessing",
    UPDATING: "updating",
} as const;

export const STATUS_PATTERN = Object.keys(Status);
