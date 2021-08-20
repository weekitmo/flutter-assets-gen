import * as fs from "fs"
import { FLUTTER_PUBSPEC } from "./contants"

export function validateFlutterProject() {
  const yamlPath = `${process.cwd()}/${FLUTTER_PUBSPEC}`
  const libDir = `${process.cwd()}/lib`
  let isValid = true
  try {
    if (!fs.existsSync(yamlPath) || !fs.existsSync(libDir)) {
      console.warn("Maybe not a flutter project")
      isValid = false
    }
  } catch (error) {
    console.error(error)
  }

  return isValid
}
