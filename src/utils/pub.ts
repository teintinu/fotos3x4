import React from 'react';

export function createPub<T, A extends { [a: string]: Function }>(init: T, ac: (onget: () => T, update: (v: T) => void) => A) {
  let last = init
  let subs = new Set<(v: T) => void>()
  const acr = ac(() => last, dispatch)
  return {
    ...acr,
    subscribe,
    use() {
      const [v, setv] = React.useState(last)
      React.useEffect(() => subscribe(setv))
      return v
    }
  }
  function subscribe(fn: (v: T) => void): () => void {
    subs.add(fn)
    return () => subs.delete(fn)
  }
  function dispatch(v: T) {
    if (last !== v) {
      last = v
      subs.forEach((fn) => setTimeout(() => fn(v), 1))
    }
  }
}
