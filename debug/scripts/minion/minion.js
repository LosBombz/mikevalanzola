/*global define, require*/
define(['jquery', 'underscore', 'sandbox', 'moduleClass', 'backbone'], function($, _, sandbox, ModuleClass, Backbone ) {
    "use strict";

   

    // Interface
    var minion = {
        // application methods
        app : {},

        // module methods
        modules : {},

        //estension methods: not doing anything with this yet
        // extensions: {}
    };

    //debug mode?
    minion.debug = window._debug;

    // Loaded modules and their callbacks
    var _modules = {};

    //extensions object: not using this yet
    var _extensions = {};

    // an array of modules that should be excluded
    var _excluded = [];

    var _noop = function(){};

    // copy of the basic sandbox, this is meant to be exteded
    // per project to add specific sandbox functionality to the
    // basic sandbox
    //var _sandbox = sandbox;




     /**
     * INTERNAL METHODS
     */

    /**
     * load a module from a config object, the module corresponds
     * to a require module and executes the init method
     * 
     * @param  {object} module [options object that contains the options for this module]
     * @return {object}        [return a promise that is resolved when require has finished loading the module]
     */
    function loadModule(module) {

        if(!_.isObject(module)) {
            throw 'expected an object, instead found ' + (typeof module) + '';
        }

        if(!module.name || typeof module.name !== 'string') {
            throw 'module name is either missing or is not a string';
        }

        if(!module.$el) {
            //console.warn('Module [', module.name ,'] was not provided with an [ $el ], the module might require one to be added to the DOM');
        }


        // use the module name as the alias for the require call, currently
        // this must match the folder and file names of the module
        var moduleAlias = module.name;

        //deferred object to ensure the module is done loading before calling methods on it
        var $dfd = $.Deferred();


        // the module config object is really the setup options for the module.
        // there might be a better way of doing this...
        var moduleOptions = module;

        
        // if we're excluding a module just skip the module and return the promise
        if (_.find(_excluded, function(moduleName){return moduleName === module.name;})) {
            
            // if we made it here, we're off to the races...
            // console.log('Module [', module.name ,']: excluded ');

            return $dfd.promise();
        }

        // require call for the module interface
        require(['modules/' + moduleAlias + '/' + moduleAlias + '.main'], function(moduleObj){

            // add to the modules object
            _modules[ moduleAlias ] = new ModuleClass(moduleOptions, moduleObj);

            // resolve the defered object when the module is done being required
            // and pass it along for any deferred callbacks
            $dfd.resolve(_modules[ moduleAlias ]);
        });


        // return promise
        return $dfd.promise();

    }




    /**
     * API METHODS
     */

    
    /**
     * starts the application: loops through the data-module
     * dom nodes and loads each module it finds on the pgae
     * @return {[type]} [description]
     */
    minion.app.start = function() {
        var $dataModules = $('[data-module]');
        var total = $dataModules.length;
        var count = 0;
        var $appDfd = $.Deferred();

        // if there are any elements on the page with data-module
        // attributes, loop over them and load them
        if (total) {
            
            _.each($dataModules, function(module){

  
                // load the modules into the queue 
                loadModule({

                    //name must match the folder and file name currently :(
                    name : $(module).data('module'),

                    // pass the container as the modules $el
                    $el: $(module)

                // load module returns a promise, when that's resolved attempt
                // to fire the modules init function
                }).done(

                    // the deferred object passes the module instance
                    // when it is resolved 
                    function(module){
                        
                        try {
                            
                            module.module.init();

                            // if we made it here, we're off to the races...
                            // console.log('Module [', module.name ,']: Loaded ');
                       
                        } catch(e) {

                            // enforce an init method
                            if(!module.module.init) {
                                throw new Error('Module [ ' + module.name + ' ]: is missing method: init');
                            }

                            throw new Error('Module [' + module.name  +']: failed to load: ' + e.message);



                        }

                        count += 1;

                        if (count === total) {

                            $appDfd.resolve(minion);

                        }
                        
                    }

                   

                );
            });
        }

        return $appDfd;

    };

    minion.app.stop = function() {

    };

    minion.modules.add = function(moduleOpts) {
        if(_.isArray(moduleOpts)) {

            _.each(moduleOpts, function(module){
                
                try {
                
                    loadModule(module);
                
                } catch (e) {
                
                    throw new Error('Module [' + module.name + ']: failed to be added to the load queue: ' + e.message);
                
                }
            });

        } else if( _.isObject(moduleOpts)) {

            try {
                
                    loadModule(moduleOpts);
                
                } catch (e) {
                
                    throw new Error('Module [' + moduleOpts.name + ']: failed to be added to the load queue: ' + e.message);
                
                }

        }
        
    };

    minion.modules.remove = function() {

    };

    /**
     * exclude a module from loading even if specified. useful for specific builds
     * that require a module not to be loaded to function correctly. Call before any
     * start or load methods
     * 
     * @param  {string} moduleName 
     */
    minion.modules.exclude = function(moduleName) {
        if(_.isString(moduleName)) {
            _excluded.push(moduleName);
        } else {
            return false;
        }
        
    };

    minion.modules.start = function(moduleOpts) {

         loadModule(moduleOpts).done(

                    // the deferred object passes the module instance
                    // when it is resolved
                    function(module){

                        try {

                            module.module.init();

                            // if we made it here, we're off to the races...
                            // console.log('Module [', module.name ,']: Loaded ');

                        } catch(e) {

                            //enforce an init method
                            if(!module.module.init) {
                                throw new Error('Module [ ' + module.name + ' ]: is missing method: init');
                            }

                            throw new Error('Module [' + module.name + ']: failed to load: ' + e.message);



                        }

                    }
                );

    };

    minion.modules.stop = function() {

    };

    minion.modules.get = function(moduleName) {
        if(moduleName && _modules[moduleName]) {
        
            return _modules[moduleName];

        } else if(!moduleName){

            return _modules;
            
        } else {

            throw new Error(moduleName  + ': Hasn\'t been initialized');

        }


    };

   
   

    return minion;

});
