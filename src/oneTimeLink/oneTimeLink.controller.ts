import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from "@nestjs/common"
import { OneTimeLinkService } from "./oneTimeLink.service"

@Controller("one-time-link")
export class OneTimeLinkController {
  constructor(private readonly oneTimeLinkService: OneTimeLinkService) {}

  @Post()
  async createLink(@Body("value") value: string): Promise<{ link: string }> {
    const link = await this.oneTimeLinkService.createLink(value)
    return { link }
  }

  @Get(":link")
  async getValue(@Param("link") link: string): Promise<string> {
    const value = await this.oneTimeLinkService.getValue(link)
    if (value === null) {
      throw new HttpException(
        "Link not found or already used",
        HttpStatus.NOT_FOUND,
      )
    }
    return value
  }
}
