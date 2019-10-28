/*
 * Gabe Dunn 2019
 * Main functionality of the bot.
 */

import discord from 'discord.js'
import { config } from 'dotenv'

import { log, logError } from './log'
import { showGuilds } from './pullMessages'
import { saveTestPDF } from './generatePDF'

config()

const main = async () => {
  // Initialize the client.
  const client = new discord.Client()

  // Set a listener for the ready event to log that the bot is ready.
  client.on('ready', () => {
    log('Init', `Logged in as ${client.user.tag}.`)
  })

  // Log the bot in.
  try {
    await client.login(process.env.BOT_TOKEN)
  } catch (err) {
    await logError('Init', 'Bot failed to log in', err)
  }

  // await showGuilds(client)
  await saveTestPDF()
}

// Run the main function.
main().then(() => log('Main', 'Bot Initialized!'))
