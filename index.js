const loaderUtils = require('loader-utils');
const grunt = require('grunt');

module.exports = source => {
  this.cacheable && this.cacheable();

  console.log(this);

  let sourceFileName = loaderUtils.getRemainingRequest(this);

  try {
    let lang = /([^/]{2})\.yml/.exec(sourceFileName)[1];
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
      {data: {translations: json, moment_locale: momentLocale}}
    );

    return content;

  } catch(err) {
    this.emitError(err);
  }
};
