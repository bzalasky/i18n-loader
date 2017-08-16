const grunt = require('grunt');

module.exports = function(source) {
  this.cacheable && this.cacheable();

  try {
    let lang = /([^/]{2})\.yml/.exec(this.resourcePath)[1];
    let dest = `./public/${lang}.js`;

    let momentLocale;

    if (lang !== 'en') {
      momentLocale = grunt.file.read(
        `./node_modules/moment/locale/${lang}.js`,
        {encoding: 'utf-8'}
      );
    }

    let content = grunt.template.process(
      grunt.file.read('./public/i18n-lang.js.tpl', {encoding: 'utf-8'}),
      {data: {translations: source, moment_locale: momentLocale}}
    );
    console.log(content);
    return content;

  } catch(err) {
    this.emitError(err);
  }
};
