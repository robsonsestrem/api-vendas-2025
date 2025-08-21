import { ProductsTypeormRepository } from './products-typeorm.repository';
import { testDataSource } from '../../../../common/infrastructure/typeorm/testing/data-source'; // Adjust the import path as needed
import { NotFoundError } from '@/common/domain/errors/not-found-error';
import { randomUUID } from 'crypto';
import { ProductsDataBuilder } from '../../testing/healpers/products-data-builder';
import { Product } from '../entities/products.entity';

describe('ProductsTypeormRepository integration tests', () => {
	let ormRepository: ProductsTypeormRepository;

	beforeAll(async () => {
		await testDataSource.initialize();
	});

	afterAll(async () => {
		await testDataSource.destroy();
	});

	beforeEach(async () => {
		await testDataSource.manager.query('DELETE FROM products');
		ormRepository = new ProductsTypeormRepository();
		ormRepository.productsRepository = testDataSource.getRepository('Product');
	});

	describe('findById', () => {
		it('Should generate an error when the product is not found', async () => {
			const id = randomUUID();
			await expect(ormRepository.findById(id)).rejects.toThrow(
				new NotFoundError(`Product not found using ID ${id}`)
			);
		});

		it('Should finds a product by id', async () => {
			const data = ProductsDataBuilder({});
			const product = testDataSource.manager.create(Product, data);
			await testDataSource.manager.save(product);

			const result = await ormRepository.findById(product.id);
			expect(result.id).toEqual(product.id);
			expect(result.name).toEqual(product.name);
		});
	});
});
