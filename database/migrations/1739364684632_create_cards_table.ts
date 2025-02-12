// database/migrations/XXXX_XX_XX_XXXXXX_card.ts

import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cards'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable() // Primary key `id`, auto-incremented
      table.integer('deck_id').unsigned().references('id').inTable('decks').onDelete('CASCADE') // Foreign key to `decks` table
      table.timestamp('created_at').notNullable() // Created At
      table.timestamp('updated_at').nullable() // Updated At
    })
  }

  async down() {
    this.schema.dropTable(this.tableName) // Drop the 'cards' table if migration is rolled back
  }
}
