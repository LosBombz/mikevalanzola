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
                    cssDir: 'release/styles',
                    outputStyle: 'compressed',
                    imageDir: 'images',
                    fontsDir: 'fonts',
                    relativeAssets: true,
                    noLineComments: true,
                    environment: 'production'
                }
            },
            dev: {                   
                options: {
                    sassDir: 'debug/styles/sass',
                    cssDir: 'debug/styles/css',
                    imageDir: 'images',
                    fontsDir: 'fonts',
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
                        src: ['**/*','!scripts/**/*','!styles/**/*'],
                        dest: 'release/'
                    }
                    // ,
                    // {src: ['debug/index-release.html'], dest: 'release/index.html'},
                    // {src: ['debug/scripts/lib/modernizr.custom.js'], dest: 'release/scripts/modernizr.custom.js'},
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

    
    // Default task.
    grunt.registerTask('default', ['requirejs', 'compass', 'copy' ]);
    grunt.registerTask('s', ['connect:debug:keepalive']);
    grunt.registerTask('rs', ['connect:release:keepalive']);

};