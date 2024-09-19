import { Controller, Get, Post, Body, Param, Delete, Req, Put } from '@nestjs/common';
import { HobbieService } from './hobbie.service';
import { CreateHobbieDto } from './dto/create-hobbie.dto';
import { UpdateHobbieDto } from './dto/update-hobbie.dto';
import { Hobbie } from './hobbie.entity';

@Controller('hobbie')
export class HobbieController {
  constructor(private readonly hobbieService: HobbieService) {}

  @Get('all')
  findAll() {
    return this.hobbieService.findAll();
  }

  @Post('createHobbie')
  create(@Body() createHobbieDto: CreateHobbieDto, @Req() res: any) {
    return this.hobbieService.createHobbie(createHobbieDto, res.user);
  }

  @Put('updateHobbie/:id')
  updateHobbie(@Param('id') id: number, @Body() updateHobbieDto: UpdateHobbieDto, @Req() req: any): Promise<Hobbie | null> {
    return this.hobbieService.updateHobbie(updateHobbieDto, id, req.user);
  }

  @Delete('deleteHobbie/:id')
  remove(@Param('id') id: number, @Req() req: any) {
    return this.hobbieService.deleteHobbie(id, req.user);
  }
}
