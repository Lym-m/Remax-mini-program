module.exports = {
    mode: 'development',
    entry: './webpack-proxy.config.js',
    devServer: {
        port: 3000,
        proxy: {
            'api': 'http://192.168.3.96:3000/api'
        }
    }
}
