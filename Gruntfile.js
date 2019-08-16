module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        header: grunt.file.read('header.js'),
        includes: {
            files: {
                options: {
                    includeRegexp: /^\/\/\s*import\s+['"]?([^'"]+)['"]?\s*$/,
                    banner: '<%= header %>\n'
                },
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.js',
                flatten: true,
                cwd: '.'
            }
        },
        uglify: {
            options: {
                stripBanners: true,
                banner: '<%= header %>\n'
            },
            build: {
                src: 'build/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            files: 'src/*.js',
            options: {
                force: true
            }
        },
        watch: {
            scripts: {
                files: 'src/*.*',
                tasks: 'default',
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-includes');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'includes', 'uglify']);

};