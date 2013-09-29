/* Author: Craig Patik */

var patik = (function() {
    var $body = null,
        $preload = null,
        queue = [];

    function _init () {
        try {
            $body = $('body');

            setTimeout(function() {
                _preload('');
            }, 1500);
        }
        catch (e) {
            console.log(e);
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
