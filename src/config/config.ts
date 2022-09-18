import * as dotenv from "dotenv";
dotenv.config();

interface ServerProps {
    readonly host: string,
    readonly port: number,
}

interface ConfigType {
    readonly app: ServerProps,
    readonly redis: ServerProps,
}

const config: ConfigType = {
    app: {
        host: process.env.APP_HOST || 'localhost',
        port: Number(process.env.APP_PORT) || 3000,
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
    },
};
export default config;
