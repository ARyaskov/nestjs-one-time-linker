import { Module } from "@nestjs/common"
import { OneTimeLinkService } from "./oneTimeLink.service"
import { OneTimeLinkController } from "./oneTimeLink.controller"
import { StorageModule } from "../storage/storage.module"
import { ConfigModule } from "@nestjs/config"

@Module({
  imports: [ConfigModule, StorageModule],
  providers: [OneTimeLinkService],
  controllers: [OneTimeLinkController],
  exports: [OneTimeLinkService],
})
export class OneTimeLinkModule {}
