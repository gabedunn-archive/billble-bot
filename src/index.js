/*
 * Gabe Dunn 2019
 * Main functionality of the bot.
 */

import discord from 'discord.js'

import { botToken, prefix } from './env'
import { log, logError } from './functions/log'
import { pullMessages } from './functions/pullMessages'
import { writePDF } from './functions/writePDF'
import { sendBillble } from './functions/sendBillble'

const main = async () => {
  // Initialize the client.
  const client = new discord.Client()

  // Set a listener for the ready event to log that the bot is ready.
  client.on('ready', () => {
    log('Init', `Logged in as ${client.user.tag}.`)
  })

  // Log the bot in.
  try {
    await client.login(botToken)
  } catch (err) {
    await logError('Init', 'Bot failed to log in', err)
  }

  client.on('message', async message => {
    if (message.channel.type !== 'dm' && message.content === `${prefix}billble` && !message.author.bot) {
      return sendBillble(message)
    }
  })
}

// Run the main function.
main().then()
