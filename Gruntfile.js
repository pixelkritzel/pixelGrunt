'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>{,*/}*.html',
          '<%= config.dist %>/**/*.html',
          '<%= config.dist %>/stylesheets/{,*/}*.css',
          '<%= config.dist %>/scripts/{,*/}*.js',
          '<%= config.dist %>/**/*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= config.dist %>/*.*',
        ]
      },
      compass: {
        files: ['<%= config.src %>/stylesheets/{,*/}*.scss'],
        tasks: ['compass']
      },
      neuter: {
        files: ['<%= config.src %>/scripts/{,*/}*.js'],
        tasks: ['neuter']
      },
      copy: {
        files: [
                '<%= config.src %>/images/{,*/}*.{webp,gif,png,svg,jpg,jpeg}',
                '<%= config.src %>/**/*.html',
                '<%= config.src %>/*.html'
              ],
        tasks: ['copy']
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          open: false,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: '<%= config.src %>',
          cssDir: '<%= config.dist %>',
          environment: 'development',
          relativeAssets: true,
          outputStyle: 'expanded'
        }
      },
      dev: {                    // Another target
        options: {
          sassDir: '<%= config.src %>',
          cssDir: '<%= config.dist %>',
          outputStyle: 'nested'
        }
      }
    },
    copy: {
      dist: {
        files: [{
            expand: true,
            dot: true,
            cwd: '<%= config.src %>',
            dest: '<%= config.dist %>',
            src: [
                'images/{,*/}*.{webp,gif,png,svg,jpg,jpeg}',
                '**/*.html',
                '*.html'
            ]
        }],
      }
    },
    neuter: {
      application: {
        src: '<%= config.src %>/scripts/main.js',
        dest: '<%= config.dist %>/scripts/main.js'
      }
    },
    jasmine: {
      pivotal: {
        src: '<%= config.dist %>/**/*.js',
        options: {
          specs: 'spec/*Spec.js',
          helpers: 'spec/*Helper.js'
        }
      }
    },
    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml,json}']

  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-neuter');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('server', [
    'clean',
    'copy',
    'compass',
    'neuter',
    'jasmine',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'compass',
    'copy',
    'neuter',
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
