function App () {
    this.binds = {
        onMouseEnter: this.onMouseEnter.bind(this),
        onMouseLeave: this.onMouseLeave.bind(this),
        onInputEnterKey: this.onInputEnterKey.bind(this)
    }
    this.initialLoad = true;
    this.init();
}
App.prototype.init = function () {
    console.info('hello');
    $(document).on('mouseenter', this.binds.onMouseEnter);
    $(document).on('mouseleave', this.binds.onMouseLeave);
    $(document).on('keydown', '[app-action=onInputEnterKey]', this.binds.onInputEnterKey);
};
App.prototype.onMouseEnter = function () {
    $('#bar').addClass('open');
};
App.prototype.onMouseLeave = function () {
    if (this.initialLoad)
        return;
    $('#bar').removeClass('open');
};
App.prototype.playVideo = function (id) {
    this.initialLoad = false;
    $('#box').empty().append('<iframe src="https://www.youtube.com/embed/' + id + '?rel=0&amp;showinfo=0&amp;autoplay=1&amp;modestbranding=1&amp;disablekb=1&amp;fs=0" frameborder="0" allowfullscreen></iframe>')
};
App.prototype.onInputEnterKey = function (e) {
    if (e.keyCode == 13) {
        var input = $('#in').val();
        this.submit(this.parseYoutubeUrl(input));
    }
};
App.prototype.submit = function (id) {
    this.playVideo(id);
};
App.prototype.parseYoutubeUrl = function (input) {
    if (input.indexOf('https://') == -1 && input.indexOf('http://') == -1) {
        return input;
    } else {
        var ytRegex = /^.*(youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/;
        var match = input.match(ytRegex);
        if (match && match[2]) {
            return match[2];
        }
    }
};
App.prototype.testYoutubeUrl = function () {
    var urls = [
    'http://www.youtube.com/user/Scobleizer#p/u/1/1p3vcRhsYGo',
    'http://www.youtube.com/watch?v=cKZDdG9FTKY&feature=channel',
    'http://www.youtube.com/watch?v=yZ-K7nCVnBI&playnext_from=TL&videos=osPknwzXEas&feature=sub',
    'http://www.youtube.com/ytscreeningroom?v=NRHVzbJVx8I',
    'http://www.youtube.com/user/SilkRoadTheatre#p/a/u/2/6dwqZw0j_jY',
    'http://youtu.be/6dwqZw0j_jY',
    'http://www.youtube.com/watch?v=6dwqZw0j_jY&feature=youtu.be',
    'http://youtu.be/afa-5HQHiAs',
    'http://www.youtube.com/user/Scobleizer#p/u/1/1p3vcRhsYGo?rel=0',
    'http://www.youtube.com/watch?v=cKZDdG9FTKY&feature=channel',
    'http://www.youtube.com/watch?v=yZ-K7nCVnBI&playnext_from=TL&videos=osPknwzXEas&feature=sub',
    'http://www.youtube.com/ytscreeningroom?v=NRHVzbJVx8I',
    'http://www.youtube.com/embed/nas1rJpm7wY?rel=0',
    'http://www.youtube.com/watch?v=peFZbP64dsU',
    'http://youtube.com/v/dQw4w9WgXcQ?feature=youtube_gdata_player',
    'http://youtube.com/vi/dQw4w9WgXcQ?feature=youtube_gdata_player',
    'http://youtube.com/?v=dQw4w9WgXcQ&feature=youtube_gdata_player',
    'http://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtube_gdata_player',
    'http://youtube.com/?vi=dQw4w9WgXcQ&feature=youtube_gdata_player',
    'http://youtube.com/watch?v=dQw4w9WgXcQ&feature=youtube_gdata_player',
    'http://youtube.com/watch?vi=dQw4w9WgXcQ&feature=youtube_gdata_player',
    'http://youtu.be/dQw4w9WgXcQ?feature=youtube_gdata_player'
    ];
    var success = true;
    for (var i = 0; i < urls.length; i++) {
        var id = this.parseYoutubeUrl(urls[i]);
        if (typeof id != 'string' || id.length != 11) {
            success = false;
            console.log('test on ' + urls[i] + 'failed');
            break;
        }
    }
    return success;
}
window.app = new App();
