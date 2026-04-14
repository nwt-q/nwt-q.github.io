# 📚 ELNB - 総合開発者ナレッジベース

<div align="center">
  
[![License](https://img.shields.io/github/license/nwt-q/nwt-q.github.io?style=flat-square&color=blue)](https://github.com/nwt-q/nwt-q.github.io/blob/main/LICENSE)
[![VitePress](https://img.shields.io/badge/VitePress-1.6.4-41b883?style=flat-square&logo=vitepress&logoColor=white)](https://vitepress.dev/)
[![Vue](https://img.shields.io/badge/Vue-3.5.22-41b883?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-8.6.10-6477D9?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io/)

[🌐 ライブデモ](https://vitepress.yiov.top/) | [📖 ドキュメント](https://vitepress.yiov.top/getting-started) | [🚀 GitHub](https://github.com/nwt-q/nwt-q.github.io)

</div>

---

## 🌟 プロジェクト概要

**ELNB** (Endless Learning & Notes Base) は、VitePress で構築された総合的な技術ナレッジベースプラットフォームで、フロントエンド開発者に体系的で構造化された知識共有・保存スペースを提供することを目的としています。

このプロジェクトは単なるシンプルなドキュメントサイトではなく、基本的なフロントエンド技術から高度なバックエンド開発まで幅広いコンテンツをカバーする完全なナレッジ管理システムです。

### ✨ コア機能

- 📝 **Markdown ベース** - おなじみの Markdown 構文を使用してコンテンツを迅速に作成・整理
- ⚡ **超高速** - 即時のサーバー起動、超高速のホットリロード、Vite エコシステムプラグインの活用
- 🎨 **モダンなテーマ** - 美しいデフォルトテーマとカスタマイズ可能な UI コンポーネント
- 🌐 **多言語対応** - 多言語ドキュメント対応（中国語、英語、日本語、韓国語など）
- 📊 **数式サポート** - 組み込みの KaTeX サポートで完璧な数学式のレンダリング
- 🔄 **フローチャートサポート** - 統合された Mermaid で簡単なプロフェッショナルなフローチャート作成
- 🎯 **コンポーネントベース** - Vue コンポーネントの埋め込み対応で高カスタマイズ性

---

## 🛠️ 技術スタック

### コアフレームワーク
- **[VitePress](https://vitepress.dev/)** - 静的サイトジェネレーター
- **[Vue 3](https://vuejs.org/)** - 渐進的 JavaScript フレームワーク
- **[Vite](https://vitejs.dev/)** - 次世代フロントエンドツール

### プラグインとツール
- **[markdown-it-katex](https://github.com/GooglingXXX/markdown-it-katex)** - 数学式レンダリング
- **[vitepress-plugin-mermaid](https://github.com/alefViggia/vitepress-plugin-mermaid)** - フローチャート描画
- **[vitepress-plugin-group-icons](https://github.com/alefViggia/vitepress-plugin-group-icons)** - アイコングループサポート
- **[markdown-it-task-checkbox](https://github.com/jgierer12/markdown-it-task-checkbox)** - タスクリスト

### 開発ツール
- **[pnpm](https://pnpm.io/)** - 高速、ディスクスペース効率的なパッケージマネージャー
- **[TypeScript](https://www.typescriptlang.org/)** - 型付き JavaScript

---

## 📖 クイックスタート

### 前提条件

- Node.js 18+ 
- pnpm 8.6.10+

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/nwt-q/nwt-q.github.io.git
cd nwt-q.github.io

# 依存関係をインストール
pnpm install

# 開発サーバーを起動
pnpm docs:dev
```

`http://localhost:5173` にアクセスしてサイトをプレビューします。

### 本番環境用ビルド

```bash
# サイトをビルド
pnpm docs:build

# ビルドをプレビュー
pnpm docs:preview
```

---

## 📚 ドキュメントコンテンツ

### 基本チュートリアル
- [始めに](https://vitepress.yiov.top/getting-started) - VitePress サイトをゼロから構築
- [設定ガイド](https://vitepress.yiov.top/configuration) - 詳細な設定ガイド
- [Markdown 構文](https://vitepress.yiov.top/markdown) - 高度な Markdown 使用法
- [コンポーネント使用法](https://vitepress.yiov.top/components) - Vue コンポーネント統合

### 技術ノート
- **フロントエンド開発**
  - [React](https://vitepress.yiov.top/react/) - React スタックノート
  - [Vue](https://vitepress.yiov.top/) - Vue エコシステム関連
  - [JavaScript](https://vitepress.yiov.top/) - JavaScript 深層理解

- **バックエンド開発**
  - [Java](https://vitepress.yiov.top/Java/) - Java 開発ノート
  - [Redis](https://vitepress.yiov.top/Redis/) - キャッシング技術
  - [PostgreSQL](https://vitepress.yiov.top/PostgreSQL/) - データベース管理
  - [RabbitMQ](https://vitepress.yiov.top/RabbitMQ/) - メッセージキュー

- **DevOps**
  - [Docker](https://vitepress.yiov.top/docker/) - コンテナ化
  - [Kubernetes](https://vitepress.yiov.top/kubernetes/) - コンテナオーケストレーション
  - [Nginx](https://vitepress.yiov.top/nginx/) - サーバー設定

- **コンピューターサイエンス**
  - [コンピューターネットワーク](https://vitepress.yiov.top/Internet/) - ネットワーク知識
  - [Linux](https://vitepress.yiov.top/Linux/) - Linux システム
  - [コンピューターアーキテクチャ](https://vitepress.yiov.top/coa/) - コンピューターアーキテクチャ

- **その他の技術**
  - [Git](https://vitepress.yiov.top/Git/) - バージョン管理
  - [Python](https://vitepress.yiov.top/Python/) - Python スクリプティング
  - [Blander](https://vitepress.yiov.top/blander/) - 3D モデリング

---

## 🎨 テーマカスタマイズ

このプロジェクトはモダンなテーマデザインを特徴としており、以下の機能を備えています:

- 🎨 **カスタムスタイル** - 美しいコードハイライトとブロックスタイル
- 🖱️ **インタラクティブコンポーネント** - マウス追従、パーティクルエフェクトなど
- 📱 **レスポンシブデザイン** - デスクトップとモバイルの完璧な対応
- 🌙 **ダークモード** - 目の負担を軽減するデフォルトのダークテーマ

---

## 🌍 多言語対応

このプロジェクトは多言語ドキュメントをサポートしています。現在対応している言語:

- 🇨🇳 [簡体字中国語](https://vitepress.yiov.top/) (デフォルト)
- 🇺🇸 [英語](https://vitepress.yiov.top/en/)
- 🇫🇷 [フランス語](https://vitepress.yiov.top/fr/)

---

## 🤝 貢献

あらゆる種類の貢献を歓迎します！誤りを見つけたり、新しい学習ノートを共有したい場合は、以下の手順に従ってください:

1. リポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを開く

### 貢献の種類

- 🐛 バグ修正
- ✨ 新機能
- 📝 ドキュメント改善
- 🎨 テーマ最適化
- 🌐 多言語翻訳

---

## 📊 サイト統計

- 📄 **ドキュメント数**: 100+ 本の技術記事
- 📚 **カテゴリ**: 15+ の技術ドメイン
- 🌐 **訪問者数**: 着実に増加中
- 🤝 **貢献者**: ご参加お待ちしています

---

## 📬 お問い合わせ

- 📧 メール: [contact@vitepress.yiov.top](mailto:contact@vitepress.yiov.top)
- 💬 コミュニティ: [Discord](https://chat.vitejs.dev/)
- 🐦 Twitter: [@vitepress](https://twitter.com/vitepress)

---

## 📄 ライセンス

このプロジェクトは [MIT ライセンス](https://github.com/nwt-q/nwt-q.github.io/blob/main/LICENSE) の下で提供されています - 詳細は LICENSE ファイルを参照してください。

---

## 🙏 謝辞

- [VitePress](https://vitepress.dev/) チームに優れたツールを提供していただき感謝します
- すべての貢献者とユーザーの継続的なサポートに感謝します
- オープンソースコミュニティの貴重なリソースに感謝します

---

<div align="center">
  
⭐️ このプロジェクトが役に立ったら、GitHub で Star をお願いします！

[![Star History Chart](https://api.star-history.com/svg?repos=nwt-q/nwt-q.github.io&type=Date)](https://star-history.com/#nwt-q/nwt-q.github.io&Date)

</div>

---

<p align="center">
  ❤️ を込めて <a href="https://github.com/nwt-q">nwt-q</a> とコミュニティによって作成
</p>
