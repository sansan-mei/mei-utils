import { test, expect } from 'bun:test'
import { initCallback } from '..'


test('init', () => {
  const callbackPound = initCallback()

  callbackPound(() => {
    console.log(23423235);
  })

  callbackPound(() => {
    console.log(325235235);
  })
})