const request = require("request");

module.exports = function (headers) {
    if (!headers.api_key) throw new Error("Missing API Key. openai.api_key = YOUR_API_KEY");
    return new Promise((resolve, reject) => {
        var options = {
            method: "GET",
            url: "https://api.openai.com/v1/files",
            headers: headers.getHeaders(),
        };
        request(options, function (error, response) {
            if (error) {
                reject(error);
            } else {
                resolve(JSON.parse(response.body));
            }
        });
    });
};
