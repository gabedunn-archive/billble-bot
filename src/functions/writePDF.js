import PdfPrinter from 'pdfmake'

import { createWriteStream, unlinkSync } from 'fs'
import { join } from 'path'

export const writePDF = async messages => {
  const outPath = join(__dirname, '..', '..', 'out', 'The_Billble.pdf')

  const fonts = {
    Roboto: {
      normal: join(__dirname, '..', 'fonts', 'Roboto-Regular.ttf'),
      bold: join(__dirname, '..', 'fonts', 'Roboto-Regular.ttf'),
      italics: join(__dirname, '..', 'fonts', 'Roboto-Italic.ttf'),
      bolditalics: join(__dirname, '..', 'fonts', 'Roboto-BoldItalic.ttf')
    },
    Fira: {
      normal: join(__dirname, '..', 'fonts', 'FiraCode-Regular.ttf'),
      bold: join(__dirname, '..', 'fonts', 'FiraCode-Bold.ttf'),
      italics: join(__dirname, '..', 'fonts', 'FiraCode-Regular.ttf'),
      bolditalics: join(__dirname, '..', 'fonts', 'FiraCode-Bold.ttf')
    }
  }

  const docDefinition = {
    content: [
      {
        text: 'The Billble',
        style: 'header'
      },
      {
        text: 'A compilation of quotes from the legend Bill Bird.',
        margin: [0, 0, 0, 15],
        style: 'subheader'
      },
      messages.map(m => {
        return {
          columns: [
            {
              width: '20%',
              text: m.date
            },
            {
              width: '*',
              text: `"${m.content}"`
            }
          ],
          margin: [0, 10]
        }
      })
    ],
    defaultStyle: {
      font: 'Fira'
    },
    styles: {
      header: {
        font: 'Roboto',
        fontSize: 30,
        bold: true,
        alignment: 'center'
      },
      subheader: {
        font: 'Roboto',
        fontSize: 12,
        italics: true,
        alignment: 'center'
      }
    },
    pageMargins: [60, 60, 60, 60]
  }

  // Remove the previous file if it exists.
  try {
    await unlinkSync(outPath)
  } catch (e) {}

  const printer = new PdfPrinter(fonts)
  const pdfDoc = printer.createPdfKitDocument(docDefinition)
  pdfDoc.pipe(createWriteStream(outPath))
  return await pdfDoc.end()
}
