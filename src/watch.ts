/// 文件 or 文件夹
import * as chokidar from "chokidar";
import { VNode } from "./vnode";
import { debounce } from "./utils/debounce";

export interface WatchOption {
  assets_path: string[];
  output_path: string;
  pubspec: string;
  packageName?: string;
}

export class FileChokidar {
  config: WatchOption;
  infos: any;
  _instance: chokidar.FSWatcher | undefined;
  static _fileChokidarInstance: FileChokidar | undefined;
  constructor(config: WatchOption) {
    this.config = config;
    this.infos = {};

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this._addFile = this._addFile.bind(this);
    this._removeFile = this._removeFile.bind(this);
    this._changeFile = this._changeFile.bind(this);
  }

  // 单例
  static getInstance(config: WatchOption) {
    if (!this._fileChokidarInstance) {
      this._fileChokidarInstance = new FileChokidar(config);
    }
    return this._fileChokidarInstance;
  }

  static clear() {
    if (this._fileChokidarInstance) {
      this._fileChokidarInstance.stop();
    }
  }

  stop() {
    console.log(`停止`);
    if (this._instance) {
      this._instance.removeAllListeners()
      this._instance.unwatch(this.config.assets_path);
    }
  }

  start() {
    console.log(`开启监听`);
    this._instance = chokidar.watch(this.config.assets_path, {
      ignored: /(^|[\/\\])\..*$/,
      ignoreInitial: true,
    });

    this._instance.on("add", this._addFile);

    this._instance.on("ready", () => {
      console.log(`chokidar ready`);
    });

    this._instance.on("unlink", this._removeFile);

    this._instance.on("change", this._changeFile);
  }

  _addFile = debounce((path: string) => {
    console.log(`[AddFile]: \n`, path);
  }).bind(this);

  _changeFile = debounce((path: string) => {
    console.log(`[ChangeFile]: \n`, path);
  }).bind(this);

  _removeFile = debounce((path: string) => {
    console.log(`[RemoveFile]: \n`, path);
  }).bind(this);
}
