import * as path from "path"
import { util } from "./utils/util"

export interface ParserInfo extends path.ParsedPath {
  // 相对路径
  identifier: string
  tag: string
}

export class CtorAssetFileInfo {
  filePath: string
  rootPath: string
  constructor(filePath: string, rootPath: string) {
    this.filePath = filePath
    if (rootPath.endsWith(`/`)) this.rootPath = rootPath
    else if (rootPath) {
      this.rootPath = `${rootPath}/`
    } else this.rootPath = ``
  }

  parserPath() {
    if (!this.filePath) {
      console.error(`file path is invalid`)
      return null
    }
    console.log(`root:`, this.rootPath)
    /// {  root: "", dir: "assets/images", base: "xx.png", ext: ".png", name: "xx" }
    const info = path.parse(this.filePath)
    // path.sep on win is \ & darwin or linux is /
    const relationPath = info.dir.replace(this.rootPath, ``)
    const identifier =
      relationPath
        .split(path.sep)
        .map((item, i) => {
          if (i === 0) return item
          else return normalizeName(item)
        })
        .join("") + normalizeName(info.name)

    const result: ParserInfo = {
      ...info,
      identifier: identifier,
      tag: `${relationPath}${path.sep}${info.base}`
    }

    return result
  }
}

export function normalizeName(str: string) {
  return str
    .replace(/[-\.]/g, "_")
    .replace(/@/g, "")
    .split("_")
    .map((v: string) => util.upperFirstLetter(v))
    .join("")
}

export function sortAssets(list: ParserInfo[]) {
  return list.sort((a: ParserInfo, b: ParserInfo) => {
    return a.identifier > b.identifier ? 1 : -1
  })
}
