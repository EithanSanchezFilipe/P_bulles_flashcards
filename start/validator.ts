import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const customErrorMessage = new SimpleMessagesProvider({
  // Applicable for all fields
  'required': 'The {{ field }} field is required',
  'string': 'The value of {{ field }} field must be a string',
  'email': 'The value is not a valid email address',

  // Error message for the username field
  'username.required': 'Please choose a username for your account',

  //Error message for the password field
  'password.confirmed': 'Les mots de passe ne correspondent pas.',
})
