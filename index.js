var gulp = require('gulp');
var Elixir = require('laravel-elixir');

var Task = Elixir.Task;

var concat = require('gulp-concat');
var wrap = require('gulp-wrap');

var config = Elixir.config;
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
Elixir.extend('templates', function(src,dest) {
  var paths = Elixir.GulpPaths()
                .src(src, config.get('assets.templates.folder'))
                .output(dest || config.get('public.js.outputFolder') || 'js/templates.js');
  console.log(paths);
  new Task('templates', function() {
    return gulp.src(paths.src)
      .pipe(wrap('<%= processContent(file.relative,contents) %>',{},{
        imports:{
          processContent:function(file,content){
            function camelCase(input) { 
              return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
                return group1.toUpperCase();
              });
            }

            var template = JSON.stringify(content.toString().replace(/\n[ ]*/g,''));
            if(file.indexOf('partials') === 0){
              file = camelCase(file.replace('partials/','').replace('.html',''));
              return 'Handlebars.registerPartial("' + file +'", ' + template+ ');';
            } else {
            return 'App.templates["' + file.replace('.html','') + '"] = Handlebars.compile(' + template + ');';

            }
          }
        }
      }))
      .pipe(concat())
      .pipe(gulp.dest(dest));
  })
  .watch(paths.src.path);
});