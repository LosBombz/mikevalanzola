/*global require*/
(function(){
	'use strict';
	
	require.config({

		//paths to script files
		paths: {
			'jquery': 'components/jquery/jquery',
			'jquery.swipe' : 'libs/swipe',
            'res-nav' : 'components/responsive-nav/responsive-nav.min',
			'text': 'components/requirejs-text/text',
			underscore: 'components/underscore/underscore-min',
            backbone: 'components/backbone/backbone-min',
            almond: 'components/almond/almond',

            // Core Logic
            minion: 'minion/minion',
            sandbox: 'minion/sandbox',
            moduleClass: 'minion/module.class'
		},

		 shim: {
            'underscore': {
                exports: '_'
            },
            'backbone': {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            },
            'res-nav' : {
                exports: 'responsiveNav'
            }
        }
	});

}());

