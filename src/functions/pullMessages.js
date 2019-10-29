/*
 * Gabe Dunn 2019
 * Functions related to pulling the messages from the channel.
 */

import moment from 'moment'

import { logError } from './log'
import { guildID, wordsChannelID } from '../env'

export const pullMessages = async client => {
  const guilds = client.guilds
  const guild = guilds.find(guild => guild.id === guildID)

  if (!guild) {
    logError('Pull', 'Error', 'Guild doesn\'t exist.')
    return
  }

  const wordsChannel = guild.channels.find(c => c.id === wordsChannelID)

  if (!wordsChannel) {
    logError('Pull', 'Error', 'Channel doesn\'t exist.')
    return
  }

  const messages = (await wordsChannel.fetchMessages({
    limit: 100
  })).map(message => {
    return {
      timestamp: moment(message.createdTimestamp).format('YYYY-MM-DD'),
      content: message.content.replace(/^((> ?)?"?)|("$)/g, '')
    }
  })

  console.log(messages)
}
