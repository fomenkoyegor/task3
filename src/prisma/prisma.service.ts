import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });

    // this.getN();
  }

  async getN() {
    const notes = await this.note.findMany();
    console.log(notes);
  }

  cleanDb() {
    return this.$transaction([
      this.note.deleteMany(),
      this.category.deleteMany(),
    ]);
  }
}
