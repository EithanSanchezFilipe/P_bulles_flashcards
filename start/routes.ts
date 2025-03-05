/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'
import DecksController from '#controllers/decks_controller'
import CardsController from '#controllers/cards_controller'
import { middleware } from './kernel.js'
import Card from '#models/card'

router.get('/', [DecksController, 'getAllDecks']).as('home').use(middleware.auth())
router.on('/login').render('pages/login').as('auth.showLogin').use(middleware.guest())
router
  .post('/login', [AuthController, 'handleLogin'])
  .as('auth.handleLogin')
  .use(middleware.guest())
router
  .post('/logout', [AuthController, 'handleLogout'])
  .as('auth.handleLogout')
  .use(middleware.auth())
router.on('/register').render('pages/register').as('auth.showRegister').use(middleware.guest())
router
  .post('/register', [AuthController, 'handleRegister'])
  .as('auth.handleRegister')
  .use(middleware.guest())
router.get('/deck/:id', [DecksController, 'getDeckById']).as('deck.get').use(middleware.auth())
router.get('/deck', [DecksController, 'create']).as('deck.createDeck').use(middleware.auth())
router.post('/deck', [DecksController, 'store']).as('deck.storeDeck').use(middleware.auth())
router
  .get('/deck/:id/card', [CardsController, 'create'])
  .as('card.createCard')
  .use(middleware.auth())
router
  .post('/deck/:id/card', [CardsController, 'store'])
  .as('card.storeCard')
  .use(middleware.auth())
router
  .get('/deck/card/:id', [CardsController, 'getCard'])
  .as('card.showCard')
  .use(middleware.auth())

router
  .delete('/deck/:id/card/:cardId', [CardsController, 'destroy'])
  .as('card.delete')
  .use(middleware.auth())
router
  .get('/deck/card/:id/update', [CardsController, 'update'])
  .as('card.update')
  .use(middleware.auth())
router
  .post('/deck/card/:id/update', [CardsController, 'edit'])
  .as('card.edit')
  .use(middleware.auth())
