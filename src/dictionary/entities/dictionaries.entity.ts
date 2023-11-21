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
export class Dictionaries extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  // birim türüne işaret eden benzersiz kod türüdür  - maksimum 3 karakter olabilir
  @Index()
  @Column({ type: String, nullable: false, length: 3 })
  unitCode: string | null;

  // birim türüne ait değer adı örneğin kilogram adet vs... Burada uzun adını veya açıklamasını alacak Value kısmında ise program akısında gezecek olan değerini
  @Column({ type: String, nullable: false, unique: true })
  key: string | null;

  // birim türüne ait değerin kendisidir, Uzun açıklamasına karşılık değeri bu alanda tutulur
  @Column({ type: String, nullable: false, unique: true })
  value: string | null;

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
