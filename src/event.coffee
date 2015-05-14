class EventApi
  publish: (name) ->
    if not not name
      name = name.trim()

    if not not name
      console.log "Cortex mock EventApi got a publish request: #{name}"
    else
      throw new Error "Missing name."

module.exports = EventApi
