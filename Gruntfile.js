
'use strict';
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: {
            dist: ["dist/**/css/*", "dist/**/js/*", "dist/**/fonts/*"]
        },
        copy: {
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: "src/fonts/",
                        src: "**",
                        dest: "dist/common/fonts"
                    }
                ]
            }
        },
        less: {
            options: {
                compress: true,
                paths: ['dist/css'],
                plugins: [
                    new (require('less-plugin-autoprefix'))({ browsers: ["last 2 versions"] })
                ]
            },
            kalley: {
                options: {
                    modifyVars: {
                        themeName: 'kalley'
                    }
                },
                files: {
                    'dist/kalley/css/servicio.css': 'src/less/servicio.less'
                }
            }
        },
        uglify: {
            options: {
                banner:
                    "/*! <%= pkg.name %> - v<%= pkg.version %> */",
                report: "gzip",
                compress: true,
                sourceMap: false,
                exportAll: true,
            },
            dist: {
                files: {
                    'dist/common/js/map.js': ['src/js/map.js'],
                    'dist/common/js/select.js': ['src/js/select.js'],
                    'dist/common/js/service-center.js': ['src/js/service-center.js'],
                    'dist/common/js/servicio.js': ['src/js/servicio.js']
                },
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');

    grunt.registerTask('default', ['clean', 'copy', 'less', 'uglify']);
};