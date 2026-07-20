import { container } from 'tsyringe'
import { dataSource } from '@/common/infrastructure/typeorm'
import { Customer } from '@/customers/infrastructure/typeorm/entities/customers.entity'
import { CustomersTypeormRepository } from '@/customers/infrastructure/typeorm/repositories/customers-typeorm.repository'
import { CreateCustomerUseCase } from '@/customers/application/usecases/create-customer.usecase'

container.registerSingleton('CustomersRepository', CustomersTypeormRepository)

container.registerInstance(
  'CustomersDefaultRepositoryTypeorm',
  dataSource.getRepository(Customer),
)

container.registerSingleton('CreateCustomerUseCase', CreateCustomerUseCase)
