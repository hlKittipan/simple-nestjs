import { ConfigService } from '@nestjs/config';

export const jwtConstants = {
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get('JWT_EXP_H', '3600s'),
    },
  }),
  inject: [ConfigService],
};
