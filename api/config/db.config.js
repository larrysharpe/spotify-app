module.exports = {
    HOST: "localhost",
    USER: "lsharpe",
    PASSWORD: "ChangeMe12!",
    DB: "spotifyapp",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};