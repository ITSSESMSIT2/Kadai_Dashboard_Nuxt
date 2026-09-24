# Kadai_Dashboard_Nuxt（提出課題④ 進捗管理ボード / Nuxt版）

タスクを登録して、期限とステータスで進捗を管理するアプリ。
提出課題①（素のJavaScript）と同じ題材を、Nuxtで作り直す。

## 技術スタック

| 種別 | 使用技術 |
| --- | --- |
| フレームワーク | Nuxt 4（`ssr: false` / 実PJT準拠） |
| UI | Vue 3（Composition API / `<script setup>`） |
| 言語 | TypeScript |
| 状態管理 | Pinia（`@pinia/nuxt`） |
| Node | 24.20.0（`.node-version` / `.nvmrc` で固定） |
| 公開 | GitHub Pages（main へのマージで GitHub Actions が自動デプロイ） |

## セットアップ

```bash
nvm use        # .nvmrc の 24.20.0 に切り替える
yarn install
```

## 開発コマンド

| コマンド | 内容 |
| --- | --- |
| `yarn dev` | 開発サーバーを起動する |
| `yarn generate` | 静的ビルド（GitHub Pages に公開されるものと同じ） |
| `yarn preview` | ビルド結果をローカルで確認する |

## リポジトリ構成

```
.github/workflows/deploy.yml  main へのpushでビルドしGitHub Pagesへ公開
app/
  assets/styles/tokens.css    デザイントークン（色・余白・角丸・影）
  pages/                      ページ。ファイル名がそのままURLになる
nuxt.config.ts                ssr:false / Pinia / baseURL などの設定
public/                       静的ファイル（ビルドされずそのまま配信される）
```

## スタイルの決まり

- 色・余白・角丸・影は `app/assets/styles/tokens.css` のCSS変数を `var(--…)` で参照する。値を直書きしない
- コンポーネントのスタイルは `<style scoped>` に閉じる

## 公開フロー

main にマージされると `.github/workflows/deploy.yml` が動き、`yarn generate` の出力（`.output/public`）が GitHub Pages に公開される。
サブパス配信のため `nuxt.config.ts` の `app.baseURL` をリポジトリ名から自動で決めている。

## 機能概要

<!-- TODO: 何ができるアプリか、画面と操作を書く -->

## 課題①との差分表

<!-- TODO: 素のJSでは自分で書いていたのに、Nuxtでは書かなくてよくなった処理を書く -->

## 工夫した点

<!-- TODO: 設計上の判断や、なぜその書き方にしたかを書く -->

## 詰まった点・調べたこと

<!-- TODO: つまずいた箇所と、どう調べて解決したかを書く -->
