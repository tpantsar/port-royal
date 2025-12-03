import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT ?? '3000'
export const ENV = process.env.NODE_ENV ?? 'development'

if (!PORT || !ENV) {
  throw new Error('Missing PORT or NODE_ENV in environment variables')
}
