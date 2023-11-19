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
export class Products extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: String, nullable: true })
  productCardId: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  // @ManyToOne((type) => Category, (category) => category.id)
  categoryId: string | null;

  @Column({ type: String, nullable: true })
  imgUrl: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  barcode: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  productName: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  brand: string | null;

  @Column({ type: Number, nullable: true })
  count: number | null;

  // alış fiyatı
  @Column({ type: Number, nullable: true })
  buyPrice: number | null;

  // birim fiyatı
  @Column({ type: Number, nullable: true })
  quantityPrice: number | null;

  // Satış fiyatı
  @Column({ type: Number, nullable: true })
  sellPrice: number | null;

  // kdv vergi oranı
  @Column({ type: Number, nullable: true })
  taxRate: number | null;

  // kdv li fiyatı
  @Column({ type: Number, nullable: true })
  ratedPrice: number | null;

  // Agırlık birimi kilo litre koli adet vs vs ....
  @Column({ type: String, nullable: true })
  unitType: string | null;

  // Alış Agırlık birimi kilo litre koli adet vs vs ....
  @Column({ type: String, nullable: true })
  unitBuyType: string | null;

  // Stoğu satış ekranında göster?
  @Column({ type: Boolean, nullable: true })
  showOnSellScreen: boolean | null;

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
