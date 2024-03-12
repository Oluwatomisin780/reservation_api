import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UserService {
  constructor(private readonly prismaSerivce: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const password = await bcrypt.hash(createUserDto.password, 12);
    return this.prismaSerivce.user.create({
      data: {
        ...createUserDto,
        password,
      },
    });
  }
  findOne(email: string) {
    return this.prismaSerivce.user.findUnique({
      where: {
        email,
      },
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
