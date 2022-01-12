const request = require("request");

module.exports = function (
    headers,
    {
        model = "davinci",
        prompt,
        temperature = 1,
        max_tokens = 64,
        top_p = 1,
        frequency_penalty = 0,
        presence_penalty = 1,
        n = 1,
        stream = false,
        logprobs = null,
        echo = false,
        best_of = 1,
        stop = null,
    } = {}
) {
    if (!headers.api_key) throw new Error("Missing API Key. openai.api_key = YOUR_API_KEY");
    return new Promise((resolve, reject) => {
        var options = {
            method: "POST",
            url: `https://api.openai.com/v1/completions`,
            headers: headers.getHeaders(),
            body: JSON.stringify({
                prompt: prompt,
                model: model,
                temperature: temperature,
                max_tokens: max_tokens,
                top_p: top_p,
                frequency_penalty: frequency_penalty,
                presence_penalty: presence_penalty,
                n: n,
                best_of: best_of,
                stop: stop,
                echo: echo,
                stream: stream,
                logprobs: logprobs,
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
