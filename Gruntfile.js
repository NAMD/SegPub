/*globals module: true */
module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		browserify: {
			files: {
				src: [
					'static/js/**/*.js',
				],
				dest: 'static/dist/js/build.js',
			}
		},
        copy:{
            styles: {
                src: 'node_modules/*/dist/**/*.css',
                dest: 'static/dist/css/',
                expand: true,
                flatten: true,
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    clearRequireCache: true,
                    growl: true
                },
                src: ['test/**/*.js']
            },
        },
        watch: {
            js: {
                options: {
                    spawn: false,
                },
                files: ['*.js', 'test/**/*.js'],
                tasks: ['mochaTest']
            },
            frontJs: {
                options: {
                    spawn: false,
                },
                files: 'static/**/*.js',
                tasks: ['browserify']
            }
        }

	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');
};
