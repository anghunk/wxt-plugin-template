# Wxt Plugin Template

基于 Wxt 构建的浏览器插件模板，提供开箱即用的工程化能力。

## 技术栈

- **前端框架**: Vue 3.5 + TypeScript
- **构建工具**: Wxt v0.20.x
- **UI 组件库**: Element Plus
- **国际化**: vue-i18n

## 功能特性

- 自动构建 Release 包
- 自动生成更新日志、版本信息
- 预设 GitHub Issues 模板
- 支持多浏览器（Chrome/Firefox）构建
- 多语言支持（中文/English）

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务
npm run dev

# 构建生产包
npm run build

# 打包 zip
npm run zip
```

## 配置

需要在 GitHub Secrets 中设置 `ACCESS_TOKEN` 用于自动发布。
