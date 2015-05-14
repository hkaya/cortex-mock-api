(function() {
  var Scheduler, ViewApi;

  Scheduler = require('cortex-scheduler');

  ViewApi = (function() {
    function ViewApi() {
      var onVideoView, onViewEnd, opts;
      onVideoView = (function(_this) {
        return function(div, file, onsuccess, onerror) {
          return _this._renderVideoView(div, file, onsuccess, onerror);
        };
      })(this);
      onViewEnd = (function(_this) {
        return function(name) {
          return _this._onViewEnd(name);
        };
      })(this);
      opts = {
        maxViewDuration: 60 * 1000,
        defaultViewQueueLen: 10
      };
      this.scheduler = new Scheduler(opts, onVideoView, onViewEnd);
    }

    ViewApi.prototype.register = function(view, fallback) {
      return this.scheduler.register(view, fallback);
    };

    ViewApi.prototype.setDefaultView = function(sname) {
      return this.scheduler.setDefaultView(sname);
    };

    ViewApi.prototype.submitView = function(sname, view, duration, callbacks) {
      return this.scheduler.submitView(sname, view, duration, callbacks);
    };

    ViewApi.prototype.submitVideo = function(sname, file, callbacks) {
      return this.scheduler.submitVideo(sname, file, callbacks);
    };

    ViewApi.prototype.start = function() {
      if ((typeof window !== "undefined" && window !== null) && (window.document != null)) {
        return this.scheduler.start(window, window.document);
      } else {
        throw new Error("Cortex mock api requires global window and document objects.");
      }
    };

    ViewApi.prototype._renderVideoView = function(div, file, onsuccess, onerror) {
      var source, video;
      video = window.document.createElement('video');
      video.setAttribute('autoplay', true);
      video.setAttribute('muted', true);
      video.style.width = '100%';
      video.style.height = '100%';
      source = window.document.createElement('source');
      source.setAttribute('src', file);
      source.addEventListener('error', function(e) {
        console.warn("Video player got an error. e=" + (e != null ? e.message : void 0));
        return onerror(e);
      });
      video.appendChild(source);
      video.addEventListener('ended', onsuccess);
      video.addEventListener('stalled', function(e) {
        console.warn("Video player is stalled. e=" + (e != null ? e.message : void 0));
        return onerror(e);
      });
      video.addEventListener('play', function() {
        return console.debug("Started to play video " + file);
      });
      return div.appendChild(video);
    };

    ViewApi.prototype._onViewEnd = function(sname) {
      return console.debug("View ended. " + sname);
    };

    return ViewApi;

  })();

  module.exports = ViewApi;

}).call(this);
