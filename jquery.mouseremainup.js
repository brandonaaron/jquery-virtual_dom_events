/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Requires: jQuery 1.4+
 */
(function($) {

$.event.special.mouseremainup = {
    setup: function() {
        $.event.add(this, 'mouseup', $.event.special.mouseremainup.handler);
    },
    
    add: function(handler, data, namespaces) {
        var elem  = this,
            delay = data && data.delay || 500;
        
        return function() {
            var context = this, args = arguments,
                timeout = setTimeout(function() {
                    handler.apply(context, args);
                    unbind();
                }, delay);
            
            $.event.add(elem, 'mousedown', mousedown);
            
            function mousedown() {
                clearTimeout(timeout);
                unbind();
            }
            
            function unbind() {
                $.event.remove(elem, 'mousedown', mousedown);
            }
        };
    },
    
    teardown: function() {
        $.event.remove(this, 'mouseup', $.event.special.mouseremainup.handler);
    },
    
    handler: function(event) {
        event.type = "mouseremainup";
        $.event.handle.apply(this, arguments);
    }
};

})(jQuery);