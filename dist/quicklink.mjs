function e(e){return new Promise(function(n,r,t){(t=new XMLHttpRequest).open("GET",e,t.withCredentials=!0),t.onload=function(){200===t.status?n():r()},t.send()})}var n,r=(n=document.createElement("link")).relList&&n.relList.supports&&n.relList.supports("prefetch")?function(e){return new Promise(function(n,r,t){(t=document.createElement("link")).rel="prefetch",t.href=e,t.onload=n,t.onerror=r,document.head.appendChild(t)})}:e,t=window.requestIdleCallback||function(e){var n=Date.now();return setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-n))}})},1)};function o(e){if("string"==typeof e&&window.location.origin!==new URL(e,window.location.origin).origin)throw e;return!0}var i=new Set,c=new Set,u=!1;function a(e){if(e){if(e.saveData)return Promise.reject(new Error("Save-Data is enabled"));if(/3g/.test(e.effectiveType))return Promise.reject(new Error("network conditions are poor"))}return Promise.resolve(!0)}function s(e){if(e||(e={}),window.IntersectionObserver){var n=function(e){e=e||1;var n=[],r=0;function t(){r<e&&n.length>0&&(n.shift()(),r++)}return[function(e){n.push(e)>1||t()},function(){r--,t()}]}(e.throttle||1/0),r=n[0],o=n[1],a=e.limit||1/0,s=e.origins||[location.hostname],d=e.ignores||[],h=e.delay||0,m=[],p=e.timeoutFn||t,w="function"==typeof e.hrefFn&&e.hrefFn,g=e.prerender||!1;u=e.prerenderAndPrefetch||!1;var v=new IntersectionObserver(function(n){n.forEach(function(n){if(n.isIntersecting)m.push((n=n.target).href),function(e,n){n?setTimeout(e,n):e()}(function(){-1!==m.indexOf(n.href)&&(v.unobserve(n),(u||g)&&c.size<1?l(w?w(n):n.href).catch(function(n){if(!e.onError)throw n;e.onError(n)}):i.size<a&&!g&&r(function(){f(w?w(n):n.href,e.priority).then(o).catch(function(n){o(),e.onError&&e.onError(n)})}))},h);else{var t=m.indexOf((n=n.target).href);t>-1&&m.splice(t)}})},{threshold:e.threshold||0});return p(function(){(e.el||document).querySelectorAll("a").forEach(function(e){s.length&&!s.includes(e.hostname)||function e(n,r){return Array.isArray(r)?r.some(function(r){return e(n,r)}):(r.test||r).call(r,n.href,n)}(e,d)||v.observe(e)})},{timeout:e.timeout||2e3}),function(){i.clear(),v.disconnect()}}}function f(n,t,o){return a(navigator.connection).catch(function(e){return Promise.reject(new Error("Cannot prefetch, "+e.message))}),c.size>0&&!u&&console.warn("[Warning] You are using both prefetching and prerendering on the same document"),Promise.all([].concat(n).map(function(n){if(!i.has(n))return i.add(n),(t?function(n){return window.fetch?fetch(n,{credentials:"include"}):e(n)}:r)(new URL(n,location.href).toString())}))}function l(e,n){if(a(navigator.connection).catch(function(e){return Promise.reject(new Error("Cannot prerender, "+e.message))}),!HTMLScriptElement.supports("speculationrules"))return f(e),Promise.reject(new Error("This Browser does not support Speculation Rules API. Falling back to Prefetch."));if(document.querySelector('script[type="speculationrules"]'))return Promise.reject(new Error("Speculation Rules is already defined and cannot be altered."));try{[].concat(e).filter(o).map(function(e){c.has(e)||c.add(e)})}catch(e){return Promise.reject(new Error("Only same origin URL(s) are allowed: "+e))}return i.size>0&&!u&&console.warn("[Warning] You are using both prefetching and prerendering on the same document"),Promise.resolve((r=c,new Promise(function(e,n,t){(t=document.createElement("script")).type="speculationrules",t.text='{"prerender":[{"source": "list","urls": ["'+Array.from(r).join('","')+'"]}]}',document.head.appendChild(t)})));var r}export{s as listen,f as prefetch,l as prerender};