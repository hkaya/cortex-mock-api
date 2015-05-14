Scheduler = require 'cortex-scheduler'

class ViewApi
  constructor: ->
    onVideoView = (div, file, onsuccess, onerror) =>
      @_renderVideoView div, file, onsuccess, onerror

    onViewEnd = (name) =>
      @_onViewEnd name

    opts =
      maxViewDuration:      60 * 1000
      defaultViewQueueLen:  10

    @scheduler = new Scheduler opts, onVideoView, onViewEnd

  register: (view, fallback) ->
    @scheduler.register view, fallback

  setDefaultView: (sname) ->
    @scheduler.setDefaultView sname

  submitView: (sname, view, duration, callbacks) ->
    @scheduler.submitView sname, view, duration, callbacks

  submitVideo: (sname, file, callbacks) ->
    @scheduler.submitVideo sname, file, callbacks

  start: ->
    if window? and window.document?
      @scheduler.start window, window.document
    else
      throw new Error("Cortex mock api requires global window and document objects.")

  _renderVideoView: (div, file, onsuccess, onerror) ->
    video = window.document.createElement('video')
    video.setAttribute 'autoplay', true
    video.setAttribute 'muted', true
    video.style.width = '100%'
    video.style.height = '100%'

    source = window.document.createElement('source')
    source.setAttribute 'src', file
    source.addEventListener 'error', (e) ->
      console.warn "Video player got an error. e=#{e?.message}"
      onerror e
    video.appendChild source

    video.addEventListener 'ended', onsuccess

    video.addEventListener 'stalled', (e) ->
      console.warn "Video player is stalled. e=#{e?.message}"
      onerror e

    video.addEventListener 'play', ->
      console.debug "Started to play video #{file}"

    div.appendChild video

  _onViewEnd: (sname) ->
    console.debug "View ended. #{sname}"

module.exports = ViewApi
