import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.createMany([
      { username: 'Albert', email: 'albert@gmail.com', password: 'user', isAdmin: false },
      { username: 'Edouard', email: 'edouard@gmail.com', password: 'admin', isAdmin: true },
    ])
  }
}
