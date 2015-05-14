class PlayerApi
  id: ->
    'mock-player-id'

  version: ->
    'mock-player-version'

  hasNativeVideoSupport: ->
    false

  playVideo: (url, onSuccess, onError) ->
    onError new Error("This player does not have native video support.")

  getMimeTypes: ->
    ['image/png', 'image/jpeg', 'image/gif', 'video/webm', 'video/ogg']

module.exports = PlayerApi
