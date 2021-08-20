import * as glob from "glob";
import { CtorAssetFileInfo, sortAssets } from "./info";
import type { ParserInfo } from "./info";
import { outputCode } from "./output";
import * as path from "path";
import { validateFlutterProject } from "./utils/check";
import { loadConf } from "./utils/util";

export class Find {
  rootPath: string;
  constructor(rootPath: string) {
    this.rootPath = rootPath;
  }

  start() {
    process.chdir(this.rootPath);

    const isValid = validateFlutterProject();

    if (!isValid) return;

    const conf = loadConf();
    if (!conf.output_path || !conf.assets_path) {
      console.warn(`error in pubspec config`);
      return;
    }

    let normalizeFile: ParserInfo[] = [];
    conf.assets_path
      .map((item) => path.join(this.rootPath, item))
      .forEach((partern) => {
        const files = glob.sync(partern.replace(/\\/g, "/") + `/**/*`);
        // 过滤文件夹
        files
          .filter((file) => {
            return path.parse(file).ext !== "";
          })
          .forEach((filePath) => {
            const info = new CtorAssetFileInfo(filePath, this.rootPath);
            const p = info.parserPath();
            if (p) {
              normalizeFile.push(p);
            }
          });
      });

    normalizeFile = sortAssets(normalizeFile);

    console.log(normalizeFile);

    outputCode(normalizeFile, conf.output_path, conf.filename);
  }
}
