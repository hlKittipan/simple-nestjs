import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `\u001B[95m${method} \u001b[0m${originalUrl} \u001b[31m${statusCode} \u001b[36m${contentLength}\u001b[0m - \u001b[35m${userAgent} ${ip}`,
      );
    });

    next();
  }
}
