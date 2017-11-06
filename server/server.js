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

        express.get('/api/request', function (req, res) {
            doRequessPromise(req.query.link)
                .then(function (obj) {
                    res.send(obj);
                });
        });

        express.get('/api/relevant/issues', function (req, res) {
            let owner = req.query.owner;
            let issue = req.query.issue;
            let repo = req.query.repo;
            relevantIssues(owner, repo, issue)
                .then(function (obj) {
                    res.send(obj);
                });
        });

        express.get('/api/relevant/pulls', function (req, res) {
            let owner = req.query.owner;
            let issue = req.query.issue;
            let repo = req.query.repo;
            relevantPulls(owner, repo, issue)
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

    function relevantIssues(owner, repo, issue) {
        return relevantObjects(owner, repo, 'issues', issue);
    }

    function relevantPulls(owner, repo, issue) {
        return relevantObjects(owner, repo, 'pull', issue);
    }

    function relevantObjects(owner, repo, type, param) {
        var url = "/repos/" + owner +
            "/" + repo +
            "/issues/" + param;
        let result_list = [];
        let link = 'https:\\/\\/github\\.com\\/facebook\\/react\\/' + type + "\\/";
        let reg = new RegExp(link + '[0-9]+');
        link = link.replace(/\\/g, '');
        var result = new Promise(function (resolve) {
            doRequestPromise(url)
                .then(function (object) {
                    let i = reg.exec(object.body);
                    if (i != null)
                        i.forEach(function (element) {
                            result_list.push(element);
                        }, this);
                    if (object.comments !== undefined && object.comments > 0) {
                        doRequestPromise(url + "/comments")
                            .then(function (comments) {
                                comments.forEach(function (comment) {
                                    let i2 = reg.exec(comment.body);
                                    if (i2 != null)
                                        i2.forEach(function (element) {
                                            result_list.push(element.substring(link.length));
                                        }, this);
                                }, this);
                            })
                            .then(() => resolve(result_list));
                    }
                });
        });
        return result;
    }

    return {
        register: start,
        // relevantIssues: relevantIssues,
        // relevantPulls: relevantPulls,
        // doRequest: doRequest,
        // doRequessPromise: doRequestPromise,
        // getIssues: getIssues,
        // parseLink: parseLink,
    };
}
module.exports = Server();

// var s = Server();
// s.relevantIssues('facebook', 'react', 11423)
//     .then(function (issues) {
//         console.info(issues);
//     });
// s.relevantPulls('facebook', 'react', 11423)
//     .then(function (issues) {
//         console.info(issues);
//     });
//localhost:3000/api/relevant/pulls?owner=facebook&repo=react&issue=11423