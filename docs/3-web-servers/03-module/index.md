---
title: モジュールと npm
---

import CodeBlock from '@theme/CodeBlock';
import Term from "@site/src/components/Term";
import ViewSource from "@site/src/components/ViewSource";
import Answer from "@site/src/components/Answer";
import commandsAnswerVideo from "./commands-answer.mp4";
import npmInitVideo from "./npm-init.mp4";
import npmInstallVideo from "./npm-install.mp4";

## パスとコマンド

Linux や macOS のファイルシステムは、**ルートディレクトリ**と呼ばれる特殊なディレクトリを頂点とする木構造で表現され、この木構造の中の特定の要素を一意に表現するための表記を**パス**と呼びます。パスの区切り文字は `/` で、それが単体で利用された際はルートディレクトリを表します。例えば、ルートディレクトリの中の `home` ディレクトリの中の `utcode` という名前のディレクトリは `/home/utcode` という形で表現されます。

![Linux のファイルシステム](./linux-file-system.png)

現在作業対象となっているディレクトリを**カレントディレクトリ**と呼びます。すべてのファイルやディレクトリは、ルートディレクトリを基準とした**絶対パス**で表される他、カレントディレクトリからの**相対パス**で表すことができます。例えば、カレントディレクトリが `/home/utcode` のとき、`/home/utcode/pictures/xxx.jpg` は `pictures/xxx.jpg` と表されます。

Ubuntu の場合は、標準状態でカレントディレクトリがターミナル上に表示される場合が多いです。以下の例の場合は `~/projects/sample` がカレントディレクトリです。

![カレントディレクトリの確認](./check-current-directory.png)

パスを表現するとき、カレントディレクトリは `.`、親ディレクトリは `..` という記号が利用できます。次の表は、これらの記号を用いて相対パスを表した例です。

| カレントディレクトリ | 目標のディレクトリ    | 相対パス                         |
| -------------------- | --------------------- | -------------------------------- |
| `/foo/bar`           | `/foo/bar/baz`        | `baz` 又は `./baz`               |
| `/foo/bar`           | `/foo/bar/baz/foobar` | `baz/foobar` 又は `./baz/foobar` |
| `/foo/bar/baz`       | `/foo/bar`            | `..` 又は `./..`                 |
| `/foo/bar/baz`       | `/foo`                | `../..` 又は `./../..`           |

**コマンド** を用いると、文字を用いてコンピューターに指示を与えることができます。コマンドはスペース区切りで入力し、最初の部分をコマンド名、それ以降の部分をそのコマンドの引数と呼びます。

| コマンド名   | 機能                         |
| ------------ | ---------------------------- |
| pwd          | カレントディレクトリを表示   |
| ls           | ディレクトリの中身を一覧表示 |
| cd [移動先]  | カレントディレクトリを移動   |
| mkdir [名前] | 新しいディレクトリを作成     |
| touch [名前] | 新しいファイルを作成         |

### 課題

現在 VSCode で開いているフォルダの中に、コマンドを用いて次のファイルとディレクトリの構造を作成してください。

```plain
secret
├── pictures
│   └── xxx.txt
└── videos
    ├── yyy.txt
    └── zzz.txt
```

<Answer>

カレントディレクトリを親ディレクトリに移動する場合には `cd ..` とするのがポイントです。

<video src={commandsAnswerVideo} controls />

</Answer>

## 別のファイルに書かれたプログラム

Node.js では、あるファイルに書かれたプログラムは、別のプログラムからは読み込めません。よって、次の `main.js` はエラーになります。

```javascript title=sub.js
function add(a, b) {
  return a + b;
}
```

```javascript title=main.js
console.log(add(3, 4)); // Uncaught ReferenceError: add is not defined
```

別のファイルに書かれたプログラムを読み込むための手段として、Node.js では**<Term type="javascriptModule">モジュール</Term>**という仕組みが用意されています。JavaScript では、すべてのファイルが<Term type="javascriptModule">モジュール</Term>として扱われます。

Node.js では、プログラム中で `exports` というオブジェクトが利用できます。`exports` オブジェクトは標準では空のオブジェクトですが、プログラム中から書き換えることができます。

`require` 関数に別のファイルへの相対パスを指定すると、そのファイルを実行した後にできる `exports` オブジェクトを取得できます。

```javascript title=sub.js
exports.add = (a, b) => {
  return a + b;
};
```

```javascript title=main.js
const sub = require("./sub"); // sub = { add: (a, b) => { return a + b; } }
const add = sub.add;
console.log(add(3, 4));
```

:::tip 分割代入
[**分割代入**](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) の記法を用いると、オブジェクトからプロパティを取り出して変数に代入する操作を簡潔に記述できます。この記法を使用すると、上のプログラムは次のように簡略化できます。

```javascript title=main.js
const { add } = require("./sub");
console.log(add(3, 4));
```
:::

## 標準<Term type="javascriptModule">モジュール</Term>

Node.js の [`fs` 標準モジュール](https://nodejs.org/api/fs.html) を用いると、Node.js からファイルの読み書きを行うことができます。[`fs.readFileSync` 関数](https://nodejs.org/api/fs.html#fsreadfilesyncpath-options)は、ファイルの読み込みを行う関数で、第 1 引数にファイルを指定し、第 2 引数には文字コードを指定します。

```javascript title=main.js
const fs = require("fs");
console.log(fs.readFileSync("sample.txt", "utf-8"));
```

```plain title=sample.txt
Hello World
```

:::tip 文字コード
**文字コード**とは、文字のコンピューターによる表現です。`UTF-8` や `Shift_JIS` などさまざまな方式が定義されていますが、現在では通常 `UTF-8` を選んでおけば問題ありません。間違った方式を選んでしまうと、意図と異なる文字として解釈されてしまう現象 (**文字化け**)が起こります。
:::

### 課題

[`fs.writeFileSync` 関数](https://nodejs.org/api/fs.html#fswritefilesyncfile-data-options)を用いて、ファイルに文字列を書き出してみましょう。

<ViewSource path="/docs/3-web-servers/03-module/_samples/fs-writeFileSync" noCodeSandbox />

## npm

Node.js における**パッケージ**とは、主に JavaScript ファイルをまとめていろいろな場所で利用可能にしたものです。[npm](https://docs.npmjs.com/about-npm) (Node Package Manager) は、Node.js の**パッケージマネージャー**で、このソフトウェアを通してパッケージを管理できます。

また、npm から利用されるパッケージを集積したサービス [npmjs.com](https://www.npmjs.com/) もまた、npm と呼ばれます。例として、日付や時刻の操作のために用いられる<Term type="library">ライブラリ</Term>である、[date-fns](https://www.npmjs.com/package/date-fns) パッケージを利用してみましょう。

npm を用いて開発を行うには、まず `npm init` コマンドを実行します。いくつか質問をされるので、Enter キーを押し続けて質問をスキップしましょう。完了すると、フォルダの中に `package.json` という名前のファイルが作成されます。このファイルは、npm によって管理されるフォルダに必ず 1 つ必要になるものです。

<video src={npmInitVideo} controls muted autoPlay loop />

続いて、npm のパッケージをインストールします。`npm install` に続けて、インストールしたいパッケージの名前を入力します。

```shell
npm install date-fns
```

これにより、フォルダの中に `package-lock.json` ファイルと、`node_modules` フォルダが作成され、内部にパッケージ本体がダウンロードされます。

<video src={npmInstallVideo} controls muted autoPlay loop />

:::tip JSON
npm によって作成された `package.json` とは何者でしょうか。拡張子が `.json` のファイルには、**JSON** が記述されています。JSON は、 JavaScript Object Notation の略で、複雑なデータ構造を単一の文字列として表現する際に、JavaScript オブジェクトに似た記法を用いるための仕様です。JavaScript との相性が非常に良いだけでなく、文法が単純で明快であることから、JavaScript を用いないプロジェクトでも頻繁に用いられます。

JSON は、JavaScript のオブジェクト記法よりも制限が厳しくなっています。例えば、

```js
{
  name: "田中",
  age: 18,
}
```

は、JavaScript の文法では有効ですが、JSON としては誤りです。JSON には、

- キーには必ずダブルクォーテーションをつける
- 最後のプロパティの後にはコンマをつけてはならない

という制約があります。このため、上のオブジェクトを JSON で記述するためには、

```json
{
  "name": "田中",
  "age": 18
}
```

のようにしなければなりません。
:::

## npm のパッケージを Node.js から利用する

npm でダウンロードしたパッケージは、<Term type="javascriptModule">モジュール</Term>として `require` 関数に指定できます。

```javascript
const dateFns = require("date-fns");
const { format } = dateFns;
console.log(format(new Date(), "yyyy年MM月dd日"));
```

![date-fns パッケージの利用](./use-package.png)

## 課題

1. サンプルコードの dateFns 変数の中身をデバッガで観察してみましょう。
2. [`mathjs` パッケージ](https://www.npmjs.com/package/mathjs)は、JavaScript で複雑な計算を行うためのライブラリです。このライブラリを用いて、$\log(x)$ を $x$ について微分した式を求めてください。

<ViewSource path="/docs/3-web-servers/03-module/_samples/math-js" noCodeSandbox />
