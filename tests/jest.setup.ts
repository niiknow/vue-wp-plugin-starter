/*
  A helper script to mock a browser DOM with jsdom to enable testing
*/
/*const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  contentType: "text/html",
  includeNodeLocations: true,
  resources: "usable",
  storageQuota: 10000000,
  runScripts: "dangerously"
});

global.document = dom.window.document;
global.window = dom.window;
window.console = global.console;

Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node'
};*/
