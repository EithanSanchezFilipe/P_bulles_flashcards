// import type { HttpContext } from '@adonisjs/core/http'
import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'
import Card from '#models/card'
import { cardValidator } from '#validators/card'
import { dd } from '@adonisjs/core/services/dumper'

export default class CardsController {
  async create({ params, view }: HttpContext) {
    const deck = await Deck.find(params.id)
    return view.render('pages/create-card', { deck })
  }
  async store({ request, response }: HttpContext) {
    const id = await request.param('id')
    const { key, value } = await request.validateUsing(cardValidator(id, null))
    await Card.create({ key: key, value: value, deckId: id })

    response.redirect('/deck/' + id)
  }
  async destroy({ request, response }: HttpContext) {
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
  async update({ view, params }: HttpContext) {
    const card = await Card.find(params.id)
    return view.render('pages/update-card', { card })
  }
  async edit({ request, response, params }: HttpContext) {
    const card = await Card.find(params.id)
    const { key, value } = await request.validateUsing(cardValidator(card?.deckId, card?.id))

    dd
    card?.merge({ key, value })
    await card?.save()

    return response.redirect().toRoute('deck.get', { id: card?.deckId })
  }
}
