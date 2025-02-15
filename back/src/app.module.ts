import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaymentModule } from './payment/payment.module';
import { RoutinesModule } from './routines/routines.module';
import { LevelsModule } from './levels/levels.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entity';
import { Role } from './entities/roles.entity';
import { Level } from './entities/level.entity';
import { HealthSheet } from './entities/helthsheet.entity'; // Importar HealthSheet
import { UserSeederService } from './seeders/user-seeder.service';
import { UserSeederModule } from './seeders/seeders.module';
import { PayUserSeederService } from './seeders/payuser-seeder.services';
import { PaySeederModule } from './seeders/seeders.pay.module';
import { Payment } from './entities/payments.entity';
import { RoutineUserSeederService } from './seeders/routineuser-seeder.services';
import { Routine } from './entities/routine.entity';
import { RoutineSeederModule } from './seeders/seeders.routine.module';
import { HealthSeederModule } from './seeders/seeder.health.module';
import { HealthUserSeederService } from './seeders/healthuser.seeder.service';
import { HealthsheetModule } from './healthsheet/healthsheet.module';
import { Catalogo } from './entities/catalogo.entity';
import { CatalogoSeeder } from './seeders/catalogo.seeder';
import { CatalogoModule } from './catalogo/catologo.module';
import { CommentsModule } from './comentarios/comment.module';
import { ContactUsModule } from './contactus/contactus.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        dropSchema: false,
        synchronize: true, // Solo para desarrollo, no usar en producción
      }),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'mySuperSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
    RoutinesModule,
    LevelsModule,
    UserModule,
    AuthModule,
    PaymentModule,
    UserSeederModule,
    PaySeederModule,
    RoutineSeederModule,
    RoutinesModule,
    HealthsheetModule,
    CatalogoModule,
    CommentsModule,
    ContactUsModule,
    TypeOrmModule.forFeature([Catalogo,
      User,
      Role,
      Level,
      HealthSheet,
      Payment,
      Routine,
    ]),
    // MercadoPagoModule,
  ],
  controllers: [],
  providers: [
    UserSeederService,
    PayUserSeederService,
    RoutineUserSeederService,
    HealthUserSeederService,
    CatalogoSeeder,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly catalogoSeeder: CatalogoSeeder) {}

  async onModuleInit() {
    await this.catalogoSeeder.seed();
  }
}

