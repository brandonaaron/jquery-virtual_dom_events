/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Requires: jQuery 1.4+
 */
(function($) {

$.event.special.mouseremainout = {
    setup: function() {
        $.event.add(this, 'mouseleave', $.event.special.mouseremainout.handler);
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
            
            $.event.add(elem, 'mouseenter', mouseenter);
            
            function mouseenter() {
                clearTimeout(timeout);
                unbind();
            }
            
            function unbind() {
                $.event.remove(elem, 'mouseenter', mouseenter);
            }
        };
    },
    
    teardown: function() {
        $.event.remove(this, 'mouseleave', $.event.special.mouseremainout.handler);
    },
    
    handler: function(event) {
        event.type = "mouseremainout";
        $.event.handle.apply(this, arguments);
    }
};

})(jQuery);