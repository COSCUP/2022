define(["exports"],(function(t){"use strict";try{self["workbox:core:6.5.2"]&&_()}catch(t){}const e=(t,...e)=>{let s=t;return e.length>0&&(s+=` :: ${JSON.stringify(e)}`),s};class s extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:6.5.2"]&&_()}catch(t){}const n=t=>t&&"object"==typeof t?t:{handle:t};class i{constructor(t,e,s="GET"){this.handler=n(e),this.match=t,this.method=s}setCatchHandler(t){this.catchHandler=n(t)}}class r extends i{constructor(t,e,s){super((({url:e})=>{const s=t.exec(e.href);if(s&&(e.origin===location.origin||0===s.index))return s.slice(1)}),e,s)}}class a{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(t=>{const{request:e}=t,s=this.handleRequest({request:e,event:t});s&&t.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(t=>{if(t.data&&"CACHE_URLS"===t.data.type){const{payload:e}=t.data,s=Promise.all(e.urlsToCache.map((e=>{"string"==typeof e&&(e=[e]);const s=new Request(...e);return this.handleRequest({request:s,event:t})})));t.waitUntil(s),t.ports&&t.ports[0]&&s.then((()=>t.ports[0].postMessage(!0)))}}))}handleRequest({request:t,event:e}){const s=new URL(t.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:i,route:r}=this.findMatchingRoute({event:e,request:t,sameOrigin:n,url:s});let a=r&&r.handler;const c=t.method;if(!a&&this.i.has(c)&&(a=this.i.get(c)),!a)return;let o;try{o=a.handle({url:s,request:t,event:e,params:i})}catch(t){o=Promise.reject(t)}const h=r&&r.catchHandler;return o instanceof Promise&&(this.o||h)&&(o=o.catch((async n=>{if(h)try{return await h.handle({url:s,request:t,event:e,params:i})}catch(t){t instanceof Error&&(n=t)}if(this.o)return this.o.handle({url:s,request:t,event:e});throw n}))),o}findMatchingRoute({url:t,sameOrigin:e,request:s,event:n}){const i=this.t.get(s.method)||[];for(const r of i){let i;const a=r.match({url:t,sameOrigin:e,request:s,event:n});if(a)return i=a,(Array.isArray(i)&&0===i.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(i=void 0),{route:r,params:i}}return{}}setDefaultHandler(t,e="GET"){this.i.set(e,n(t))}setCatchHandler(t){this.o=n(t)}registerRoute(t){this.t.has(t.method)||this.t.set(t.method,[]),this.t.get(t.method).push(t)}unregisterRoute(t){if(!this.t.has(t.method))throw new s("unregister-route-but-not-found-with-method",{method:t.method});const e=this.t.get(t.method).indexOf(t);if(!(e>-1))throw new s("unregister-route-route-not-registered");this.t.get(t.method).splice(e,1)}}let c;const o=()=>(c||(c=new a,c.addFetchListener(),c.addCacheListener()),c);function h(t,e,n){let a;if("string"==typeof t){const s=new URL(t,location.href);a=new i((({url:t})=>t.href===s.href),e,n)}else if(t instanceof RegExp)a=new r(t,e,n);else if("function"==typeof t)a=new i(t,e,n);else{if(!(t instanceof i))throw new s("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=t}return o().registerRoute(a),a}const u={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},l=t=>[u.prefix,t,u.suffix].filter((t=>t&&t.length>0)).join("-"),f=t=>t||l(u.googleAnalytics),w=t=>t||l(u.precache),d=t=>t||l(u.runtime);function y(t){t.then((()=>{}))}const p=new Set;function m(){return m=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t},m.apply(this,arguments)}let g,R;const q=new WeakMap,b=new WeakMap,v=new WeakMap,D=new WeakMap,E=new WeakMap;let x={get(t,e,s){if(t instanceof IDBTransaction){if("done"===e)return b.get(t);if("objectStoreNames"===e)return t.objectStoreNames||v.get(t);if("store"===e)return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return N(t[e])},set:(t,e,s)=>(t[e]=s,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function U(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(R||(R=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(k(this),e),N(q.get(this))}:function(...e){return N(t.apply(k(this),e))}:function(e,...s){const n=t.call(k(this),e,...s);return v.set(n,e.sort?e.sort():[e]),N(n)}}function I(t){return"function"==typeof t?U(t):(t instanceof IDBTransaction&&function(t){if(b.has(t))return;const e=new Promise(((e,s)=>{const n=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",r),t.removeEventListener("abort",r)},i=()=>{e(),n()},r=()=>{s(t.error||new DOMException("AbortError","AbortError")),n()};t.addEventListener("complete",i),t.addEventListener("error",r),t.addEventListener("abort",r)}));b.set(t,e)}(t),e=t,(g||(g=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((t=>e instanceof t))?new Proxy(t,x):t);var e}function N(t){if(t instanceof IDBRequest)return function(t){const e=new Promise(((e,s)=>{const n=()=>{t.removeEventListener("success",i),t.removeEventListener("error",r)},i=()=>{e(N(t.result)),n()},r=()=>{s(t.error),n()};t.addEventListener("success",i),t.addEventListener("error",r)}));return e.then((e=>{e instanceof IDBCursor&&q.set(e,t)})).catch((()=>{})),E.set(e,t),e}(t);if(D.has(t))return D.get(t);const e=I(t);return e!==t&&(D.set(t,e),E.set(e,t)),e}const k=t=>E.get(t);function L(t,e,{blocked:s,upgrade:n,blocking:i,terminated:r}={}){const a=indexedDB.open(t,e),c=N(a);return n&&a.addEventListener("upgradeneeded",(t=>{n(N(a.result),t.oldVersion,t.newVersion,N(a.transaction))})),s&&a.addEventListener("blocked",(()=>s())),c.then((t=>{r&&t.addEventListener("close",(()=>r())),i&&t.addEventListener("versionchange",(()=>i()))})).catch((()=>{})),c}const T=["get","getKey","getAll","getAllKeys","count"],B=["put","add","delete","clear"],O=new Map;function C(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(O.get(e))return O.get(e);const s=e.replace(/FromIndex$/,""),n=e!==s,i=B.includes(s);if(!(s in(n?IDBIndex:IDBObjectStore).prototype)||!i&&!T.includes(s))return;const r=async function(t,...e){const r=this.transaction(t,i?"readwrite":"readonly");let a=r.store;return n&&(a=a.index(e.shift())),(await Promise.all([a[s](...e),i&&r.done]))[0]};return O.set(e,r),r}x=(t=>m({},t,{get:(e,s,n)=>C(e,s)||t.get(e,s,n),has:(e,s)=>!!C(e,s)||t.has(e,s)}))(x);try{self["workbox:expiration:6.5.2"]&&_()}catch(t){}const P="cache-entries",S=t=>{const e=new URL(t,location.href);return e.hash="",e.href};class j{constructor(t){this.h=null,this.u=t}l(t){const e=t.createObjectStore(P,{keyPath:"id"});e.createIndex("cacheName","cacheName",{unique:!1}),e.createIndex("timestamp","timestamp",{unique:!1})}p(t){this.l(t),this.u&&function(t,{blocked:e}={}){const s=indexedDB.deleteDatabase(t);e&&s.addEventListener("blocked",(()=>e())),N(s).then((()=>{}))}(this.u)}async setTimestamp(t,e){const s={url:t=S(t),timestamp:e,cacheName:this.u,id:this.m(t)},n=(await this.getDb()).transaction(P,"readwrite",{durability:"relaxed"});await n.store.put(s),await n.done}async getTimestamp(t){const e=await this.getDb(),s=await e.get(P,this.m(t));return null==s?void 0:s.timestamp}async expireEntries(t,e){const s=await this.getDb();let n=await s.transaction(P).store.index("timestamp").openCursor(null,"prev");const i=[];let r=0;for(;n;){const s=n.value;s.cacheName===this.u&&(t&&s.timestamp<t||e&&r>=e?i.push(n.value):r++),n=await n.continue()}const a=[];for(const t of i)await s.delete(P,t.id),a.push(t.url);return a}m(t){return this.u+"|"+S(t)}async getDb(){return this.h||(this.h=await L("workbox-expiration",1,{upgrade:this.p.bind(this)})),this.h}}class M{constructor(t,e={}){this.g=!1,this.R=!1,this.q=e.maxEntries,this.v=e.maxAgeSeconds,this.D=e.matchOptions,this.u=t,this._=new j(t)}async expireEntries(){if(this.g)return void(this.R=!0);this.g=!0;const t=this.v?Date.now()-1e3*this.v:0,e=await this._.expireEntries(t,this.q),s=await self.caches.open(this.u);for(const t of e)await s.delete(t,this.D);this.g=!1,this.R&&(this.R=!1,y(this.expireEntries()))}async updateTimestamp(t){await this._.setTimestamp(t,Date.now())}async isURLExpired(t){if(this.v){const e=await this._.getTimestamp(t),s=Date.now()-1e3*this.v;return void 0===e||e<s}return!1}async delete(){this.R=!1,await this._.expireEntries(1/0)}}try{self["workbox:cacheable-response:6.5.2"]&&_()}catch(t){}class W{constructor(t={}){this.U=t.statuses,this.I=t.headers}isResponseCacheable(t){let e=!0;return this.U&&(e=this.U.includes(t.status)),this.I&&e&&(e=Object.keys(this.I).some((e=>t.headers.get(e)===this.I[e]))),e}}try{self["workbox:strategies:6.5.2"]&&_()}catch(t){}const K={cacheWillUpdate:async({response:t})=>200===t.status||0===t.status?t:null};function A(t,e){const s=new URL(t);for(const t of e)s.searchParams.delete(t);return s.href}class F{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}function $(t){return new Promise((e=>setTimeout(e,t)))}function G(t){return"string"==typeof t?new Request(t):t}class H{constructor(t,e){this.N={},Object.assign(this,e),this.event=e.event,this.k=t,this.L=new F,this.T=[],this.B=[...t.plugins],this.O=new Map;for(const t of this.B)this.O.set(t,{});this.event.waitUntil(this.L.promise)}async fetch(t){const{event:e}=this;let n=G(t);if("navigate"===n.mode&&e instanceof FetchEvent&&e.preloadResponse){const t=await e.preloadResponse;if(t)return t}const i=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const t of this.iterateCallbacks("requestWillFetch"))n=await t({request:n.clone(),event:e})}catch(t){if(t instanceof Error)throw new s("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const r=n.clone();try{let t;t=await fetch(n,"navigate"===n.mode?void 0:this.k.fetchOptions);for(const s of this.iterateCallbacks("fetchDidSucceed"))t=await s({event:e,request:r,response:t});return t}catch(t){throw i&&await this.runCallbacks("fetchDidFail",{error:t,event:e,originalRequest:i.clone(),request:r.clone()}),t}}async fetchAndCachePut(t){const e=await this.fetch(t),s=e.clone();return this.waitUntil(this.cachePut(t,s)),e}async cacheMatch(t){const e=G(t);let s;const{cacheName:n,matchOptions:i}=this.k,r=await this.getCacheKey(e,"read"),a=Object.assign(Object.assign({},i),{cacheName:n});s=await caches.match(r,a);for(const t of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await t({cacheName:n,matchOptions:i,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(t,e){const n=G(t);await $(0);const i=await this.getCacheKey(n,"write");if(!e)throw new s("cache-put-with-no-response",{url:(r=i.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const a=await this.C(e);if(!a)return!1;const{cacheName:c,matchOptions:o}=this.k,h=await self.caches.open(c),u=this.hasCallback("cacheDidUpdate"),l=u?await async function(t,e,s,n){const i=A(e.url,s);if(e.url===i)return t.match(e,n);const r=Object.assign(Object.assign({},n),{ignoreSearch:!0}),a=await t.keys(e,r);for(const e of a)if(i===A(e.url,s))return t.match(e,n)}(h,i.clone(),["__WB_REVISION__"],o):null;try{await h.put(i,u?a.clone():a)}catch(t){if(t instanceof Error)throw"QuotaExceededError"===t.name&&await async function(){for(const t of p)await t()}(),t}for(const t of this.iterateCallbacks("cacheDidUpdate"))await t({cacheName:c,oldResponse:l,newResponse:a.clone(),request:i,event:this.event});return!0}async getCacheKey(t,e){const s=`${t.url} | ${e}`;if(!this.N[s]){let n=t;for(const t of this.iterateCallbacks("cacheKeyWillBeUsed"))n=G(await t({mode:e,request:n,event:this.event,params:this.params}));this.N[s]=n}return this.N[s]}hasCallback(t){for(const e of this.k.plugins)if(t in e)return!0;return!1}async runCallbacks(t,e){for(const s of this.iterateCallbacks(t))await s(e)}*iterateCallbacks(t){for(const e of this.k.plugins)if("function"==typeof e[t]){const s=this.O.get(e),n=n=>{const i=Object.assign(Object.assign({},n),{state:s});return e[t](i)};yield n}}waitUntil(t){return this.T.push(t),t}async doneWaiting(){let t;for(;t=this.T.shift();)await t}destroy(){this.L.resolve(null)}async C(t){let e=t,s=!1;for(const t of this.iterateCallbacks("cacheWillUpdate"))if(e=await t({request:this.request,response:e,event:this.event})||void 0,s=!0,!e)break;return s||e&&200!==e.status&&(e=void 0),e}}class Q{constructor(t={}){this.cacheName=d(t.cacheName),this.plugins=t.plugins||[],this.fetchOptions=t.fetchOptions,this.matchOptions=t.matchOptions}handle(t){const[e]=this.handleAll(t);return e}handleAll(t){t instanceof FetchEvent&&(t={event:t,request:t.request});const e=t.event,s="string"==typeof t.request?new Request(t.request):t.request,n="params"in t?t.params:void 0,i=new H(this,{event:e,request:s,params:n}),r=this.P(i,s,e);return[r,this.S(r,i,s,e)]}async P(t,e,n){let i;await t.runCallbacks("handlerWillStart",{event:n,request:e});try{if(i=await this.j(e,t),!i||"error"===i.type)throw new s("no-response",{url:e.url})}catch(s){if(s instanceof Error)for(const r of t.iterateCallbacks("handlerDidError"))if(i=await r({error:s,event:n,request:e}),i)break;if(!i)throw s}for(const s of t.iterateCallbacks("handlerWillRespond"))i=await s({event:n,request:e,response:i});return i}async S(t,e,s,n){let i,r;try{i=await t}catch(r){}try{await e.runCallbacks("handlerDidRespond",{event:n,request:s,response:i}),await e.doneWaiting()}catch(t){t instanceof Error&&(r=t)}if(await e.runCallbacks("handlerDidComplete",{event:n,request:s,response:i,error:r}),e.destroy(),r)throw r}}class z extends Q{constructor(t={}){super(t),this.plugins.some((t=>"cacheWillUpdate"in t))||this.plugins.unshift(K),this.M=t.networkTimeoutSeconds||0}async j(t,e){const n=[],i=[];let r;if(this.M){const{id:s,promise:a}=this.W({request:t,logs:n,handler:e});r=s,i.push(a)}const a=this.K({timeoutId:r,request:t,logs:n,handler:e});i.push(a);const c=await e.waitUntil((async()=>await e.waitUntil(Promise.race(i))||await a)());if(!c)throw new s("no-response",{url:t.url});return c}W({request:t,logs:e,handler:s}){let n;return{promise:new Promise((e=>{n=setTimeout((async()=>{e(await s.cacheMatch(t))}),1e3*this.M)})),id:n}}async K({timeoutId:t,request:e,logs:s,handler:n}){let i,r;try{r=await n.fetchAndCachePut(e)}catch(t){t instanceof Error&&(i=t)}return t&&clearTimeout(t),!i&&r||(r=await n.cacheMatch(e)),r}}function V(t,e){const s=e();return t.waitUntil(s),s}try{self["workbox:precaching:6.5.2"]&&_()}catch(t){}function J(t){if(!t)throw new s("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:e,url:n}=t;if(!n)throw new s("add-to-cache-list-unexpected-type",{entry:t});if(!e){const t=new URL(n,location.href);return{cacheKey:t.href,url:t.href}}const i=new URL(n,location.href),r=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",e),{cacheKey:i.href,url:r.href}}class X{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:t,state:e})=>{e&&(e.originalRequest=t)},this.cachedResponseWillBeUsed=async({event:t,state:e,cachedResponse:s})=>{if("install"===t.type&&e&&e.originalRequest&&e.originalRequest instanceof Request){const t=e.originalRequest.url;s?this.notUpdatedURLs.push(t):this.updatedURLs.push(t)}return s}}}class Y{constructor({precacheController:t}){this.cacheKeyWillBeUsed=async({request:t,params:e})=>{const s=(null==e?void 0:e.cacheKey)||this.A.getCacheKeyForURL(t.url);return s?new Request(s,{headers:t.headers}):t},this.A=t}}let Z,tt;async function et(t,e){let n=null;if(t.url){n=new URL(t.url).origin}if(n!==self.location.origin)throw new s("cross-origin-copy-response",{origin:n});const i=t.clone(),r={headers:new Headers(i.headers),status:i.status,statusText:i.statusText},a=e?e(r):r,c=function(){if(void 0===Z){const t=new Response("");if("body"in t)try{new Response(t.body),Z=!0}catch(t){Z=!1}Z=!1}return Z}()?i.body:await i.blob();return new Response(c,a)}class st extends Q{constructor(t={}){t.cacheName=w(t.cacheName),super(t),this.F=!1!==t.fallbackToNetwork,this.plugins.push(st.copyRedirectedCacheableResponsesPlugin)}async j(t,e){const s=await e.cacheMatch(t);return s||(e.event&&"install"===e.event.type?await this.$(t,e):await this.G(t,e))}async G(t,e){let n;const i=e.params||{};if(!this.F)throw new s("missing-precache-entry",{cacheName:this.cacheName,url:t.url});{const s=i.integrity,r=t.integrity,a=!r||r===s;n=await e.fetch(new Request(t,{integrity:r||s})),s&&a&&(this.H(),await e.cachePut(t,n.clone()))}return n}async $(t,e){this.H();const n=await e.fetch(t);if(!await e.cachePut(t,n.clone()))throw new s("bad-precaching-response",{url:t.url,status:n.status});return n}H(){let t=null,e=0;for(const[s,n]of this.plugins.entries())n!==st.copyRedirectedCacheableResponsesPlugin&&(n===st.defaultPrecacheCacheabilityPlugin&&(t=s),n.cacheWillUpdate&&e++);0===e?this.plugins.push(st.defaultPrecacheCacheabilityPlugin):e>1&&null!==t&&this.plugins.splice(t,1)}}st.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:t})=>!t||t.status>=400?null:t},st.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:t})=>t.redirected?await et(t):t};class nt{constructor({cacheName:t,plugins:e=[],fallbackToNetwork:s=!0}={}){this.V=new Map,this.J=new Map,this.X=new Map,this.k=new st({cacheName:w(t),plugins:[...e,new Y({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.k}precache(t){this.addToCacheList(t),this.Y||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.Y=!0)}addToCacheList(t){const e=[];for(const n of t){"string"==typeof n?e.push(n):n&&void 0===n.revision&&e.push(n.url);const{cacheKey:t,url:i}=J(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this.V.has(i)&&this.V.get(i)!==t)throw new s("add-to-cache-list-conflicting-entries",{firstEntry:this.V.get(i),secondEntry:t});if("string"!=typeof n&&n.integrity){if(this.X.has(t)&&this.X.get(t)!==n.integrity)throw new s("add-to-cache-list-conflicting-integrities",{url:i});this.X.set(t,n.integrity)}if(this.V.set(i,t),this.J.set(i,r),e.length>0){const t=`Workbox is precaching URLs without revision info: ${e.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(t)}}}install(t){return V(t,(async()=>{const e=new X;this.strategy.plugins.push(e);for(const[e,s]of this.V){const n=this.X.get(s),i=this.J.get(e),r=new Request(e,{integrity:n,cache:i,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:t}))}const{updatedURLs:s,notUpdatedURLs:n}=e;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(t){return V(t,(async()=>{const t=await self.caches.open(this.strategy.cacheName),e=await t.keys(),s=new Set(this.V.values()),n=[];for(const i of e)s.has(i.url)||(await t.delete(i),n.push(i.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this.V}getCachedURLs(){return[...this.V.keys()]}getCacheKeyForURL(t){const e=new URL(t,location.href);return this.V.get(e.href)}getIntegrityForCacheKey(t){return this.X.get(t)}async matchPrecache(t){const e=t instanceof Request?t.url:t,s=this.getCacheKeyForURL(e);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(t){const e=this.getCacheKeyForURL(t);if(!e)throw new s("non-precached-url",{url:t});return s=>(s.request=new Request(t),s.params=Object.assign({cacheKey:e},s.params),this.strategy.handle(s))}}const it=()=>(tt||(tt=new nt),tt);class rt extends i{constructor(t,e){super((({request:s})=>{const n=t.getURLsToCacheKeys();for(const i of function*(t,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:i}={}){const r=new URL(t,location.href);r.hash="",yield r.href;const a=function(t,e=[]){for(const s of[...t.searchParams.keys()])e.some((t=>t.test(s)))&&t.searchParams.delete(s);return t}(r,e);if(yield a.href,s&&a.pathname.endsWith("/")){const t=new URL(a.href);t.pathname+=s,yield t.href}if(n){const t=new URL(a.href);t.pathname+=".html",yield t.href}if(i){const t=i({url:r});for(const e of t)yield e.href}}(s.url,e)){const e=n.get(i);if(e){return{cacheKey:e,integrity:t.getIntegrityForCacheKey(e)}}}}),t.strategy)}}try{self["workbox:background-sync:6.5.2"]&&_()}catch(t){}const at="requests",ct="queueName";class ot{constructor(){this.h=null}async addEntry(t){const e=(await this.getDb()).transaction(at,"readwrite",{durability:"relaxed"});await e.store.add(t),await e.done}async getFirstEntryId(){const t=await this.getDb(),e=await t.transaction(at).store.openCursor();return null==e?void 0:e.value.id}async getAllEntriesByQueueName(t){const e=await this.getDb(),s=await e.getAllFromIndex(at,ct,IDBKeyRange.only(t));return s||new Array}async getEntryCountByQueueName(t){return(await this.getDb()).countFromIndex(at,ct,IDBKeyRange.only(t))}async deleteEntry(t){const e=await this.getDb();await e.delete(at,t)}async getFirstEntryByQueueName(t){return await this.getEndEntryFromIndex(IDBKeyRange.only(t),"next")}async getLastEntryByQueueName(t){return await this.getEndEntryFromIndex(IDBKeyRange.only(t),"prev")}async getEndEntryFromIndex(t,e){const s=await this.getDb(),n=await s.transaction(at).store.index(ct).openCursor(t,e);return null==n?void 0:n.value}async getDb(){return this.h||(this.h=await L("workbox-background-sync",3,{upgrade:this.l})),this.h}l(t,e){e>0&&e<3&&t.objectStoreNames.contains(at)&&t.deleteObjectStore(at);t.createObjectStore(at,{autoIncrement:!0,keyPath:"id"}).createIndex(ct,ct,{unique:!1})}}class ht{constructor(t){this.Z=t,this.tt=new ot}async pushEntry(t){delete t.id,t.queueName=this.Z,await this.tt.addEntry(t)}async unshiftEntry(t){const e=await this.tt.getFirstEntryId();e?t.id=e-1:delete t.id,t.queueName=this.Z,await this.tt.addEntry(t)}async popEntry(){return this.et(await this.tt.getLastEntryByQueueName(this.Z))}async shiftEntry(){return this.et(await this.tt.getFirstEntryByQueueName(this.Z))}async getAll(){return await this.tt.getAllEntriesByQueueName(this.Z)}async size(){return await this.tt.getEntryCountByQueueName(this.Z)}async deleteEntry(t){await this.tt.deleteEntry(t)}async et(t){return t&&await this.deleteEntry(t.id),t}}const ut=["method","referrer","referrerPolicy","mode","credentials","cache","redirect","integrity","keepalive"];class lt{constructor(t){"navigate"===t.mode&&(t.mode="same-origin"),this.st=t}static async fromRequest(t){const e={url:t.url,headers:{}};"GET"!==t.method&&(e.body=await t.clone().arrayBuffer());for(const[s,n]of t.headers.entries())e.headers[s]=n;for(const s of ut)void 0!==t[s]&&(e[s]=t[s]);return new lt(e)}toObject(){const t=Object.assign({},this.st);return t.headers=Object.assign({},this.st.headers),t.body&&(t.body=t.body.slice(0)),t}toRequest(){return new Request(this.st.url,this.st)}clone(){return new lt(this.toObject())}}const ft="workbox-background-sync",wt=new Set,dt=t=>{const e={request:new lt(t.requestData).toRequest(),timestamp:t.timestamp};return t.metadata&&(e.metadata=t.metadata),e};class yt{constructor(t,{forceSyncFallback:e,onSync:n,maxRetentionTime:i}={}){if(this.nt=!1,this.it=!1,wt.has(t))throw new s("duplicate-queue-name",{name:t});wt.add(t),this.rt=t,this.at=n||this.replayRequests,this.ct=i||10080,this.ot=Boolean(e),this.ht=new ht(this.rt),this.ut()}get name(){return this.rt}async pushRequest(t){await this.lt(t,"push")}async unshiftRequest(t){await this.lt(t,"unshift")}async popRequest(){return this.ft("pop")}async shiftRequest(){return this.ft("shift")}async getAll(){const t=await this.ht.getAll(),e=Date.now(),s=[];for(const n of t){const t=60*this.ct*1e3;e-n.timestamp>t?await this.ht.deleteEntry(n.id):s.push(dt(n))}return s}async size(){return await this.ht.size()}async lt({request:t,metadata:e,timestamp:s=Date.now()},n){const i={requestData:(await lt.fromRequest(t.clone())).toObject(),timestamp:s};switch(e&&(i.metadata=e),n){case"push":await this.ht.pushEntry(i);break;case"unshift":await this.ht.unshiftEntry(i)}this.nt?this.it=!0:await this.registerSync()}async ft(t){const e=Date.now();let s;switch(t){case"pop":s=await this.ht.popEntry();break;case"shift":s=await this.ht.shiftEntry()}if(s){const n=60*this.ct*1e3;return e-s.timestamp>n?this.ft(t):dt(s)}}async replayRequests(){let t;for(;t=await this.shiftRequest();)try{await fetch(t.request.clone())}catch(e){throw await this.unshiftRequest(t),new s("queue-replay-failed",{name:this.rt})}}async registerSync(){if("sync"in self.registration&&!this.ot)try{await self.registration.sync.register(`${ft}:${this.rt}`)}catch(t){}}ut(){"sync"in self.registration&&!this.ot?self.addEventListener("sync",(t=>{if(t.tag===`${ft}:${this.rt}`){const e=async()=>{let e;this.nt=!0;try{await this.at({queue:this})}catch(t){if(t instanceof Error)throw e=t,e}finally{!this.it||e&&!t.lastChance||await this.registerSync(),this.nt=!1,this.it=!1}};t.waitUntil(e())}})):this.at({queue:this})}static get wt(){return wt}}class pt{constructor(t,e){this.fetchDidFail=async({request:t})=>{await this.dt.pushRequest({request:t})},this.dt=new yt(t,e)}}class mt extends Q{constructor(t={}){super(t),this.M=t.networkTimeoutSeconds||0}async j(t,e){let n,i;try{const s=[e.fetch(t)];if(this.M){const t=$(1e3*this.M);s.push(t)}if(i=await Promise.race(s),!i)throw new Error(`Timed out the network response after ${this.M} seconds.`)}catch(t){t instanceof Error&&(n=t)}if(!i)throw new s("no-response",{url:t.url,error:n});return i}}try{self["workbox:google-analytics:6.5.2"]&&_()}catch(t){}const gt="www.google-analytics.com",Rt="www.googletagmanager.com",qt=/^\/(\w+\/)?collect/,bt=t=>{const e=({url:t})=>t.hostname===gt&&qt.test(t.pathname),s=new mt({plugins:[t]});return[new i(e,s,"GET"),new i(e,s,"POST")]},vt=t=>{const e=new z({cacheName:t});return new i((({url:t})=>t.hostname===gt&&"/analytics.js"===t.pathname),e,"GET")},Dt=t=>{const e=new z({cacheName:t});return new i((({url:t})=>t.hostname===Rt&&"/gtag/js"===t.pathname),e,"GET")},Et=t=>{const e=new z({cacheName:t});return new i((({url:t})=>t.hostname===Rt&&"/gtm.js"===t.pathname),e,"GET")};t.CacheableResponsePlugin=class{constructor(t){this.cacheWillUpdate=async({response:t})=>this.yt.isResponseCacheable(t)?t:null,this.yt=new W(t)}},t.ExpirationPlugin=class{constructor(t={}){this.cachedResponseWillBeUsed=async({event:t,request:e,cacheName:s,cachedResponse:n})=>{if(!n)return null;const i=this.gt(n),r=this.Rt(s);y(r.expireEntries());const a=r.updateTimestamp(e.url);if(t)try{t.waitUntil(a)}catch(t){}return i?n:null},this.cacheDidUpdate=async({cacheName:t,request:e})=>{const s=this.Rt(t);await s.updateTimestamp(e.url),await s.expireEntries()},this.qt=t,this.v=t.maxAgeSeconds,this.bt=new Map,t.purgeOnQuotaError&&function(t){p.add(t)}((()=>this.deleteCacheAndMetadata()))}Rt(t){if(t===d())throw new s("expire-custom-caches-only");let e=this.bt.get(t);return e||(e=new M(t,this.qt),this.bt.set(t,e)),e}gt(t){if(!this.v)return!0;const e=this.vt(t);if(null===e)return!0;return e>=Date.now()-1e3*this.v}vt(t){if(!t.headers.has("date"))return null;const e=t.headers.get("date"),s=new Date(e).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[t,e]of this.bt)await self.caches.delete(t),await e.delete();this.bt=new Map}},t.NavigationRoute=class extends i{constructor(t,{allowlist:e=[/./],denylist:s=[]}={}){super((t=>this.Dt(t)),t),this.Et=e,this.xt=s}Dt({url:t,request:e}){if(e&&"navigate"!==e.mode)return!1;const s=t.pathname+t.search;for(const t of this.xt)if(t.test(s))return!1;return!!this.Et.some((t=>t.test(s)))}},t.NetworkFirst=z,t.cleanupOutdatedCaches=function(){self.addEventListener("activate",(t=>{const e=w();t.waitUntil((async(t,e="-precache-")=>{const s=(await self.caches.keys()).filter((s=>s.includes(e)&&s.includes(self.registration.scope)&&s!==t));return await Promise.all(s.map((t=>self.caches.delete(t)))),s})(e).then((t=>{})))}))},t.clientsClaim=function(){self.addEventListener("activate",(()=>self.clients.claim()))},t.createHandlerBoundToURL=function(t){return it().createHandlerBoundToURL(t)},t.initialize=(t={})=>{const e=f(t.cacheName),s=new pt("workbox-google-analytics",{maxRetentionTime:2880,onSync:(n=t,async({queue:t})=>{let e;for(;e=await t.shiftRequest();){const{request:s,timestamp:i}=e,r=new URL(s.url);try{const t="POST"===s.method?new URLSearchParams(await s.clone().text()):r.searchParams,e=i-(Number(t.get("qt"))||0),a=Date.now()-e;if(t.set("qt",String(a)),n.parameterOverrides)for(const e of Object.keys(n.parameterOverrides)){const s=n.parameterOverrides[e];t.set(e,s)}"function"==typeof n.hitFilter&&n.hitFilter.call(null,t),await fetch(new Request(r.origin+r.pathname,{body:t.toString(),method:"POST",mode:"cors",credentials:"omit",headers:{"Content-Type":"text/plain"}}))}catch(s){throw await t.unshiftRequest(e),s}}})});var n;const i=[Et(e),vt(e),Dt(e),...bt(s)],r=new a;for(const t of i)r.registerRoute(t);r.addFetchListener()},t.precacheAndRoute=function(t,e){!function(t){it().precache(t)}(t),function(t){const e=it();h(new rt(e,t))}(e)},t.registerRoute=h}));