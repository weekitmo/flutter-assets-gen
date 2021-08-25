import * as path from "path"

export default {
  join: process.platform === "win32" ? path.win32.join : path.posix.join,
  normalize:
    process.platform === "win32" ? path.win32.normalize : path.posix.normalize,
  parse: process.platform === "win32" ? path.win32.parse : path.posix.parse,
  resolve:
    process.platform === "win32" ? path.win32.resolve : path.posix.resolve,
  sep: process.platform === "win32" ? path.win32.sep : path.posix.sep
}
