/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Requires: jQuery 1.4+
 */
(function($) {

$.event.special.remainblurred = {
    setup: function() {
        $.event.add(this, 'blur', $.event.special.remainblurred.handler);
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
            
            $.event.add(elem, 'focus', focus);
            
            function focus() {
                clearTimeout(timeout);
                unbind();
            }
            
            function unbind() {
                $.event.remove(elem, 'focus', focus);
            }
        };
    },
    
    teardown: function() {
        $.event.remove(this, 'blur', $.event.special.remainblurred.handler);
    },
    
    handler: function(event) {
        event.type = "remainblurred";
        $.event.handle.apply(this, arguments);
    }
};

})(jQuery);