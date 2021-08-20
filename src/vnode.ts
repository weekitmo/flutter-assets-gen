import type { ParserInfo } from "./info";

export class VNode {
  info: ParserInfo;
  constructor(info: ParserInfo) {
    this.info = info;
  }
  gen() {
    return `
  /// Assets for ${this.info.identifier}
  /// ${this.info.tag}
  static const String ${this.info.identifier} = "${this.info.tag}";`;
  }
}
