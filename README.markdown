# Virtual DOM Events

A collection of virtual DOM events inspired by the [work done by Chris Vanrensburg for Uize](http://www.uize.com/examples/virtual-dom-events.html). These events use the new special events hooks found in jQuery 1.4.

The collection includes the following events:

 * **`mouserest`** - Fires once the mouse comes to a complete stop on top of an element for a specified number of milliseconds (defaults to 500ms).
 
 * **`mouseremainover`** - Fires once the mouse remains over (mouse can continue moving) an element for a specified number of milliseconds (defaults to 500ms).
 
 * **`mouseremainup`** - Fires once the mouse has been down, up and remains up for a specified number of milliseconds (defaults to 500ms).
 
 * **`mouseremaindown`** - Fires once the mouse has been down and remains down for a specified number of milliseconds (defaults to 500ms).
 
 * **`mouseremainout`** - Fires once the mouse has been over, off and remains off an element for a specified number of milliseconds (defaults to 500ms).
 
 * **`keyremaindown`** - Fires when a key remains down for a specified number of milliseconds (defaults to 500ms).
 
 * **`keyremainup`** - Fires when a key has been down, up and remains up for a specified number of milliseconds (defaults to 500ms).
 
 * **`remainfocused`** - Fires when an element remains focused for a specified number of milliseconds (defaults to 500ms).
 
 * **`remainblurred`** - Fires when an element is focused, blurred and remains blurred for a specified number of milliseconds (defaults to 500ms).
 
Each of the events has an optional setting called `delay` and it defaults to 500 milliseconds.

Each event is broken out into its own file for easier inclusion of only what you need.

## Example

Here is how to use any of the events:

    $('#myElement')
        .bind('mouserest', { delay: 1000 }, wakeUp);

## Demo

In the source tree there is a demo.html which illustrates each of the events with different delays. I've also got a demo up on my site here: [http://brandonaaron.net/code/virtualdomevents/demos](http://brandonaaron.net/code/virtualdomevents/demos).

## License

These special events are dual licensed *(just like jQuery)* under the [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL](http://www.opensource.org/licenses/gpl-license.php) licenses.

Copyright (c) 2010 [Brandon Aaron](http://brandonaaron.net)
