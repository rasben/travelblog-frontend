module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-file-append');
    grunt.loadNpmTasks('grunt-image-resize');
    grunt.loadNpmTasks('grunt-wget');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('css', ['clean:css', 'sass', 'autoprefixer', 'cssmin']);
    grunt.registerTask('js', ['clean:js', 'uglify:js', 'concat:js', 'file_append:js']);
    grunt.registerTask('images', ['clean:images', 'copy:images', 'image_resize']);
    grunt.registerTask('fonts', ['clean:fonts', 'copy:fonts']);
    grunt.registerTask('assets', ['clean:assets', 'copy:assets']);

    grunt.registerTask('default', ['build', 'watch']);
    grunt.registerTask('build', ['wget', 'css', 'js', 'images', 'fonts', 'assets']);

    grunt.initConfig({
        watch: {
            css: {
                files: 'source/sass/**/*.scss',
                tasks: ['css']
            },

            images: {
                files: 'source/images/**/*',
                tasks: ['images']
            },

            js: {
                files: 'source/js/**/*',
                tasks: ['js']
            },

            fonts: {
                files: 'source/fonts/**/*',
                tasks: ['js']
            },

            assets: {
                files: 'source/assets/**/*',
                tasks: ['assets']
            }
        },

        sass: {
            dist: {
                files: [{
                    style: 'compressed',
                    expand: true,
                    cwd: 'source/sass',
                    src: ['*.scss'],
                    dest: 'build/css',
                    ext: '.css'
                }]
            }
        },

        autoprefixer:{
            multiple_files: {
                expand: true,
                flatten: true,
                src: 'build/css/*.css',
                dest: 'build/css'
            }
        },

        image_resize: {
            header : {
                options: {
                    width: 860,
                    height: 600,
                    crop: true,
                    overwrite: true
                },

                src: ['source/images/**/*.png', 'source/images/**/*.jpg', 'source/images/**/*.jpeg'],
                dest: 'build/images/header/'
            },

            teaser : {
                options: {
                    width: 860,
                    height: 300,
                    crop: true,
                    overwrite: true
                },

                src: ['source/images/**/*.png', 'source/images/**/*.jpg', 'source/images/**/*.jpeg'],
                dest: 'build/images/teaser/'
            },

            teaser_small : {
                options: {
                    width: 250,
                    height: 250,
                    crop: true,
                    overwrite: true
                },

                src: ['source/images/**/*.png', 'source/images/**/*.jpg', 'source/images/**/*.jpeg'],
                dest: 'build/images/teaser_small/'
            }
        },

        copy: {
            images: {
                expand: true,
                src: ['source/images/**/*.png', 'source/images/**/*.jpg', 'source/images/**/*.jpeg'],
                dest: 'build/images/full/',
                flatten: true
            },

            fonts: {
                expand: true,
                cwd: 'source/fonts',
                src: '**',
                dest: 'build/fonts/',
                flatten: true
            },

            assets: {
                expand: true,
                cwd: 'source/assets',
                src: '**',
                dest: 'build/assets/',
                flatten: false
            }
        },

        uglify: {
            js: {
                files: [{
                    expand: true,
                    cwd: 'source/js',
                    src: '**/*.js',
                    dest: 'build/js/all'
                }]
            }
        },

        concat: {
            js: {
                options: {
                    separator: ';'
                },

                src: ['build/js/all/*.js'],
                dest: 'build/js/build.js'
            }
        },

        clean: {
            js: ['build/js/'],
            images: ['build/images/'],
            css: ['build/css/'],
            fonts: ['build/fonts/'],
            assets: ['build/assets/']
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'build/css',
                    src: ['*.css', '!*.css.map'],
                    dest: 'build/css',
                    ext: '.css'
                }]
            }
        },

        wget: {
            images: {
                files: {
                    'source/images/placeholder/1.jpeg':'https://placeimg.com/2000/1400/nature',
                    'source/images/placeholder/2.jpeg':'https://placeimg.com/2000/1400/nature',
                    'source/images/placeholder/3.jpeg':'https://placeimg.com/2000/1400/arch',
                    'source/images/placeholder/4.jpeg':'https://placeimg.com/2000/1400/nature',
                    'source/images/placeholder/5.jpeg':'https://placeimg.com/2000/1400/people',
                    'source/images/placeholder/6.jpeg':'https://placeimg.com/2000/1400/people',
                    'source/images/placeholder/7.jpeg':'https://placeimg.com/2000/1400/nature',
                    'source/images/placeholder/8.jpeg':'https://placeimg.com/2000/1400/nature'
                }
            }
        },
        file_append: {
            js: {
                files: [
                    {
                        prepend: '$(document).ready(function(){',
                        append: '});',
                        input: 'build/js/build.js',
                        output: 'build/js/build.js'
                    }
                ]
            }
        }
    })
}
