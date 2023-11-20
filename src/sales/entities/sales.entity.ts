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
export class Sales extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  // Eğer cari hesaba işlenecekse satış buradan yönetilir.
  @Index()
  @Column({ type: String, nullable: true })
  // @ManyToOne((type) => Category, (category) => category.id)
  currentAccountId: string | null;

  // satılan toplam ürün adedi
  @Column({ type: Number, nullable: false })
  count: number | null;

  // total fiyat
  @Column({ type: Number, nullable: false })
  totalPrice: number | null;

  // ödeme tipi örn => kart nakit cari çek senet gibi
  @Column({ type: String, nullable: false })
  paymentMethod: string | null;

  // satış açıklaması opsiyonel
  @Column({ type: String, nullable: true })
  description: string | null;

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
