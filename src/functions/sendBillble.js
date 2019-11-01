import { join } from 'path'
import { pullMessages } from './pullMessages'
import { writePDF } from './writePDF'
import { log } from './log'
import { sendfileWaitTime } from '../env'

export const sendBillble = async message => {
  await message.channel.send({
    embed: {
      title: 'Generating Billble',
      color: 0x2ECC71,
      description: 'The Billble is being generated!'
    }
  })
  const messages = await pullMessages(message.client)
  if (!!messages) {
    await writePDF(messages)
    const attachment = join(__dirname, '..', '..', 'out', 'The_Billble.pdf')
    return setTimeout(async () => {
    log('Command', `Length: ${messages.length}`)
    return message.channel.send({
      files: [{
        attachment,
      }]
    })
    }, sendfileWaitTime)
  } else {
    return message.channel.send({
      embed: {
        title: 'Billble Generator Failed',
        color: 0xE74C3C,
        description: 'There weren\'t any messages.'
      }
    })
  }
}
