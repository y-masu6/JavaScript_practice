/*
 *　6.10.3　プロパティ名としてのSymbol
 */
{
  const extension = Symbol("my extension symbol");

  let o = {
    [extension]: {/* このオブジェクトに保存される拡張データ */}
  }
  o[extension].x = 0; // oの他のプロパティと衝突しない

  // symbol test
  const extension2 = Symbol("my extension symbol");
  console.log(extension === extension2); // false
}


/*
 *　6.10.4　スプレッド構文
 */
{
  // JavaScriptの他の場面で「...」は他の目的で使用される
  // オブジェクトリテラルの中でのみ「...」はスプレッド構文として機能する
  // スプレッド構文は記述は簡単だが、インタプリタはかなりの処理を行うため注意が必要
  let position = {x: 0, y: 0};
  let dimensions = {width: 100, height: 75};
  let rect = {...position, ...dimensions};
  console.log(rect.x + rect.y + rect.width + rect.height);
}
{
  let o = { x: 1 };
  let p = { x: 0, ...o };
  console.log(p.x) // 後に渡された方が初期値を上書きする
  let q = { ...o, x: 2 };
  console.log(q.x); // 2
}
{
  // スプレッド構文が展開するのは独自プロパティだけである
  // 継承プロパティは展開しない
  let o = Object.create({x: 1});
  let p = {...o};
  console.log(p.x); // undefined
  
  let q = {...p, y: 2, z: 3};
  console.log(q); // {y: 2, x: 3}
}


/*
 *　6.10.5　メソッドの簡略記法
 */
{
  // 関数がオブジェクトのプロパティとして定義された場合、その関数のことをメソッドとよぶ
  // ES6よりオブジェクトリテラル構文が拡張されfunctionやコロンを省略できるようになった
  // 以下二つは同じ意味のコード
  let square = {
    area: function() { return this.side * this.side },
    side: 10
  };
  let square2 = {
    area() { return this.side * this.side },
    side:10
  };
  console.log(square.area());
  console.log(square2.area());
}
{
  // 文字列リテラルやSymbol、算出プロパティでも使用可能
  const METHOD_NSME = "m";
  const symbol = Symbol();
  let weirdMethods = {
    "method With Spaces"(x) { return x + 1; },
    [METHOD_NSME](x) { return x + 2; },
    [symbol](x) { return x + 3; }
  };
  weirdMethods["method With Spaces"](1);
  weirdMethods[METHOD_NSME](1);
  weirdMethods[symbol](1);
}

/*
 *　6.10.6　プロパティのゲッターメソッドとセッターメソッド
 */
{
  // ここまでのはデータプロパティ
  // JavaScriptはアクセサプロパティもサポートしている
  // アクセサプロパティはゲッターメソッドとセッターメソッドの両方またはどちらか一方を持つ
  // ゲッターメソッドしかない　→　読み出し専用プロパティ
  // セッターメソッドしかない　→　書き込み専用プロパティ（呼び出すとundefinedを返す）
  let o = {
    dataProp: 'value',

    // 2つの関数で定義されたアクセサプロパティ
    // 同じ名前をつける
    // これだけだと普通のと変わらない
    get accessorProp() { return this.dataProp },
    set accessorProp(value) { this.dataProp = value }
  }
}
{
  let p = {
    x: 1.0,
    y: 1.0,
    get r() { return Math.hypot(this.x, this.y); },
    set r(newvalue) {
      let oldvalue = Math.hypot(this.x, this.y);
      let ratio = newvalue/oldvalue;
      this.x *= ratio;
      this.y *= ratio;
    },
    get theta() { return Math.atan2(this.x, this.y) }
  }
  console.log(p.r);
  console.log(p.theta);

  //  アクセサプロパティも継承されるため、他のオブジェクトのプロトタイプとして使用できる
  let q = Object.create(p);
  q.x = 3, q.y = 4;
  console.log(q.r);
  console.log(q.theta);
}


/*
 *　7.1　配列の生成
 */
{
  // 配列を生成するには次のような方法がある
  const one = "配列リテラル";
  const two = "反復可能なオブジェクトに対するスプレッド構文";
  const three = "Array()コンストラクタ";
  const four = "Array.of()ファクトリメソッドと、Array.from()ファクトリメソッド";
}


/*
 *　7.1.1　配列リテラル
 */
{
  // 配列を作成するには配列リテラルを使うのが簡単
  // 角括弧[]をカンマ,で区切るだけ
  let empty = []; // 空の配列
  let misc = [ 1.1, true, "a", ]; // 様々な型の値の配列＋末尾のカンマ
  let base = 1024;
  let table = [base, base+1, base+2, base+3]; // 任意の式も記述できる

  // オブジェクトリテラルや配列リテラルも記述できる
  let b = [[1, {x: 1, y: 2}], [2, {x: 3, y: 4}]];

  // 値を記述せずカンマを連続で記述すると配列は疎になる
  let count = [1,,3];
  let undefs = [,,]; // 要素のない配列。lengthの値は2（末尾のカンマ）
}


/*
 *　7.1.2　スプレッド演算子
 */
{
  // オブジェクトのスプレッド構文的なやつ
  let a = [1, 2, 3];
  let b = [0, ...a, 4]; // 元の配列aは変更されない
  console.log(b);

  // 文字列に対して使用すると1文字ずつの配列になる
  let digits = [..."0123456789ABCDEF"];
  console.log(digits);

  // Setオブジェクトも反復可能であるため、配列から重複する要素を削除するには
  // 配列をセットに変換し、その後スプレッド演算子で配列に戻すのが簡単である
  let letters = [..."hello world"];
  console.log([...new Set(letters)]);
}


/*
 *　7.1.3　Arrayコンストラクタ
 */
{
  // Arrayコンストラクタを呼び出す方法は3種類

  // 1.　引数なしで呼び出す
  let a = new Array(); // let a = []; と同じ

  // 2.　数値を一つだけ引数として呼び出す
  let b = new Array(10); // 数値が配列の長さとなる

  // 3.　明治的に二つ以上の配列要素、または、数値以外の要素を一つだけ指定して呼び出す
  let c = new Array(5, 4, 3, 2, 1, "testing, testing"); // 指定した値が要素の配列
  console.log(c); // {5, 4, 3, 2, 1, "testing, testing"}
}


/*
 *　7.1.4　Array.of()
 */
{
  // Arrayコンストラクタは一つの数値の配列が作成できない
  // Array.of()にて解決
  console.log(Array.of());
  console.log(Array.of(10));
  console.log(Array.of(1, 2, 3));
}


/*
 *　7.1.5　Array.from()
 */
{
  // 配列をコピーする方法の一つ
  // 配列のようなオブジェクト（数値を持つlengthプロパティを持ち、プロパティ名が整数値である非配列オブジェクト）を配列にすることができる
  // 第二引数にオプションとして関数を指定することができ、コピー元のオブジェクトの要素ごとにその関数を実行する
  // map()メソッドと同じような動きをするが、配列生成時にマッピングする方がより効率的である
}


/*
 *　7.2　配列の要素の読み書き
 */
{
  // []演算子で要素を指定する
  let a = [1, 2, 3];
  console.log(a[1]); // 2
  // lengthプロパティで配列の要素数
  console.log(a.length); // 3

  // 配列は特殊なオブジェクトである
  // オブジェクトのプロパティにアクセスするときに角括弧[]を使うが、配列の要素にアクセスする角括弧[]も同じような処理を行う
  // JavaScriptは配列の数値インデックスを文字列に変換する
  // インデックスの1は文字列の"1"に変換される
  // その後その文字列をプロパティ名として処理する
  let o = {}
  o[1] = "one";
  console.log(o["1"]); // "one"

  // 配列のインデックスとオブジェクトのプロパティ名ははっきり区別する！！！！！！！！！！！

  a[-1.23] = true // "-1.23"という名前にプロパティを作成する
  a["1000"] = 0; // 配列の1001番目の要素
  a[1.000] = 1; // 配列のインデックス1と同じ
  console.log(a); // [ 1, 1, 3, <997 empty items>, 0, '-1.23': true ]

  // 配列のインデックスはオブジェクトの特殊なプロパティ
  // そのため、JavaScriptの配列には「配列の範囲外」エラーという概念はない（undefinedが読み出される）
  let b = [true, false];
  console.log(a[2]); // undefined : このインデックスに要素はない
  console.log(a[-1]); // undefined : この名前のプロパティはない
}