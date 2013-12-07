'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var appConfig = {
    app: 'app',
    dist: 'out'
  };

  grunt.initConfig({
    appConfig: appConfig,
    watch: {
      sass: {
        files: ['<%= appConfig.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass']
      },
      neuter: {
        files: ['<%= appConfig.app %>/scripts/{,*/}*.js'],
        tasks: ['neuter']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '.tmp/scripts/*.js',
          '<%= appConfig.app %>/*.html',
          '{.tmp,<%= appConfig.app %>}/styles/{,*/}*.css',
          '<%= appConfig.app %>/images/{,*/}**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, appConfig.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: [
              '.tmp',
              '<%= appConfig.dist %>/*',
              '!<%= appConfig.dist %>/.git*'
            ]
          }
        ]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= appConfig.app %>/scripts/{,*/}*.js',
        '!<%= appConfig.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://localhost:<%= connect.options.port %>/index.html']
        }
      }
    },
    sass: {
      options: {
        includePaths: ['app/bower_components/']
      },
      dist: {
        files: {
          '.tmp/styles/main.css': '<%= appConfig.app %>/styles/main.scss'
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= appConfig.dist %>/scripts/{,*/}*.js',
            '<%= appConfig.dist %>/styles/{,*/}*.css',
            '<%= appConfig.dist %>/images/{,*/}**/*.{png,jpg,jpeg,gif,webp}',
            '<%= appConfig.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= appConfig.app %>/index.html',
      options: {
        dest: '<%= appConfig.dist %>'
      }
    },
    usemin: {
      html: ['<%= appConfig.dist %>/{,*/}*.html'],
      css: ['<%= appConfig.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= appConfig.dist %>']
      }
    },
    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        expand: true,
        cwd: '<%= appConfig.dist %>',
        src: ['scripts/*'],
        dest: '<%= appConfig.dist %>',
        ext: '.gz.js'
      }
    },
    imagemin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= appConfig.app %>/images',
            src: '{,*/}**/*.{png,jpg,jpeg}',
            dest: '<%= appConfig.dist %>/images'
          }
        ]
      }
    },
    svgmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= appConfig.app %>/images',
            src: '{,*/}*.svg',
            dest: '<%= appConfig.dist %>/images'
          }
        ]
      }
    },
    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      dist: {
        files: {
          '<%= appConfig.dist %>/styles/main.css': [
            '.tmp/styles/main.css',
            '<%= appConfig.app %>/styles/main.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {},
        files: [{
          expand: true,
          cwd: '<%= appConfig.app %>',
          src: ['*.html', 'views/**/*.html'],
          dest: '<%= appConfig.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= appConfig.app %>',
            dest: '<%= appConfig.dist %>',
            src: [
              '*.{ico,txt}',
              '.htaccess',
              'images/{,*/}**/*.{webp,gif}',
              'styles/fonts/*'
            ]
          }
        ]
      },
      bootstrap: {
        files: [
          {
            flatten: true,
            filter: 'isFile',
            expand: true,
            dot: true,
            cwd: "<%= appConfig.app %>",
            dest: "<%= appConfig.dist %>/styles",
            src: [
              "bower_components/bootstrap/docs/assets/css/**"
            ]
          },
          {
            flatten: true,
            filter: 'isFile',
            expand: true,
            dot: true,
            cwd: "<%= appConfig.app %>",
            dest: ".tmp/styles/",
            src: [
              "bower_components/bootstrap/docs/assets/css/**"
            ]
          },
          {
            flatten: true,
            filter: 'isFile',
            expand: true,
            dot: true,
            cwd: "<%= appConfig.app %>",
            dest: ".tmp/img/",
            src: [
              "bower_components/bootstrap/img/**"
            ]
          },
          {
            flatten: true,
            filter: 'isFile',
            expand: true,
            dot: true,
            cwd: "<%= appConfig.app %>",
            dest: "<%= appConfig.dist %>/img",
            src: [
              "bower_components/bootstrap/img/**"
            ]
          }
        ]
      }
    },
    concurrent: {
      server: [
        'sass'
      ],
      test: [
        'sass'
      ],
      dist: [
        'sass',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },
    karma: {
      e2e: {
        configFile: 'karma-e2e.conf.js',
        singleRun: true
      },
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      server: {
        configFile: 'karma.conf.js',
        singleRun: false,
        autoWatch: true
      }
    },
    neuter: {
      app: {
        options: {
          filepathTransform: function (filepath) {
            return 'app/' + filepath;
          }
        },
        src: '<%= appConfig.app %>/scripts/app.js',
        dest: '.tmp/scripts/combined-scripts.js'
      }
    },
    uglify: {
      options: {
        mangle: false
      }
    },
    shell: {
      deps: {
        command: './node_modules/grunt-cli/bin/grunt'
      }
    }
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }
    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'neuter:app',
      'copy:bootstrap',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'connect:test',
    'neuter:app',
    'karma:unit'
  ]);

  grunt.registerTask('test-keep-alive', [
    'clean:server',
    'concurrent:test',
    'connect:test',
    'neuter:app',
    'karma:server'
  ]);

  grunt.registerTask('test-e2e', [
    'clean:server',
    'concurrent:server',
    'neuter:app',
    'connect:livereload',
    'karma:e2e'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'neuter:app',
    'copy:bootstrap',
    'concat',
    'cssmin',
    'uglify',
    'copy',
    'usemin',
    'compress'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};