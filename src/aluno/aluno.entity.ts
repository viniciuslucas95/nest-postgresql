import {
  BaseEntity,
  Entity,
  Unique,
  Column,
  CreateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
@Unique(['cpf'])
export class Aluno extends BaseEntity {
  @PrimaryColumn('bigint')
  cpf: number;

  @Column({ nullable: false, type: 'varchar', length: 64 })
  nome: string;

  @CreateDateColumn()
  data_insercao: Date;
}
