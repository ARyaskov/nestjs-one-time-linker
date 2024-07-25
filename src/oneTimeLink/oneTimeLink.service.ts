import { Inject, Injectable } from "@nestjs/common"
import { OneTimeLinkStorageService } from "../storage/oneTimeLinks/oneTimeLink.service"

@Injectable()
export class OneTimeLinkService {
  constructor(
    @Inject(OneTimeLinkStorageService)
    private oneTimeLinkStorageService: OneTimeLinkStorageService,
  ) {}

  async createLink(value: string): Promise<string> {
    return this.oneTimeLinkStorageService.createLink(value)
  }

  async getValue(id: string): Promise<string | null> {
    return this.oneTimeLinkStorageService.getValue(id)
  }
}
