import * as fs from "fs"
import * as path from "path"
import * as vscode from "vscode"
import { FLUTTER_PUBSPEC, YamlObject } from "./contants"
import { trimEnd } from "lodash"
import * as yaml from "js-yaml"

export const util = {
  getWorkspace() {
    const folders = vscode.workspace.workspaceFolders ?? []
    const rootPath = folders[0]?.uri?.path ?? ``
    return rootPath
  },
  /**
   * 将一个单词首字母大写并返回
   */
  upperFirstLetter: (word: string) => {
    return (word || "").replace(/^\w/, m => m.toUpperCase())
  },
  /**
   * 将一个单词首字母转小写并返回
   */
  lowerFirstLeter: (word: string) => {
    return (word || "").replace(/^\w/, m => m.toLowerCase())
  },

  /**
   * 简单的检测版本大小
   */
  checkVersion(version1: string, version2: string) {
    const tversion1 = parseInt(version1.replace(/\./g, ""))
    const tversion2 = parseInt(version2.replace(/\./g, ""))
    return tversion1 > tversion2
  },

  /**
   * 获取某个扩展文件相对于webview需要的一种特殊路径格式
   * 形如：vscode-resource:/Users/toonces/projects/vscode-cat-coding/media/cat.gif
   * @param context 上下文
   * @param relativePath 扩展中某个文件相对于根目录的路径，如 images/test.jpg
   */
  getExtensionFileVscodeResource(context: any, relativePath: string) {
    const diskPath = vscode.Uri.file(
      path.join(context.extensionPath, relativePath)
    )
    return diskPath.with({ scheme: "vscode-resource" }).toString()
  }
}

export function loadConf() {
  const doc = yaml.load(
    fs.readFileSync(path.join(process.cwd(), FLUTTER_PUBSPEC), "utf-8")
  ) as YamlObject

  let filename = "assets.dart"
  if (!doc || !doc.flutter_assets) {
    console.warn("not found assets_config in pubspec.yaml file")
    return {
      assets_path: [],
      output_path: ``,
      pubspec: FLUTTER_PUBSPEC,
      filename
    }
  }

  const config = doc.flutter_assets
  const assets_path: string[] | string | undefined = config.assets_path
  const output_path = config.output_path || "lib/assets"
  filename = config.filename || "assets.dart"

  if (!assets_path) {
    console.log(
      "assets_config.json file must specify `assets` folder as assets"
    )
  }

  return {
    assets_path: Array.isArray(assets_path)
      ? assets_path.map((a: string) => trimEnd(a, "/"))
      : [trimEnd(assets_path, "/")],
    output_path: trimEnd(output_path, "/"),
    pubspec: FLUTTER_PUBSPEC,
    filename
  }
}