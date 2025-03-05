import vine from '@vinejs/vine'
const cardValidator = (deckId, cardId) => {
  return vine.compile(
    vine.object({
      key: vine
        .string()
        .minLength(10)
        .unique(async (db, value) => {
          if (cardId) {
            // If cardId is provided, we're updating an existing card
            const existingCard = await db
              .from('cards')
              .where('key', value)
              .andWhere('deck_id', deckId)
              .andWhere('id', '!=', cardId) // Exclude the current card being updated
              .first()

            return !existingCard // Allow if no other card has the same key
          } else {
            // If cardId is not provided, we're creating a new card
            const existingCard = await db
              .from('cards')
              .where('key', value)
              .andWhere('deck_id', deckId)
              .first()

            return !existingCard // Allow if no card has the same key
          }
        }),
      value: vine.string(),
    })
  )
}
export { cardValidator }
