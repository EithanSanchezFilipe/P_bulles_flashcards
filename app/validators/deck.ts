import vine from '@vinejs/vine'
const deckValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3),
    description: vine.string(),
  })
)
export { deckValidator }
