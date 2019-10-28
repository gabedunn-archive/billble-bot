/*
 * Gabe Dunn 2019
 * Functions related to generating the PDF.
 */

import PdfPrinter from 'pdfmake'
import { createWriteStream } from 'fs'
import { join } from 'path'

export const saveTestPDF = async () => {
  const fonts = {
    Roboto: {
      normal: join(__dirname, 'fonts', 'Roboto-Regular.ttf'),
      bold: join(__dirname, 'fonts/', 'Roboto-Bold.ttf'),
      italics: join(__dirname, 'fonts', 'Roboto-Italic.ttf'),
      bolditalics: join(__dirname, 'fonts', 'Roboto-BoldItalic.ttf')
    },
    FiraCode: {
      normal: join(__dirname, 'fonts', 'FiraCode-Regular.ttf'),
      bold: join(__dirname, 'fonts', 'FiraCode-Bold.ttf')
    }
  }
  const printer = new PdfPrinter(fonts);

  const docDefinition = {
    content: ['This is an sample PDF printed with pdfMake2'],
    styles: {
      quote: {
        font: 'Fira Code',
        fontSize: 12
      }
    }
  }

  const options = {
    // ...
  }

  const pdfDoc = printer.createPdfKitDocument(docDefinition, options)
  pdfDoc.pipe(createWriteStream(join(__dirname, '..', 'out', 'billble.pdf')))
  pdfDoc.end()
}
