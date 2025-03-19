// import type { HttpContext } from '@adonisjs/core/http'
import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'
import { deckValidator } from '#validators/deck'

export default class DecksController {
  async create({ view }: HttpContext) {
    return view.render('pages/create_deck')
  }
  async store({ auth, request, response }: HttpContext) {
    const user = await auth.use('web').user
    const { name, description } = await request.validateUsing(deckValidator(user?.id))

    await Deck.create({ description: description, name: name, userId: user?.id })

    response.redirect().toRoute('home')
  }
  async getDeckById({ params, view, auth }: HttpContext) {
    const user = await auth.use('web').user
    const deck = await Deck.find(params.id)

    if (deck?.userId === user?.id) {
      await deck?.load('card')
      const cards = deck?.card

      return view.render('pages/deck', { deck, cards })
    } else {
      await user?.load('decks')
      const decks = user?.decks
      return view.render('pages/home', { decks })
    }
  }
  async getAllDecks({ auth, view }: HttpContext) {
    const user = await auth.use('web').user

    await user?.load('decks')
    const decks = user?.decks
    return view.render('pages/home', { decks })
  }
}
