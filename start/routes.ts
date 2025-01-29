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

router.on('/').render('pages/login').as('loginPage')
router.post('/logout', [AuthController, 'handleLogout']).as('auth.handleLogout')
