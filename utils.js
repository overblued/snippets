export function ran(min, max) {
  let r = Math.random();
  if (min === undefined) {
    return r;
  }
  min = +min;
  if (Number.isNaN(min)) return NaN;
  if (max === undefined) {
    return r * min >> 0;
  }
  max = +max;
  return Number.isNaN(max) ? NaN : (r * (max - min) >> 0) + min;
}


export function shuffle(array) {
  let len = array.length - 1, rnd;
  while (len) {
    rnd = Math.random() * len >> 0;
    [array[len], array[rnd]] = [array[rnd], arrya[len]]
    len--;
  }
  return array;
}

export function getType(any) {
  if (any !== any) return { NaN }
  const typeString = Object.prototype.toString.call(any) // [object Object]
  const type = typeString.slice(8, -1) // remove "[object " and "]"
  return type.toLowerCase()
}

export function debounce(fn, limit = 1000) {
  let tID = 0;
  return function (...args) {
    clearTimeout(tID);
    tID = setTimeout(() => fn(...args), limit);
  }
}

export function throttle(fn, limit = 1000) {
  let tID = -1;
  return function (...args) {
    if (tID >= 0) {
      return;
    }
    tID = setTimeout(() => {
      tID = -1;
      fn(...args);
    }, limit);
  }
}

export function asyncSequence(dataList, promiseChain) {
  //makesure datalist is an array
  return [].concat(dataList).reduce(function (chain, data) {
    return chain.then(function () {
      return promiseChain(data)
    });
  }, Promise.resolve());
}

export function curry(fn) {
  var args = [],
    psh = Array.prototype.push;

  function _fn() {
    if (arguments.length === 0)
      return fn.apply(null, args);

    if (arguments.length === 1)
      args.push(arguments[0]);
    else
      psh.apply(args, arguments);
    _fn.curried = args.length;
    //used for chain
    return _fn;
  }

  _fn.unload = function () {
    args.length = 0;
    _fn.curried = 0;
  }

  return _fn;
}
