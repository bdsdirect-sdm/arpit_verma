import dotenv from "dotenv";
dotenv.config({path: '.env'})

interface Config{
    Port: number,
    DB_USER:string,
    DB_PASSWORD:string,
    DB_NAME: string,
    DB_HOST: string,
    JWT_SECRET: string
}


export const local:Config = {
    Port: Number(process.env.PORT),
    DB_NAME: String(process.env.DB_NAME),
    DB_USER: String(process.env.DB_USER),
    DB_PASSWORD: String(process.env.DB_PASSWORD),
    DB_HOST: String(process.env.DB_HOST),
    JWT_SECRET: String(process.env.JWT_SECRET)
}