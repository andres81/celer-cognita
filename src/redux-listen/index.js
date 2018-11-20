/*
 * Copyright 2018 André Schepers
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const REDUX_LISTEN_RESOLVE = 'REDUX_LISTEN_RESOLVE'

module.exports = function createReduxListen() {
  let listeners = []
  let pendingCount = 0

  function getListeners() {
    return listeners
  }

  function isPending() {
    return pendingCount > 0
  }

  function addListener(type, fn) {
    listeners.push({ fn, type, isRegExp: type instanceof RegExp })
    return fn
  }

  function addListeners(obj) {
    Object.keys(obj).map(type => addListener(type, obj[type]))
    return obj
  }

  function removeListeners({ type, fn } = {}) {
    listeners = listeners.filter(
      _ => (type && _.type !== type) || (fn && _.fn !== fn)
    )
    return listeners
  }

  function decrementPendingCount(dispatch) {
    let called = false
    return () => {
      if (called) return pendingCount
      called = true
      pendingCount -= 1
      if (pendingCount <= 0) {
        pendingCount = 0
        dispatch({ type: REDUX_LISTEN_RESOLVE })
      }
      return pendingCount
    }
  }

  const middleware = store => next => action => {
    const result = next(action)
    try {
      const { getState, dispatch } = store
      const matches = listeners.filter(
        ({ type, isRegExp }) =>
          type === '*' ||
          (isRegExp ? action.type.match(type) : type === action.type)
      )
      pendingCount += matches.filter(({ fn }) => fn.length > 1).length
      matches.map(({ fn }) =>
        fn(
          { getState, action, dispatch },
          fn.length > 1 && decrementPendingCount(dispatch)
        )
      )
    } catch (e) {
      console.error(e) // eslint-disable-line no-console
    }
    return result
  }

  return {
    getListeners,
    isPending,
    addListener,
    addListeners,
    removeListeners,
    decrementPendingCount,
    middleware,
  }
}
