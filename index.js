const request = require("request");
module.exports = {
    api_key: null,
    organization: null,

    completion: ({
        engine = "davinci",
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
    } = {}) => {
        if (!module.exports.api_key) throw new Error("Missing API Key. openai.api_key = YOUR_API_KEY");
        return new Promise((resolve, reject) => {
            var options = {
                method: "POST",
                url: `https://api.openai.com/v1/engines/${engine}/completions`,
                headers: {
                    Authorization: `Bearer ${module.exports.api_key}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: prompt,
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
            if (module.exports.organization) {
                options.headers["OpenAI-Organization"] = module.exports.organization;
            }
            request(options, function (error, response) {
                if (error) {
                    reject(error);
                } else {
                    resolve(JSON.parse(response.body));
                }
            });
        });
    },

    engine: {
        list: () => {
            if (!module.exports.api_key) throw new Error("Missing API Key. openai.api_key = YOUR_API_KEY");
            return new Promise((resolve, reject) => {
                var options = {
                    method: "GET",
                    url: "https://api.openai.com/v1/engines",
                    headers: {
                        Authorization: `Bearer ${module.exports.api_key}`,
                    },
                };
                if (module.exports.organization) {
                    options.headers["OpenAI-Organization"] = module.exports.organization;
                }
                console.log(options);
                request(options, function (error, response) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(JSON.parse(response.body));
                    }
                });
            });
        },

        retrieve: (engine_id) => {
            if (!engine_id) throw new Error("Missing engine id. Usage: openai.retrieve('davinvi')");
            if (!module.exports.api_key) throw new Error("Missing API Key. openai.api_key = YOUR_API_KEY");
            return new Promise((resolve, reject) => {
                var options = {
                    method: "GET",
                    url: `https://api.openai.com/v1/engines/${engine_id}`,
                    headers: {
                        Authorization: `Bearer ${module.exports.api_key}`,
                    },
                };
                if (module.exports.organization) {
                    options.headers["OpenAI-Organization"] = module.exports.organization;
                }
                request(options, function (error, response) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(JSON.parse(response.body));
                    }
                });
            });
        },
    },

    search: ({ documents = [], query = null, engine = "davinci" } = {}) => {
        if (documents.length === 0) throw new Error("Documents can't be empty");
        if (!query) throw new Error("Missing query");
        if (!module.exports.api_key) throw new Error("Missing API Key. openai.api_key = YOUR_API_KEY");
        return new Promise((resolve, reject) => {
            var options = {
                method: "POST",
                url: `https://api.openai.com/v1/engines/${engine}/search`,
                headers: {
                    Authorization: `Bearer ${module.exports.api_key}`,
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    documents: documents,
                    query: query,
                }),
            };
            if (module.exports.organization) {
                options.headers["OpenAI-Organization"] = module.exports.organization;
            }
            request(options, function (error, response) {
                if (error) {
                    reject(error);
                } else {
                    resolve(JSON.parse(response.body));
                }
            });
        });
    },

    parseCompletion(res) {
        return res.choices[0].text;
    },
};
