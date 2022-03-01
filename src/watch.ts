/// 文件 or 文件夹
import * as chokidar from "chokidar"
import { Find } from "./find"
import { debounce } from "./utils/debounce"
import { loadConf } from "./utils/util"
import * as vscode from "vscode"

export class Watcher {
  _instance: chokidar.FSWatcher | undefined
  static _fileChokidarInstance: Watcher | undefined
  config: ReturnType<typeof loadConf>
  rootPath: string
  commandType: string
  constructor(rootPath: string, commandType: string) {
    /// 提取配置文件
    this.config = loadConf()
    this.rootPath = rootPath
    this.commandType = commandType
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
  }

  // 单例
  static getInstance(rootPath: string, commandType: string) {
    if (!this._fileChokidarInstance) {
      this._fileChokidarInstance = new Watcher(rootPath, commandType)
    }
    return this._fileChokidarInstance
  }

  static clear() {
    if (this._fileChokidarInstance) {
      this._fileChokidarInstance.stop()
    }
  }

  stop() {
    if (this._instance) {
      this._instance.removeAllListeners()
      this._instance.unwatch(this.config.assets_path)
    }
  }

  start() {
    this._instance = chokidar.watch(this.config.assets_path, {
      ignored: /(^|[\/\\])\..*$/,
      ignoreInitial: true
    })

    this._instance.on("all", this._listenable)

    this._instance.on("error", error =>
      vscode.window.showErrorMessage(`[${this.commandType}] ${error}`)
    )

    this._instance.on("ready", () => {
      // if need to trigger something
      vscode.window.showInformationMessage(`Start watch successful!`)
    })
  }

  _listenable = debounce(
    (
      event: "add" | "addDir" | "change" | "unlink" | "unlinkDir",
      path: string
    ) => {
      // console.log(`[onListen]: \n`, event, path)
      // 防抖处理只触发一次即可，重新扫描
      try {
        new Find(this.rootPath).start()
      } catch (error) {
        vscode.window.showErrorMessage(`[${this.commandType}] ${error}`)
      }
    }
  ).bind(this)
}
