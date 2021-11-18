import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { IAtualizarAlunoDto, ICriarAlunoDto } from './dtos';

@Controller('alunos')
export class AlunoController {
  constructor(private readonly alunosService: AlunoService) {}

  @Post()
  async criarAlunoAsync(@Body() dados: ICriarAlunoDto) {
    return this.alunosService.criarAlunoAsync(dados);
  }

  @Patch(':cpf')
  async atualizarAlunoAsync(
    @Param('cpf') cpf: number,
    @Body() dados: IAtualizarAlunoDto,
  ) {
    const { nome: novoNome, cpf: novoCpf } = dados;
    if (!novoNome && !novoCpf)
      throw new BadRequestException('Nenhum dado enviado para alteração.');
    return this.alunosService.atualizarAlunoAsync(+cpf, dados);
  }

  @Delete(':cpf')
  async deletarAlunoAsync(@Param('cpf') cpf: number) {
    return this.alunosService.deletaAlunoAsync(+cpf);
  }

  @Get()
  async buscarTodosAlunosAsync() {
    return this.alunosService.buscarTodosAlunosAsync();
  }

  @Get(':cpf')
  async buscarAlunoAsync(@Param('cpf') cpf: number) {
    return this.alunosService.buscarAlunoAsync(+cpf);
  }
}
