import vine from '@vinejs/vine'
const deckValidator = (user_id: number | undefined) => {
  return vine.compile(
    vine.object({
      name: vine
        .string()
        .minLength(3)
        .unique(async (db, value) => {
          if (user_id) {
            const user = await db
              .from('decks')
              .where('name', value)
              .andWhere('user_id', user_id)
              .first()
            return !user
          }
          return false
        }),
      description: vine.string(),
    })
  )
}
export { deckValidator }
