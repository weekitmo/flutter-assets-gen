import * as vscode from "vscode"
import { util } from "./utils/util"
import { Find } from "./find"
import { Walk } from "./walk"
import { Watcher } from "./watch"

const pluginName = `flutter-assets-gen`
const commands = {
  watch: `${pluginName}.watch`,
  generate: `${pluginName}.generate`
}

export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(`Congratulations, your extension '${pluginName}' is now active!`)

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(commands.watch, () => {
    const rootPath = util.getWorkspace()

    try {
      new Walk(rootPath, commands.watch).start()
    } catch (error) {
      vscode.window.showErrorMessage(`[${commands.generate}] ${error}`)
    }
  })

  const genarate = vscode.commands.registerCommand(commands.generate, () => {
    const rootPath = util.getWorkspace()
    try {
      new Find(rootPath).start()
      vscode.window.showInformationMessage(`success!`)
    } catch (error) {
      vscode.window.showErrorMessage(`[${commands.generate}] ${error}`)
    }
  })

  context.subscriptions.push(disposable)
  context.subscriptions.push(genarate)
}

// this method is called when your extension is deactivated
export function deactivate() {
  console.log(`deactivate`)
  Watcher.clear()
}
