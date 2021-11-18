import {
  ConflictException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlunoRepository } from './aluno.repository';
import { IAtualizarAlunoDto, ICriarAlunoDto } from './dtos';

@Injectable()
export class AlunoService {
  constructor(
    @InjectRepository(AlunoRepository)
    private alunoRepository: AlunoRepository,
  ) {}

  async criarAlunoAsync(dados: ICriarAlunoDto) {
    const { cpf, nome } = dados;
    this.validarCpf(cpf);
    this.validarNome(nome);
    const aluno = await this.alunoRepository.buscarAlunoAsync(cpf);
    if (aluno) throw new ConflictException('Cpf já registrado.');
    await this.alunoRepository.criarAlunoAsync(dados);
  }

  async atualizarAlunoAsync(cpf: number, dados: Partial<IAtualizarAlunoDto>) {
    const aluno = await this.alunoRepository.buscarAlunoAsync(cpf);
    if (!aluno) throw new BadRequestException('Aluno não encontrado.');
    if (aluno.cpf === dados.cpf) new BadRequestException('Mesmo cpf enviado.');
    if (dados.cpf) {
      this.validarCpf(dados.cpf);
      aluno.cpf = dados.cpf;
    }
    if (dados.nome) {
      this.validarNome(dados.nome);
      aluno.nome = dados.nome;
    }
    this.alunoRepository.atualizarAlunoAsync(cpf, aluno);
  }

  async deletaAlunoAsync(cpf: number) {
    return this.alunoRepository.deletarAlunoAsync(cpf);
  }

  async buscarTodosAlunosAsync() {
    return this.alunoRepository.buscarTodosAlunosAsync();
  }

  async buscarAlunoAsync(cpf: number) {
    return this.alunoRepository.buscarAlunoAsync(cpf);
  }

  private validarNome(nome: string) {
    if (typeof nome !== 'string')
      throw new BadRequestException('Formato errado do nome. Apenas string.');
    if (!nome) throw new BadRequestException('Nome não pode ser vazio.');

    const nomeChecado = nome.split(
      /([^\w!' áÁéÉíÍóÓúÚàÀèÈìÌòÒùÙãÃõÕâÂêÊîÎôÔûÛçÇ])([\d])*/gimu,
    )[1];
    if (nomeChecado)
      throw new BadRequestException("Nome só pode ter letras e '.");
  }

  private validarCpf(cpf: number) {
    if (typeof cpf !== 'number')
      throw new BadRequestException('Formato errado do cpf. Apenas números.');
    if (cpf < 10000000000 || cpf > 99999999999)
      throw new BadRequestException('Cpf precisa ter 11 dígitos.');
  }
}
