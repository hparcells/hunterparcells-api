import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import OpenAI from 'openai';

@Injectable()
export class EtsyService {
  openai: OpenAI;

  constructor(private readonly httpService: HttpService) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async getAiCompletion(system, user, model): Promise<string> {
    const response = await this.openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: system
        },
        {
          role: 'user',
          content: user
        }
      ],
      model
    });

    return response.choices[0].message.content;
  }

  async shortenName(name: string): Promise<string> {
    const shortened = await this.getAiCompletion(
      'Shorten the name of an e-commerce store item for convenient display.',
      name,
      'ft:gpt-3.5-turbo-0125:personal:name:9ip6bm5u'
    );

    return shortened;
  }
}
