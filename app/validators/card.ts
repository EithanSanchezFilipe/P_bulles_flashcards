import vine from '@vinejs/vine'
const cardValidator = (deckId) => {
  return vine.compile(
    vine.object({
      key: vine
        .string()
        .minLength(10)
        .unique(async (db, value) => {
          const user = await db
            .from('cards')
            .where('key', value)
            .andWhere('deck_id', deckId)
            .first()
          return !user
        }),
      value: vine.string(),
    })
  )
}
export { cardValidator }
