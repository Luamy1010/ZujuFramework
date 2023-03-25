const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://beta-app.zujudigital.com',
    defaultCommandTimeout: 10000,
    viewportHeight: 768,
    viewportWidth: 1366,
    experimentalSessionAndOrigin: true,
    hideXHR: true
  },
})
