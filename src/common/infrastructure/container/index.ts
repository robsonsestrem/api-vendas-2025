import { container } from 'tsyringe'
import '@/products/infrastructure/container'
import '@/users/infrastructure/container'
import { BcryptjsHashProvider } from '@/common/infrastructure/providers/hash-providers/bcryptjs-hash.provider'
import { JwtAuthProvider } from '@/common/infrastructure/providers/auth-provider/auth-provider'
import { R2Uploader } from '@/common/infrastructure/providers/storage-provider/r2.uploader'

container.registerSingleton('HashProvider', BcryptjsHashProvider)
container.registerSingleton('AuthProvider', JwtAuthProvider)
container.registerSingleton('UploaderProvider', R2Uploader)
