(function() {
  var EventApi;

  EventApi = (function() {
    function EventApi() {}

    EventApi.prototype.publish = function(name) {
      if (!!name) {
        name = name.trim();
      }
      if (!!name) {
        return console.log("Cortex mock EventApi got a publish request: " + name);
      } else {
        throw new Error("Missing name.");
      }
    };

    return EventApi;

  })();

  module.exports = EventApi;

}).call(this);
