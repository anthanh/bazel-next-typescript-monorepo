const pkg = require('./package.json')

module.exports = {
  exportTrailingSlash: false,
  // avoid random BUILD_ID
  generateBuildId: () => pkg.version,
}
