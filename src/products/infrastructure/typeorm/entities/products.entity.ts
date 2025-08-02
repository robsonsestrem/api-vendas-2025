import { ProductModel } from "@/products/domain/models/products-model";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
export class Product implements ProductModel {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ type: 'varchar' })
	name: string

	@Column({ type: 'decimal', precision: 10, scale: 2 })
	price: number

	@Column({ type: 'int' })
	quantity: number

	@CreateDateColumn({ name: 'created_at' })
	created_at: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updated_at: Date
}
