interface IConfig {
    PORT: string;
    MONGO_URI: string;
}

const config: IConfig = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
};

export { config };
