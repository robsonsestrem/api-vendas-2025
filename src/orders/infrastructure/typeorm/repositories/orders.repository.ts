import { Customer } from "@/customers/infrastructure/typeorm/entities/customers.entity";
import Order from "@/orders/infrastructure/typeorm/entities/orders.entity";
import {  EntityRepository, Repository } from 'typeorm';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
}

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    const order = this.findOne({
      where: { id },
      relations: ['order_products', 'customer'],
    });

    return order;
  }

  public async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });

    await this.save(order);

    return order;
  }
}

export default OrdersRepository;
