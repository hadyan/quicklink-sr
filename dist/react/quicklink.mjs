function e(e){return new Promise(function(n,t,r){(r=new XMLHttpRequest).open("GET",e,r.withCredentials=!0),r.onload=function(){200===r.status?n():t()},r.send()})}var n,t=(n=document.createElement("link")).relList&&n.relList.supports&&n.relList.supports("prefetch")?function(e){return new Promise(function(n,t,r){(r=document.createElement("link")).rel="prefetch",r.href=e,r.onload=n,r.onerror=t,document.head.appendChild(r)})}:e,r=window.requestIdleCallback||function(e){var n=Date.now();return setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-n))}})},1)},o=new Set;function i(e){if(e||(e={}),window.IntersectionObserver){var n=function(e){e=e||1;var n=[],t=0;function r(){t<e&&n.length>0&&(n.shift()(),t++)}return[function(e){n.push(e)>1||r()},function(){t--,r()}]}(e.throttle||1/0),t=n[0],i=n[1],u=e.limit||1/0,a=e.origins||[location.hostname],f=e.ignores||[],s=e.timeoutFn||r,l=e.prefetchChunks,h=function(n){c(n,e.priority).then(i).catch(function(n){i(),e.onError&&e.onError(n)})},d=new IntersectionObserver(function(e){e.forEach(function(e){e.isIntersecting&&(d.unobserve(e=e.target),o.size<u&&t(function(){l?l(e,h):h(e.href)}))})});return s(function(){(e.el||document).querySelectorAll("a").forEach(function(e){a.length&&!a.includes(e.hostname)||function e(n,t){return Array.isArray(t)?t.some(function(t){return e(n,t)}):(t.test||t).call(t,n.href,n)}(e,f)||d.observe(e)})},{timeout:e.timeout||2e3}),function(){o.clear(),d.disconnect()}}}function c(n,r,i){if(i=navigator.connection){if(i.saveData)return Promise.reject(new Error("Cannot prefetch, Save-Data is enabled"));if(/2g/.test(i.effectiveType))return Promise.reject(new Error("Cannot prefetch, network conditions are poor"))}return Promise.all([].concat(n).map(function(n){if(!o.has(n))return o.add(n),(r?function(n){return window.fetch?fetch(n,{credentials:"include"}):e(n)}:t)(new URL(n,location.href).toString())}))}export{i as listen,c as prefetch};