import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CertificatService } from './certificat.service';
import { Certificat } from './certificat.entity';
import { CreateCertificatDto } from './dto/create.certificat.dto';
import { UpdateCertificatDto } from './dto/update.certificat.dto';
import { AuthGuarde } from 'src/auth/auth.guard';

@Controller('certificats')
export class CertificatController {
    constructor (private readonly certificatService: CertificatService){}

    @Get()
    @UseGuards(AuthGuarde)
    async getAll(): Promise<Certificat[]>{
        return this.certificatService.getAll();
    }

    @Post('createCertificat')
    @UseGuards(AuthGuarde)
    async createCertificat(@Body() createCertificatDto: CreateCertificatDto, @Req() req: any): Promise<Certificat | null>{
        return this.certificatService.createCertificat(createCertificatDto, req.user);
    }

    @Put('updateCertificat/:id')
    @UseGuards(AuthGuarde)
    async updateCertificat(@Body() updateCertificatDto: UpdateCertificatDto, @Req() req: any, @Param('id') id: number): Promise<Certificat | null>{
        return this.certificatService.updateCertificat(updateCertificatDto, req.user, id);
    }

    @Delete('deleteCertificat/:id')
    @UseGuards(AuthGuarde)
    async deleteCertificat(@Param('id') id: number, @Req() req: any){
        return this.certificatService.deleteCertificat(id, req.user);
    }
}
