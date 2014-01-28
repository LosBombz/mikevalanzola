/*globals require, define, console */
define(['jquery', 'jquery.swipe'], function($) {
  'use strict';
  

  return {
        init : function () {
            this.$el.Swipe({
                speed: 500,
                auto: 5000,
                continuous: true,
                disableScroll: false
            });

        },
        destroy : function() {

        }
        

    };
});