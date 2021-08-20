import { FileChokidar } from "./watch"
import { validateFlutterProject } from "./utils/check"
import { loadConf } from "./utils/util"

export class Walk {
  root: string
  watcher: FileChokidar | undefined
  constructor(root: string) {
    this.root = root
  }

  stop() {
    if (this.watcher) {
      this.watcher.stop()
    }
  }

  start() {
    /// 当前文件夹设置为 root 位置
    process.chdir(this.root)
    const isValid = validateFlutterProject()

    if (!isValid) return
    /// 提取配置文件
    const config = loadConf()
    console.log(config)
    // 开始监听文件变化
    this.watcher = FileChokidar.getInstance(config)
    this.watcher.start()
  }
}
