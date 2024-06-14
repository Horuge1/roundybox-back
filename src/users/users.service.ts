import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptions, FindOptionsWhere, Repository } from 'typeorm';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({
      ...createUserDto,
      password: await argon.hash(createUserDto.password),
    });

    await this.userRepository.insert(user).catch((error) => {
      throw new InternalServerErrorException(error);
    });
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(where:FindOptionsWhere<User>) {
    return this.userRepository.findOne({ where });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });
    await this.userRepository.update({id}, user);
    
  }

  async remove(id: number) {
    const user = await this.findOne({id});
    await this.userRepository.remove(user);
  }
}
