import { parse } from './html-parser'
import { generate } from './codegen'

const cache = Object.create(null)

export function compile(html) {
  html = html.trim()
  const hit = cache[html]
  console.log(hit)
}
