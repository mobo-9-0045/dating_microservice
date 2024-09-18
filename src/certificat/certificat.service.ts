import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Certificat } from './certificat.entity';
import { CreateCertificatDto } from './dto/create.certificat.dto';
import { User } from 'src/users/user.entity';
import { UpdateCertificatDto } from './dto/update.certificat.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CertificatService {
    constructor(@InjectRepository(Certificat) private certificatRepository: Repository<Certificat>){}

    async getAll(): Promise<Certificat[]>{
        return this.certificatRepository.find();
    }

    async createCertificat(createCertificatDto: CreateCertificatDto, user: User): Promise<Certificat | null>{
        try{
            const certificat = new Certificat();
            certificat.certificatName = createCertificatDto.certificatName;
            certificat.certificatDescriptio = createCertificatDto.certificatDesciption;
            certificat.user = user;
            return await this.certificatRepository.save(certificat);
        }
        catch(error){
            throw new Error('Error occured during certificate creation');
        }
    }

    async updateCertificat(updateCertificatDto: UpdateCertificatDto, user: User, id: number): Promise<Certificat | null>{
        try{
            const certificat = await this.certificatRepository.findOne({
                where: {id},
                relations: ['user'],
            })
            if (certificat?.user.id == user.id){
                this.certificatRepository.merge(certificat, updateCertificatDto);
                return await this.certificatRepository.save(certificat);
            }
            return null;
        }
        catch(error){
            throw new Error('Error occured during certificate update')
        }
    }

    async deleteCertificat(id: number, user:User): Promise<Certificat | null>{
        try{
            const certificat = await this.certificatRepository.findOne({where: {id}})
            if (certificat?.user.id == user.id){
                return await this.certificatRepository.remove(certificat);
            }
            return null
        }
        catch(error){
            throw new Error('Error occured during certificat delet');
        }
    }
}
