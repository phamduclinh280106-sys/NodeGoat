const ResearchDAO = require("../data/research-dao").ResearchDAO;
const needle = require("needle");
const {
    environmentalScripts
} = require("../../config/config");

function ResearchHandler(db) {
    "use strict";

    const researchDAO = new ResearchDAO(db);

    this.displayResearch = (req, res) => {

        if (req.query.symbol) {
            const url = req.query.url + req.query.symbol;
            return needle.get(url, (error, newResponse, body) => {
                if (!error && newResponse.statusCode === 200) {
                    res.writeHead(200, {
                        "Content-Type": "text/html"
                    });
                }
                res.write("<h1>The following is the stock information you requested.</h1>\n\n");
                res.write("\n\n");
                if (body) {
                    res.write(body);
                }
                return res.end();
            });
        }

        return res.render("research", {
            environmentalScripts
        });
    };
        // Chỉ cho phép các domain tin cậy
    const ALLOWED_DOMAINS = ['api.stockmarket.com', 'finance.yahoo.com'];

    this.displayResearch = (req, res) => {
        if (req.query.symbol && req.query.url) {
            try {
                const targetUrl = new URL(req.query.url);
                
                // Kiểm tra xem domain có nằm trong whitelist không
                if (!ALLOWED_DOMAINS.includes(targetUrl.hostname)) {
                    return res.status(400).send("URL không được phép!");
                }

                const finalUrl = targetUrl.origin + targetUrl.pathname + req.query.symbol;
                
                needle.get(finalUrl, (error, newResponse, body) => {
                    // Xử lý tiếp...
                });
            } catch (e) {
                return res.status(400).send("URL không hợp lệ");
            }
        }
};

}

module.exports = ResearchHandler;
