!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(e.quicklink={})}(this,function(e){function n(e){return new Promise(function(n,r,t){(t=new XMLHttpRequest).open("GET",e,t.withCredentials=!0),t.onload=function(){200===t.status?n():r()},t.send()})}var r,t=(r=document.createElement("link")).relList&&r.relList.supports&&r.relList.supports("prefetch")?function(e){return new Promise(function(n,r,t){(t=document.createElement("link")).rel="prefetch",t.href=e,t.onload=n,t.onerror=r,document.head.appendChild(t)})}:n,o=window.requestIdleCallback||function(e){var n=Date.now();return setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-n))}})},1)};function i(e){if("string"==typeof e&&window.location.origin!==new URL(e,window.location.origin).origin)throw e;return!0}var c=new Set,u=new Set,s=!1;function a(e){if(e){if(e.saveData)return Promise.reject(new Error("Save-Data is enabled"));if(/2g/.test(e.effectiveType))return Promise.reject(new Error("network conditions are poor"))}return Promise.resolve(!0)}function f(e,r,o){return a(navigator.connection).catch(function(e){return Promise.reject(new Error("Cannot prefetch, "+e.message))}),u.size>0&&!s&&console.warn("[Warning] You are using both prefetching and prerendering on the same document"),Promise.all([].concat(e).map(function(e){if(!c.has(e))return c.add(e),(r?function(e){return window.fetch?fetch(e,{credentials:"include"}):n(e)}:t)(new URL(e,location.href).toString())}))}function l(e,n){if(a(navigator.connection).catch(function(e){return Promise.reject(new Error("Cannot prerender, "+e.message))}),!HTMLScriptElement.supports("speculationrules"))return f(e),Promise.reject(new Error("This Browser does not support Speculation Rules API. Falling back to Prefetch."));if(document.querySelector('script[type="speculationrules"]'))return Promise.reject(new Error("Speculation Rules is already defined and cannot be altered."));try{[].concat(e).filter(i).map(function(e){u.has(e)||u.add(e)})}catch(e){return Promise.reject(new Error("Only same origin URL(s) are allowed: "+e))}return c.size>0&&!s&&console.warn("[Warning] You are using both prefetching and prerendering on the same document"),Promise.resolve((r=u,new Promise(function(e,n,t){(t=document.createElement("script")).type="speculationrules",t.text='{"prerender":[{"source": "list","urls": ["'+Array.from(r).join('","')+'"]}]}',document.head.appendChild(t),e()})));var r}e.listen=function(e){if(e||(e={}),window.IntersectionObserver){var n=function(e){e=e||1;var n=[],r=0;function t(){r<e&&n.length>0&&(n.shift()(),r++)}return[function(e){n.push(e)>1||t()},function(){r--,t()}]}(e.throttle||1/0),r=n[0],t=n[1],i=e.limit||1/0,a=e.origins||[location.hostname],d=e.ignores||[],h=e.delay||0,p=[],m=e.timeoutFn||o,w="function"==typeof e.hrefFn&&e.hrefFn,g=e.prerender||!1;s=e.prerenderAndPrefetch||!1;var v=new IntersectionObserver(function(n){n.forEach(function(n){if(n.isIntersecting)p.push((n=n.target).href),function(e,n){n?setTimeout(e,n):e()}(function(){-1!==p.indexOf(n.href)&&(v.unobserve(n),(s||g)&&u.size<1?l(w?w(n):n.href).catch(function(n){if(!e.onError)throw n;e.onError(n)}):c.size<i&&!g&&r(function(){f(w?w(n):n.href,e.priority).then(t).catch(function(n){t(),e.onError&&e.onError(n)})}))},h);else{var o=p.indexOf((n=n.target).href);o>-1&&p.splice(o)}})},{threshold:e.threshold||0});return m(function(){(e.el||document).querySelectorAll("a").forEach(function(e){a.length&&!a.includes(e.hostname)||function e(n,r){return Array.isArray(r)?r.some(function(r){return e(n,r)}):(r.test||r).call(r,n.href,n)}(e,d)||v.observe(e)})},{timeout:e.timeout||2e3}),function(){c.clear(),v.disconnect()}}},e.prefetch=f,e.prerender=l});
