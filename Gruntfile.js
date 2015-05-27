module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.initConfig({
        compress: {
            main: {
                options: {
                    archive: 'zurek.zip'
                },
                files: [{
                    src: ['package.json', 'public/**', 'db/*', 'views/**']
                }]
            }
        },
    });

grunt.registerTask('default', ['compress']);
   
};
