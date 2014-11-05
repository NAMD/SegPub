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
        }

	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-copy');

};
