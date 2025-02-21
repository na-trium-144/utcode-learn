---
title: プロジェクト
---

import Term from "@site/src/components/Term";
import ViewSource from "@site/src/components/ViewSource";
import omikujiVideo from "./omikuji.mp4";
import stopwatchVideo from "./stopwatch.mp4";

これまで学んできた知識を利用して、はじめての Web アプリケーション作りに挑戦してみましょう。題材が思いつかない場合は、下の例を参考にしてみてください。

## おみくじ

今日の運勢をランダムで表示するアプリです。

### ルール

- 20%の確率で `大吉` と表示し、文字色を赤色にします
- 50%の確率で `吉` と表示し、文字色を黒色にします
- 30%の確率で `凶` と表示し、文字色を青色にします

<video src={omikujiVideo} controls />

### ヒント

- `Math.random` <Term type="javascriptFunction">関数</Term>は、呼び出すたびに変わる 0 以上 1 未満の一様乱数を<Term type="javascriptReturn">返し</Term>ます。

```javascript
document.write(Math.random()); // 0.8924949384481442
```

- 発生させた乱数を<Term type="javascriptVariable">変数</Term>に保存しておきましょう。この乱数は `[0, 1)` の一様分布に従うので、例えば `[0, 0.2)` に含まれる確率は 20% になります。

```javascript
let r = Math.random();
if (r < 0.2) {
  // 20%の確率で実行される
} else if (条件式2) {
  // 50%の確率で実行される
} else {
  // 30%の確率で実行される
}
```

- クリックするためのボタンと、テキストを表示して色を変えるための `div` <Term type="element">要素</Term>の両方を <Term type="javascript">JavaScript</Term> から取得してみましょう。

```html title="index.html"
<button id="omikuji-button" type="button">おみくじを引く</button>
<div id="result"></div>
```

```javascript title="script.js"
let omikujiButton = document.getElementById("omikuji-button");
let result = document.getElementById("result");

function omikuji() {
  result.textContent = "結果";
}
omikujiButton.onclick = omikuji;
```

### 解答例

<ViewSource path="/docs/1-trial-session/13-project/_samples/omikuji" />

## ストップウォッチ

シンプルなストップウォッチです。おみくじの課題より難易度が高いです。

### ルール

- `スタート` ボタンをクリックすると、時刻の数え上げが開始されます
- 1 秒ごとに表示される数値が更新されます

<video src={stopwatchVideo} controls />

### ヒント

- `setInterval` <Term type="javascriptFunction">関数</Term>は<Term type="javascriptParameter">引数</Term>をふたつ (`func`, `delay`)とり、`func` は<Term type="javascriptValue">値</Term>としての<Term type="javascriptFunction">関数</Term>、`delay` は整数です。`setInterval` は、 `func` に指定された<Term type="javascriptFunction">関数</Term>を `delay` ミリ秒の間隔で定期的に実行します。

```javascript
function greet() {
  document.write("<p>Hello World</p>");
}

setInterval(greet, 1000);
```

このコードを実行すると、1 秒ずつ画面に `<p>Hello World</p>` が書き加えられていきます。

- ボタン<Term type="element">要素</Term>がクリックされたら `setInterval` <Term type="javascriptFunction">関数</Term>を実行し、タイマーを開始しましょう。

```javascript
function start() {
  setInterval(関数名, 1000);
}

let startButton = document.getElementById("start-button");
startButton.onclick = start;
```

- 時刻は常に <Term type="javascript">JavaScript</Term> の<Term type="javascriptVariable">変数</Term>として保持しておくと扱いやすくなります。

```javascript
let time = 0;

function tick() {
  time = time + 1;
}
```

- (発展) ストップボタンを作りたい場合は、 `setInterval` <Term type="javascriptFunction">関数</Term>の<Term type="javascriptReturnValue">戻り値</Term>を利用しましょう。 `setInterval` の<Term type="javascriptReturnValue">戻り値</Term>は整数で、`clearInterval` にこの<Term type="javascriptValue">値</Term>を<Term type="javascriptPass">渡す</Term>と、動作中のタイマーを解除することができます。

```javascript
let timerId;

function start() {
  timerId = setInterval(関数名, 1000);
}

function stop() {
  clearInterval(timerId);
}

let startButton = document.getElementById("start-button");
let stopButton = document.getElementById("stop-button");
startButton.onclick = start;
stopButton.onclick = stop;
```

### 解答例

<ViewSource path="/docs/1-trial-session/13-project/_samples/stopwatch" />
