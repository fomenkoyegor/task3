import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<a href="/api/docs/">go docs</a>`;
  }
}
