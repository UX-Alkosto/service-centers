
"use strict";
module.exports = function (grunt) {

    var themes = ["alkosto", "kalley"];

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: {
            dist: ["dist/**/css/*", "dist/**/fonts/*"]
        },
        cssmin: {
            options: {
                banner: "/*! <%= pkg.name %> - v<%= pkg.version %> */",
                compatibility: "ie8",
                report: "gzip",
                inline: ["local"],
                level: {
                    1: {
                        all: true
                    },
                    2: {
                        all: true
                    }
                }
            },
            dist: {
                expand: true,
                cwd: "dist",
                src: ["**/css/*.css"],
                dest: "dist"
            }
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
        json_minification: {
            target: {
                files: [{
                    expand: true,
                    cwd: "src/json",
                    src: ["<%= theme %>.json"],
                    dest: "dist/<%= theme %>/json",
                    rename: function (dest) {
                        return dest + "/service-centers.json";
                    }
                }]
            }
        },
        less: {
            options: {
                banner: "/*! <%= pkg.name %> - v<%= pkg.version %> */",
                compress: true,
                paths: ["dist/css"],
                modifyVars: {
                    themeName: "<%= theme %>"
                },
                plugins: [
                    new (require("less-plugin-autoprefix"))({ browsers: ["last 2 versions"] }),
                    new (require("less-plugin-clean-css"))({ advanced: true })
                ]
            },
            theme: {
                files: {
                    "dist/<%= theme %>/css/servicio.css": "src/less/servicio.less"
                }
            }
        },
        themes: themes
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-json-minification");

    grunt.registerMultiTask("themes", "Generate styles for each site", function () {
        const done = this.async();
        grunt.log.writeln("Compile less for: " + this.data);
        grunt.config("theme", this.data);
        grunt.task.run("json_minification");
        grunt.task.run("less");
        done();
    });
    grunt.registerTask("default", ["clean", "copy", "themes", "cssmin"]);
};