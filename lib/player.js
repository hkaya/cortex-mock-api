(function() {
  var PlayerApi;

  PlayerApi = (function() {
    function PlayerApi() {}

    PlayerApi.prototype.id = function() {
      return 'mock-player-id';
    };

    PlayerApi.prototype.version = function() {
      return 'mock-player-version';
    };

    PlayerApi.prototype.hasNativeVideoSupport = function() {
      return false;
    };

    PlayerApi.prototype.playVideo = function(url, onSuccess, onError) {
      return onError(new Error("This player does not have native video support."));
    };

    PlayerApi.prototype.getMimeTypes = function() {
      return ['image/png', 'image/jpeg', 'image/gif', 'video/webm', 'video/ogg'];
    };

    return PlayerApi;

  })();

  module.exports = PlayerApi;

}).call(this);
