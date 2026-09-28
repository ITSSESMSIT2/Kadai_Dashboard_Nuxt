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

タスクを登録して、期限とステータスで進捗を管理する2ページ構成のアプリ。

| 画面 | できること |
| --- | --- |
| トップ（`/`） | ステータス別の件数を見る。タスク一覧ページへ移動する |
| タスク一覧（`/tasks`） | タスクの追加・ステータス変更・削除。期限切れは赤で表示 |

タスクはブラウザのメモリ上（Piniaストア）にのみ持つため、リロードすると消える。

## 課題①との差分表

| やること | 課題①（素のJS） | 課題④（Nuxt） |
| --- | --- | --- |
| 一覧の描画 | `createElement` と `innerHTML` で行を組み立てる | `v-for` でテンプレートに書く。DOM操作は書かない |
| データと画面の同期 | 配列を変えたあと `render()` を自分で呼ぶ | ストアの state を変えれば画面が追従する |
| 対象の行の特定 | イベント委譲で `closest()` から `data-task-id` を読む | `v-for` の各行が `task` を props で受け取っているので最初から分かる |
| 件数の更新 | `updateSummary()` を手動で呼ぶ | `getters` が自動で再計算する |
| ページの追加 | 用意していない（1画面のみ） | `app/pages/` にファイルを置くだけでURLが増える |
| 共通ヘッダー | HTMLに直書き | `app/layouts/default.vue` に置き、全ページで共有 |
| 状態の置き場所 | ファイル先頭のグローバル変数 | Piniaストア。更新は action 経由に限定される |

**書かなくてよくなったのは「画面を書き替える処理」**。課題①のコードの大半はDOM操作だったが、Nuxtでは state をどう持つかだけを考えればよくなった。

## 工夫した点

- **削除確認のモーダルは1つだけ置く。** 各行に持たせるとタスクの数だけ生成されるため、行からは `emit` でページに知らせ、ページ側の `<dialog>` で確認してからストアを呼ぶ
- **日付は `yyyy-MM-dd` で保持し、表示時に `yyyy/MM/dd` へ整形する。** `<input type="date">` がこの形式を要求するうえ、ゼロ埋め固定長なので期限切れの判定を文字列比較で書ける
- **idは「既存の最大値 + 1」で採番する。** 件数から採ると、途中の行を削除したあとに追加したときidが衝突する
- **ステータスの選択肢は `app/constants/status.ts` にまとめる。** 文字列を画面ごとに直書きすると、誤字を型で防げなくなる
- **集計は getters に置く。** 画面側で `filter().length` を書くと、同じ計算が複数箇所に散らばる

## 詰まった点・調べたこと

- **GitHub Pages はサブパス配信（`/Kadai_Dashboard_Nuxt/`）なので、`app.baseURL` を設定しないとアセットが404になる。** ローカルでは動くのに公開すると真っ白になるため気づきにくい。`GITHUB_REPOSITORY` からリポジトリ名を取る形にして、書き換え不要にした
- **`required` だけでは空白のみの入力を弾けない。** ブラウザは「1文字以上」としか見ないため、`trim()` してから判定する必要がある。`pattern` でも弾けるが、メッセージの文言を変えられないので `novalidate` にして自分で出すことにした
- **`const { tasks } = useTaskStore()` と書くとリアクティブでなくなる。** 分割代入で値がコピーされるため、`storeToRefs` を使う
