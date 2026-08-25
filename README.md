# すうじのぼうけん｜ファンタジーバトル

小学校1年生向けの数の学習を、ファンタジー世界の冒険とバトルで学ぶGitHub Pages教材です。

## 学習内容

1〜10の数、10の合成、数の分解、たし算、ひき算、文章問題。

## 学習サイクル

学習 → バトル → 誤答記録 → 特訓 → 再挑戦。問題数を減らさず、誤答は問題単位でlocalStorageに保存します。

## 実装方針

- HTML / CSS / JavaScriptのみ
- 外部API・データベース・サーバー・APIキーなし
- localStorage保存（schemaVersion: 2）
- BGMなし、短い効果音のみ
- `navi-character-` の実在するWeb版ファンタジー素材と、`edu-assets` の実在するWebバッジを参照
- 学習問題、正誤、進行、演出を分離し、同じ構造を他教材にも展開できる形にする

## 公開ページ

https://tt-sensei.github.io/1nensasuuworld/
