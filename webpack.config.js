module.exports = {
    entry: "./src/app.js",
    output: {
        path: './bin',
        filename: "bundle.js"
    },
    module: {
        loaders: [ { 
                test: /\.js$/,
                loader: "babel-loader",
		exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                } 
            }
        ]
    }
};
