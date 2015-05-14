(function() {
  var Api, EventApi, NetworkApi, PlayerApi, ViewApi, init;

  NetworkApi = require('./network');

  PlayerApi = require('./player');

  EventApi = require('./event');

  ViewApi = require('./view');

  Api = (function() {
    function Api() {
      this.net = new NetworkApi();
      this.player = new PlayerApi();
      this.event = new EventApi();
      this.view = new ViewApi();
    }

    Api.prototype.getConfig = function() {
      return {};
    };

    Api.prototype.version = function() {
      return "mock-api-version";
    };

    return Api;

  })();

  init = function() {
    if ((typeof window !== "undefined" && window !== null ? window.Cortex : void 0) != null) {
      return;
    }
    return window.Cortex = new Api();
  };

  module.exports = init();

}).call(this);
