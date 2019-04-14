module.exports = {
    devServer: {
        proxy: {
            '/api/v1/*': {
                target: 'http://localhost:8081',
                ws: true,
                changeOrigin: true
            },
        }
    },
    runtimeCompiler: true

}