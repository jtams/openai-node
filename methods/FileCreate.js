const request = require("request");

module.exports = function (headers, { file, purpose } = {}) {
    if (!file) throw new Error("Missing file. Provide the path to the file");
    if (!headers.api_key) throw new Error("Missing API Key. openai.api_key = YOUR_API_KEY");
    return new Promise((resolve, reject) => {
        var options = {
            method: "POST",
            url: `https://api.openai.com/v1/files`,
            headers: headers.getHeaders(),

            formData: {
                purpose: purpose,
                file: {
                    value: file,
                    options: {
                        filename: file.path,
                        contentType: null,
                    },
                },
            },
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
