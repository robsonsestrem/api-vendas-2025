import { container } from 'tsyringe'
import '@/products/infrastructure/container'
import '@/users/infrastructure/container'
import { BcryptjsHashProvider } from '../providers/hash-providers/bcryptjs-hash.provider'

container.registerSingleton('HashProvider', BcryptjsHashProvider)

