/*globals module: true */
module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		browserify: {
			files: {
				src: [
					'static/js/**/*.js',
					'!static/js/build.js',
				],
				dest: 'static/js/build.js',
			}
		},

	});

	grunt.loadNpmTasks('grunt-browserify');

};
