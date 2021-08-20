/// https://github.com/leoforfree/cz-customizable/blob/master/cz-config-EXAMPLE.js
module.exports = {
  types: [
    {
      value: ":sparkles: feat",
      name: "✨ feat: 一个新功能"
    },
    {
      value: ":bug: fix",
      name: "🐛 fix: 修复一个bug"
    },
    {
      value: ":pencil: docs",
      name: "📝 docs: 更新文档"
    },
    {
      value: ":white_check_mark: test",
      name: "✅ test: 添加一些测试demo"
    },
    {
      value: ":art: improve",
      name: "🎨 improve: 改善一些特性"
    },
    {
      value: ":construction: wip",
      name: "💪 wip: 正在进行的工作"
    },
    {
      value: ":hammer: refactor",
      name: "🔨 refactor: 重构代码"
    },
    {
      value: ":pencil: chore",
      name: "🗯 chore: 一些不太重要的更改"
    },
    {
      value: ":lipstick: update",
      name: "💄 update: 更新样式或者UI"
    },
    {
      value: ":package: migrate",
      name: "📦 migrate: 更新一些包的版本"
    },
    {
      value: ":green_heart: ci",
      name: "💚 fix(ci): 修复持续构建"
    },
    {
      value: ":truck: move",
      name: "🚚 move: 调整文件或者目录"
    },
    {
      value: ":fire: prune",
      name: "🔥 remove: 删除一些屎一样的代码"
    },
    {
      value: ":bookmark: release",
      name: "🔖 release: 发布一个里程碑"
    },
    {
      value: ":rocket: build",
      name: "🚀 build: 稳定版"
    }
  ],

  scopes: [],

  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"]
}
