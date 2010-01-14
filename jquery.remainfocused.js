/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Requires: jQuery 1.4+
 */
(function($) {

$.event.special.remainfocused = {
    setup: function() {
        $.event.add(this, 'focus', $.event.special.remainfocused.handler);
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
            
            $.event.add(elem, 'blur', blur);
            
            function blur() {
                clearTimeout(timeout);
                unbind();
            }
            
            function unbind() {
                $.event.remove(elem, 'blur', blur);
            }
        };
    },
    
    teardown: function() {
        $.event.remove(this, 'focus', $.event.special.remainfocused.handler);
    },
    
    handler: function(event) {
        event.type = "remainfocused";
        $.event.handle.apply(this, arguments);
    }
};

})(jQuery);