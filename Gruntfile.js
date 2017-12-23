module.exports = function (grunt) {
    grunt.initConfig({
        // Remove temporary development files
        // https://github.com/gruntjs/grunt-contrib-clean
        clean: {
            options: {
                force: true
            },
            dist: [
                'dist',
                'docs',
                'tests',
            ],
            test: [
                'node_modules/path'
            ],
        },

        // Local server at http://localhost:8888
        // https://github.com/gruntjs/grunt-contrib-connect
        connect: {
            server: {
                options: {
                    livereload: true,
                    port: 8888,
                    hostname: 'localhost',
                },
            },
        },

        // https://github.com/gruntjs/grunt-contrib-jshint
        // Supported options: http://jshint.com/docs/
        // Help with debugging common error messages: http://jslinterrors.com/
        jshint: {
            main: {
                options: {
                    curly: true,
                    eqeqeq: true,
                    browser: true,
                    undef: true,
                    unused: true,
                    strict: false,
                    globals: {
                        jQuery: false,
                        define: false,
                        require: false,
                        cui: false,
                    },
                },
                src: [
                    'js/**/*.js',
                ],
            },
        },

        // https://github.com/sindresorhus/grunt-sass
        sass: {
            main: {
                options: {
                    sourceMap: true,
                    outputStyle: 'compressed', // Options: 'nested', 'compressed' (i.e. minified)
                },
                files: {
                    'css/main.css': 'scss/style.scss',
                },
            },
        },

        watch: {
            options: {
                livereload: true,
                interrupt: true,
                spawn: false
            },

            // Project styles
            styles: {
                files: [
                    'scss/**/*.scss',
                ],
                tasks: ['sass:main'],
            },

            // Project HTML
            html: {
                files: [
                    '**/*.html',
                ],
                tasks: ['copy:html'],
            },
        },
    });

    // Load NPM-based tasks
    require('load-grunt-tasks')(grunt);

    // Development build: compile script and styles, start a local server, and watch for file changes
    grunt.registerTask('dev', 'Development', function (args) {
        // Run the development build process
        grunt.task.run([
            // 'clean',
            'sass',
            'connect',
            'watch',
        ]);
    });

    // Set the default task to the development build
    grunt.registerTask('default', 'dev');
};
