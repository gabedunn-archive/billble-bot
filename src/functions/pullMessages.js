/*
 * Gabe Dunn 2019
 * Functions related to pulling the messages from the channel.
 */

import moment from 'moment'

import { logError } from './log'
import { guildID, wordsChannelID } from '../env'

import preChannelQuotes from '../preChannelQuotes'

const fetchAllMessages = async client => {
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

  // Initialize the empty messages array, options object, and bool for determining completeness.
  const messages = []
  const options = {
    limit: 100
  }
  let allMessagesCollected = false

  // While all the messages aren't collected, fetch the previous ones.
  while (!allMessagesCollected) {
    // Fetch the messages from the channel in an array.
    const fetchedMessages = (await wordsChannel.fetchMessages(options)).array()

    // Add the messages to the array.
    messages.push(fetchedMessages)
    // If 100 messages were fetched, set the 'before' option to the furthest back message.
    // If less than 100 messages were found, set allMessagesCollected to true to end the loop.
    if (fetchedMessages.length === 100) {
      options.before = fetchedMessages[99].id
    } else {
      allMessagesCollected = true
    }
  }

  // Return a flattened version of the message array.
  return messages.flat()
}

// Function to pull messages from the channel
export const pullMessages = async client => {
  return [
    ...preChannelQuotes,
    ...(await fetchAllMessages(client))
      .reverse()
      .map(message => {
          return {
            date: moment(message.createdTimestamp).format('YYYY-MM-DD'),
            content: message.content.replace(/^((>* ?)?"?)|("$)/g, '')
          }
        }
      )
  ]
}
