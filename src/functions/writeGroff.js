import { writeFileSync } from 'fs'
import { join } from 'path'

export const writeGroff = groffString => {
  const prefix = '.TL\n'
    + 'The Billble\n'
    + '.AU\n'
    + 'Students\n'
    + '.AI\n'
    + 'University of Victoria\n'
  + '.fam F\n'

  const suffix = ''

  const outPath = join(__dirname, '..', '..', 'out', 'billble.ms')

  writeFileSync(outPath, `${prefix}\n${groffString}\n${suffix}`)
}
