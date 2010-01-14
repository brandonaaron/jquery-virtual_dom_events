/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Requires: jQuery 1.4+
 */
(function($) {

$.event.special.mouseremainover = {
    setup: function() {
        $.event.add(this, 'mouseenter', $.event.special.mouseremainover.handler);
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
            
            $.event.add(elem, 'mouseleave', mouseleave);
            
            function mouseleave() {
                clearTimeout(timeout);
                unbind();
            }
            
            function unbind() {
                $.event.remove(elem, 'mouseleave', mouseleave);
            }
        };
    },
    
    teardown: function() {
        $.event.remove(this, 'mouseenter', $.event.special.mouseremainover.handler);
    },
    
    handler: function(event) {
        event.type = "mouseremainover";
        $.event.handle.apply(this, arguments);
    }
};

})(jQuery);