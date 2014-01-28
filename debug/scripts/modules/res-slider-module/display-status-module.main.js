/*globals require, define, console */
define([], function() {
  'use strict';
  

  return {
        init : function () {

            
            this.sandbox.on('message', this.name ,function(message){
                this.$el.find('#status-list').append('<li>'+ message +'</li>');
            }, this);
        },
        destroy : function() {

        }
        

    };
});