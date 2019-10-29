/*
 * Gabe Dunn 2019
 * Functions related to pulling the messages from the channel.
 */

import moment from 'moment'

import { logError } from './log'
import { guildID, wordsChannelID } from '../env'

// Function to pull messages from the channel
export const pullMessages = async client => {
  // Fetch the guild and make sure it exists.
  const guilds = client.guilds
  const guild = guilds.find(guild => guild.id === guildID)
  if (!guild) {
    logError('Pull', 'Error', 'Guild doesn\'t exist.')
    return
  }

  // Fetch the channel and make sure it exists.
  const wordsChannel = guild.channels.find(c => c.id === wordsChannelID)
  if (!wordsChannel) {
    logError('Pull', 'Error', 'Channel doesn\'t exist.')
    return
  }

  // Return the messages, with formatted date and quotes ("") removed.
  // TODO: pull all messages instead of 100
  return (await wordsChannel.fetchMessages({
    limit: 10
  })).map(message => {
    return {
      date: moment(message.createdTimestamp).format('YYYY-MM-DD'),
      content: message.content.replace(/^((> ?)?"?)|("$)/g, '')
    }
  })
}
