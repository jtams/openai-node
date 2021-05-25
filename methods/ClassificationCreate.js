const request = require("request");

module.exports = function (
    headers,
    { model = "curie", query, examples, file, labels, search_model, temperature, logprops, max_examples, return_prompt, return_metadata, expand } = {}
) {
    if (!examples && !file) throw new Error("Must have examples or file");
    if (!query) throw new Error("Missing query");
    if (!headers.api_key) throw new Error("Missing API Key. openai.api_key = YOUR_API_KEY");
    return new Promise((resolve, reject) => {
        var options = {
            method: "POST",
            url: `https://api.openai.com/v1/classifications`,
            headers: headers.getHeaders(),

            body: JSON.stringify({
                model: model,
                query: query,
                examples: examples,
                file: file,
                labels: labels,
                search_model: search_model,
                temperature: temperature,
                logprops: logprops,
                max_examples: max_examples,
                return_prompt: return_prompt,
                return_metadata: return_metadata,
                expand: expand,
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
