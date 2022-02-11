import * as fs from "fs"
import path from "./path"
import * as vscode from "vscode"
import { FLUTTER_PUBSPEC, YamlObject } from "./contants"
import { trimEnd } from "lodash"
import * as yaml from "js-yaml"

export const util = {
  getWorkspace() {
    const folders = vscode.workspace.workspaceFolders ?? []
    const rootPath = path.normalize(folders[0]?.uri?.path ?? ``)
    // fix win32 path bug
    if (process.platform === "win32" && rootPath.startsWith(path.sep)) {
      return rootPath.slice(1)
    } else {
      return rootPath
    }
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

interface IConfig {
  assets_path: Array<string>
  output_path: string
  pubspec: string
  field_prefix: string
  filename: string
}

export function loadConf(): IConfig {
  // process.cwd must call process.chdir & set workspace
  const doc = yaml.load(
    fs.readFileSync(
      path.normalize(path.join(process.cwd(), FLUTTER_PUBSPEC)),
      "utf-8"
    )
  ) as YamlObject

  let filename = "assets.dart"
  if (!doc || !doc.flutter_assets) {
    vscode.window.showInformationMessage(
      "Not found assets_config in pubspec.yaml file"
    )
    return {
      assets_path: [],
      output_path: ``,
      pubspec: FLUTTER_PUBSPEC,
      filename,
      field_prefix: ""
    }
  }

  const config = doc.flutter_assets
  const assets_path: string[] | string | undefined = config.assets_path
  const output_path = config.output_path || "lib/assets"
  // 前缀
  let field_prefix = ""
  // 没提供为undefined, 提供但是为空是null
  if (config.field_prefix === null) {
    field_prefix = ""
  } else {
    field_prefix = config.field_prefix ?? "assets"
  }

  filename = config.filename || "assets.dart"

  if (!assets_path) {
    vscode.window.showWarningMessage(
      "pubspec.yaml should provide flutter_assets.assets_path field"
    )
  }

  return {
    assets_path: Array.isArray(assets_path)
      ? assets_path.map((a: string) => trimEnd(a, "/"))
      : [trimEnd(assets_path, "/")],
    output_path: trimEnd(output_path, "/"),
    pubspec: FLUTTER_PUBSPEC,
    field_prefix: field_prefix as string,
    filename
  }
}
