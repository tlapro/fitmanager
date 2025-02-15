


import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { ScheduleModule } from '@nestjs/schedule';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule, ScheduleModule.forRoot()],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: "smtp-relay.brevo.com",  
          port: 587,  // Puedes probar con 465 si necesitas SSL
          secure: false,  // Cambia a `true` si usas el puerto 465
          auth: {
            user: config.get<string>('BREVO_SMTP_USER'), 
            pass: config.get<string>('BREVO_SMTP_PASS'),
          },
          tls: {
            rejectUnauthorized: false, // Solo para desarrollo, desactiva en producción
          },
        },
        defaults: {
          from: config.get<string>('EMAIL_FROM'),
        },
        template: {
          dir: join(process.cwd(), 'src/templates'), //join(__dirname, '../templates'), //join(process.cwd(), 'src/templates')   // Asegura que está en la raíz de src
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
