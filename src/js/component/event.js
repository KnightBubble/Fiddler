/**
 * 事件相关
 * @return {[type]} [description]
 */
var Fiddler_Event = function(){
    "use strict";
    function init(){
        chrome.webRequest.onBeforeRequest.addListener(function(details) {
            var result = Fiddler_Rule.fireSome("onBeforeRequest", details);
            if (result) {
                return result;
            };
            return {};
           }, {urls:["<all_urls>"]}, ["blocking", "requestBody"] 
        );
        chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
            Fiddler_Rule.fireSome("onBeforeSendHeaders", details);
          }, {urls: ["<all_urls>"]}, ["blocking", "requestHeaders"]
        );
        chrome.webRequest.onCompleted.addListener(function(details) {
            Fiddler_Rule.fire("onCompleted", details);
        }, {urls: ["<all_urls>"]}, ["responseHeaders"]);
    }
    return {
        init: function(){
            init();
        }
    }
}();