// import type { HttpContext } from '@adonisjs/core/http'
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Deck from '#models/deck'
import { deckValidator } from '#validators/deck'
export default class DecksController {
  async createDeck({ auth, request, response, view }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).json({ message: 'User not authenticated' })
    }
    const { name, description } = request.validateUsing(deckValidator)

    Deck.create({ user_id: user.id })

    response.redirect('/')
  }
}
