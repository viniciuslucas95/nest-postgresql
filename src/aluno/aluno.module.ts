import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunoController } from './aluno.controller';
import { AlunoService } from './aluno.service';
import { AlunoRepository } from './aluno.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AlunoRepository])],
  controllers: [AlunoController],
  providers: [AlunoService],
})
export class AlunoModule {}
