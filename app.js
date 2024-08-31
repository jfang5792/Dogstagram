
const http = require('http');
const {readFileSync} = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log(`Incoming Request - Method: ${req.method} | URL: ${req.url}`);
    const reqBody = "";
    req.on('data', (data) => {
        reqBody += data;
    });
    req.on('end', () => {
        if(reqBody) {
            req.body = reqBody
            .split('&')
            .map((keyValuePair) => keyValuePair.split("="))
            .map(([key, value]) => [key, value.replace(/\+/g," ")])
            .map(([key, value]) => [key, decodeURIComponent(value)])
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {})
        } //get the homepage
        if(req.method === "GET" && req.url === "/") {
            const resBody = readFileSync("./public/index.html");
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(resBody);
            return;
        }
        const ext = path.extname(req.url);
        if(req.method === "GET" && ext) {
            try {
                const resBody = readFileSync("." + "/public" + req.url);
                res.statusCode = 200;
                if(ext === ".jpg" || ext === ".jpeg") {
                    res.setHeader("Content-Type", "image/jpeg");
                } else if (ext === ".css") {
                    res.setHeader("Content-Type", "text/css");
                  } else if (ext === ".js") {
                    res.setHeader("Content-Type", "text/javascript");
                  }
                  res.end(resBody);
                  return;
            } catch {
                console.error(
                "Cannot find asset",
                path.basename(req.url),
                "in assets folder"
                );
            }
        }
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        const resBody = "Page Not Found";
        res.write(resBody);
        res.end();
    });
});

const port = 5010;
server.listen(port, () => console.log('Server is running on port', port));
