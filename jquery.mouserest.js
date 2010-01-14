/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Requires: jQuery 1.4+
 */
(function($) {

$.event.special.mouserest = {
    setup: function() {
        $.event.add(this, 'mouseenter', $.event.special.mouserest.handler);
    },
    
    add: function(handler, data, namespaces) {
        var elem  = this,
            delay = data && data.delay || 500;
        
        return function() {
            var context = this, args = arguments, timeout;
            
            $.event.add(elem, 'mousemove', mousemove);
            $.event.add(elem, 'mouseleave', mouseleave);
            
            function mousemove() {
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    handler.apply(context, args);
                    unbind();
                }, delay);
            }
            
            function mouseleave() {
                clearTimeout(timeout);
                unbind();
            }
            
            function unbind() {
                $.event.remove(elem, 'mouseleave', mouseleave);
                $.event.remove(elem, 'mousemove', mousemove);
            }
        };
    },
    
    teardown: function() {
        $.event.remove(this, 'mouseenter', $.event.special.mouserest.handler);
    },
    
    handler: function(event) {
        event.type = "mouserest";
        $.event.handle.apply(this, arguments);
    }
};

})(jQuery);