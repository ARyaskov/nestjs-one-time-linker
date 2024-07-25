import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { OneTimeLinkEntity } from "./oneTimeLink.entity"

@Injectable()
export class OneTimeLinkStorageService {
  constructor(
    @InjectRepository(OneTimeLinkEntity)
    private oneTimeLinkRepository: Repository<OneTimeLinkEntity>,
  ) {}

  async create(value: string): Promise<string> {
    const link = this.oneTimeLinkRepository.create({ value })
    await this.oneTimeLinkRepository.save(link)
    return link.id
  }

  async getValue(linkUUID: string): Promise<string | null> {
    const link = await this.oneTimeLinkRepository.findOne({
      where: { id: linkUUID, used: false },
    })
    if (link) {
      link.used = true
      await this.oneTimeLinkRepository.save(link)
      return link.value
    }
    return null
  }
}
