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
  @PrimaryColumn({ nullable: false, type: 'bigint' })
  cpf: number;

  @Column({ nullable: false, type: 'varchar', length: 64 })
  nome: string;

  @CreateDateColumn()
  data_insercao: Date;
}
