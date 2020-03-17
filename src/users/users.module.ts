import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel } from './users.model';
import { UsersController } from './users.controller';
import * as bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 5;

const hashUserPasswordHook = async function(next: any) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
};

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'User',
        useFactory: () => {
          const schema = UserModel;
          schema.pre('save', hashUserPasswordHook);
          schema.methods.comparePassword = async function(candidatePassword) {
            return await bcrypt.compare(candidatePassword, this.password);
          };
          return schema;
        },
      },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
