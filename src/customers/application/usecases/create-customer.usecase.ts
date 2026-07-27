import { BadRequestError } from '@/common/domain/errors/bad-request-error'
import { inject, injectable } from 'tsyringe'
import { CustomersRepository } from '@/customers/domain/repositories/customers.repository'
import { CustomerOutput } from '@/customers/application/dtos/customer-output'

export type CreateCustomerInput = {
  name: string
  email: string
}

export type CreateCustomerOutput = CustomerOutput

@injectable()
export class CreateCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: CustomersRepository,
  ) {}

  async execute(input: CreateCustomerInput): Promise<CreateCustomerOutput> {
    if (!input.name || !input.email) {
      throw new BadRequestError('Input data not provided or invalid')
    }

    await this.customersRepository.conflictingEmail(input.email)

    const customer = this.customersRepository.create(input)
    return this.customersRepository.insert(customer)
  }
}
