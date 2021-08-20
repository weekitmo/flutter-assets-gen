/// 文件 or 文件夹
import * as chokidar from "chokidar"
import { VNode } from "./vnode"
import { debounce } from "./utils/debounce"

export interface WatchOption {
  assets_path: string[]
  output_path: string
  pubspec: string
  packageName?: string
}

export class FileChokidar {
  config: WatchOption
  infos: any
  _instance: chokidar.FSWatcher | undefined
  static _fileChokidarInstance: FileChokidar | undefined
  constructor(config: WatchOption) {
    this.config = config
    this.infos = {}

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
  }

  // 单例
  static getInstance(config: WatchOption) {
    if (!this._fileChokidarInstance) {
      this._fileChokidarInstance = new FileChokidar(config)
    }
    return this._fileChokidarInstance
  }

  static clear() {
    if (this._fileChokidarInstance) {
      this._fileChokidarInstance.stop()
    }
  }

  stop() {
    console.log(`stop`)
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

    this._instance.on("ready", () => {
      // if need to trigger something
      console.log(`chokidar ready to watch`)
    })
  }

  _listenable = debounce(
    (
      event: "add" | "addDir" | "change" | "unlink" | "unlinkDir",
      path: string
    ) => {
      console.log(`[onListen]: \n`, event, path)
    }
  ).bind(this)
}
