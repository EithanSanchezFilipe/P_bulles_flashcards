import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const customErrorMessage = new SimpleMessagesProvider({
  // Généralement pour tous les champs
  'email': "Veuillez respecter le format d'email valide.",
  'username': "Veuillez spécifier un nom d'utilisateur.",
  'password': 'Veuillez spécifier votre mot de passe.',
  'confirmPassword': 'Veuillez confirmer votre mot de passe.',

  // Erreurs pour les champs requis
  'username.required': "Veuillez spécifier votre nom d'utilisateur.",
  'password.required': 'Veuillez spécifier votre mot de passe.',
  'email.required': "L'email est requis.",
  'confirmPassword.required': 'La confirmation du mot de passe est requise.',

  // Erreurs pour la validation de format
  'email.email': "L'email doit être dans un format valide, comme exemple@domaine.com.",
  'password.minLength': 'Le mot de passe doit contenir au moins 8 caractères.',

  // Erreurs pour les champs de mot de passe confirmés
  'password.confirmed': 'Les mots de passe ne correspondent pas.',

  // Erreurs pour les validations uniques (comme l\'email ou le nom d\'utilisateur déjà pris)
  'username.unique': "Ce nom d'utilisateur est déjà pris.",
  'email.unique': 'Cet email est déjà associé à un compte.',
})
