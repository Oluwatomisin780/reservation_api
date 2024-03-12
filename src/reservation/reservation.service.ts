import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReservationService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createReservationDto: CreateReservationDto, userId: number) {
    return this.prismaService.reservation.create({
      data: {
        ...createReservationDto,
        InvoiceId: 1,
        userId,
      },
    });
  }

  findAll() {
    return this.prismaService.reservation.findMany();
  }

  findOne(id: number) {
    return this.prismaService.reservation.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.prismaService.reservation.update({
      where: {
        id,
      },
      data: {
        ...updateReservationDto,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }

  //get  user by reservation id
  async getUserByreservationId(id: number) {
    const reservation = await this.prismaService.reservation.findUnique({
      where: {
        id,
      },
      select: {
        userId: true,
      },
    });
    return reservation.userId;
  }
}
