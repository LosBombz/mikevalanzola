/*global require, define, FB, Modernizr */
// App.js - logic for starting widgets


require([
    'jquery', 
    'underscore', 
    'minion'
    ], function( $, _, minion ) {
    'use strict';

    $(function(){
        minion.app
            .start()
            .then(
                function(app){
                    //console.log(app.modules.get('status-module'));
                }
            );
    });

});
