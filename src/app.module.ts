import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { AlunoModule } from './aluno';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AlunoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
