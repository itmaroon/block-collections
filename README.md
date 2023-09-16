# BLOCK COLLECTIONS

## 概要
このリポジトリはBlock CollectionsというWordpressのプラグインのソースコードを含んでいます。
zipファイルをダウンロードしてWordpress管理画面からプラグインのインストールを行うとプラグインとして機能します。
このプラグインをインストールすると次の７つのブロックが登録され、ブロックエディタだけでなく、サイトエディタでも使用することができます（WordPress6.3で動作確認済み）。各ブロックは原則として文字色、背景色、境界、空白等の基本的スタイルが設定できる他、影やアイコンを設定することができるものもあります。また、簡単なアニメーションをセットしたものもあります。
以下各ブロックの簡単な説明です。
１　Design Title
HTMLのヘディングタグをスタイリングすることができるブロックです。ノーマルスタイルの他、円形のマーカーを入れることができるタイプとサブコピーとアイコンを付加できるタイプのものを用意しました。
２　Design Text Control
HTMLのinput要素のテキストコントロールとテキストエリアコントロールをスタイリングできるブロックです。今回はノーマルなボックスタイプとラインタイプをご用意しました。必須入力の表示もできるようになっており、近日公開予定のGuest Contact Blockのインナーブロックとしてバリデーションチェックができるブロックになっています。
３　Design CheckBox
HTMLのinput要素のチェックボックスをスタイリングできるブロックです。アニメーションでチェックが入ります。現時点では１種類しかご用意できていませんが、今後、順次他のバリエーションを提供していく予定です。
４　Design Select
HTMLのSELECT要素をスタイリングできるブロックです。選択要素がちょっと凝ったアニメーションで動くのが自慢です。単数選択と複数選択に対応しています。
５　Design Process
フォーム入力の入力プロセスを表示するためのブロックです。近日公開予定のGuest Contact Blockのインナーブロックとして活用することを前提としており、このブロックは単独では動作しません。
６　Code HighLight
編集モードでテキストエリアにコードを入力し、それをフロントエンドでハイライト表示させるブロックです。このブロックはハイライト表示のためGoogle Code Prettifyライブラリを利用しています。
7　Draggble Box
他のブロックとは違い、インナーブロックをセットして使用します。セットしたブロックはドラッグで配置を変更することができます。画像ブロックなどを入れれば、配置をずらすスタイリングが可能になります。

## 留意事項
このハイライト機能を実現するため、「Google Code Prettify」プラグインを利用しています。したがって、プラグインを利用する場合は、次のドキュメント等をお読みください。
	[Google Code Prettify](https://github.com/googlearchive/code-prettify)
