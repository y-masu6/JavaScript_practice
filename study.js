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