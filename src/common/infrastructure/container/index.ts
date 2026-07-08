import { container } from 'tsyringe'
import '@/products/infrastructure/container'
import '@/users/infrastructure/container'
import { BcryptjsHashProvider } from '../providers/hash-providers/bcryptjs-hash.provider'
import { JwtAuthProvider } from '../providers/auth-provider/auth-provider'

container.registerSingleton('HashProvider', BcryptjsHashProvider)
container.registerSingleton('AuthProvider', JwtAuthProvider)
