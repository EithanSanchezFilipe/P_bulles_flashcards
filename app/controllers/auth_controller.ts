import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async handleLogout({ auth, session, response }: HttpContext) {
    await auth.use('web').logout()

    session.flash('success', "l\'utilisateur s'est déconnecté avec succès")

    return response.redirect().toRoute('loginPage')
  }
}
