import { Module } from '@nestjs/common';
import { CertificatService } from './certificat.service';
import { CertificatController } from './certificat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificat } from './certificat.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Certificat]),],
    exports: [CertificatService],
    controllers: [CertificatController],
    providers: [CertificatService],
})
export class CertificatModule {}
