!function(t){var n={};function e(r){if(n[r])return n[r].exports;var u=n[r]={i:r,l:!1,exports:{}};return t[r].call(u.exports,u,u.exports,e),u.l=!0,u.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var u in t)e.d(r,u,function(n){return t[n]}.bind(null,u));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="/fluxlogic/",e(e.s=0)}([function(t,n,e){"use strict";function r(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function u(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,r)}return e}function o(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?u(Object(e),!0).forEach((function(n){r(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):u(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function i(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function c(t){if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=function(t,n){if(t){if("string"===typeof t)return i(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(e):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?i(t,n):void 0}}(t))){var n=0,e=function(){};return{s:e,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:e}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,u,o=!0,c=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return o=t.done,t},e:function(t){c=!0,u=t},f:function(){try{o||null==r.return||r.return()}finally{if(c)throw u}}}}e.r(n),e.d(n,"startSimulation",(function(){return h})),e.d(n,"getState",(function(){return S})),e.d(n,"stopSimulation",(function(){return P})),e.d(n,"setUserInput",(function(){return w}));var a={and:function(t,n){return[p(t,n).every((function(t){return t}))]},or:function(t,n){return[p(t,n).some((function(t){return t}))]},xor:function(t,n){return[p(t,n).filter((function(t){return t})).length%2!==0]},constant:function(t,n){return[t.value]},led:function(){return[]},buffer:function(t,n){return p(t,n)},switch:function(t,n){return[Boolean(d(t,n))]},sender:function(){return[]},receiver:function(t,n,e){return p(l(t,e),n)},mux:function(t,n){var e=p(t,n),r=e.slice(0,t.n).reduce((function(t,n,e){return t+Number(n)*(1<<e)}),0);return[e[t.n+r]]},demux:function(t,n){var e=p(t,n),r=e.slice(0,t.n).reduce((function(t,n,e){return t+Number(n)*(1<<e)}),0),u=new Array(1<<t.n);return u.fill(!1),u[r]=e[t.n],u}};function s(){return{id:y(),connections:[]}}function f(t,n){var e={outputs:{},inputs:{}};if(n){var r,u=c(t.gates);try{for(u.s();!(r=u.n()).done;)for(var o=r.value,i=a[o.type](o,n,t),s=0;s<i.length;s++)e.outputs[o.outputs[s].id]=1===(i[s]^o.outputs[s].isInverted)}catch(y){u.e(y)}finally{u.f()}Object.assign(e.inputs,n.inputs)}else{var f,l=c(t.gates);try{for(l.s();!(f=l.n()).done;){var p,d=c(f.value.outputs);try{for(d.s();!(p=d.n()).done;){var b=p.value;e.outputs[b.id]=!1}}catch(y){d.e(y)}finally{d.f()}}}catch(y){l.e(y)}finally{l.f()}}return e}function l(t,n){return n.gates.find((function(n){return"sender"===n.type&&n.label===t.label}))}function p(t,n){return t.inputs.map((function(t){return 1===(n.outputs[t.connections[0]]^t.isInverted)}))}function d(t,n){return n.inputs[t.id]}var b=0;function y(){return b>=Number.MAX_SAFE_INTEGER&&(b=0),b++}var m=function(t){return Object.fromEntries(t.reduce((function(t,n){return t.concat(n.inputs.map((function(t){return t.id})),n.outputs.map((function(t){return t.id})))}),[]).map((function(t){return[t,!0]})))},v={nextState:f,getOutputs:function(t,n){return t.outputs.map((function(t){return n.outputs[t.id]}))},getInputs:p,getUserInput:d,setUserInput:function(t,n,e){n.inputs[t.id]=e},fastForward:function(t,n,e){for(var r=0;r<n;r++)e=f(t,e);return e},renumber:function(t){var n=o({},t),e=b,r=function(t){return b<Number.MAX_SAFE_INTEGER-t?t+b:t-Number.MAX_SAFE_INTEGER+b},u=function(t){var n=o({},t,{id:r(t.id)});return n.id>e&&(e=n.id),n.connections&&(n.connections=n.connections.map(r)),n};return n.gates=n.gates.map((function(t){var n=u(t);return n.inputs=n.inputs.map(u),n.outputs=n.outputs.map(u),n})),b=e+1,n},connect:function(t,n){t.connections.push(n.id),n.connections.push(t.id)},circuit:function(t){return{gates:t}},andGate:function(){return{id:y(),type:"and",inputs:[s(),s()],outputs:Object.seal([s()])}},orGate:function(){return{id:y(),type:"or",inputs:[s(),s()],outputs:Object.seal([s()])}},xorGate:function(){return{id:y(),type:"xor",inputs:[s(),s()],outputs:Object.seal([s()])}},constantGate:function(t){return{id:y(),type:"constant",inputs:Object.seal([]),outputs:Object.seal([s()]),value:t||!1}},switchGate:function(){return{id:y(),type:"switch",inputs:Object.seal([]),outputs:Object.seal([s()])}},sender:function(t){return{id:y(),type:"sender",label:t||"A",inputs:Object.seal([s()]),outputs:Object.seal([])}},receiver:function(t){return{id:y(),type:"receiver",label:t||"A",inputs:Object.seal([]),outputs:Object.seal([s()])}},led:function(){return{id:y(),type:"led",inputs:Object.seal([s()]),outputs:Object.seal([])}},buffer:function(){return{id:y(),type:"buffer",inputs:Object.seal([s()]),outputs:Object.seal([s()])}},pin:s,mux:function(t){for(var n=[],e=0;e<t;e++)n.push(s());for(var r=0;r<1<<t;r++)n.push(s());return{id:y(),type:"mux",n:t,inputs:Object.seal(n),outputs:Object.seal([s()])}},demux:function(t){for(var n=[s()],e=[],r=0;r<t;r++)n.push(s());for(var u=0;u<1<<t;u++)e.push(s());return{id:y(),type:"demux",n:t,inputs:Object.seal(n),outputs:Object.seal(e)}},removeInvalidConnections:function(t){var n=m(t);return t.map((function(t){var e=o({},t),r=function(t){return o({},t,{connections:t.connections.filter((function(t){return n[t]}))})};return e.inputs=e.inputs.map(r),e.outputs=e.outputs.map(r),e}))},getValidPins:m,findSender:l,getDuplicateSenderLabels:function(t){var n={};return t.forEach((function(t){"sender"===t.type&&(n[t.label]=(n[t.label]||0)+1)})),Object.entries(n).filter((function(t){return t[1]>1})).map((function(t){return t[0]})).sort()}},O=null,j=null,g=null;function h(t,n){if(O||j||g)throw new Error("simulation already started");O=n||v.nextState(t),j=function(){O=v.nextState(t,O)},g=setInterval(j,1)}function S(){return O}function P(){clearInterval(g),O=null,j=null,g=null}function w(t,n){v.setUserInput(t,O,n)}addEventListener("message",(function(t){var e,r=t.data,u=r.type,o=r.method,i=r.id,c=r.params;"RPC"===u&&o&&((e=n[o])?Promise.resolve().then((function(){return e.apply(n,c)})):Promise.reject("No such method")).then((function(t){postMessage({type:"RPC",id:i,result:t})})).catch((function(t){var n={message:t};t.stack&&(n.message=t.message,n.stack=t.stack,n.name=t.name),postMessage({type:"RPC",id:i,error:n})}))})),postMessage({type:"RPC",method:"ready"})}]);
//# sourceMappingURL=9999bf6c9cd165a1cee9.worker.js.map