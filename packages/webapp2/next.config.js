const withPlugins = require('next-compose-plugins')
const withTranspileModules = require('next-transpile-modules')
const pkg = require('./package.json')

module.exports = withPlugins(
  [
    withTranspileModules(['@monorepo']),
  ],
  {
    exportTrailingSlash: false,
    // avoid random BUILD_ID
    generateBuildId: () => pkg.version,
  },
)
