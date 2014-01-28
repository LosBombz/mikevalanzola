/*global define*/
define([
    'jquery',
    'underscore',
    'sandbox'
    ], function($, _, sandbox){
        "use strict";

        var proto;


        /**
         * @class Module class that gets instatiated and is used for
         * lifecycle management by the core module
         *
         * @param {object} moduleOptions options that we'll pass along to the class
         *                               and this.module object
         *
         * @param {obect} moduleObj      the module object is the object interface
         *                               returned by the main module
         */
        function Module(moduleOptions, moduleObj) {

            this.options        = _.extend({}, moduleOptions);

            this.$el            = this.options.$el;
            this.name           = this.options.name;
            this._id            = _.uniqueId(this.name + '_module_');

            this.module         = _.extend(moduleObj, moduleOptions);
            this.module.sandbox = sandbox;

            return this;
        }


        return Module;

});
