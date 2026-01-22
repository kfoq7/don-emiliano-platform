import { persistentAtom } from '@nanostores/persistent'

export type User = {
  name: string
  numberPhone: string
  documentNumber?: string
}

export const userStore = persistentAtom<User | null>('user', null, {
  encode: JSON.stringify,
  decode: JSON.parse,
})
