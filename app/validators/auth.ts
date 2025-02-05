import vine from '@vinejs/vine'
const loginUserValidator = vine.compile(
  vine.object({
    username: vine.string(),
    password: vine.string().minLength(8),
  })
)
const registerUserValidator = vine.compile(
  vine.object({
    username: vine.string(),
    email: vine.string().email(),
    password: vine.string().minLength(8).confirmed({
      confirmationField: 'confirmPassword',
    }),
  })
)
export { loginUserValidator, registerUserValidator }
