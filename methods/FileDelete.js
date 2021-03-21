const request = require("request");

module.exports = function (headers, fileid) {
    if (!headers.api_key) throw new Error("Missing API Key. openai.api_key = YOUR_API_KEY");
    if (!fileid) throw new Error("Missing file id");
    return new Promise((resolve, reject) => {
        var options = {
            method: "DELETE",
            url: `https://api.openai.com/v1/files/${fileid}`,
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
