/*globals require, define, console */
define(['jquery', 'res-nav'], function($, responsiveNav) {
  'use strict';
  

  return {
        init : function () {
            var selector = this.$el.attr('id');
            this.nav = responsiveNav(selector, {
                insert: 'before'
            });

        },
        destroy : function() {

        }
        

    };
});