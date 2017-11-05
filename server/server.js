function Server() {
    function start(express) {
        var path = require("path");
        var bodyParser = require('body-parser');

        express.use(bodyParser.urlencoded({ extended: true }));

        express.get('/api/issues', function (req, res) {
            let owner = req.query.owner;
            let repo = req.query.repo;
            if (req.query.link !== undefined) {
                let result = server.parseLink(req.query.link);
                owner = result.owner;
                repo = result.repo;
            }
            getIssues(owner, repo)
                .then(function (obj) {
                    res.send(obj);
                });
        });

        api.get('/api/request', function (req, res) {
            doRequessPromise(req.query.link)
                .then(function (obj) {
                    res.send(obj);
                });
        });
    }

    const https = require('https');

    function doRequest(url, callback) {
        let path = getPath(url);
        let body = [];
        https.get({
            host: "api.github.com",
            path: path,
            headers: {
                'User-Agent': 'request'
            }
        },
            function (res) {
                res.setEncoding('utf8');
                let strobj = '';
                res.on('data', function (chunk) {
                    strobj += chunk;
                }).on('end', function () {
                    callback(JSON.parse(strobj));
                });
            });
    }

    function doRequestPromise(url) {
        let promise = new Promise(function (resolve) {
            doRequest(url, function (result) {
                resolve(result);
            });
        });
        return promise;
    }

    function getIssues(owner, repo) {
        let url = "/repos/" + owner + "/" + repo + "/issues";
        return doRequestPromise(url);
    }

    //url can be object then skip
    //url can contains host or not
    //EXAMPLES:
    //1. "https://api.github.com/repos/facebook/react/issues"
    //     '/repos/facebook/react/issues'
    //2. "/repos/facebook/react/issues"
    //     /repos/facebook/react/issues
    function getPath(url) {
        if (typeof url == "object") {
            if (url.path != undefined) {
                return url.path;
            } else {
                console.error("url.path is undefined\n");
                return;
            }
        } else if (typeof url == "string") {
            var index = url.indexOf("https://api.github.com");
            if (index == -1) {
                return url;
            } else {
                var output = url.substring(index + 22);
                return output;
            }
        }
    }

    function parseLink(url) {
        let result = {
            owner: '',
            repo: '',
        }
        return result;
    }



    return {
        register: start,
        // doRequest: doRequest,
        // doRequessPromise: doRequestPromise,
        // getIssues: getIssues,
        // parseLink: parseLink,
    };
}
module.exports = Server();