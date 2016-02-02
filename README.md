# laravel-elixir-templates
# Elixir Templates

Plugin for laravel elixir to pack html templates into js file
Currently support hadnlebars templates. If you need support for other templates  fill free to ask me to extend plugin https://github.com/kalanjdjordje/laravel-elixir-templates/labels/question. 
## Install

```bash
$ npm install laravel-elixir-templates --save-dev
```

## Usage Handlebars

### Example `gulpfile.js`

```js
var elixir = require( 'laravel-elixir' );

require( 'laravel-elixir-templates' );

elixir( function( mix )
{
  mix.templates('assets/templates/**/*.html', 'js/templates.js', { engine: "handlebars" });
});
```
### Advanced Example `gulpfile.js`
```js
var elixir = require( 'laravel-elixir' );

require( 'laravel-elixir-templates' );

elixir( function( mix )
{
  mix.templates('assets/templates/**/*.html', 'js/templates.js', { 
    // - Optional
    // - Default = handlebars
    //engine: "handlebars",
    
    // - Optional
    // - This option is for defining namespace
    // - default (for handlebars is 'App.templates')
    //namespace: "App.templates",
    
    // - Optional
    // - Regex wich will mach partial files
    //partialRegex: new RegExp(""),

    // - Optional
    // - this option allow you to transform your filename. If you don't like to your template name be same as filename
    //filenameConvert: function(filename, isPartial) { return filename;};

    // - Optional
    // - if is true all provided files from input will treat as partial. In that case partialRegex will be ignored
    //onlyPartials: true | false

    // - Optional
    // - if is true all provided files from input will treat as not partial. In that case partialRegex will be ignored
    //onlyNoPartials: true | false

  });
});

```



# License

[MIT](/LICENSE)