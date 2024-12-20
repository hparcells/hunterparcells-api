import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { randomOf } from '../util/array';

function randomNumber() {
  const prefix = randomOf(['10', '20', '21', '30', '31', '32', '33']);

  return prefix + (Math.random() * 1e7).toFixed(0).padStart(7, '0').toString();
}

@Injectable()
export class HomeDepotService {
  constructor(private readonly httpService: HttpService) {}

  getRandomId(): string {
    return randomNumber();
  }

  generateRandomUrl(): string {
    return `https://www.homedepot.com/p/${randomNumber()}`;
  }

  async getRandomUrl(): Promise<string> {
    let url;
    let status;

    do {
      const requests = Array.from({ length: 10 }, () => {
        return this.httpService.get(this.generateRandomUrl());
      }).map((request) => {
        return firstValueFrom(request);
      });

      await Promise.any(requests)
        // eslint-disable-next-line no-loop-func
        .then((result) => {
          url = result.config.url;
          status = result.status;
          return result;
        })
        .catch((error) => {
          return error;
        });
    } while (status !== 200);

    return url;
  }

  async getProductInfo(id: string) {
    const url = `https://www.homedepot.com/p/${id}`;
    const data = this.httpService.get(url, {
      validateStatus: (status) => {
        return true;
      }
    });
    const response = await firstValueFrom(data);
    if (response.status !== 200) {
      return {
        id,
        error: 'Product not found'
      };
    }

    const content = response.data;

    const jsonScript = content.match(/thd-helmet__script--productStructureData">(.*)<\/script>/)[1];
    const product: {
      name: string;
      image: string[];
      description: string;
      productID: string;
      sku: string;
      gtin13: string;
      depth: string;
      height: string;
      width: string;
      color: string;
      weight: string;
      offers: any;
      brand: {
        '@type': 'Brand';
        name: string;
      };
      review: {
        '@type': 'Review';
        reviewRating: {
          '@type': 'Rating';
          ratingValue: number;
          bestRating: string;
        };
        author: {
          '@type': 'Person';
          name: string;
        };
        headline: string | null;
        reviewBody: string;
      }[];
    } = JSON.parse(jsonScript);

    return {
      id: product.productID,
      brand: product.brand.name,
      name: product.name,
      image: product.image[0].replace('_100.', '_800.'),
      url
    };
  }
}
