import { loginUserValidator, registerUserValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  async handleLogin({ request, auth, session, response }: HttpContext) {
    const { username, password } = await request.validateUsing(loginUserValidator)
    const user = await User.verifyCredentials(username, password)
    await auth.use('web').login(user)
    session.flash('success', "l\'utilisateur s'est connecté avec succès")
    return response.redirect().toRoute('home')
  }

  async handleLogout({ auth, session, response }: HttpContext) {
    await auth.use('web').logout()

    session.flash('success', "l\'utilisateur s'est déconnecté avec succès")

    return response.redirect().toRoute('auth.showLogin')
  }

  async handleRegister({ request, auth, session, response }: HttpContext) {
    const { username, email, password } = await request.validateUsing(registerUserValidator)

    await User.create({ username: username, email: email, password: password })

    const user = await User.verifyCredentials(username, password)

    await auth.use('web').login(user)
    session.flash('success', "l\'utilisateur a été créé avec succès")

    return response.redirect().toRoute('home')
  }
}
