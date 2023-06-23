// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app.js'

describe('popular-trends service', () => {
  it('registered the service', () => {
    const service = app.service('popular-trends')

    assert.ok(service, 'Registered the service')
  })
})
