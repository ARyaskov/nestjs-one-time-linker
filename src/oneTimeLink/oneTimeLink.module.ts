import { Module } from "@nestjs/common"
import { OneTimeLinkService } from "./oneTimeLink.service"
import { OneTimeLinkController } from "./oneTimeLink.controller"

@Module({
  imports: [StorageModule],
  providers: [OneTimeLinkService],
  controllers: [OneTimeLinkController],
  exports: [OneTimeLinkService],
})
export class StorageModule {}
