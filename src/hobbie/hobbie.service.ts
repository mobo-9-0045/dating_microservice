import { Injectable } from '@nestjs/common';
import { CreateHobbieDto } from './dto/create-hobbie.dto';
import { UpdateHobbieDto } from './dto/update-hobbie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hobbie } from './hobbie.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class HobbieService {
  constructor(@InjectRepository(Hobbie) private hobbieRepository: Repository<Hobbie>){}


  async findById(id: number): Promise<Hobbie | null>{
    return this.hobbieRepository.findOne({where: {id}, relations: ['user']});
  }

  async findAll(): Promise<Hobbie[]>{
    return this.hobbieRepository.find();
  }

  async createHobbie(createHobbieDto: CreateHobbieDto, user: User): Promise<Hobbie | null> {
    try{
      const hobbie = new Hobbie();
      hobbie.hobbieName = createHobbieDto.hobbieName;
      hobbie.hobbieDescription = createHobbieDto.hobbieDescription;
      hobbie.user = user;
      return this.hobbieRepository.save(hobbie);
    }
    catch(error){
      throw new Error(`error occured in hobbie creation ${error}`);
    }
  }

  async updateHobbie(updateHobbieDto: UpdateHobbieDto, id: number, user: User): Promise<Hobbie | null> {
    try{
      const hobbie = await this.hobbieRepository.findOne({
        where: {id},
        relations: ['user']
      });
      if (hobbie?.user.id == user.id){
        this.hobbieRepository.merge(hobbie, updateHobbieDto);
        return await this.hobbieRepository.save(hobbie);
      }
      return null
    }
    catch(error){
      return null;
    }
  }

  async deleteHobbie(id: number, user: User): Promise<Hobbie | null>{
    try{
      const hobbie = await this.hobbieRepository.findOne({
        where: {id},
        relations: ['user']
      });
      if (hobbie?.user.id == user.id){
        return await this.hobbieRepository.remove(hobbie);
      }
      return null;
    }
    catch{
      return null
    }
  }
}
