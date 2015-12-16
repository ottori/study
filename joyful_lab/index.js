//index.js

var server = require("./server");
var router = require("./router");
var requestHandlers  = require("./requestHandlers")

//path�� ����Ǵ� �Լ��� ������ ����.
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/hello"] = requestHandlers.hello;

server.start( router.route, handle );
