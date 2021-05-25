const request = require("request");
module.exports = function (headers, { documents = [], file, query = null, engine = "davinci", max_rerank, return_metadata } = {}) {
    if (!headers.api_key) throw new Error("Missing API Key. openai.api_key = YOUR_API_KEY");
    return new Promise((resolve, reject) => {
        var options = {
            method: "POST",
            url: `https://api.openai.com/v1/engines/${engine}/search`,
            headers: headers.getHeaders(),

            body: JSON.stringify({
                documents: documents,
                file: file,
                max_rerank: max_rerank,
                return_metadata: return_metadata,
                query: query,
            }),
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
