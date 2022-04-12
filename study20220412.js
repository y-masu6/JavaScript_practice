/*
 * 6.7　オブジェクトの拡張
 */ 
{
  function merge(target, ...sources) {
    for(let source of sources) {
      for(let key of Object.keys(source)){
        if(!(key in target)){
          target[key] = source[key];
        }
      }
    }
    return target;
  }
  
  console.log(Object.assign({x:1}, {x:2, y:2}, {y:3, z:3}));
  console.log(merge({x:1}, {x:2, y:2}, {y:3, z:3}));
}


/*
 * 6.8　オブジェクトのシリアライズ
 */ 
{
  let o = {x: 1, y: {z: [false, null, ""]}};
  let s = JSON.stringify(o);
  let p = JSON.parse(s);

  console.log(s);
  console.log(p);
}


/*
 * 6.9　オブジェクトのメソッド
 * 6.9.1　toString() メソッド
 */ 
{
  // デフォルトのtoString()メソッドはあまり役に立たない
  let s = {x: 1, y: 1}.toString();
  console.log(s);

  // そのため多くのクラスで独自のtoString()メソッドが定義される
  let point = {
    x: 1,
    y: 2,
    toString: function() { return `(${this.x}, ${this.y})`; }
  }
  console.log(String(point));
}


/*
 * 6.9.2　toLocaleString() メソッド
 */ 
{
  // toLocaleString()メソッドは数値や日付や時刻を地域の習慣に従って整形する
  // ObjectクラスはtoString()メソッドを呼び出す
  // Dataクラス、Numberクラスは独自のtoLocaleString()メソッドを定義している
  let point = {
    x: 1000,
    y: 2000,
    toString: function() { return `(${this.x}, ${this.y})`; },
    toLocaleString: function() {return `(${this.x.toLocaleString()}, ${this.y.toLocaleString()})`;}
  }
  console.log(point.toString());
  console.log(point.toLocaleString());
}

/*
 * 6.9.3　valueOf()メソッド
 */
{
  // デフォルトのvalueOf()メソッドは何も特殊なことはしない、一部の組み込みクラスには独自のvalueOf()メソッドを定義しているものもある
  let point = {
    x: 3,
    y: 4,
    valueOf: function() { return Math.hypot(this.x, this.y) }
  }
  console.log(Number(point));
  console.log(point > 4);
}