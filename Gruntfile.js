module.exports = function (grunt) {
    const scriptFiles = [
        'js/script.js',
        'js/dev.js',
    ];

    grunt.initConfig({
        // Local server at http://localhost:8888
        connect: {
            server: {
                options: {
                    livereload: true,
                    port: 8888,
                    hostname: 'localhost',
                },
            },
        },

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
                        $: false,
                        jQuery: false,
                        console: false,
                        patik: true,
                    },
                },
                src: scriptFiles,
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
                    'css/style.css': 'scss/style.scss',
                },
            },
        },

        watch: {
            options: {
                livereload: true,
                interrupt: true,
                spawn: false
            },

            styles: {
                files: [
                    'scss/**/*.scss',
                ],
                tasks: ['sass'],
            },

            scripts: {
                files: scriptFiles,
                tasks: ['jshint'],
            },
        },
    });

    // Load NPM-based tasks
    require('load-grunt-tasks')(grunt);

    // Development build: compile script and styles, start a local server, and watch for file changes
    grunt.registerTask('dev', 'Development', function (args) {
        // Run the development build process
        grunt.task.run([
            'jshint',
            'sass',
            'connect',
            'watch',
        ]);
    });

    // Set the default task to the development build
    grunt.registerTask('default', 'dev');
};
