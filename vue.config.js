const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: process.env.PORT || 8080,
    host: process.env.HOST || 'localhost'
  }
})
