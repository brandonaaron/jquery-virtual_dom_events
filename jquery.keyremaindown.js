/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Requires: jQuery 1.4+
 */
(function($) {

var fired, timer;

$.event.special.keyremaindown = {
    setup: function() {
        $.event.add(this, 'keypress', $.event.special.keyremaindown.handler);
    },
    
    add: function(handler, data, namespaces) {
        var elem  = this, timeout,
            delay = data && data.delay || 500;
        
        return function() {
            var context = this, args = arguments,
                timeout = setTimeout(function() {
                    handler.apply(context, args);
                    unbind();
                }, delay);
            
            $.event.add(elem, 'keyup', keyup);
            
            function keyup() {
                clearTimeout(timeout);
                unbind();
            }
            
            function unbind() {
                $.event.remove(elem, 'keyup', keyup);
            }
        };
    },
    
    teardown: function() {
        $.event.remove(this, 'keypress', $.event.special.keyremaindown.handler);
    },
    
    handler: function(event) {
        if (!fired) {
            event.type = "keyremaindown";
            $.event.handle.apply(this, arguments);
            fired = true;
        } else {
            clearTimeout(timer);
            timer = setTimeout(function() {
                fired = false;
            }, 250);
        }
    }
};

})(jQuery);