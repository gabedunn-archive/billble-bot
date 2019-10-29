/*
 * Gabe Dunn 2019
 * Main functionality of the bot.
 */

import discord from 'discord.js'

import { botToken } from './env'
import { log, logError } from './functions/log'
import { pullMessages } from './functions/pullMessages'

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

  await pullMessages(client)

}

// Run the main function.
main().then()
