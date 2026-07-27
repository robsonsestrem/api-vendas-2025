import OrdersProducts from '@/orders/infrastructure/typeorm/entities/orders-products.entity';
import { ProductModel } from '@/products/domain/models/products-model';
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product implements ProductModel {
	@PrimaryGeneratedColumn('uuid')
	id: string;

  @OneToMany(() => OrdersProducts, order_products => order_products.product)
  order_products: OrdersProducts[];

	@Column({ type: 'varchar' })
	name: string;

	@Column({ type: 'decimal', precision: 10, scale: 2 })
	price: number;

	@Column({ type: 'int' })
	quantity: number;

	@CreateDateColumn({ name: 'created_at' })
	created_at: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updated_at: Date;
}
