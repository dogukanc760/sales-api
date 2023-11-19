import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';

@Entity()
export class CurrentAccounts extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: String, nullable: false })
  name: string | null;

  @Column({ type: String, nullable: true })
  address: string | null;

  @Column({ type: String, nullable: true })
  city: string | null;

  @Column({ type: String, nullable: true })
  distinct: string | null;

  @Column({ type: String, nullable: true })
  phoneNumber: string | null;

  // Vergi dairesi
  @Column({ type: String, nullable: true })
  taxPlace: string | null;

  // vergi numarası
  @Column({ type: String, nullable: true })
  taxNumber: string | null;

  // email
  @Column({ type: String, nullable: true })
  email: string | null;

  // cari bakiyesi/hesabı
  @Column({ type: Number, nullable: true })
  balance: number | null;

  // cari hesabı ekside mi artıda mı? true ise artıdadır
  @Column({ type: Boolean, nullable: true })
  isBalancePositive: boolean | null;

  // Stok oluşturma ve alış tarihi
  @CreateDateColumn()
  createdAt: Date;

  // Stok güncelleme tarihi
  @UpdateDateColumn()
  updatedAt: Date;

  // stok silme tarihi veya deaktif olma tarihi
  @DeleteDateColumn()
  deletedAt: Date;
}
