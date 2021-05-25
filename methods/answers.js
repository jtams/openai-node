const request = require("request");
module.exports = function (
    { api_key, organization } = {},
    { file, question, search_model, model, example_context, examples, max_rerank, max_tokens, stop } = {}
) {
    if (!documents || documents.length === 0) throw new Error("Documents can't be empty");
    if (!query) throw new Error("Missing query");
    if (!api_key) throw new Error("Missing API Key. openai.api_key = YOUR_API_KEY");
    return new Promise((resolve, reject) => {
        var options = {
            method: "POST",
            url: `https://api.openai.com/v1/engines/${engine}/search`,
            headers: {
                Authorization: `Bearer ${api_key}`,
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                documents: documents,
                query: query,
            }),
        };
        if (organization) {
            options.headers["OpenAI-Organization"] = organization;
        }
        request(options, function (error, response) {
            if (error) {
                reject(error);
            } else {
                resolve(JSON.parse(response.body));
            }
        });
    });
};
