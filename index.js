const Search = require("./methods/Search");
const EngineList = require("./methods/EngineList");
const EngineRetrieve = require("./methods/EngineRetrieve");
const CompletionCreate = require("./methods/CompletionCreate");
const ClassificationCreate = require("./methods/ClassificationCreate");
const AnswerCreate = require("./methods/AnswerCreate");
const Headers = require("./methods/Headers");
const FileList = require("./methods/FileList");
const FileCreate = require("./methods/FileCreate");
const FileDelete = require("./methods/FileDelete");

module.exports = {
    api_key: null,
    organization: null,

    Completion: (function () {
        function create(data) {
            return CompletionCreate(new Headers(module.exports.api_key, module.exports.organization), data);
        }

        return { create };
    })(),

    Engine: (function () {
        var engine = undefined;

        function search(data) {
            return Search(new Headers(module.exports.api_key, module.exports.organization), { engine: engine, ...data });
        }

        function list() {
            return EngineList(new Headers(module.exports.api_key, module.exports.organization));
        }

        function retreive(engine) {
            return EngineRetrieve(new Headers(module.exports.api_key, module.exports.organization), engine);
        }

        function main(e) {
            engine = e;
            return {
                search: search,
                list: list,
            };
        }

        main.search = search;
        main.list = list;
        main.retreive = retreive;
        return main;
    })(),

    Classification: (function () {
        function create(data) {
            return ClassificationCreate(new Headers(module.exports.api_key, module.exports.organization), data);
        }

        return { create };
    })(),

    Answer: (function () {
        function create(data) {
            return AnswerCreate(new Headers(module.exports.api_key, module.exports.organization), data);
        }

        return { create };
    })(),

    File: (function () {
        fileid = undefined;
        function list() {
            return FileList(new Headers(module.exports.api_key, module.exports.organization));
        }

        function create(data) {
            return FileCreate(new Headers(module.exports.api_key, module.exports.organization), data);
        }

        function remove() {
            return FileDelete(new Headers(module.exports.api_key, module.exports.organization), fileid);
        }

        function main(e) {
            fileid = e;
            return {
                remove: remove,
            };
        }

        main.list = list;
        main.create = create;
        main.remove = remove;
        return main;
    })(),
};
