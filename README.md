# openai-node

A library for using the OpenAI GPT-3 API in Node. It tries to resemble OpenAI's provided Python bindings as closely as possible but with the additional asynchronous ways of Node.

_I am not affiliated with OpenAI._

_All methods require that the `api_key` is set to something._

_`organization` is optional for your organization ID, but if it's set to something, it'll be included in the header._

## Usage

### Install

`npm i openai-node`

### Completion

Completion takes the normal GPT-3 parameters. The only one that is actually required in this library is `prompt`, the rest have the default values shown below.

```js
var openai = require("openai-node");

openai.api_key = "YOUR API KEY"; // required
openai.organization = "YOUR ORGANIZATION ID"; // optional

//Completion
openai.Completion.create({
    model: "davinci",
    prompt: "Original: She no went to the market.\nStandard American English:",
    temperature: 1,
    max_tokens: 64,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 1,
    n: 1,
    stream: false,
    logprobs: null,
    echo: false,
    best_of: 1,
    stop: null,
}).then((response) => {
    console.log(response);
    //EXAMPLE OUTPUT: She didn't go to the market.
});
```

### Search

Search takes the normal GPT-3 parameters. `documents` and `query` must not be empty. Davinci is chosen by default.

```js
var openai = require("openai-node");

openai.api_key = "YOUR API KEY"; // required
openai.organization = "YOUR ORGANIZATION ID"; // optional

//Search
openai
    .Engine("davinci")
    .search({
        documents: ["whitehouse", "school", "hospital"],
        query: "president",
    })
    .then((response) => {
        console.log(response);
    });
/*
OUTPUT:
{
	object: 'list',
	data: [
		{ object: 'search_result', document: 0, score: 563.445 },
		{ object: 'search_result', document: 1, score: 155.26 },
		{ object: 'search_result', document: 2, score: 241.302 }
	],
	model: 'davinci:2020-05-03'
}*/
```

### Engine List

Engine List returns a list off all the engines GPT-3 has available. (`api_key` is still required)

```js
openai.Engine.list().then((res) => console.log(res));
```

### Engine Retrieve

Returns engine information. (`api_key` is still required)

```js
openai.Engine.retrieve("ada").then((res) => console.log(res));
/*
OUTPUT:
{
	id: 'ada',
	object: 'engine',
	created: null,
	max_replicas: null,
	owner: 'openai',
	permissions: null,
	ready: true,
	ready_replicas: null,
	replicas: null
}
*/
```

## File

### List

Lists all available files that belong to your organization.

```js
openai.File.list().then((res) => {
    console.log(res);
});
```

### Create

Sends a new file to the endpoint and returns back it's ID for use with Search and Classification. Learn more about files at OpenAI's documention. File must be a .jsonl (JSON Lines).

```js
const fs = require("fs");

openai.File.create({
    purpose: "answers",
    file: fs.createReadStream("./traning.jsonl"),
}).then((res) => {
    console.log(res);
    /* OUTPUT: 
	{
	  "id": "file-Twfy8T7YyIZR6jxPpIipbpxh",
	  "object": "file",
	  "bytes": 140,
	  "created_at": 1616240608,
	  "filename": "training.jsonl",
	  "purpose": "answers"
	}
	*/
});
```

## Remove

Removes file from your organization. OpenAI's Python library calls this function `delete` but that's a reserved word in JS.

```js
openai
    .File("file-Twfy8T7YyIZR6jxPpIipbpxh")
    .remove()
    .then((res) => {
        console.log(res);
    });
/* OUTPUT: 
{
  "id": "file-Twfy8T7YyIZR6jxPpIipbpxh",
  "object": "file",
  "deleted": true
}
*/
```

## Classifications (new)

Creates a new classification request. All parameters match OpenAI's. You can see them [here](https://beta.openai.com/docs/api-reference/classifications/create)

```js
openai.Classification.create({
	search_model: "ada",
	model: "curie",
	file: "file-XsOVjn4yoY2BRweTtcZB1P1B"
    query: "It is a raining day :(",
    labels: ["Positive", "Negative", "Neutral"],
}).then(res => {
	console.log(res);
})
```

## Answer

Creates a new answer request. All parameters match OpenAI's. You can see them [here](https://beta.openai.com/docs/api-reference/answers/create)

```js
openai.Answer.create({
	search_model: "ada",
	mode: "curie",
	question: "which puppy is happy?",
	documents: ["Puppy A is happy.", "Puppy B is sad."],
	examples_context: "In 2017, U.S. life expectancy was 78.6 years.",
	examples: [["What is human life expectancy in the United States?", "78 years."]],
	max_tokens: 5,
	stop: ["\n", "<|endoftext|>"
}).then(res => {
	console.log(res);
})
```
