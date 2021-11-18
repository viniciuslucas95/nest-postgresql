import { EntityRepository, Repository } from 'typeorm';
import { Aluno } from './aluno.entity';
import { IAtualizarAlunoDto, ICriarAlunoDto } from './dtos';

@EntityRepository(Aluno)
export class AlunoRepository extends Repository<Aluno> {
  async criarAlunoAsync(dados: ICriarAlunoDto) {
    const { cpf, nome } = dados;
    const aluno = this.create();
    aluno.nome = nome;
    aluno.cpf = cpf;
    await aluno.save();
  }

  async deletarAlunoAsync(cpf: number) {
    await Aluno.delete(cpf);
  }

  async atualizarAlunoAsync(cpf: number, dados: IAtualizarAlunoDto) {
    const { cpf: novoCpf, nome: novoNome } = dados;
    await Aluno.update(cpf, {
      cpf: novoCpf,
      nome: novoNome,
    });
  }

  async buscarAlunoAsync(cpf: number): Promise<Aluno | undefined> {
    return await Aluno.findOne(cpf);
  }

  async buscarTodosAlunosAsync() {
    return await Aluno.find();
  }
}
