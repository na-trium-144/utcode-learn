---
title: WSLのセットアップ (Windows のみ)
---
import CodeBlock from '@theme/CodeBlock';
import Term from "@site/src/components/Term";
import ViewSource from "@site/src/components/ViewSource";
import ExternalVideoPlayer from "@site/src/components/ExternalVideoPlayer";

## Linux と WSL

現在、Web サービスを提供するコンピューターのほとんどに、**Linux** という名前の OS が搭載されています。このため、Web サービスを開発するには、Linux を用いて開発することが理想です。しかしながら、現在流通している一般的なコンピューターに搭載されている OS は、Windows または macOS です。

実は、macOS を使う場合はあまり問題になりません。これは、macOS という OS が、Linux と源流を共にしているからです。こういった理由から、macOS は Web 開発者から強く支持されています。

**WSL** は、こういった状況を覆すべく Microsoft 社によって開発された、**Windows 上で Linux を動かすための仕組み**です。WSL を用いることで、Windows の利便性を享受しつつ、Linux のパワーを活用できます。

## Windows 環境に WSL をインストールする

WSL のインストールは、10 分程度で終わる簡単な作業です。下の動画を参考に実施しましょう。

<ExternalVideoPlayer src="https://www.youtube.com/embed/aRf7NYZpUa0" />

まずは `ターミナル` アプリを管理者として実行します。

:::tip 管理者として実行
`管理者として実行` メニューを使用してアプリを起動することで、アプリは強い権限を行使できるようになります。WSL のインストールにはこのような強い権限が必要なので、起動時に特殊な操作が必要になります。
:::

![管理者として実行](run-as-administrator.png)

続いて、`wsl --install` コマンドを実行します。これにより、WSL が全自動でインストールされます。

![コマンドを打つ](type-wsl-install.png)

インストールが完了すると、自動的にコンピューターが再起動します。このとき、3 回質問を受けます。

- `Enter new UNIX username`: WSL は、普段使っている Windows とは別のコンピューターのように振る舞います。ここで指定する名前は何でも構いませんが、**英数字のみで構成された文字列**とすることを強く推奨します。
- `New password` と `Retype new password` では、上で指定したユーザーのパスワードを入力します。**入力しても画面に変化はありません**が、入力自体は行われているので気にせず入力しましょう。

![ユーザーを作成する](type-password.png)

画面に `$` 記号が表示された状態で止まったら完了です。ウィンドウを閉じても問題ありません。

![完成](completed.png)

## VSCode に `Remote - WSL` 拡張機能をインストールする

VSCode の `Remote - WSL` 拡張機能を用いると、VSCode を WSL 上で動かすことができ、Linux と同様の開発体験を得られます。まずは、`Remote - WSL` 拡張機能をインストールしましょう。

![Remote - WSL 拡張機能のインストール](./install-wsl-extension.png)

拡張機能をインストールすると、左下に緑色のボタンが出現します。クリックすると画面上部からメニューが出現するので、`New WSL Window` を選択しましょう。

![WSLに接続](./connect-to-wsl.png)

画面左下の緑色の部分に `WSL: Ubuntu` と表示されたら成功です。

![接続完了](./connected.png)

## WSL の基本的な使い方

WSL を使用するには、ターミナルで `wsl` コマンドを実行します。`PS` から始まる行に入力したコマンドは通常の Windows 環境で実行されますが、スクリーンショット右側のように、一度 `wsl` コマンドを実行すると、それ以降の入力は Linux 上で実行されます。

また、WSL で `exit` コマンドを実行すると、Windows 環境に戻ることができます。

![Linuxに入る](./go-into-linux.png)

WSL は、Windows から独立した別のコンピュータのように振舞います。WSL上にあるファイルを Windows 側から確認するには、エクスプローラーのサイドパネルに表示されている `Linux` をクリックします。

![WSL 側のファイルを Windows のエクスプローラーから表示する](./show-linux-files.png)

:::info Windows10を使っている場合の注意
Windows10では上記のようにしてもWSL上にあるファイルを確認することができません。
代わりに以下のようにします。

エクスプローラーのアドレスバーに `¥¥wsl$` と入力して、Enterキーを押します。
![WSL 側のファイルを Windows のエクスプローラーから表示する(Windows10)](./show-linux-files-windows10.png)
:::
