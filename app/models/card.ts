import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Deck from './deck.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Card extends BaseModel {
  @belongsTo(() => Deck)
  declare deck: BelongsTo<typeof Deck>
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
