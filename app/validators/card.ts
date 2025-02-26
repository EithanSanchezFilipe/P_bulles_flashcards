import vine from '@vinejs/vine'
const cardValidator = vine.compile(
  vine.object({
    key: vine.string(),
    value: vine.string(),
    deck: vine.number(),
  })
)
export { cardValidator }
