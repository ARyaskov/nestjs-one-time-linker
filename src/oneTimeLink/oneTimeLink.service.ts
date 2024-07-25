import { Inject, Injectable } from "@nestjs/common"
import { OneTimeLinkStorageService } from "../storage/oneTimeLinks/oneTimeLink.service"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class OneTimeLinkService {
  constructor(
    @Inject(OneTimeLinkStorageService)
    private oneTimeLinkStorageService: OneTimeLinkStorageService,
    @Inject(ConfigService)
    private configService: ConfigService,
  ) {}

  async createLink(value: string): Promise<string> {
    const linkUUID = await this.oneTimeLinkStorageService.create(value)
    const host = this.configService.get<string>("HOST")
    const port = this.configService.get<string>("PORT")
    return `http://${host}:${port}/api/v0/one-time-link/${linkUUID}`
  }

  async getValue(linkUUID: string): Promise<string | null> {
    let result = null
    const value = await this.oneTimeLinkStorageService.getValue(linkUUID)
    if (value) {
      result = value
    }
    return result
  }
}
