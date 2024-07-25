import { Module } from "@nestjs/common"
import { OneTimeLinkService } from "./oneTimeLink.service"
import { OneTimeLinkController } from "./oneTimeLink.controller"
import { StorageModule } from "../storage/storage.module"

@Module({
  imports: [StorageModule],
  providers: [OneTimeLinkService],
  controllers: [OneTimeLinkController],
  exports: [OneTimeLinkService],
})
export class OneTimeLinkModule {}
