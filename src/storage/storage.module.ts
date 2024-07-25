import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { storageProviders } from "./storage.providers"
import { OneTimeLinkEntity } from "./oneTimeLinks/oneTimeLink.entity"
import { OneTimeLinkStorageService } from "./oneTimeLinks/oneTimeLink.service"

@Module({
  imports: [...storageProviders, TypeOrmModule.forFeature([OneTimeLinkEntity])],
  providers: [OneTimeLinkStorageService],
  exports: [OneTimeLinkStorageService],
})
export class StorageModule {}
