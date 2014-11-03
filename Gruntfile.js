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

	});

	grunt.loadNpmTasks('grunt-browserify');

};
