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
import { middleware } from './kernel.js'

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
router.on('/deck').render('pages/create_deck').as('deck.showCreateDeck').use(middleware.auth())
router.post('/deck', [DecksController, 'createDeck']).as('deck.createDeck').use(middleware.auth())
