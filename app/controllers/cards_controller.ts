// import type { HttpContext } from '@adonisjs/core/http'
import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'
import Card from '#models/card'
import { cardValidator } from '#validators/card'
import { dd } from '@adonisjs/core/services/dumper'

export default class CardsController {
  async create({ params, view }: HttpContext) {
    const deck = await Deck.find(params.id)
    return view.render('pages/create_card', { deck })
  }
  async store({ auth, request, response, view }: HttpContext) {
    const { key, value, deck } = await request.validateUsing(cardValidator)
    await Card.create({ key: key, value: value, deck_id: deck })

    response.redirect('/deck/' + deck)
  }
  async destroy({ view, request, response }: HttpContext) {
    //TODO : vérifier que c'est une carte appartenant à l'utilisateur
    const id = await request.param('id')
    const cardId = await request.param('cardId')

    //Carte
    const card = await Card.find(cardId)

    await card?.delete()

    return response.redirect().toRoute('deck.get', { id: id })
  }
  async getCard({ view, request }: HttpContext) {
    const id = await request.param('id')

    const card = await Card.find(id)
    return view.render('pages/card', { card })
  }
}
