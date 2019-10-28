/*
 * Gabe Dunn 2019
 * Function to make logging look good.
 */

import chalk from 'chalk'
import discord from 'discord.js'

// Given an area and a message, log a nice looking message to the console.
export const log = (area, message) => {
  console.log(`${chalk.greenBright(`[${area}]`)} ${chalk.blue(message)}`)
}

// Given an area, message, and error, log a nice looking error to the console.
export const logError = async (area, message, err) => {
  console.error(`${chalk.greenBright(`[${area}]`)} ${chalk.redBright(`${message}:`)}`, err)
}
