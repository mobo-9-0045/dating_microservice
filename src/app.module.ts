import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './project/project.module';
import { Project } from './project/project.entity';
import { Skill } from './skills/skill.entity';
import { SkillModule } from './skills/skill.module';
import { Certificat } from './certificat/certificat.entity';
import { CertificatModule } from './certificat/certificat.module';
import { HobbieModule } from './hobbie/hobbie.module';
import { Hobbie } from './hobbie/hobbie.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'postgresql',
      username: 'mobo',
      password: '5500',
      entities: [User, Project, Skill, Certificat, Hobbie],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ProjectModule,
    SkillModule,
    CertificatModule,
    HobbieModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource){}
}
