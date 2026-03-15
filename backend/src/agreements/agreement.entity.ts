import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AgreementStatus {
  PENDING = 'pending',
  SIGNED = 'signed',
  DECLINED = 'declined',
}

@Entity('agreements')
export class Agreement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studentId: string;

  @Column()
  documentType: string;

  @Column({ nullable: true })
  boldSignDocumentId: string;

  @Column({
    type: 'enum',
    enum: AgreementStatus,
    default: AgreementStatus.PENDING,
  })
  status: AgreementStatus;

  @Column({ nullable: true })
  signedAt: Date;

  @Column({ nullable: true })
  documentUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
