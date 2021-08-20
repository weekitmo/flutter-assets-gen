import { Watcher } from "./watch"
import { validateFlutterProject } from "./utils/check"

export class Walk {
  root: string
  commandType: string
  watcher: Watcher | undefined
  constructor(root: string, commandType: string) {
    this.root = root
    this.commandType = commandType
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

    // 开始监听文件变化
    this.watcher = Watcher.getInstance(this.root, this.commandType)
    this.watcher.start()
  }
}
