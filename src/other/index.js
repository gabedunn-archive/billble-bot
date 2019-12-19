import { join } from 'path'
import { writePDF } from '../functions/writePDF'
import { log } from '../functions/log'

import messages from '../input'

const main = async () => {
  const msg = new Array(messages)[0].map(m => {
    return {
      date: Object.keys(m)[0],
      content: Object.values(m)[0]
    }
  })

  // console.log(msg)

  return await writePDF(msg)
}

// Run the main function.
main().then()
