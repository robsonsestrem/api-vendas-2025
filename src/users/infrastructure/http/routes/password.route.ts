import { Router } from 'express'
import { sendEmailToResetPasswordController } from '@/users/infrastructure/http/controllers/send-email-to-reset-password.controller'
import { resetPasswordController } from '@/users/infrastructure/http/controllers/reset-password.controller'

const passwordRouter = Router()

passwordRouter.post('/forgot', sendEmailToResetPasswordController)
passwordRouter.post('/reset', resetPasswordController)

export { passwordRouter }
