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
export class DynamicReports extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  // rapor hangi modüle işaret ediyor?
  @Index()
  @Column({ type: String, nullable: false })
  reportModule: string | null;

  // rapor adı
  @Index()
  @Column({ type: String, nullable: false })
  reportName: string | null;

  // rapor açıklaması
  @Column({ type: String, nullable: true })
  reportDescription: string | null;

  // rapor sorgusu
  @Column({ type: String, nullable: false })
  reportQuery: string | null;

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
