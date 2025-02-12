import vine from '@vinejs/vine'
import { customErrorMessage } from '#start/validator'

vine.messagesProvider = customErrorMessage
const loginUserValidator = vine.compile(
  vine.object({
    username: vine.string(),
    password: vine.string().minLength(8),
  })
)
const registerUserValidator = vine.compile(
  vine.object({
    username: vine.string().unique(async (db, value) => {
      const user = await db.from('users').where('username', value).first()
      return !user
    }),
    email: vine.string().email(),
    password: vine.string().minLength(8).confirmed({
      confirmationField: 'confirmPassword',
    }),
  })
)
export { loginUserValidator, registerUserValidator }
