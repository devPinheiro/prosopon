import { URL } from 'url'
import path from 'path'

export const resolveHtmlPath = (htmlFileName: string): string => {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 5173
    const url = new URL(`http://localhost:${port}/#${htmlFileName}`)
    return url.href
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`
}
