#targetengine "com.github.kluman.pexels_Engine_Id"

// Third-party libraries.
#include "./json2.js"

// ExtendScript developers need to create external object instance first to dispatch messages back to plugin.
var externalObjectName = "PlugPlugExternalObject";
var myLib = new ExternalObject( "lib:" + externalObjectName );

function helloWorld() {
  return "hello world";
}
