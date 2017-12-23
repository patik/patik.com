var patik = (function() { // jshint ignore:line
    var $body = null;
    var $preload = null;
    var queue = [];

    function _init () {
        try {
            $body = $('body');
        }
        catch (e) {
            console.error(e);
        }
    }

    function _preload(html) {
        var i;

        if (!$preload) {
            $preload = $('<div/>', {
                style: 'position:absolute;top:-9999em;left:-9999em;display:block;visibility:hidden;'
            });

            // Sometimes called before init()
            if (!$body) {
                $body = $('body');
            }

            $body.append($preload);
        }

        $preload.append(html);

        if (queue.length) {
            i = 0;

            while (i < queue.length) {
                $preload.append(queue[i]);
            }

            queue = [];
        }
    }

    return {
        init: _init,
        preload: _preload
    };
}());
