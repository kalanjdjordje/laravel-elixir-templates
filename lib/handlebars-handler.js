module.exports = {
  partialRegex: new RegExp("(.*partials.*)|(.*includes.*)|(.*_[0-9A-Za-z]*[^\/])"),
  defaultNamespace: "App.templates",  
  proccesContent: function(file,content,options){
    if(!options.onlyNoPartials && (options.onlyPartials || options.partialRegex.test(file))){
      console.log(' - partial: ' + file + ' --> ' + options.filenameConvert(file,true));
      return 'Handlebars.registerPartial("' + options.filenameConvert(file,true) +'", ' + content + ');';
    } else {
      console.log(' - template: ' + file + ' --> ' + options.filenameConvert(file,false));
      return options.namespace + '["' + options.filenameConvert(file,false) + '"] = Handlebars.compile(' + content + ');';
    }
  }
};