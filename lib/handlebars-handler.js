module.exports = {
  partialRegex: new RegExp(".*/partials.*|.*/includes.*|.*/_[0-9A-Za-z]*[^/]"),
  defaultNamespace: "App.templates",  
  proccesContent: function(file,content,options){

    if(!options.onlyNoPartials && (options.onlyPartials || options.partialRegex.test(file))){      
      return 'Handlebars.registerPartial("' + options.filenameConvert(file,true) +'", ' + template+ ');';
    } else {
      return options.namespace + '["' + options.filenameConvert(file,false) + '"] = Handlebars.compile(' + template + ');';
    }

};