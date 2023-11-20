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
export class SalesDetail extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  // Eğer cari hesaba işlenecekse satış buradan yönetilir.
  @Index()
  @Column({ type: String, nullable: false })
  salesId: string | null;

  @Index()
  @Column({ type: String, nullable: false })
  productId: string | null;

  // satılan birim ürün adedi
  @Column({ type: Number, nullable: false })
  count: number | null;

  // birim fiyat
  @Column({ type: Number, nullable: false })
  unitPrice: number | null;

  // ürün satış anında ki kdv oranı
  @Column({ type: Number, nullable: false })
  taxRate: number | null;

  // birim ürünün toplam fiyatı => birim fiyat x adet
  @Column({ type: Number, nullable: false })
  totalUnitPrice: number | null;

  // ürün birim tipi => koli, adet, kilogram, litre vs ...
  @Column({ type: String, nullable: false })
  unitType: string | null;

  // satış anında ürün açıklaması opsiyonel
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
