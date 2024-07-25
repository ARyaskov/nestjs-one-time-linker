import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import * as Joi from "joi"
import { StorageModule } from "./storage/storage.module"
import { OneTimeLinkModule } from "./oneTimeLink/oneTimeLink.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        HOST: Joi.string().default("localhost"),
        PORT: Joi.number().default(3032),
        POSTGRES_HOST: Joi.string().default("localhost"),
        POSTGRES_PORT: Joi.number().default(5432),
        POSTGRES_USER: Joi.string().default("one_time_link"),
        POSTGRES_PASSWORD: Joi.string().allow("").optional(),
        POSTGRES_DB: Joi.string().default("one_time_link"),
      }),
      isGlobal: true,
    }),
    StorageModule,
    OneTimeLinkModule,
  ],
})
export class AppModule {}
