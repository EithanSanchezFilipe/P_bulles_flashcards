import vine from '@vinejs/vine'
const cardValidator = (deckId: number | undefined, cardId: number | null | undefined) => {
  return vine.compile(
    vine.object({
      key: vine
        .string()
        .minLength(10)
        .unique(async (db, value) => {
          if (cardId && deckId != undefined) {
            const existingCard = await db
              .from('cards')
              .where('key', value)
              .andWhere('deck_id', deckId)
              .andWhere('id', '!=', cardId)
              .first()
            return !existingCard
          } else if (deckId) {
            const existingCard = await db
              .from('cards')
              .where('key', value)
              .andWhere('deck_id', deckId)
              .first()
            return !existingCard
          }
          return false
        }),
      value: vine.string(),
    })
  )
}
export { cardValidator }
