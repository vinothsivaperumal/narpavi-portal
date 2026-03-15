import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.entity';

export enum StudentStatus {
  ACTIVE = 'active',
  GRADUATED = 'graduated',
  DROPPED = 'dropped',
  ON_HOLD = 'on_hold',
}

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  batchId: string;

  @Column({ type: 'date', nullable: true })
  enrollmentDate: Date;

  @Column({ nullable: true })
  phone: string;

  @Column({
    type: 'enum',
    enum: StudentStatus,
    default: StudentStatus.ACTIVE,
  })
  status: StudentStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
