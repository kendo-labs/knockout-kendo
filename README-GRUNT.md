# Setting up GRUNT for use with node.js

If you don't have [grunt](http://gruntjs.com/) installed yet, install it as follows:

    npm install -g grunt-cli

Then, in the project root directory, setup the local grunt with these commands:

    npm install grunt --save-dev
    npm install grunt-template-jasmine-istanbul
    npm install grunt-contrib-uglify
    npm install grunt-contrib-watch
    npm install grunt-contrib-jshint
    npm install grunt-includes

Now you are ready to build knockout-kendo.

