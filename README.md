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

The response is the exact response OpenAI sends back but `openai.parseCompletion(response)` will just return the first completion choice you're likely looking for.

```js
var openai = require("openai-node");

openai.api_key = "YOUR API KEY"; // required
openai.organization = "YOUR ORGANIZATION ID"; // optional

//Completion
openai
    .completion({
        engine: "davinci",
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
    })
    .then((response) => {
        console.log(openai.parseCompletion(response));
        //OUTPUT: She didn't go to the market.
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
    .search({
        engine: "davinci",
        documents: ["whitehouse", "school", "hospital"],
        query: "president",
    })
    .then((response) => {
        console.log(response);
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
	}
	*/
    });
```

### Engine List

Engine List returns a list off all the engines GPT-3 has available. (`api_key` is still required)

```js
openai.engine.list().then((res) => console.log(res));
```

### Engine Retrieve

Returns engine information. (`api_key` is still required)

```js
openai.engine.retrieve("ada").then((res) => console.log(res));
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
