// import type { HttpContext } from '@adonisjs/core/http'
import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'
import Card from '#models/card'
export default class CardsController {
  async create({ params, view }: HttpContext) {
    const deck = await Deck.find(params.id)
    return view.render('pages/create_card', { deck })
  }
  async store({ auth, request, response, view }: HttpContext) {
    const { key, value, deck } = await request.validateUsing(deckValidator)

    Card.create({ key: key, value: value, deck_id: deck.id })

    response.redirect('/')
  }
}
