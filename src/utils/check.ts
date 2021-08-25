import * as fs from "fs"
import { FLUTTER_PUBSPEC } from "./contants"
import * as vscode from "vscode"
import path from "./path"

export function validateFlutterProject() {
  const yamlPath = `${process.cwd()}/${FLUTTER_PUBSPEC}`
  const libDir = `${process.cwd()}/lib`

  let isValid = true
  try {
    if (!fs.existsSync(yamlPath) || !fs.existsSync(libDir)) {
      vscode.window.showWarningMessage("Maybe it's not a flutter project")
      isValid = false
    }
  } catch (error) {
    console.error(error)
  }

  return isValid
}
