/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        

        // Task configuration.

        // linting options
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true,
                    define: true,
                    require: true
                }
            },
            gruntfile: {
                src: 'Gruntfile.js'
            }

        },


        // if using AMD (require.js)
        requirejs: {
            compile: {
                options: {
                    baseUrl: "debug/scripts",
                    mainConfigFile: "debug/scripts/require.config.js",
                    out: "release/scripts/main.js",
                    name: "components/almond/almond",
                    include: ['app'],
                    insertRequire: ['app']
                }
            }
        },


        //compass tasks
        compass: {
            dist: {                   
                options: {              
                    sassDir: 'debug/styles/sass',
                    cssDir: 'release/styles/css',
                    outputStyle: 'compressed',
                    imageDir: 'release/images',
                    fontsDir: 'release/fonts',
                    relativeAssets: true,
                    noLineComments: true,
                    environment: 'production'
                }
            },
            dev: {                   
                options: {
                    sassDir: 'debug/styles/sass',
                    cssDir: 'debug/styles/css',
                    imageDir: 'debug/images',
                    fontsDir: 'debug/fonts',
                    relativeAssets: true,
                    environment: 'development'

                }
            }
        },

        connect: {
            debug: {
              options: {
                port: 8000,
                base: 'debug',
                hostname: '*'
              }
            },
            release: {
              options: {
                port: 8001,
                base: 'release',
                hostname: '*'
              }
            }
        },

        processhtml: {
            dist: {
                files: {
                    'release/index.html': ['debug/index.html']
                }
            }
        },
        

        //watch tasks
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            compass: {
                files: '<%= compass.dev.options.sassDir %>/*.scss',
                tasks: ['compass:dev']
            }
        },

        // copy task
        copy: {
            main: {
                files: [
                    {   
                        expand: true,
                        cwd: 'debug/',
                        src: ['images/**/*','fonts/'],
                        dest: 'release/'
                    },
                    {
                        expand: true,
                        cwd: 'debug/',
                        src: ['scripts/libs/modernizr.js'], 
                        dest: 'release/'
                    },
                    {
                        expand: true,
                        cwd: 'debug/',
                        src: ['scripts/libs/modernizr.js'], 
                        dest: 'release/'
                    },
                    {
                        expand: true,
                        cwd: 'debug/',
                        src: ['styles/css/png/*'], 
                        dest: 'release/'
                    },
                    {
                        expand: true,
                        cwd: 'debug/',
                        src: ['styles/css/icons.data.png.css', 'styles/css/icons.data.svg.css', 'styles/css/icons.fallback.css'], 
                        dest: 'release/'
                    }
                ]
            }
        }

    });

    
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-processhtml');

    
    // Default task.
    grunt.registerTask('default', [ 'requirejs', 'processhtml', 'copy', 'compass' ]);
    grunt.registerTask('s', ['connect:debug:keepalive']);
    grunt.registerTask('rs', ['connect:release:keepalive']);

};