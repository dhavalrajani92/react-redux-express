import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { createServer } from 'http';
import historyApiFallback from 'connect-history-api-fallback';
import cors from 'cors';
const webpack = require('webpack');
const webpackConfig = require('../../build/webpack.config');
const project = require('../../project.config');
const port = process.env.API_PORT || 4002;
const app = express();
import mongoose from "mongoose";
var mongoDB = process.env.MONGO_URL || 'mongodb://localhost:27017/reactDemo';
mongoose.connect(mongoDB, { useMongoClient: true })

var router = require("./routes/routes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api',router)
const server = createServer(app);
server.listen(port, () => {
    console.log("server is listing on port: " + port)
});

if (project.env === 'development') {
    const compiler = webpack(webpackConfig);

    console.log('Enabling webpack development and HMR middleware');
    app.use(historyApiFallback({
        verbose: false,
    }));
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        contentBase: path.resolve(project.basePath, project.srcDir),
        hot: true,
        quiet: false,
        noInfo: false,
        lazy: false,
        stats: 'normal',
    }));

    app.use(require('webpack-hot-middleware')(compiler));

    // Serve static assets from ~/public since Webpack is unaware of
    // these files. This middleware doesn't need to be enabled outside
    // of development since this directory will be copied into ~/dist
    // when the application is compiled.
    app.use(express.static(path.resolve(project.basePath, 'public')));

    // This rewrites all routes requests to the root /index.html file
    // (ignoring file requests). If you want to implement universal
    // rendering, you'll want to remove this middleware.
    app.use('*', (req, res, next) => {
        const filename = path.join(compiler.outputPath, 'index.html');
        compiler.outputFileSystem.readFile(filename, (err, result) => {
            if (err) {
                return next(err);
            }
            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
        });
    });
} else {
    console.log(
        'Server is being run outside of live development mode, meaning it will ' +
        'only serve the compiled application bundle in ~/dist. Generally you ' +
        'do not need an application server for this and can instead use a web ' +
        'server such as nginx to serve your static files. See the "deployment" ' +
        'section in the README for more information on deployment strategies.'
    );

    // Serving ~/dist by default. Ideally these files should be served by
    // the web server and not the app server, but this helps to demo the
    // server in production.
    app.use(historyApiFallback({
        verbose: project.verbose,
    }));
    app.use(express.static(path.resolve(project.basePath, project.outDir)));
    app.use(express.static(path.resolve(project.basePath, 'public')));
}
