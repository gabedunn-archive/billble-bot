import { config } from 'dotenv'
config()

export const botToken = process.env.BOT_TOKEN || undefined
export const guildID = process.env.GUILD_ID || undefined
export const wordsChannelID = process.env.WORDS_CHANNEL_ID || undefined
export const prefix = process.env.PREFIX || '.'
export const dateFormat = process.env.DATE_FORMAT || 'YYYY-MM-DD'
