NetworkApi  = require './network'
PlayerApi   = require './player'
EventApi    = require './event'
ViewApi     = require './view'

class Api
  constructor: ->
    @net = new NetworkApi()
    @player = new PlayerApi()
    @event = new EventApi()
    @view = new ViewApi()

  getConfig: ->
    {}

  version: ->
    "mock-api-version"

init = ->
  if window?.Cortex?
    return

  window.Cortex = new Api()

module.exports = init()
