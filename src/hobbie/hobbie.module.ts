import { Module } from '@nestjs/common';
import { HobbieService } from './hobbie.service';
import { HobbieController } from './hobbie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hobbie } from './hobbie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hobbie])],
  exports: [HobbieService],
  controllers: [HobbieController],
  providers: [HobbieService],
})
export class HobbieModule {}
