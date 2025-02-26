import vine from '@vinejs/vine'
const deckValidator = (user_id) => {
  return vine.compile(
    vine.object({
      name: vine
        .string()
        .minLength(3)
        .unique(async (db, value) => {
          const user = await db
            .from('decks')
            .where('name', value)
            .andWhere('user_id', user_id)
            .first()
          return !user
        }),
      description: vine.string(),
    })
  )
}
export { deckValidator }
