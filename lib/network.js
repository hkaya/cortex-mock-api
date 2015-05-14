(function() {
  var NetworkApi;

  NetworkApi = (function() {
    function NetworkApi() {}

    NetworkApi.prototype.download = function(url, opts, onSuccess, onError) {
      return onSuccess(url);
    };

    return NetworkApi;

  })();

  module.exports = NetworkApi;

}).call(this);
