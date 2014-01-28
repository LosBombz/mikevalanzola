/*global define*/
define(['jquery', 'underscore', 'backbone'], 
    
    function($, _, Backbone) {
    "use strict";

    var sandbox = {};
    var subscribers = {};

    // add events to the _.events object, we'll create
    // an abstractio layer from this 
    var _events = _.extend({}, Backbone.Events);

    sandbox.on = function(event, subscriber, callback, context) {     
        _events.on(event, callback, context || this);
        
        if (!subscribers[ event ]) {
            
            subscribers[ event ] = [{subscriber : subscriber, callback : callback}];
        
        } else {
            
            subscribers[event].push({subscriber : subscriber, callback : callback});
        
        }
        
        //log out widgets that subscribe to events with which event when in debug mode
        // console.log('[ ' + subscriber + ' ]', 'subscribed to:', '(' + event + ')');
    };

    sandbox.off = function(event, subscriber) {
        _events.off(event, subscriber);
    };

    sandbox.trigger = function(event, args) {
        _events.trigger(event, args);

        // log out published events when in debug mode
        // console.log('(' + event + ')','published with data:', args);
    };
     

    return sandbox;

});
