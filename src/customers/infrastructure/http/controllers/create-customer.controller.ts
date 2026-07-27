import { z } from 'zod'
import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { dataValidation } from '@/common/infrastructure/validation/zod'
import { CreateCustomerUseCase, CreateCustomerInput } from '@/customers/application/usecases/create-customer.usecase'

export async function createCustomerController(
  request: Request,
  response: Response,
): Promise<Response> {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
  })

  const { name, email } = dataValidation(bodySchema, request.body)

  const createCustomerUseCase = container.resolve<CreateCustomerUseCase>('CreateCustomerUseCase')

  const input: CreateCustomerInput = { name, email }

  const customer = await createCustomerUseCase.execute(input)

  return response.status(201).json(customer)
}
