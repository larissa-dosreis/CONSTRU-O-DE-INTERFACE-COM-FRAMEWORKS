import fs from 'node:fs'
import zlib from 'node:zlib'

const data = fs.readFileSync(process.argv[2])
const source = data.toString('latin1')
const streams = []
const streamRe = /<<(.*?)>>\s*stream\r?\n/gms
let match

while ((match = streamRe.exec(source))) {
  const start = match.index + match[0].length
  const end = source.indexOf('endstream', start)
  if (end < 0) break
  let bytes = data.subarray(start, end)
  while (bytes.length && (bytes.at(-1) === 10 || bytes.at(-1) === 13)) bytes = bytes.subarray(0, -1)
  try { if (/FlateDecode/.test(match[1])) bytes = zlib.inflateSync(bytes) } catch { continue }
  streams.push(bytes.toString('latin1'))
}

const cmapText = streams.find((text) => /beginbfchar/.test(text) && /<0025> <0044>/.test(text))
const cmap = new Map()
for (const item of cmapText.matchAll(/<([0-9a-f]+)>\s*<([0-9a-f]+)>/gi)) {
  const points = item[2].match(/.{4}/g).map((part) => parseInt(part, 16))
  cmap.set(item[1].toLowerCase(), String.fromCodePoint(...points))
}

const decodeHex = (hex) => {
  const chars = []
  for (let i = 0; i < hex.length; i += 4) chars.push(cmap.get(hex.slice(i, i + 4).toLowerCase()) ?? '')
  return chars.join('')
}

for (const text of streams.filter((value) => /\bBT\b/.test(value))) {
  for (const block of text.matchAll(/BT([\s\S]*?)ET/g)) {
    const lines = []
    for (const item of block[1].matchAll(/<([0-9a-f]+)>/gi)) {
      const decoded = decodeHex(item[1])
      if (decoded) lines.push(decoded)
    }
    if (lines.length) console.log(lines.join(''))
  }
}
