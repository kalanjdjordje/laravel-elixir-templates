var gulp = require('gulp');
var Elixir = require('laravel-elixir');

var Task = Elixir.Task;

var concat = require('gulp-concat');
var wrap = require('gulp-wrap');

var config = Elixir.config;

var handlebarsHandler = require('./lib/handlebars-handler');
var handlers = {};
handlers["handlebars"] = handlebarsHandler;


/*
 |----------------------------------------------------------------
 | Convert html templates of handlebar to js
 |----------------------------------------------------------------
 |
 | This task will concatenate all your templates files
 | in in js file. This provides a quick and simple way to reduce
 | the number of HTTP requests then to load each template sepratly.
 |
 */

Elixir.extend('templates', function(src,output,options) {
  new Elixir.Log.message('Generate templates...');
  var paths = new Elixir.GulpPaths()
                .src(src, './resources/assets/templates/**/*.html')
                .output(output || 'resources/assets/js/templates.js');
  options = options || {};
  options.engine = options.engine || "handlebars";

  options.namespace = options.namespace || handlers[options.engine].defaultNamespace;
  options.partialRegex = options.partialRegex || handlers[options.engine].partialRegex;
  options.filenameConvert = options.filenameConvert || function(filename, isPartial) { return filename;};

  options.onlyPartials = options.onlyPartials || false;
  options.onlyNoPartials = options.onlyNoPartials || false;

  new Task('templates', function() {
    return gulp.src(paths.src.path)
      .pipe(wrap('<%= processContent(file.relative,contents) %>',{},{
          imports:{
            processContent:function(file,content){
              var template = JSON.stringify(content.toString().replace(/\n[ ]*/g,''));
              if(options.engine === "handlebars"){
                return handlers[options.engine].proccesContent(file,template,options);
              } else {
                new Elixir.Log.message('Engine is not suported: ' + options.engine);
              }
            }
          }        
        })
      )
      .pipe(concat(paths.output.name))
      .pipe(new Elixir.Notification('Templates concat: ' + paths.output.name))
      .pipe(gulp.dest(paths.output.baseDir))
      .pipe(new Elixir.Notification('Templates saved: ' + paths.output.baseDir));
  })
  .watch(paths.src.path);
});