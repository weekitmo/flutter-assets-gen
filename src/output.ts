import * as fs from "fs"
import path from "./utils/path"
import type { ParserInfo } from "./info"
import { VNode } from "./vnode"
import * as vscode from "vscode"
class templateCache {
  static temp = ``
}

const templateName = `asset.txt`

export function getTemplate() {
  if (templateCache.temp) return templateCache.temp
  const templatePath = path.join(__dirname, `../templates/${templateName}`)

  const templateStr = fs.readFileSync(templatePath, { encoding: "utf8" })

  return templateStr
}

export function outputCode(
  list: ParserInfo[],
  dist: string,
  filename = "assets.dart"
) {
  const content = list
    .map((item: ParserInfo) => new VNode(item).gen())
    .join("\n")
  const temp = getTemplate()

  const result = temp.replace("__CODE_TEMPLATE_CONTENTS_REPLACEMENT__", content)

  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist, { recursive: true })
  }
  const outputPath = `${dist}${path.sep}${filename}`

  // 如果文件存在, 先删除重新生成
  if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath)
  }
  fs.writeFileSync(outputPath, result)

  vscode.window.showInformationMessage(`Assets generate successful`)
}
