import { XMLParser, XMLBuilder } from 'fast-xml-parser'
import * as fs from 'fs'
import * as path from 'path'

const options = {
  ignoreAttributes: false,
  format: true
}

const parser = new XMLParser(options)
const sitePath = path.join(__dirname, '../../dist/sitemap.xml')
const fileXML = fs.readFileSync(sitePath).toString()
const jsonObj = parser.parse(fileXML)
const priorityArray = [1.0, 0.8, 0.64, 0.4, 0.2, 0]

for (let i = 0; i < jsonObj.urlset.url.length; i++) {
  jsonObj.urlset.url[i].priority = priorityArray[jsonObj.urlset.url[i].loc.split('/').length - 4]
}

const builder = new XMLBuilder(options)
const xmlData = builder.build(jsonObj).toString()

fs.writeFileSync(sitePath, xmlData)
