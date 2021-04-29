const request = require("request");

module.exports = function (
    headers,
    {
        model = "curie",
        question,
        examples,
        examples_context,
        documents,
        file,
        search_model,
        max_rerank,
        temperature,
        logprops,
        max_tokens,
        stop,
        n,
        return_metadata,
        return_prompt,
        expand,
    } = {}
) {
    if (!question) throw new Error("Missing query");
    if (!examples) throw new Error("Must have examples");
    if (!examples_context) throw new Error("Must have examples_context");
    if (!documents && !file) throw new Error("Must have documents or file");
    if (!headers.api_key) throw new Error("Missing API Key. openai.api_key = YOUR_API_KEY");
    return new Promise((resolve, reject) => {
        var options = {
            method: "POST",
            url: `https://api.openai.com/v1/answers`,
            headers: headers.getHeaders(),

            body: JSON.stringify({
                model: model,
                question: question,
                examples: examples,
                examples_context: examples_context,
                documents: documents,
                file: file,
                search_model: search_model,
                max_rerank: max_rerank,
                temperature: temperature,
                logprops: logprops,
                max_tokens: max_tokens,
                stop: stop,
                n: n,
                return_metadata: return_metadata,
                return_prompt: return_prompt,
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
