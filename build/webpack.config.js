const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const project = require('../project.config')

const inProject = path.resolve.bind(path, project.basePath)
const inProjectSrc = (file) => inProject(project.srcDir, file)
const inProjectSrcEntry = (file) => inProject(project.srcDir+"/ui/entryPoint/",file);

const __DEV__ = project.env === 'development';
const __PROD__ = project.env === 'production';

const config = {
    entry: {
        /*normalize: [
            inProjectSrc('normalize'),
        ],*/
        app: [
            inProjectSrcEntry(project.main),
        ],
    },
    devtool: project.sourcemaps ? 'source-map' : false,
    output: {
        path: inProject(project.outDir),
        filename: __DEV__ ? '[name].js' : '[name].[chunkhash].js',
        publicPath: project.publicPath,
    },
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty',
        fs: 'empty'
    },
    resolve: {
        modules: [
            inProject(project.srcDir),
            'node_modules',
        ],
        extensions: ['*', '.js', '.jsx', '.json'],
    },
    externals: project.externals,
    module: {
        rules: [],
    },
    plugins: [
        new webpack.DefinePlugin(Object.assign({
            'process.env': {
                'NODE_ENV': JSON.stringify(__DEV__ ? 'development' : 'production'),
                'ROOT_URL':JSON.stringify(process.env.ROOT_URL),
                'API_PORT':JSON.stringify(process.env.API_PORT),
                'PORT':JSON.stringify(process.env.PORT),
            },
        }, project.globals))
    ],
};

// JavaScript
// ------------------------------------
config.module.rules.push({
    test: /\.js$|\.jsx$/i,
    //exclude: /node_modules/,
    loader: 'babel-loader',
    include: [
        path.normalize(`${process.cwd()}/src/js/`),
        path.normalize(`${process.cwd()}/node_modules/joi/`),
        path.normalize(`${process.cwd()}/node_modules/isemail/`),
        path.normalize(`${process.cwd()}/node_modules/topo/`),
        path.normalize(`${process.cwd()}/node_modules/hoek/`),
        path.normalize(`${process.cwd()}/node_modules/react-flex-data/`),
        path.normalize(`${process.cwd()}/src/ui/`),
    ]
});

config.module.rules.push({
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader" })
});
config.module.rules.push({
    test: /\.scss$/,
    loaders: ["style-loader", "css-loader", 'resolve-url-loader', "sass-loader"]
});
config.module.rules.push({
    test: /\.sass$/,
    loaders: ["style-loader", "css-loader", 'resolve-url-loader', "sass-loader"]
});

config.module.rules.push({
    test    : /\.(png|jpg|gif)$/,
    loader  : 'url-loader',
    options : {
        limit : 8192,
    },
})

// Fonts
// ------------------------------------
;[
    ['woff', 'application/font-woff'],
    ['woff2', 'application/font-woff2'],
    ['otf', 'font/opentype'],
    ['ttf', 'application/octet-stream'],
    ['eot', 'application/vnd.ms-fontobject'],
    ['svg', 'image/svg+xml'],
].forEach((font) => {
    const extension = font[0]
    const mimetype = font[1]

    config.module.rules.push({
        test    : new RegExp(`\\.${extension}$`),
        loader  : 'url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]',
        options : {
            name  : 'fonts/[name].[ext]',
            limit : 10000,
            mimetype,
        },
    })
})

// HTML Template
// ------------------------------------
config.plugins.push(new HtmlWebpackPlugin({
    template: inProjectSrc('../public/index.html'),
    inject: true,
    minify: {
        collapseWhitespace: true,
    },
}))

config.plugins.push(new ExtractTextPlugin({
    filename: 'style.css',
    allChunks: true
}))
config.plugins.push(new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
}))
// Development Tools
// ------------------------------------
if (__DEV__) {
    /*config.entry.push(
        `webpack-hot-middleware/client.js?path=${config.output.publicPath}__webpack_hmr`
    )*/
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    )
}


if (__PROD__) {
    config.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: !!config.devtool,
            comments: false,
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
        })
    )
}
module.exports = config