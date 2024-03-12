import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  ParseIntPipe,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Parent } from '@nestjs/graphql';
import { CurrentUser } from '../decorators/getCurrentUser.decorator';
import { JwtAuthGuard } from '../guards/jwtAuth.guard';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createReservationDto: CreateReservationDto,
    @CurrentUser() user: any,
  ) {
    return this.reservationService.create(createReservationDto, user.id);
  }

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReservationDto: UpdateReservationDto,
    @CurrentUser() user: any,
  ) {
    const getUser = this.reservationService.getUserByreservationId(user.id);
    if (getUser !== user.id)
      throw new UnauthorizedException('User Not authorized');
    return this.reservationService.update(id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: any) {
    const getUser = this.reservationService.getUserByreservationId(user.id);
    if (getUser !== user.id) throw new UnauthorizedException();
    return this.reservationService.remove(id);
  }
}
