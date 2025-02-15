import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from '../entities/level.entity';
import { LevelsService } from './levels.service';
import { LevelsController } from './levels.controller';
import { UserModule } from 'src/user/user.module';
import { Routine } from 'src/entities/routine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Level, Routine]), UserModule],
  controllers: [LevelsController],
  providers: [LevelsService],
  exports: [LevelsService],
})
export class LevelsModule {}
