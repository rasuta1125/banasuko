var Kw=Object.defineProperty;var pf=n=>{throw TypeError(n)};var Qw=(n,e,t)=>e in n?Kw(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var G=(n,e,t)=>Qw(n,typeof e!="symbol"?e+"":e,t),al=(n,e,t)=>e.has(n)||pf("Cannot "+t);var D=(n,e,t)=>(al(n,e,"read from private field"),t?t.call(n):e.get(n)),ne=(n,e,t)=>e.has(n)?pf("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t),Z=(n,e,t,r)=>(al(n,e,"write to private field"),r?r.call(n,t):e.set(n,t),t),he=(n,e,t)=>(al(n,e,"access private method"),t);var gf=(n,e,t,r)=>({set _(s){Z(n,e,s,t)},get _(){return D(n,e,r)}});var eg={Stringify:1},vt=(n,e)=>{const t=new String(n);return t.isEscaped=!0,t.callbacks=e,t},Jw=/[&<>'"]/,tg=async(n,e)=>{let t="";e||(e=[]);const r=await Promise.all(n);for(let s=r.length-1;t+=r[s],s--,!(s<0);s--){let i=r[s];typeof i=="object"&&e.push(...i.callbacks||[]);const a=i.isEscaped;if(i=await(typeof i=="object"?i.toString():i),typeof i=="object"&&e.push(...i.callbacks||[]),i.isEscaped??a)t+=i;else{const l=[t];Fn(i,l),t=l[0]}}return vt(t,e)},Fn=(n,e)=>{const t=n.search(Jw);if(t===-1){e[0]+=n;return}let r,s,i=0;for(s=t;s<n.length;s++){switch(n.charCodeAt(s)){case 34:r="&quot;";break;case 39:r="&#39;";break;case 38:r="&amp;";break;case 60:r="&lt;";break;case 62:r="&gt;";break;default:continue}e[0]+=n.substring(i,s)+r,i=s+1}e[0]+=n.substring(i,s)},ng=n=>{const e=n.callbacks;if(!(e!=null&&e.length))return n;const t=[n],r={};return e.forEach(s=>s({phase:eg.Stringify,buffer:t,context:r})),t[0]},rg=async(n,e,t,r,s)=>{typeof n=="object"&&!(n instanceof String)&&(n instanceof Promise||(n=n.toString()),n instanceof Promise&&(n=await n));const i=n.callbacks;return i!=null&&i.length?(s?s[0]+=n:s=[n],Promise.all(i.map(l=>l({phase:e,buffer:s,context:r}))).then(l=>Promise.all(l.filter(Boolean).map(u=>rg(u,e,!1,r,s))).then(()=>s[0]))):Promise.resolve(n)},Xw=(n,...e)=>{const t=[""];for(let r=0,s=n.length-1;r<s;r++){t[0]+=n[r];const i=Array.isArray(e[r])?e[r].flat(1/0):[e[r]];for(let a=0,l=i.length;a<l;a++){const u=i[a];if(typeof u=="string")Fn(u,t);else if(typeof u=="number")t[0]+=u;else{if(typeof u=="boolean"||u===null||u===void 0)continue;if(typeof u=="object"&&u.isEscaped)if(u.callbacks)t.unshift("",u);else{const h=u.toString();h instanceof Promise?t.unshift("",h):t[0]+=h}else u instanceof Promise?t.unshift("",u):Fn(u.toString(),t)}}}return t[0]+=n.at(-1),t.length===1?"callbacks"in t?vt(ng(vt(t[0],t.callbacks))):vt(t[0]):tg(t,t.callbacks)},Ou=Symbol("RENDERER"),Bl=Symbol("ERROR_HANDLER"),_e=Symbol("STASH"),sg=Symbol("INTERNAL"),Yw=Symbol("MEMO"),xo=Symbol("PERMALINK"),yf=n=>(n[sg]=!0,n),ig=n=>({value:e,children:t})=>{if(!t)return;const r={children:[{tag:yf(()=>{n.push(e)}),props:{}}]};Array.isArray(t)?r.children.push(...t.flat()):r.children.push(t),r.children.push({tag:yf(()=>{n.pop()}),props:{}});const s={tag:"",props:r,type:""};return s[Bl]=i=>{throw n.pop(),i},s},ag=n=>{const e=[n],t=ig(e);return t.values=e,t.Provider=t,ps.push(t),t},ps=[],Mu=n=>{const e=[n],t=r=>{e.push(r.value);let s;try{s=r.children?(Array.isArray(r.children)?new ug("",{},r.children):r.children).toString():""}finally{e.pop()}return s instanceof Promise?s.then(i=>vt(i,i.callbacks)):vt(s)};return t.values=e,t.Provider=t,t[Ou]=ig(e),ps.push(t),t},Ts=n=>n.values.at(-1),Ka={title:[],script:["src"],style:["data-href"],link:["href"],meta:["name","httpEquiv","charset","itemProp"]},ql={},Qa="data-precedence",Gi=n=>Array.isArray(n)?n:[n],_f=new WeakMap,bf=(n,e,t,r)=>({buffer:s,context:i})=>{if(!s)return;const a=_f.get(i)||{};_f.set(i,a);const l=a[n]||(a[n]=[]);let u=!1;const h=Ka[n];if(h.length>0){e:for(const[,f]of l)for(const p of h)if(((f==null?void 0:f[p])??null)===(t==null?void 0:t[p])){u=!0;break e}}if(u?s[0]=s[0].replaceAll(e,""):h.length>0?l.push([e,t,r]):l.unshift([e,t,r]),s[0].indexOf("</head>")!==-1){let f;if(r===void 0)f=l.map(([p])=>p);else{const p=[];f=l.map(([g,,_])=>{let T=p.indexOf(_);return T===-1&&(p.push(_),T=p.length-1),[g,T]}).sort((g,_)=>g[1]-_[1]).map(([g])=>g)}f.forEach(p=>{s[0]=s[0].replaceAll(p,"")}),s[0]=s[0].replace(/(?=<\/head>)/,f.join(""))}},Ki=(n,e,t)=>vt(new Rt(n,t,Gi(e??[])).toString()),Qi=(n,e,t,r)=>{if("itemProp"in t)return Ki(n,e,t);let{precedence:s,blocking:i,...a}=t;s=r?s??"":void 0,r&&(a[Qa]=s);const l=new Rt(n,a,Gi(e||[])).toString();return l instanceof Promise?l.then(u=>vt(l,[...u.callbacks||[],bf(n,u,a,s)])):vt(l,[bf(n,l,a,s)])},Zw=({children:n,...e})=>{const t=Lu();if(t){const r=Ts(t);if(r==="svg"||r==="head")return new Rt("title",e,Gi(n??[]))}return Qi("title",n,e,!1)},e0=({children:n,...e})=>{const t=Lu();return["src","async"].some(r=>!e[r])||t&&Ts(t)==="head"?Ki("script",n,e):Qi("script",n,e,!1)},t0=({children:n,...e})=>["href","precedence"].every(t=>t in e)?(e["data-href"]=e.href,delete e.href,Qi("style",n,e,!0)):Ki("style",n,e),n0=({children:n,...e})=>["onLoad","onError"].some(t=>t in e)||e.rel==="stylesheet"&&(!("precedence"in e)||"disabled"in e)?Ki("link",n,e):Qi("link",n,e,"precedence"in e),r0=({children:n,...e})=>{const t=Lu();return t&&Ts(t)==="head"?Ki("meta",n,e):Qi("meta",n,e,!1)},og=(n,{children:e,...t})=>new Rt(n,t,Gi(e??[])),s0=n=>(typeof n.action=="function"&&(n.action=xo in n.action?n.action[xo]:void 0),og("form",n)),cg=(n,e)=>(typeof e.formAction=="function"&&(e.formAction=xo in e.formAction?e.formAction[xo]:void 0),og(n,e)),i0=n=>cg("input",n),a0=n=>cg("button",n);const ol=Object.freeze(Object.defineProperty({__proto__:null,button:a0,form:s0,input:i0,link:n0,meta:r0,script:e0,style:t0,title:Zw},Symbol.toStringTag,{value:"Module"}));var o0=new Map([["className","class"],["htmlFor","for"],["crossOrigin","crossorigin"],["httpEquiv","http-equiv"],["itemProp","itemprop"],["fetchPriority","fetchpriority"],["noModule","nomodule"],["formAction","formaction"]]),Eo=n=>o0.get(n)||n,lg=(n,e)=>{for(const[t,r]of Object.entries(n)){const s=t[0]==="-"||!/[A-Z]/.test(t)?t:t.replace(/[A-Z]/g,i=>`-${i.toLowerCase()}`);e(s,r==null?null:typeof r=="number"?s.match(/^(?:a|border-im|column(?:-c|s)|flex(?:$|-[^b])|grid-(?:ar|[^a])|font-w|li|or|sca|st|ta|wido|z)|ty$/)?`${r}`:`${r}px`:r)}},Ti=void 0,Lu=()=>Ti,c0=n=>/[A-Z]/.test(n)&&n.match(/^(?:al|basel|clip(?:Path|Rule)$|co|do|fill|fl|fo|gl|let|lig|i|marker[EMS]|o|pai|pointe|sh|st[or]|text[^L]|tr|u|ve|w)/)?n.replace(/([A-Z])/g,"-$1").toLowerCase():n,l0=["area","base","br","col","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],u0=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","defer","disabled","download","formnovalidate","hidden","inert","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"],Vu=(n,e)=>{for(let t=0,r=n.length;t<r;t++){const s=n[t];if(typeof s=="string")Fn(s,e);else{if(typeof s=="boolean"||s===null||s===void 0)continue;s instanceof Rt?s.toStringToBuffer(e):typeof s=="number"||s.isEscaped?e[0]+=s:s instanceof Promise?e.unshift("",s):Vu(s,e)}}},Rt=class{constructor(n,e,t){G(this,"tag");G(this,"props");G(this,"key");G(this,"children");G(this,"isEscaped",!0);G(this,"localContexts");this.tag=n,this.props=e,this.children=t}get type(){return this.tag}get ref(){return this.props.ref||null}toString(){var e,t;const n=[""];(e=this.localContexts)==null||e.forEach(([r,s])=>{r.values.push(s)});try{this.toStringToBuffer(n)}finally{(t=this.localContexts)==null||t.forEach(([r])=>{r.values.pop()})}return n.length===1?"callbacks"in n?ng(vt(n[0],n.callbacks)).toString():n[0]:tg(n,n.callbacks)}toStringToBuffer(n){const e=this.tag,t=this.props;let{children:r}=this;n[0]+=`<${e}`;const s=Ti&&Ts(Ti)==="svg"?i=>c0(Eo(i)):i=>Eo(i);for(let[i,a]of Object.entries(t))if(i=s(i),i!=="children"){if(i==="style"&&typeof a=="object"){let l="";lg(a,(u,h)=>{h!=null&&(l+=`${l?";":""}${u}:${h}`)}),n[0]+=' style="',Fn(l,n),n[0]+='"'}else if(typeof a=="string")n[0]+=` ${i}="`,Fn(a,n),n[0]+='"';else if(a!=null)if(typeof a=="number"||a.isEscaped)n[0]+=` ${i}="${a}"`;else if(typeof a=="boolean"&&u0.includes(i))a&&(n[0]+=` ${i}=""`);else if(i==="dangerouslySetInnerHTML"){if(r.length>0)throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");r=[vt(a.__html)]}else if(a instanceof Promise)n[0]+=` ${i}="`,n.unshift('"',a);else if(typeof a=="function"){if(!i.startsWith("on")&&i!=="ref")throw new Error(`Invalid prop '${i}' of type 'function' supplied to '${e}'.`)}else n[0]+=` ${i}="`,Fn(a.toString(),n),n[0]+='"'}if(l0.includes(e)&&r.length===0){n[0]+="/>";return}n[0]+=">",Vu(r,n),n[0]+=`</${e}>`}},cl=class extends Rt{toStringToBuffer(n){const{children:e}=this,t=this.tag.call(null,{...this.props,children:e.length<=1?e[0]:e});if(!(typeof t=="boolean"||t==null))if(t instanceof Promise)if(ps.length===0)n.unshift("",t);else{const r=ps.map(s=>[s,s.values.at(-1)]);n.unshift("",t.then(s=>(s instanceof Rt&&(s.localContexts=r),s)))}else t instanceof Rt?t.toStringToBuffer(n):typeof t=="number"||t.isEscaped?(n[0]+=t,t.callbacks&&(n.callbacks||(n.callbacks=[]),n.callbacks.push(...t.callbacks))):Fn(t,n)}},ug=class extends Rt{toStringToBuffer(n){Vu(this.children,n)}},vf=(n,e,...t)=>{e??(e={}),t.length&&(e.children=t.length===1?t[0]:t);const r=e.key;delete e.key;const s=Ja(n,e,t);return s.key=r,s},wf=!1,Ja=(n,e,t)=>{if(!wf){for(const r in ql)ol[r][Ou]=ql[r];wf=!0}return typeof n=="function"?new cl(n,e,t):ol[n]?new cl(ol[n],e,t):n==="svg"||n==="head"?(Ti||(Ti=Mu("")),new Rt(n,e,[new cl(Ti,{value:n},t)])):new Rt(n,e,t)},h0=({children:n})=>new ug("",{children:n},Array.isArray(n)?n:n?[n]:[]);function o(n,e,t){let r;if(!e||!("children"in e))r=Ja(n,e,[]);else{const s=e.children;r=Array.isArray(s)?Ja(n,e,s):Ja(n,e,[s])}return r.key=t,r}var xf=(n,e,t)=>(r,s)=>{let i=-1;return a(0);async function a(l){if(l<=i)throw new Error("next() called multiple times");i=l;let u,h=!1,f;if(n[l]?(f=n[l][0][0],r.req.routeIndex=l):f=l===n.length&&s||void 0,f)try{u=await f(r,()=>a(l+1))}catch(p){if(p instanceof Error&&e)r.error=p,u=await e(p,r),h=!0;else throw p}else r.finalized===!1&&t&&(u=await t(r));return u&&(r.finalized===!1||h)&&(r.res=u),r}},d0=Symbol(),f0=async(n,e=Object.create(null))=>{const{all:t=!1,dot:r=!1}=e,i=(n instanceof pg?n.raw.headers:n.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?m0(n,{all:t,dot:r}):{}};async function m0(n,e){const t=await n.formData();return t?p0(t,e):{}}function p0(n,e){const t=Object.create(null);return n.forEach((r,s)=>{e.all||s.endsWith("[]")?g0(t,s,r):t[s]=r}),e.dot&&Object.entries(t).forEach(([r,s])=>{r.includes(".")&&(y0(t,r,s),delete t[r])}),t}var g0=(n,e,t)=>{n[e]!==void 0?Array.isArray(n[e])?n[e].push(t):n[e]=[n[e],t]:e.endsWith("[]")?n[e]=[t]:n[e]=t},y0=(n,e,t)=>{let r=n;const s=e.split(".");s.forEach((i,a)=>{a===s.length-1?r[i]=t:((!r[i]||typeof r[i]!="object"||Array.isArray(r[i])||r[i]instanceof File)&&(r[i]=Object.create(null)),r=r[i])})},hg=n=>{const e=n.split("/");return e[0]===""&&e.shift(),e},_0=n=>{const{groups:e,path:t}=b0(n),r=hg(t);return v0(r,e)},b0=n=>{const e=[];return n=n.replace(/\{[^}]+\}/g,(t,r)=>{const s=`@${r}`;return e.push([s,t]),s}),{groups:e,path:n}},v0=(n,e)=>{for(let t=e.length-1;t>=0;t--){const[r]=e[t];for(let s=n.length-1;s>=0;s--)if(n[s].includes(r)){n[s]=n[s].replace(r,e[t][1]);break}}return n},Da={},w0=(n,e)=>{if(n==="*")return"*";const t=n.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(t){const r=`${n}#${e}`;return Da[r]||(t[2]?Da[r]=e&&e[0]!==":"&&e[0]!=="*"?[r,t[1],new RegExp(`^${t[2]}(?=/${e})`)]:[n,t[1],new RegExp(`^${t[2]}$`)]:Da[r]=[n,t[1],!0]),Da[r]}return null},ec=(n,e)=>{try{return e(n)}catch{return n.replace(/(?:%[0-9A-Fa-f]{2})+/g,t=>{try{return e(t)}catch{return t}})}},x0=n=>ec(n,decodeURI),dg=n=>{const e=n.url,t=e.indexOf("/",e.charCodeAt(9)===58?13:8);let r=t;for(;r<e.length;r++){const s=e.charCodeAt(r);if(s===37){const i=e.indexOf("?",r),a=e.slice(t,i===-1?void 0:i);return x0(a.includes("%25")?a.replace(/%25/g,"%2525"):a)}else if(s===63)break}return e.slice(t,r)},E0=n=>{const e=dg(n);return e.length>1&&e.at(-1)==="/"?e.slice(0,-1):e},Hr=(n,e,...t)=>(t.length&&(e=Hr(e,...t)),`${(n==null?void 0:n[0])==="/"?"":"/"}${n}${e==="/"?"":`${(n==null?void 0:n.at(-1))==="/"?"":"/"}${(e==null?void 0:e[0])==="/"?e.slice(1):e}`}`),fg=n=>{if(n.charCodeAt(n.length-1)!==63||!n.includes(":"))return null;const e=n.split("/"),t=[];let r="";return e.forEach(s=>{if(s!==""&&!/\:/.test(s))r+="/"+s;else if(/\:/.test(s))if(/\?/.test(s)){t.length===0&&r===""?t.push("/"):t.push(r);const i=s.replace("?","");r+="/"+i,t.push(r)}else r+="/"+s}),t.filter((s,i,a)=>a.indexOf(s)===i)},ll=n=>/[%+]/.test(n)?(n.indexOf("+")!==-1&&(n=n.replace(/\+/g," ")),n.indexOf("%")!==-1?ec(n,Uu):n):n,mg=(n,e,t)=>{let r;if(!t&&e&&!/[%+]/.test(e)){let a=n.indexOf(`?${e}`,8);for(a===-1&&(a=n.indexOf(`&${e}`,8));a!==-1;){const l=n.charCodeAt(a+e.length+1);if(l===61){const u=a+e.length+2,h=n.indexOf("&",u);return ll(n.slice(u,h===-1?void 0:h))}else if(l==38||isNaN(l))return"";a=n.indexOf(`&${e}`,a+1)}if(r=/[%+]/.test(n),!r)return}const s={};r??(r=/[%+]/.test(n));let i=n.indexOf("?",8);for(;i!==-1;){const a=n.indexOf("&",i+1);let l=n.indexOf("=",i);l>a&&a!==-1&&(l=-1);let u=n.slice(i+1,l===-1?a===-1?void 0:a:l);if(r&&(u=ll(u)),i=a,u==="")continue;let h;l===-1?h="":(h=n.slice(l+1,a===-1?void 0:a),r&&(h=ll(h))),t?(s[u]&&Array.isArray(s[u])||(s[u]=[]),s[u].push(h)):s[u]??(s[u]=h)}return e?s[e]:s},I0=mg,A0=(n,e)=>mg(n,e,!0),Uu=decodeURIComponent,Ef=n=>ec(n,Uu),us,pt,pn,gg,yg,Hl,Nn,Wp,pg=(Wp=class{constructor(n,e="/",t=[[]]){ne(this,pn);G(this,"raw");ne(this,us);ne(this,pt);G(this,"routeIndex",0);G(this,"path");G(this,"bodyCache",{});ne(this,Nn,n=>{const{bodyCache:e,raw:t}=this,r=e[n];if(r)return r;const s=Object.keys(e)[0];return s?e[s].then(i=>(s==="json"&&(i=JSON.stringify(i)),new Response(i)[n]())):e[n]=t[n]()});this.raw=n,this.path=e,Z(this,pt,t),Z(this,us,{})}param(n){return n?he(this,pn,gg).call(this,n):he(this,pn,yg).call(this)}query(n){return I0(this.url,n)}queries(n){return A0(this.url,n)}header(n){if(n)return this.raw.headers.get(n)??void 0;const e={};return this.raw.headers.forEach((t,r)=>{e[r]=t}),e}async parseBody(n){var e;return(e=this.bodyCache).parsedBody??(e.parsedBody=await f0(this,n))}json(){return D(this,Nn).call(this,"text").then(n=>JSON.parse(n))}text(){return D(this,Nn).call(this,"text")}arrayBuffer(){return D(this,Nn).call(this,"arrayBuffer")}blob(){return D(this,Nn).call(this,"blob")}formData(){return D(this,Nn).call(this,"formData")}addValidatedData(n,e){D(this,us)[n]=e}valid(n){return D(this,us)[n]}get url(){return this.raw.url}get method(){return this.raw.method}get[d0](){return D(this,pt)}get matchedRoutes(){return D(this,pt)[0].map(([[,n]])=>n)}get routePath(){return D(this,pt)[0].map(([[,n]])=>n)[this.routeIndex].path}},us=new WeakMap,pt=new WeakMap,pn=new WeakSet,gg=function(n){const e=D(this,pt)[0][this.routeIndex][1][n],t=he(this,pn,Hl).call(this,e);return t?/\%/.test(t)?Ef(t):t:void 0},yg=function(){const n={},e=Object.keys(D(this,pt)[0][this.routeIndex][1]);for(const t of e){const r=he(this,pn,Hl).call(this,D(this,pt)[0][this.routeIndex][1][t]);r&&typeof r=="string"&&(n[t]=/\%/.test(r)?Ef(r):r)}return n},Hl=function(n){return D(this,pt)[1]?D(this,pt)[1][n]:n},Nn=new WeakMap,Wp),T0="text/plain; charset=UTF-8",ul=(n,e)=>({"Content-Type":n,...e}),ji,Bi,nn,hs,rn,st,qi,ds,fs,mr,Hi,Wi,Dn,Wr,zp,S0=(zp=class{constructor(n,e){ne(this,Dn);ne(this,ji);ne(this,Bi);G(this,"env",{});ne(this,nn);G(this,"finalized",!1);G(this,"error");ne(this,hs);ne(this,rn);ne(this,st);ne(this,qi);ne(this,ds);ne(this,fs);ne(this,mr);ne(this,Hi);ne(this,Wi);G(this,"render",(...n)=>(D(this,ds)??Z(this,ds,e=>this.html(e)),D(this,ds).call(this,...n)));G(this,"setLayout",n=>Z(this,qi,n));G(this,"getLayout",()=>D(this,qi));G(this,"setRenderer",n=>{Z(this,ds,n)});G(this,"header",(n,e,t)=>{this.finalized&&Z(this,st,new Response(D(this,st).body,D(this,st)));const r=D(this,st)?D(this,st).headers:D(this,mr)??Z(this,mr,new Headers);e===void 0?r.delete(n):t!=null&&t.append?r.append(n,e):r.set(n,e)});G(this,"status",n=>{Z(this,hs,n)});G(this,"set",(n,e)=>{D(this,nn)??Z(this,nn,new Map),D(this,nn).set(n,e)});G(this,"get",n=>D(this,nn)?D(this,nn).get(n):void 0);G(this,"newResponse",(...n)=>he(this,Dn,Wr).call(this,...n));G(this,"body",(n,e,t)=>he(this,Dn,Wr).call(this,n,e,t));G(this,"text",(n,e,t)=>!D(this,mr)&&!D(this,hs)&&!e&&!t&&!this.finalized?new Response(n):he(this,Dn,Wr).call(this,n,e,ul(T0,t)));G(this,"json",(n,e,t)=>he(this,Dn,Wr).call(this,JSON.stringify(n),e,ul("application/json",t)));G(this,"html",(n,e,t)=>{const r=s=>he(this,Dn,Wr).call(this,s,e,ul("text/html; charset=UTF-8",t));return typeof n=="object"?rg(n,eg.Stringify,!1,{}).then(r):r(n)});G(this,"redirect",(n,e)=>{const t=String(n);return this.header("Location",/[^\x00-\xFF]/.test(t)?encodeURI(t):t),this.newResponse(null,e??302)});G(this,"notFound",()=>(D(this,fs)??Z(this,fs,()=>new Response),D(this,fs).call(this,this)));Z(this,ji,n),e&&(Z(this,rn,e.executionCtx),this.env=e.env,Z(this,fs,e.notFoundHandler),Z(this,Wi,e.path),Z(this,Hi,e.matchResult))}get req(){return D(this,Bi)??Z(this,Bi,new pg(D(this,ji),D(this,Wi),D(this,Hi))),D(this,Bi)}get event(){if(D(this,rn)&&"respondWith"in D(this,rn))return D(this,rn);throw Error("This context has no FetchEvent")}get executionCtx(){if(D(this,rn))return D(this,rn);throw Error("This context has no ExecutionContext")}get res(){return D(this,st)||Z(this,st,new Response(null,{headers:D(this,mr)??Z(this,mr,new Headers)}))}set res(n){if(D(this,st)&&n){n=new Response(n.body,n);for(const[e,t]of D(this,st).headers.entries())if(e!=="content-type")if(e==="set-cookie"){const r=D(this,st).headers.getSetCookie();n.headers.delete("set-cookie");for(const s of r)n.headers.append("set-cookie",s)}else n.headers.set(e,t)}Z(this,st,n),this.finalized=!0}get var(){return D(this,nn)?Object.fromEntries(D(this,nn)):{}}},ji=new WeakMap,Bi=new WeakMap,nn=new WeakMap,hs=new WeakMap,rn=new WeakMap,st=new WeakMap,qi=new WeakMap,ds=new WeakMap,fs=new WeakMap,mr=new WeakMap,Hi=new WeakMap,Wi=new WeakMap,Dn=new WeakSet,Wr=function(n,e,t){const r=D(this,st)?new Headers(D(this,st).headers):D(this,mr)??new Headers;if(typeof e=="object"&&"headers"in e){const i=e.headers instanceof Headers?e.headers:new Headers(e.headers);for(const[a,l]of i)a.toLowerCase()==="set-cookie"?r.append(a,l):r.set(a,l)}if(t)for(const[i,a]of Object.entries(t))if(typeof a=="string")r.set(i,a);else{r.delete(i);for(const l of a)r.append(i,l)}const s=typeof e=="number"?e:(e==null?void 0:e.status)??D(this,hs);return new Response(n,{status:s,headers:r})},zp),Pe="ALL",R0="all",C0=["get","post","put","delete","options","patch"],_g="Can not add a route since the matcher is already built.",bg=class extends Error{},P0="__COMPOSED_HANDLER",k0=n=>n.text("404 Not Found",404),If=(n,e)=>{if("getResponse"in n){const t=n.getResponse();return e.newResponse(t.body,t)}return console.error(n),e.text("Internal Server Error",500)},It,Ne,wg,At,sr,Xa,Ya,Gp,vg=(Gp=class{constructor(e={}){ne(this,Ne);G(this,"get");G(this,"post");G(this,"put");G(this,"delete");G(this,"options");G(this,"patch");G(this,"all");G(this,"on");G(this,"use");G(this,"router");G(this,"getPath");G(this,"_basePath","/");ne(this,It,"/");G(this,"routes",[]);ne(this,At,k0);G(this,"errorHandler",If);G(this,"onError",e=>(this.errorHandler=e,this));G(this,"notFound",e=>(Z(this,At,e),this));G(this,"fetch",(e,...t)=>he(this,Ne,Ya).call(this,e,t[1],t[0],e.method));G(this,"request",(e,t,r,s)=>e instanceof Request?this.fetch(t?new Request(e,t):e,r,s):(e=e.toString(),this.fetch(new Request(/^https?:\/\//.test(e)?e:`http://localhost${Hr("/",e)}`,t),r,s)));G(this,"fire",()=>{addEventListener("fetch",e=>{e.respondWith(he(this,Ne,Ya).call(this,e.request,e,void 0,e.request.method))})});[...C0,R0].forEach(i=>{this[i]=(a,...l)=>(typeof a=="string"?Z(this,It,a):he(this,Ne,sr).call(this,i,D(this,It),a),l.forEach(u=>{he(this,Ne,sr).call(this,i,D(this,It),u)}),this)}),this.on=(i,a,...l)=>{for(const u of[a].flat()){Z(this,It,u);for(const h of[i].flat())l.map(f=>{he(this,Ne,sr).call(this,h.toUpperCase(),D(this,It),f)})}return this},this.use=(i,...a)=>(typeof i=="string"?Z(this,It,i):(Z(this,It,"*"),a.unshift(i)),a.forEach(l=>{he(this,Ne,sr).call(this,Pe,D(this,It),l)}),this);const{strict:r,...s}=e;Object.assign(this,s),this.getPath=r??!0?e.getPath??dg:E0}route(e,t){const r=this.basePath(e);return t.routes.map(s=>{var a;let i;t.errorHandler===If?i=s.handler:(i=async(l,u)=>(await xf([],t.errorHandler)(l,()=>s.handler(l,u))).res,i[P0]=s.handler),he(a=r,Ne,sr).call(a,s.method,s.path,i)}),this}basePath(e){const t=he(this,Ne,wg).call(this);return t._basePath=Hr(this._basePath,e),t}mount(e,t,r){let s,i;r&&(typeof r=="function"?i=r:(i=r.optionHandler,r.replaceRequest===!1?s=u=>u:s=r.replaceRequest));const a=i?u=>{const h=i(u);return Array.isArray(h)?h:[h]}:u=>{let h;try{h=u.executionCtx}catch{}return[u.env,h]};s||(s=(()=>{const u=Hr(this._basePath,e),h=u==="/"?0:u.length;return f=>{const p=new URL(f.url);return p.pathname=p.pathname.slice(h)||"/",new Request(p,f)}})());const l=async(u,h)=>{const f=await t(s(u.req.raw),...a(u));if(f)return f;await h()};return he(this,Ne,sr).call(this,Pe,Hr(e,"*"),l),this}},It=new WeakMap,Ne=new WeakSet,wg=function(){const e=new vg({router:this.router,getPath:this.getPath});return e.errorHandler=this.errorHandler,Z(e,At,D(this,At)),e.routes=this.routes,e},At=new WeakMap,sr=function(e,t,r){e=e.toUpperCase(),t=Hr(this._basePath,t);const s={basePath:this._basePath,path:t,method:e,handler:r};this.router.add(e,t,[r,s]),this.routes.push(s)},Xa=function(e,t){if(e instanceof Error)return this.errorHandler(e,t);throw e},Ya=function(e,t,r,s){if(s==="HEAD")return(async()=>new Response(null,await he(this,Ne,Ya).call(this,e,t,r,"GET")))();const i=this.getPath(e,{env:r}),a=this.router.match(s,i),l=new S0(e,{path:i,matchResult:a,env:r,executionCtx:t,notFoundHandler:D(this,At)});if(a[0].length===1){let h;try{h=a[0][0][0][0](l,async()=>{l.res=await D(this,At).call(this,l)})}catch(f){return he(this,Ne,Xa).call(this,f,l)}return h instanceof Promise?h.then(f=>f||(l.finalized?l.res:D(this,At).call(this,l))).catch(f=>he(this,Ne,Xa).call(this,f,l)):h??D(this,At).call(this,l)}const u=xf(a[0],this.errorHandler,D(this,At));return(async()=>{try{const h=await u(l);if(!h.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return h.res}catch(h){return he(this,Ne,Xa).call(this,h,l)}})()},Gp),Io="[^/]+",pi=".*",gi="(?:|/.*)",zr=Symbol(),N0=new Set(".\\+*[^]$()");function D0(n,e){return n.length===1?e.length===1?n<e?-1:1:-1:e.length===1||n===pi||n===gi?1:e===pi||e===gi?-1:n===Io?1:e===Io?-1:n.length===e.length?n<e?-1:1:e.length-n.length}var pr,gr,Tt,Kp,Wl=(Kp=class{constructor(){ne(this,pr);ne(this,gr);ne(this,Tt,Object.create(null))}insert(e,t,r,s,i){if(e.length===0){if(D(this,pr)!==void 0)throw zr;if(i)return;Z(this,pr,t);return}const[a,...l]=e,u=a==="*"?l.length===0?["","",pi]:["","",Io]:a==="/*"?["","",gi]:a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let h;if(u){const f=u[1];let p=u[2]||Io;if(f&&u[2]&&(p===".*"||(p=p.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(p))))throw zr;if(h=D(this,Tt)[p],!h){if(Object.keys(D(this,Tt)).some(g=>g!==pi&&g!==gi))throw zr;if(i)return;h=D(this,Tt)[p]=new Wl,f!==""&&Z(h,gr,s.varIndex++)}!i&&f!==""&&r.push([f,D(h,gr)])}else if(h=D(this,Tt)[a],!h){if(Object.keys(D(this,Tt)).some(f=>f.length>1&&f!==pi&&f!==gi))throw zr;if(i)return;h=D(this,Tt)[a]=new Wl}h.insert(l,t,r,s,i)}buildRegExpStr(){const t=Object.keys(D(this,Tt)).sort(D0).map(r=>{const s=D(this,Tt)[r];return(typeof D(s,gr)=="number"?`(${r})@${D(s,gr)}`:N0.has(r)?`\\${r}`:r)+s.buildRegExpStr()});return typeof D(this,pr)=="number"&&t.unshift(`#${D(this,pr)}`),t.length===0?"":t.length===1?t[0]:"(?:"+t.join("|")+")"}},pr=new WeakMap,gr=new WeakMap,Tt=new WeakMap,Kp),Zo,zi,Qp,O0=(Qp=class{constructor(){ne(this,Zo,{varIndex:0});ne(this,zi,new Wl)}insert(n,e,t){const r=[],s=[];for(let a=0;;){let l=!1;if(n=n.replace(/\{[^}]+\}/g,u=>{const h=`@\\${a}`;return s[a]=[h,u],a++,l=!0,h}),!l)break}const i=n.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let a=s.length-1;a>=0;a--){const[l]=s[a];for(let u=i.length-1;u>=0;u--)if(i[u].indexOf(l)!==-1){i[u]=i[u].replace(l,s[a][1]);break}}return D(this,zi).insert(i,e,r,D(this,Zo),t),r}buildRegExp(){let n=D(this,zi).buildRegExpStr();if(n==="")return[/^$/,[],[]];let e=0;const t=[],r=[];return n=n.replace(/#(\d+)|@(\d+)|\.\*\$/g,(s,i,a)=>i!==void 0?(t[++e]=Number(i),"$()"):(a!==void 0&&(r[Number(a)]=++e),"")),[new RegExp(`^${n}`),t,r]}},Zo=new WeakMap,zi=new WeakMap,Qp),xg=[],M0=[/^$/,[],Object.create(null)],Za=Object.create(null);function Eg(n){return Za[n]??(Za[n]=new RegExp(n==="*"?"":`^${n.replace(/\/\*$|([.\\+*[^\]$()])/g,(e,t)=>t?`\\${t}`:"(?:|/.*)")}$`))}function L0(){Za=Object.create(null)}function V0(n){var h;const e=new O0,t=[];if(n.length===0)return M0;const r=n.map(f=>[!/\*|\/:/.test(f[0]),...f]).sort(([f,p],[g,_])=>f?1:g?-1:p.length-_.length),s=Object.create(null);for(let f=0,p=-1,g=r.length;f<g;f++){const[_,T,A]=r[f];_?s[T]=[A.map(([U])=>[U,Object.create(null)]),xg]:p++;let S;try{S=e.insert(T,p,_)}catch(U){throw U===zr?new bg(T):U}_||(t[p]=A.map(([U,N])=>{const V=Object.create(null);for(N-=1;N>=0;N--){const[L,z]=S[N];V[L]=z}return[U,V]}))}const[i,a,l]=e.buildRegExp();for(let f=0,p=t.length;f<p;f++)for(let g=0,_=t[f].length;g<_;g++){const T=(h=t[f][g])==null?void 0:h[1];if(!T)continue;const A=Object.keys(T);for(let S=0,U=A.length;S<U;S++)T[A[S]]=l[T[A[S]]]}const u=[];for(const f in a)u[f]=t[a[f]];return[i,u,s]}function Ur(n,e){if(n){for(const t of Object.keys(n).sort((r,s)=>s.length-r.length))if(Eg(t).test(e))return[...n[t]]}}var On,Mn,As,Ig,Ag,Jp,U0=(Jp=class{constructor(){ne(this,As);G(this,"name","RegExpRouter");ne(this,On);ne(this,Mn);Z(this,On,{[Pe]:Object.create(null)}),Z(this,Mn,{[Pe]:Object.create(null)})}add(n,e,t){var l;const r=D(this,On),s=D(this,Mn);if(!r||!s)throw new Error(_g);r[n]||[r,s].forEach(u=>{u[n]=Object.create(null),Object.keys(u[Pe]).forEach(h=>{u[n][h]=[...u[Pe][h]]})}),e==="/*"&&(e="*");const i=(e.match(/\/:/g)||[]).length;if(/\*$/.test(e)){const u=Eg(e);n===Pe?Object.keys(r).forEach(h=>{var f;(f=r[h])[e]||(f[e]=Ur(r[h],e)||Ur(r[Pe],e)||[])}):(l=r[n])[e]||(l[e]=Ur(r[n],e)||Ur(r[Pe],e)||[]),Object.keys(r).forEach(h=>{(n===Pe||n===h)&&Object.keys(r[h]).forEach(f=>{u.test(f)&&r[h][f].push([t,i])})}),Object.keys(s).forEach(h=>{(n===Pe||n===h)&&Object.keys(s[h]).forEach(f=>u.test(f)&&s[h][f].push([t,i]))});return}const a=fg(e)||[e];for(let u=0,h=a.length;u<h;u++){const f=a[u];Object.keys(s).forEach(p=>{var g;(n===Pe||n===p)&&((g=s[p])[f]||(g[f]=[...Ur(r[p],f)||Ur(r[Pe],f)||[]]),s[p][f].push([t,i-h+u+1]))})}}match(n,e){L0();const t=he(this,As,Ig).call(this);return this.match=(r,s)=>{const i=t[r]||t[Pe],a=i[2][s];if(a)return a;const l=s.match(i[0]);if(!l)return[[],xg];const u=l.indexOf("",1);return[i[1][u],l]},this.match(n,e)}},On=new WeakMap,Mn=new WeakMap,As=new WeakSet,Ig=function(){const n=Object.create(null);return Object.keys(D(this,Mn)).concat(Object.keys(D(this,On))).forEach(e=>{n[e]||(n[e]=he(this,As,Ag).call(this,e))}),Z(this,On,Z(this,Mn,void 0)),n},Ag=function(n){const e=[];let t=n===Pe;return[D(this,On),D(this,Mn)].forEach(r=>{const s=r[n]?Object.keys(r[n]).map(i=>[i,r[n][i]]):[];s.length!==0?(t||(t=!0),e.push(...s)):n!==Pe&&e.push(...Object.keys(r[Pe]).map(i=>[i,r[Pe][i]]))}),t?V0(e):null},Jp),Ln,sn,Xp,F0=(Xp=class{constructor(n){G(this,"name","SmartRouter");ne(this,Ln,[]);ne(this,sn,[]);Z(this,Ln,n.routers)}add(n,e,t){if(!D(this,sn))throw new Error(_g);D(this,sn).push([n,e,t])}match(n,e){if(!D(this,sn))throw new Error("Fatal error");const t=D(this,Ln),r=D(this,sn),s=t.length;let i=0,a;for(;i<s;i++){const l=t[i];try{for(let u=0,h=r.length;u<h;u++)l.add(...r[u]);a=l.match(n,e)}catch(u){if(u instanceof bg)continue;throw u}this.match=l.match.bind(l),Z(this,Ln,[l]),Z(this,sn,void 0);break}if(i===s)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,a}get activeRouter(){if(D(this,sn)||D(this,Ln).length!==1)throw new Error("No active router has been determined yet.");return D(this,Ln)[0]}},Ln=new WeakMap,sn=new WeakMap,Xp),Xs=Object.create(null),Vn,Je,yr,ms,Ve,an,ir,Yp,Tg=(Yp=class{constructor(n,e,t){ne(this,an);ne(this,Vn);ne(this,Je);ne(this,yr);ne(this,ms,0);ne(this,Ve,Xs);if(Z(this,Je,t||Object.create(null)),Z(this,Vn,[]),n&&e){const r=Object.create(null);r[n]={handler:e,possibleKeys:[],score:0},Z(this,Vn,[r])}Z(this,yr,[])}insert(n,e,t){Z(this,ms,++gf(this,ms)._);let r=this;const s=_0(e),i=[];for(let a=0,l=s.length;a<l;a++){const u=s[a],h=s[a+1],f=w0(u,h),p=Array.isArray(f)?f[0]:u;if(p in D(r,Je)){r=D(r,Je)[p],f&&i.push(f[1]);continue}D(r,Je)[p]=new Tg,f&&(D(r,yr).push(f),i.push(f[1])),r=D(r,Je)[p]}return D(r,Vn).push({[n]:{handler:t,possibleKeys:i.filter((a,l,u)=>u.indexOf(a)===l),score:D(this,ms)}}),r}search(n,e){var l;const t=[];Z(this,Ve,Xs);let s=[this];const i=hg(e),a=[];for(let u=0,h=i.length;u<h;u++){const f=i[u],p=u===h-1,g=[];for(let _=0,T=s.length;_<T;_++){const A=s[_],S=D(A,Je)[f];S&&(Z(S,Ve,D(A,Ve)),p?(D(S,Je)["*"]&&t.push(...he(this,an,ir).call(this,D(S,Je)["*"],n,D(A,Ve))),t.push(...he(this,an,ir).call(this,S,n,D(A,Ve)))):g.push(S));for(let U=0,N=D(A,yr).length;U<N;U++){const V=D(A,yr)[U],L=D(A,Ve)===Xs?{}:{...D(A,Ve)};if(V==="*"){const E=D(A,Je)["*"];E&&(t.push(...he(this,an,ir).call(this,E,n,D(A,Ve))),Z(E,Ve,L),g.push(E));continue}const[z,W,x]=V;if(!f&&!(x instanceof RegExp))continue;const b=D(A,Je)[z],v=i.slice(u).join("/");if(x instanceof RegExp){const E=x.exec(v);if(E){if(L[W]=E[0],t.push(...he(this,an,ir).call(this,b,n,D(A,Ve),L)),Object.keys(D(b,Je)).length){Z(b,Ve,L);const I=((l=E[0].match(/\//))==null?void 0:l.length)??0;(a[I]||(a[I]=[])).push(b)}continue}}(x===!0||x.test(f))&&(L[W]=f,p?(t.push(...he(this,an,ir).call(this,b,n,L,D(A,Ve))),D(b,Je)["*"]&&t.push(...he(this,an,ir).call(this,D(b,Je)["*"],n,L,D(A,Ve)))):(Z(b,Ve,L),g.push(b)))}}s=g.concat(a.shift()??[])}return t.length>1&&t.sort((u,h)=>u.score-h.score),[t.map(({handler:u,params:h})=>[u,h])]}},Vn=new WeakMap,Je=new WeakMap,yr=new WeakMap,ms=new WeakMap,Ve=new WeakMap,an=new WeakSet,ir=function(n,e,t,r){const s=[];for(let i=0,a=D(n,Vn).length;i<a;i++){const l=D(n,Vn)[i],u=l[e]||l[Pe],h={};if(u!==void 0&&(u.params=Object.create(null),s.push(u),t!==Xs||r&&r!==Xs))for(let f=0,p=u.possibleKeys.length;f<p;f++){const g=u.possibleKeys[f],_=h[u.score];u.params[g]=r!=null&&r[g]&&!_?r[g]:t[g]??(r==null?void 0:r[g]),h[u.score]=!0}}return s},Yp),_r,Zp,$0=(Zp=class{constructor(){G(this,"name","TrieRouter");ne(this,_r);Z(this,_r,new Tg)}add(n,e,t){const r=fg(e);if(r){for(let s=0,i=r.length;s<i;s++)D(this,_r).insert(n,r[s],t);return}D(this,_r).insert(n,e,t)}match(n,e){return D(this,_r).search(n,e)}},_r=new WeakMap,Zp),Sg=class extends vg{constructor(n={}){super(n),this.router=n.router??new F0({routers:[new U0,new $0]})}},j0=n=>{const t={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...n},r=(i=>typeof i=="string"?i==="*"?()=>i:a=>i===a?a:null:typeof i=="function"?i:a=>i.includes(a)?a:null)(t.origin),s=(i=>typeof i=="function"?i:Array.isArray(i)?()=>i:()=>[])(t.allowMethods);return async function(a,l){var f;function u(p,g){a.res.headers.set(p,g)}const h=r(a.req.header("origin")||"",a);if(h&&u("Access-Control-Allow-Origin",h),t.origin!=="*"){const p=a.req.header("Vary");p?u("Vary",p):u("Vary","Origin")}if(t.credentials&&u("Access-Control-Allow-Credentials","true"),(f=t.exposeHeaders)!=null&&f.length&&u("Access-Control-Expose-Headers",t.exposeHeaders.join(",")),a.req.method==="OPTIONS"){t.maxAge!=null&&u("Access-Control-Max-Age",t.maxAge.toString());const p=s(a.req.header("origin")||"",a);p.length&&u("Access-Control-Allow-Methods",p.join(","));let g=t.allowHeaders;if(!(g!=null&&g.length)){const _=a.req.header("Access-Control-Request-Headers");_&&(g=_.split(/\s*,\s*/))}return g!=null&&g.length&&(u("Access-Control-Allow-Headers",g.join(",")),a.res.headers.append("Vary","Access-Control-Request-Headers")),a.res.headers.delete("Content-Length"),a.res.headers.delete("Content-Type"),new Response(null,{headers:a.res.headers,status:204,statusText:"No Content"})}await l()}},B0=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,Af=(n,e=H0)=>{const t=/\.([a-zA-Z0-9]+?)$/,r=n.match(t);if(!r)return;let s=e[r[1]];return s&&s.startsWith("text")&&(s+="; charset=utf-8"),s},q0={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},H0=q0,W0=(...n)=>{let e=n.filter(s=>s!=="").join("/");e=e.replace(new RegExp("(?<=\\/)\\/+","g"),"");const t=e.split("/"),r=[];for(const s of t)s===".."&&r.length>0&&r.at(-1)!==".."?r.pop():s!=="."&&r.push(s);return r.join("/")||"."},Rg={br:".br",zstd:".zst",gzip:".gz"},z0=Object.keys(Rg),G0="index.html",K0=n=>{const e=n.root??"./",t=n.path,r=n.join??W0;return async(s,i)=>{var f,p,g,_;if(s.finalized)return i();let a;if(n.path)a=n.path;else try{if(a=decodeURIComponent(s.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(a))throw new Error}catch{return await((f=n.onNotFound)==null?void 0:f.call(n,s.req.path,s)),i()}let l=r(e,!t&&n.rewriteRequestPath?n.rewriteRequestPath(a):a);n.isDir&&await n.isDir(l)&&(l=r(l,G0));const u=n.getContent;let h=await u(l,s);if(h instanceof Response)return s.newResponse(h.body,h);if(h){const T=n.mimes&&Af(l,n.mimes)||Af(l);if(s.header("Content-Type",T||"application/octet-stream"),n.precompressed&&(!T||B0.test(T))){const A=new Set((p=s.req.header("Accept-Encoding"))==null?void 0:p.split(",").map(S=>S.trim()));for(const S of z0){if(!A.has(S))continue;const U=await u(l+Rg[S],s);if(U){h=U,s.header("Content-Encoding",S),s.header("Vary","Accept-Encoding",{append:!0});break}}}return await((g=n.onFound)==null?void 0:g.call(n,l,s)),s.body(h)}await((_=n.onNotFound)==null?void 0:_.call(n,l,s)),await i()}},Q0=async(n,e)=>{let t;e&&e.manifest?typeof e.manifest=="string"?t=JSON.parse(e.manifest):t=e.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?t=JSON.parse(__STATIC_CONTENT_MANIFEST):t=__STATIC_CONTENT_MANIFEST;let r;e&&e.namespace?r=e.namespace:r=__STATIC_CONTENT;const s=t[n]||n;if(!s)return null;const i=await r.get(s,{type:"stream"});return i||null},J0=n=>async function(t,r){return K0({...n,getContent:async i=>Q0(i,{manifest:n.manifest,namespace:n.namespace?n.namespace:t.env?t.env.__STATIC_CONTENT:void 0})})(t,r)},X0=n=>J0(n),Si="_hp",Y0={Change:"Input",DoubleClick:"DblClick"},Z0={svg:"2000/svg",math:"1998/Math/MathML"},Ri=[],zl=new WeakMap,gs=void 0,ex=()=>gs,tn=n=>"t"in n,hl={onClick:["click",!1]},Tf=n=>{if(!n.startsWith("on"))return;if(hl[n])return hl[n];const e=n.match(/^on([A-Z][a-zA-Z]+?(?:PointerCapture)?)(Capture)?$/);if(e){const[,t,r]=e;return hl[n]=[(Y0[t]||t).toLowerCase(),!!r]}},Sf=(n,e)=>gs&&n instanceof SVGElement&&/[A-Z]/.test(e)&&(e in n.style||e.match(/^(?:o|pai|str|u|ve)/))?e.replace(/([A-Z])/g,"-$1").toLowerCase():e,tx=(n,e,t)=>{var r;e||(e={});for(let s in e){const i=e[s];if(s!=="children"&&(!t||t[s]!==i)){s=Eo(s);const a=Tf(s);if(a){if((t==null?void 0:t[s])!==i&&(t&&n.removeEventListener(a[0],t[s],a[1]),i!=null)){if(typeof i!="function")throw new Error(`Event handler for "${s}" is not a function`);n.addEventListener(a[0],i,a[1])}}else if(s==="dangerouslySetInnerHTML"&&i)n.innerHTML=i.__html;else if(s==="ref"){let l;typeof i=="function"?l=i(n)||(()=>i(null)):i&&"current"in i&&(i.current=n,l=()=>i.current=null),zl.set(n,l)}else if(s==="style"){const l=n.style;typeof i=="string"?l.cssText=i:(l.cssText="",i!=null&&lg(i,l.setProperty.bind(l)))}else{if(s==="value"){const u=n.nodeName;if(u==="INPUT"||u==="TEXTAREA"||u==="SELECT"){if(n.value=i==null||i===!1?null:i,u==="TEXTAREA"){n.textContent=i;continue}else if(u==="SELECT"){n.selectedIndex===-1&&(n.selectedIndex=0);continue}}}else(s==="checked"&&n.nodeName==="INPUT"||s==="selected"&&n.nodeName==="OPTION")&&(n[s]=i);const l=Sf(n,s);i==null||i===!1?n.removeAttribute(l):i===!0?n.setAttribute(l,""):typeof i=="string"||typeof i=="number"?n.setAttribute(l,i):n.setAttribute(l,i.toString())}}}if(t)for(let s in t){const i=t[s];if(s!=="children"&&!(s in e)){s=Eo(s);const a=Tf(s);a?n.removeEventListener(a[0],i,a[1]):s==="ref"?(r=zl.get(n))==null||r():n.removeAttribute(Sf(n,s))}}},nx=(n,e)=>{e[_e][0]=0,Ri.push([n,e]);const t=e.tag[Ou]||e.tag,r=t.defaultProps?{...t.defaultProps,...e.props}:e.props;try{return[t.call(null,r)]}finally{Ri.pop()}},Cg=(n,e,t,r,s)=>{var i,a;(i=n.vR)!=null&&i.length&&(r.push(...n.vR),delete n.vR),typeof n.tag=="function"&&((a=n[_e][1][Dg])==null||a.forEach(l=>s.push(l))),n.vC.forEach(l=>{var u;if(tn(l))t.push(l);else if(typeof l.tag=="function"||l.tag===""){l.c=e;const h=t.length;if(Cg(l,e,t,r,s),l.s){for(let f=h;f<t.length;f++)t[f].s=!0;l.s=!1}}else t.push(l),(u=l.vR)!=null&&u.length&&(r.push(...l.vR),delete l.vR)})},rx=n=>{for(;;n=n.tag===Si||!n.vC||!n.pP?n.nN:n.vC[0]){if(!n)return null;if(n.tag!==Si&&n.e)return n.e}},Pg=n=>{var e,t,r,s,i,a;tn(n)||((t=(e=n[_e])==null?void 0:e[1][Dg])==null||t.forEach(l=>{var u;return(u=l[2])==null?void 0:u.call(l)}),(r=zl.get(n.e))==null||r(),n.p===2&&((s=n.vC)==null||s.forEach(l=>l.p=2)),(i=n.vC)==null||i.forEach(Pg)),n.p||((a=n.e)==null||a.remove(),delete n.e),typeof n.tag=="function"&&(Zs.delete(n),eo.delete(n),delete n[_e][3],n.a=!0)},kg=(n,e,t)=>{n.c=e,Ng(n,e,t)},Rf=(n,e)=>{if(e){for(let t=0,r=n.length;t<r;t++)if(n[t]===e)return t}},Cf=Symbol(),Ng=(n,e,t)=>{var h;const r=[],s=[],i=[];Cg(n,e,r,s,i),s.forEach(Pg);const a=t?void 0:e.childNodes;let l,u=null;if(t)l=-1;else if(!a.length)l=0;else{const f=Rf(a,rx(n.nN));f!==void 0?(u=a[f],l=f):l=Rf(a,(h=r.find(p=>p.tag!==Si&&p.e))==null?void 0:h.e)??-1,l===-1&&(t=!0)}for(let f=0,p=r.length;f<p;f++,l++){const g=r[f];let _;if(g.s&&g.e)_=g.e,g.s=!1;else{const T=t||!g.e;tn(g)?(g.e&&g.d&&(g.e.textContent=g.t),g.d=!1,_=g.e||(g.e=document.createTextNode(g.t))):(_=g.e||(g.e=g.n?document.createElementNS(g.n,g.tag):document.createElement(g.tag)),tx(_,g.props,g.pP),Ng(g,_,T))}g.tag===Si?l--:t?_.parentNode||e.appendChild(_):a[l]!==_&&a[l-1]!==_&&(a[l+1]===_?e.appendChild(a[l]):e.insertBefore(_,u||a[l]||null))}if(n.pP&&delete n.pP,i.length){const f=[],p=[];i.forEach(([,g,,_,T])=>{g&&f.push(g),_&&p.push(_),T==null||T()}),f.forEach(g=>g()),p.length&&requestAnimationFrame(()=>{p.forEach(g=>g())})}},sx=(n,e)=>!!(n&&n.length===e.length&&n.every((t,r)=>t[1]===e[r][1])),eo=new WeakMap,Gl=(n,e,t)=>{var i,a,l,u,h,f;const r=!t&&e.pC;t&&(e.pC||(e.pC=e.vC));let s;try{t||(t=typeof e.tag=="function"?nx(n,e):Gi(e.props.children)),((i=t[0])==null?void 0:i.tag)===""&&t[0][Bl]&&(s=t[0][Bl],n[5].push([n,s,e]));const p=r?[...e.pC]:e.vC?[...e.vC]:void 0,g=[];let _;for(let T=0;T<t.length;T++){Array.isArray(t[T])&&t.splice(T,1,...t[T].flat());let A=ix(t[T]);if(A){typeof A.tag=="function"&&!A.tag[sg]&&(ps.length>0&&(A[_e][2]=ps.map(U=>[U,U.values.at(-1)])),(a=n[5])!=null&&a.length&&(A[_e][3]=n[5].at(-1)));let S;if(p&&p.length){const U=p.findIndex(tn(A)?N=>tn(N):A.key!==void 0?N=>N.key===A.key&&N.tag===A.tag:N=>N.tag===A.tag);U!==-1&&(S=p[U],p.splice(U,1))}if(S)if(tn(A))S.t!==A.t&&(S.t=A.t,S.d=!0),A=S;else{const U=S.pP=S.props;if(S.props=A.props,S.f||(S.f=A.f||e.f),typeof A.tag=="function"){const N=S[_e][2];S[_e][2]=A[_e][2]||[],S[_e][3]=A[_e][3],!S.f&&((S.o||S)===A.o||(u=(l=S.tag)[Yw])!=null&&u.call(l,U,S.props))&&sx(N,S[_e][2])&&(S.s=!0)}A=S}else if(!tn(A)&&gs){const U=Ts(gs);U&&(A.n=U)}if(!tn(A)&&!A.s&&(Gl(n,A),delete A.f),g.push(A),_&&!_.s&&!A.s)for(let U=_;U&&!tn(U);U=(h=U.vC)==null?void 0:h.at(-1))U.nN=A;_=A}}e.vR=r?[...e.vC,...p||[]]:p||[],e.vC=g,r&&delete e.pC}catch(p){if(e.f=!0,p===Cf){if(s)return;throw p}const[g,_,T]=((f=e[_e])==null?void 0:f[3])||[];if(_){const A=()=>to([0,!1,n[2]],T),S=eo.get(T)||[];S.push(A),eo.set(T,S);const U=_(p,()=>{const N=eo.get(T);if(N){const V=N.indexOf(A);if(V!==-1)return N.splice(V,1),A()}});if(U){if(n[0]===1)n[1]=!0;else if(Gl(n,T,[U]),(_.length===1||n!==g)&&T.c){kg(T,T.c,!1);return}throw Cf}}throw p}finally{s&&n[5].pop()}},ix=n=>{if(!(n==null||typeof n=="boolean")){if(typeof n=="string"||typeof n=="number")return{t:n.toString(),d:!0};if("vR"in n&&(n={tag:n.tag,props:n.props,key:n.key,f:n.f,type:n.tag,ref:n.props.ref,o:n.o||n}),typeof n.tag=="function")n[_e]=[0,[]];else{const e=Z0[n.tag];e&&(gs||(gs=ag("")),n.props.children=[{tag:gs,props:{value:n.n=`http://www.w3.org/${e}`,children:n.props.children}}])}return n}},Pf=(n,e)=>{var t,r;(t=e[_e][2])==null||t.forEach(([s,i])=>{s.values.push(i)});try{Gl(n,e,void 0)}catch{return}if(e.a){delete e.a;return}(r=e[_e][2])==null||r.forEach(([s])=>{s.values.pop()}),(n[0]!==1||!n[1])&&kg(e,e.c,!1)},Zs=new WeakMap,kf=[],to=async(n,e)=>{n[5]||(n[5]=[]);const t=Zs.get(e);t&&t[0](void 0);let r;const s=new Promise(i=>r=i);if(Zs.set(e,[r,()=>{n[2]?n[2](n,e,i=>{Pf(i,e)}).then(()=>r(e)):(Pf(n,e),r(e))}]),kf.length)kf.at(-1).add(e);else{await Promise.resolve();const i=Zs.get(e);i&&(Zs.delete(e),i[1]())}return s},ax=(n,e,t)=>({tag:Si,props:{children:n},key:t,e,p:1}),dl=0,Dg=1,fl=2,ml=3,pl=new WeakMap,Og=(n,e)=>!n||!e||n.length!==e.length||e.some((t,r)=>t!==n[r]),ox=void 0,Nf=[],cx=n=>{var a;const e=()=>typeof n=="function"?n():n,t=Ri.at(-1);if(!t)return[e(),()=>{}];const[,r]=t,s=(a=r[_e][1])[dl]||(a[dl]=[]),i=r[_e][0]++;return s[i]||(s[i]=[e(),l=>{const u=ox,h=s[i];if(typeof l=="function"&&(l=l(h[0])),!Object.is(l,h[0]))if(h[0]=l,Nf.length){const[f,p]=Nf.at(-1);Promise.all([f===3?r:to([f,!1,u],r),p]).then(([g])=>{if(!g||!(f===2||f===3))return;const _=g.vC;requestAnimationFrame(()=>{setTimeout(()=>{_===g.vC&&to([f===3?1:0,!1,u],g)})})})}else to([0,!1,u],r)}])},Fu=(n,e)=>{var l;const t=Ri.at(-1);if(!t)return n;const[,r]=t,s=(l=r[_e][1])[fl]||(l[fl]=[]),i=r[_e][0]++,a=s[i];return Og(a==null?void 0:a[1],e)?s[i]=[n,e]:n=s[i][0],n},lx=n=>{const e=pl.get(n);if(e){if(e.length===2)throw e[1];return e[0]}throw n.then(t=>pl.set(n,[t]),t=>pl.set(n,[void 0,t])),n},ux=(n,e)=>{var l;const t=Ri.at(-1);if(!t)return n();const[,r]=t,s=(l=r[_e][1])[ml]||(l[ml]=[]),i=r[_e][0]++,a=s[i];return Og(a==null?void 0:a[1],e)&&(s[i]=[n(),e]),s[i][0]},hx=ag({pending:!1,data:null,method:null,action:null}),Df=new Set,dx=n=>{Df.add(n),n.finally(()=>Df.delete(n))},$u=(n,e)=>ux(()=>t=>{let r;n&&(typeof n=="function"?r=n(t)||(()=>{n(null)}):n&&"current"in n&&(n.current=t,r=()=>{n.current=null}));const s=e(t);return()=>{s==null||s(),r==null||r()}},[n]),Fr=Object.create(null),Oa=Object.create(null),Ji=(n,e,t,r,s)=>{if(e!=null&&e.itemProp)return{tag:n,props:e,type:n,ref:e.ref};const i=document.head;let{onLoad:a,onError:l,precedence:u,blocking:h,...f}=e,p=null,g=!1;const _=Ka[n];let T;if(_.length>0){const N=i.querySelectorAll(n);e:for(const V of N)for(const L of Ka[n])if(V.getAttribute(L)===e[L]){p=V;break e}if(!p){const V=_.reduce((L,z)=>e[z]===void 0?L:`${L}-${z}-${e[z]}`,n);g=!Oa[V],p=Oa[V]||(Oa[V]=(()=>{const L=document.createElement(n);for(const z of _)e[z]!==void 0&&L.setAttribute(z,e[z]),e.rel&&L.setAttribute("rel",e.rel);return L})())}}else T=i.querySelectorAll(n);u=r?u??"":void 0,r&&(f[Qa]=u);const A=Fu(N=>{if(_.length>0){let V=!1;for(const L of i.querySelectorAll(n)){if(V&&L.getAttribute(Qa)!==u){i.insertBefore(N,L);return}L.getAttribute(Qa)===u&&(V=!0)}i.appendChild(N)}else if(T){let V=!1;for(const L of T)if(L===N){V=!0;break}V||i.insertBefore(N,i.contains(T[0])?T[0]:i.querySelector(n)),T=void 0}},[u]),S=$u(e.ref,N=>{var z;const V=_[0];if(t===2&&(N.innerHTML=""),(g||T)&&A(N),!l&&!a)return;let L=Fr[z=N.getAttribute(V)]||(Fr[z]=new Promise((W,x)=>{N.addEventListener("load",W),N.addEventListener("error",x)}));a&&(L=L.then(a)),l&&(L=L.catch(l)),L.catch(()=>{})});if(s&&h==="render"){const N=Ka[n][0];if(e[N]){const V=e[N],L=Fr[V]||(Fr[V]=new Promise((z,W)=>{A(p),p.addEventListener("load",z),p.addEventListener("error",W)}));lx(L)}}const U={tag:n,type:n,props:{...f,ref:S},ref:S};return U.p=t,p&&(U.e=p),ax(U,i)},fx=n=>{const e=ex(),t=e&&Ts(e);return t!=null&&t.endsWith("svg")?{tag:"title",props:n,type:"title",ref:n.ref}:Ji("title",n,void 0,!1,!1)},mx=n=>!n||["src","async"].some(e=>!n[e])?{tag:"script",props:n,type:"script",ref:n.ref}:Ji("script",n,1,!1,!0),px=n=>!n||!["href","precedence"].every(e=>e in n)?{tag:"style",props:n,type:"style",ref:n.ref}:(n["data-href"]=n.href,delete n.href,Ji("style",n,2,!0,!0)),gx=n=>!n||["onLoad","onError"].some(e=>e in n)||n.rel==="stylesheet"&&(!("precedence"in n)||"disabled"in n)?{tag:"link",props:n,type:"link",ref:n.ref}:Ji("link",n,1,"precedence"in n,!0),yx=n=>Ji("meta",n,void 0,!1,!1),Mg=Symbol(),_x=n=>{const{action:e,...t}=n;typeof e!="function"&&(t.action=e);const[r,s]=cx([null,!1]),i=Fu(async h=>{const f=h.isTrusted?e:h.detail[Mg];if(typeof f!="function")return;h.preventDefault();const p=new FormData(h.target);s([p,!0]);const g=f(p);g instanceof Promise&&(dx(g),await g),s([null,!0])},[]),a=$u(n.ref,h=>(h.addEventListener("submit",i),()=>{h.removeEventListener("submit",i)})),[l,u]=r;return r[1]=!1,{tag:hx,props:{value:{pending:l!==null,data:l,method:l?"post":null,action:l?e:null},children:{tag:"form",props:{...t,ref:a},type:"form",ref:a}},f:u}},Lg=(n,{formAction:e,...t})=>{if(typeof e=="function"){const r=Fu(s=>{s.preventDefault(),s.currentTarget.form.dispatchEvent(new CustomEvent("submit",{detail:{[Mg]:e}}))},[]);t.ref=$u(t.ref,s=>(s.addEventListener("click",r),()=>{s.removeEventListener("click",r)}))}return{tag:n,props:t,type:n,ref:t.ref}},bx=n=>Lg("input",n),vx=n=>Lg("button",n);Object.assign(ql,{title:fx,script:mx,style:px,link:gx,meta:yx,form:_x,input:bx,button:vx});Mu(null);new TextEncoder;var wx=Mu(null),xx=(n,e,t,r)=>(s,i)=>{const a="<!DOCTYPE html>",l=t?vf(h=>t(h,n),{Layout:e,...i},s):s,u=Xw`${vt(a)}${vf(wx.Provider,{value:n},l)}`;return n.html(u)},Ex=(n,e)=>function(r,s){const i=r.getLayout()??h0;return n&&r.setLayout(a=>n({...a,Layout:i},r)),r.setRenderer(xx(r,i,n)),s()};const Ix=Ex(({children:n})=>o("html",{lang:"ja",children:[o("head",{children:[o("meta",{charset:"UTF-8"}),o("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),o("title",{children:"バナスコAI - AI広告診断ツール"}),o("link",{rel:"preconnect",href:"https://fonts.googleapis.com"}),o("link",{rel:"preconnect",href:"https://fonts.gstatic.com",crossorigin:!0}),o("link",{href:"https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@300;400;500;600;700&display=swap",rel:"stylesheet"}),o("link",{href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",rel:"stylesheet"}),o("script",{src:"https://cdn.tailwindcss.com"}),o("link",{href:"/static/style.css",rel:"stylesheet"}),o("script",{dangerouslySetInnerHTML:{__html:`
            tailwind.config = {
              theme: {
                extend: {
                  fontFamily: {
                    'orbitron': ['Orbitron', 'monospace'],
                    'noto': ['Noto Sans JP', 'sans-serif']
                  },
                  colors: {
                    'cyber-blue': '#00f5ff',
                    'cyber-purple': '#8b5cf6',
                    'cyber-pink': '#ff6b9d',
                    'cyber-green': '#00ff88',
                    'cyber-orange': '#ff8c00',
                    'navy': {
                      900: '#0a0a1f',
                      800: '#1a1a2e',
                      700: '#16213e',
                      600: '#2d3561',
                      500: '#4682b4'
                    }
                  },
                  animation: {
                    'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
                    'float': 'float 3s ease-in-out infinite',
                    'slide-up': 'slide-up 0.5s ease-out',
                    'fade-in': 'fade-in 0.3s ease-out'
                  },
                  keyframes: {
                    'pulse-glow': {
                      'from': { boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)' },
                      'to': { boxShadow: '0 0 30px rgba(0, 245, 255, 0.8)' }
                    },
                    'float': {
                      '0%, 100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-10px)' }
                    },
                    'slide-up': {
                      'from': { transform: 'translateY(20px)', opacity: '0' },
                      'to': { transform: 'translateY(0)', opacity: '1' }
                    },
                    'fade-in': {
                      'from': { opacity: '0' },
                      'to': { opacity: '1' }
                    }
                  }
                }
              }
            }
          `}}),o("meta",{name:"description",content:"AI広告診断ツール バナスコAI - バナー広告の効果を瞬時に分析し、改善提案を行うプロフェッショナルツール"}),o("meta",{name:"keywords",content:"AI, 広告分析, バナー診断, マーケティング, 広告効果測定"}),o("meta",{name:"author",content:"バナスコAI"}),o("meta",{property:"og:title",content:"バナスコAI - AI広告診断ツール"}),o("meta",{property:"og:description",content:"AIがバナー広告を詳細分析し、効果予測と改善提案を提供"}),o("meta",{property:"og:type",content:"website"}),o("link",{rel:"icon",type:"image/svg+xml",href:"/static/favicon.svg"})]}),o("body",{class:"bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 min-h-screen text-white font-noto",children:[o("div",{class:"fixed inset-0 overflow-hidden pointer-events-none",children:[o("div",{class:"absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyber-blue/10 to-transparent rounded-full blur-3xl animate-pulse"}),o("div",{class:"absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyber-purple/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"})]}),o("nav",{class:"relative z-50 bg-navy-900/80 backdrop-blur-lg border-b border-cyber-blue/20",children:[o("div",{class:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:o("div",{class:"flex items-center justify-between h-16",children:[o("div",{class:"flex items-center",children:o("a",{href:"/",class:"flex items-center space-x-3 group",children:[o("div",{class:"w-10 h-10 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-lg flex items-center justify-center group-hover:animate-pulse-glow transition-all",children:o("i",{class:"fas fa-chart-line text-white text-xl"})}),o("div",{children:o("h1",{class:"text-xl font-orbitron font-bold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent",children:"バナスコAI"})})]})}),o("div",{class:"hidden md:block",children:o("div",{class:"ml-10 flex items-baseline space-x-8",children:[o("a",{href:"/",class:"nav-link text-gray-300 hover:text-cyber-blue px-3 py-2 rounded-md text-sm font-medium transition-all duration-300",children:[o("i",{class:"fas fa-home mr-2"}),"ホーム"]}),o("a",{href:"/analysis",class:"nav-link text-gray-300 hover:text-cyber-green px-3 py-2 rounded-md text-sm font-medium transition-all duration-300",children:[o("i",{class:"fas fa-chart-bar mr-2"}),"AI診断"]}),o("a",{href:"/copy-generation",class:"nav-link text-gray-300 hover:text-cyber-pink px-3 py-2 rounded-md text-sm font-medium transition-all duration-300",children:[o("i",{class:"fas fa-magic mr-2"}),"コピー生成"]}),o("a",{href:"/login",class:"nav-link text-gray-300 hover:text-cyber-orange px-3 py-2 rounded-md text-sm font-medium transition-all duration-300",children:[o("i",{class:"fas fa-sign-in-alt mr-2"}),"ログイン"]})]})}),o("div",{class:"md:hidden",children:o("button",{id:"mobile-menu-btn",class:"text-gray-400 hover:text-white focus:outline-none focus:text-white",children:o("i",{class:"fas fa-bars text-xl"})})})]})}),o("div",{id:"mobile-menu",class:"hidden md:hidden bg-navy-800/95 backdrop-blur-lg border-t border-cyber-blue/20",children:o("div",{class:"px-2 pt-2 pb-3 space-y-1 sm:px-3",children:[o("a",{href:"/",class:"block px-3 py-2 text-base font-medium text-gray-300 hover:text-cyber-blue transition-colors",children:[o("i",{class:"fas fa-home mr-2"}),"ホーム"]}),o("a",{href:"/analysis",class:"block px-3 py-2 text-base font-medium text-gray-300 hover:text-cyber-green transition-colors",children:[o("i",{class:"fas fa-chart-bar mr-2"}),"AI診断"]}),o("a",{href:"/copy-generation",class:"block px-3 py-2 text-base font-medium text-gray-300 hover:text-cyber-pink transition-colors",children:[o("i",{class:"fas fa-magic mr-2"}),"コピー生成"]}),o("a",{href:"/login",class:"block px-3 py-2 text-base font-medium text-gray-300 hover:text-cyber-orange transition-colors",children:[o("i",{class:"fas fa-sign-in-alt mr-2"}),"ログイン"]})]})})]}),o("main",{class:"relative z-10",children:n}),o("footer",{class:"relative z-10 bg-navy-900/50 backdrop-blur-lg border-t border-cyber-blue/10 mt-20",children:o("div",{class:"max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8",children:[o("div",{class:"grid grid-cols-1 md:grid-cols-3 gap-8",children:[o("div",{children:[o("h3",{class:"text-lg font-orbitron font-semibold text-cyber-blue mb-4",children:"バナスコAI"}),o("p",{class:"text-gray-400 text-sm leading-relaxed",children:"AI技術を活用したプロフェッショナル広告分析ツール。バナー広告の効果を瞬時に診断し、データに基づいた改善提案を提供します。"})]}),o("div",{children:[o("h3",{class:"text-lg font-semibold text-cyber-green mb-4",children:"機能"}),o("ul",{class:"text-gray-400 text-sm space-y-2",children:[o("li",{children:[o("i",{class:"fas fa-check mr-2 text-cyber-green"}),"AI広告診断"]}),o("li",{children:[o("i",{class:"fas fa-check mr-2 text-cyber-green"}),"A/B比較分析"]}),o("li",{children:[o("i",{class:"fas fa-check mr-2 text-cyber-green"}),"コピー自動生成"]}),o("li",{children:[o("i",{class:"fas fa-check mr-2 text-cyber-green"}),"効果予測レポート"]})]})]}),o("div",{children:[o("h3",{class:"text-lg font-semibold text-cyber-pink mb-4",children:"技術スタック"}),o("ul",{class:"text-gray-400 text-sm space-y-2",children:[o("li",{children:[o("i",{class:"fas fa-code mr-2 text-cyber-pink"}),"Hono Framework"]}),o("li",{children:[o("i",{class:"fas fa-cloud mr-2 text-cyber-pink"}),"Cloudflare Pages"]}),o("li",{children:[o("i",{class:"fas fa-robot mr-2 text-cyber-pink"}),"最先端banaAI Vision"]}),o("li",{children:[o("i",{class:"fas fa-mobile-alt mr-2 text-cyber-pink"}),"レスポンシブデザイン"]})]})]})]}),o("div",{class:"mt-8 pt-8 border-t border-gray-700 text-center",children:o("p",{class:"text-gray-400 text-sm",children:"© 2024 バナスコAI. All rights reserved. | AI-Powered Banner Analysis Engine"})})]})}),o("script",{src:"/static/app.js"})]})]})),Ax=()=>o("div",{class:"min-h-screen",children:[o("section",{class:"relative pt-20 pb-32 overflow-hidden",children:o("div",{class:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:o("div",{class:"text-center animate-slide-up",children:[o("div",{class:"mb-8",children:[o("h1",{class:"text-5xl md:text-7xl font-orbitron font-bold mb-6",children:[o("span",{class:"bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink bg-clip-text text-transparent animate-pulse-glow",children:"AI広告診断"}),o("br",{}),o("span",{class:"text-white",children:"バナスコAI"})]}),o("p",{class:"text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed",children:["最先端banaAI Vision技術を活用した次世代広告分析ツール",o("br",{}),o("span",{class:"text-cyber-blue font-semibold",children:"瞬時に診断、的確に改善提案"})]})]}),o("div",{class:"flex flex-col sm:flex-row gap-6 justify-center items-center mb-16",children:[o("a",{href:"/analysis",class:"group relative px-8 py-4 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-cyber-blue/50 transition-all duration-300 transform hover:scale-105 hover:animate-pulse-glow",children:[o("i",{class:"fas fa-chart-line mr-3"}),"AI診断を開始",o("div",{class:"absolute inset-0 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-purple opacity-0 group-hover:opacity-20 transition-opacity duration-300"})]}),o("a",{href:"/copy-generation",class:"group relative px-8 py-4 bg-gradient-to-r from-cyber-pink to-cyber-orange rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-cyber-pink/50 transition-all duration-300 transform hover:scale-105 hover:animate-pulse-glow",children:[o("i",{class:"fas fa-magic mr-3"}),"コピー生成",o("div",{class:"absolute inset-0 rounded-full bg-gradient-to-r from-cyber-pink to-cyber-orange opacity-0 group-hover:opacity-20 transition-opacity duration-300"})]})]}),o("div",{class:"max-w-4xl mx-auto",children:o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-3xl border border-cyber-blue/20 p-8 shadow-2xl",children:[o("h3",{class:"text-2xl font-orbitron font-semibold text-cyber-blue mb-6",children:[o("i",{class:"fas fa-eye mr-3"}),"プレビュー機能"]}),o("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[o("div",{class:"space-y-4",children:[o("h4",{class:"text-lg font-semibold text-cyber-green",children:[o("i",{class:"fas fa-chart-bar mr-2"}),"AI分析結果"]}),o("div",{class:"bg-navy-700/50 rounded-xl p-4 border border-cyber-green/20",children:[o("div",{class:"flex justify-between items-center mb-2",children:[o("span",{class:"text-sm text-gray-400",children:"総合スコア"}),o("span",{class:"text-2xl font-bold text-cyber-green",children:"82"})]}),o("div",{class:"w-full bg-navy-600 rounded-full h-2",children:o("div",{class:"bg-gradient-to-r from-cyber-green to-cyber-blue h-2 rounded-full",style:"width: 82%"})}),o("p",{class:"text-xs text-cyber-green mt-2",children:"優秀レベル"})]})]}),o("div",{class:"space-y-4",children:[o("h4",{class:"text-lg font-semibold text-cyber-pink",children:[o("i",{class:"fas fa-magic mr-2"}),"生成コピー例"]}),o("div",{class:"bg-navy-700/50 rounded-xl p-4 border border-cyber-pink/20",children:[o("p",{class:"text-sm text-white mb-2",children:'"美肌への近道、ここにあり。今すぐ体験してください。"'}),o("div",{class:"flex justify-between items-center",children:[o("span",{class:"text-xs text-gray-400",children:"効果予測"}),o("span",{class:"text-sm font-semibold text-cyber-pink",children:"92%"})]})]})]})]})]})})]})})}),o("section",{class:"py-20 bg-navy-800/30",children:o("div",{class:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[o("div",{class:"text-center mb-16",children:[o("h2",{class:"text-4xl font-orbitron font-bold text-white mb-4",children:"プロフェッショナル機能"}),o("p",{class:"text-xl text-gray-300 max-w-2xl mx-auto",children:"AIが提供する高精度分析で、広告効果を最大化"})]}),o("div",{class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",children:[o("div",{class:"group bg-navy-800/50 backdrop-blur-lg rounded-2xl p-8 border border-cyber-blue/20 hover:border-cyber-blue/50 transition-all duration-300 hover:transform hover:scale-105 animate-float",children:[o("div",{class:"w-16 h-16 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse-glow",children:o("i",{class:"fas fa-chart-line text-2xl text-white"})}),o("h3",{class:"text-xl font-semibold text-white mb-4",children:"AI広告診断"}),o("p",{class:"text-gray-400 mb-4",children:"5つの重要指標で広告を詳細分析。瞬間伝達力、視認性、行動喚起力など、効果に直結する要素を評価。"}),o("ul",{class:"text-sm text-gray-500 space-y-1",children:[o("li",{children:[o("i",{class:"fas fa-check mr-2 text-cyber-blue"}),"総合スコア算出"]}),o("li",{children:[o("i",{class:"fas fa-check mr-2 text-cyber-blue"}),"項目別詳細評価"]}),o("li",{children:[o("i",{class:"fas fa-check mr-2 text-cyber-blue"}),"改善提案レポート"]})]})]}),o("div",{class:"group bg-navy-800/50 backdrop-blur-lg rounded-2xl p-8 border border-cyber-green/20 hover:border-cyber-green/50 transition-all duration-300 hover:transform hover:scale-105 animate-float delay-200",children:[o("div",{class:"w-16 h-16 bg-gradient-to-br from-cyber-green to-cyber-blue rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse-glow",children:o("i",{class:"fas fa-balance-scale text-2xl text-white"})}),o("h3",{class:"text-xl font-semibold text-white mb-4",children:"A/B比較分析"}),o("p",{class:"text-gray-400 mb-4",children:"2つのバナーを同時比較し、統計的有意性に基づいた勝者判定。CVR改善予測も提供。"}),o("ul",{class:"text-sm text-gray-500 space-y-1",children:[o("li",{children:[o("i",{class:"fas fa-check mr-2 text-cyber-green"}),"勝者自動判定"]}),o("li",{children:[o("i",{class:"fas fa-check mr-2 text-cyber-green"}),"統計的有意性表示"]}),o("li",{children:[o("i",{class:"fas fa-check mr-2 text-cyber-green"}),"効果予測レポート"]})]})]}),o("div",{class:"group bg-navy-800/50 backdrop-blur-lg rounded-2xl p-8 border border-cyber-pink/20 hover:border-cyber-pink/50 transition-all duration-300 hover:transform hover:scale-105 animate-float delay-400",children:[o("div",{class:"w-16 h-16 bg-gradient-to-br from-cyber-pink to-cyber-orange rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse-glow",children:o("i",{class:"fas fa-magic text-2xl text-white"})}),o("h3",{class:"text-xl font-semibold text-white mb-4",children:"AIコピー生成"}),o("p",{class:"text-gray-400 mb-4",children:"画像から効果的な広告コピーを自動生成。業界別最適化で、ターゲットに響くメッセージを作成。"}),o("ul",{class:"text-sm text-gray-500 space-y-1",children:[o("li",{children:[o("i",{class:"fas fa-check mr-2 text-cyber-pink"}),"複数バリエーション生成"]}),o("li",{children:[o("i",{class:"fas fa-check mr-2 text-cyber-pink"}),"業界別最適化"]}),o("li",{children:[o("i",{class:"fas fa-check mr-2 text-cyber-pink"}),"効果予測スコア"]})]})]}),o("div",{class:"group bg-navy-800/50 backdrop-blur-lg rounded-2xl p-8 border border-cyber-orange/20 hover:border-cyber-orange/50 transition-all duration-300 hover:transform hover:scale-105 animate-float delay-600",children:[o("div",{class:"w-16 h-16 bg-gradient-to-br from-cyber-orange to-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse-glow",children:o("i",{class:"fas fa-industry text-2xl text-white"})}),o("h3",{class:"text-xl font-semibold text-white mb-4",children:"業界別最適化"}),o("p",{class:"text-gray-400 mb-4",children:"美容、飲食、不動産など、業界特性を考慮した専門的な分析とアドバイスを提供。"}),o("ul",{class:"text-sm text-gray-500 space-y-1",children:[o("li",{children:[o("i",{class:"fas fa-check mr-2 text-cyber-orange"}),"業界特化分析"]}),o("li",{children:[o("i",{class:"fas fa-check mr-2 text-cyber-orange"}),"競合ベンチマーク"]}),o("li",{children:[o("i",{class:"fas fa-check mr-2 text-cyber-orange"}),"薬機法チェック"]})]})]}),o("div",{class:"group bg-navy-800/50 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 animate-float delay-800",children:[o("div",{class:"w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse-glow",children:o("i",{class:"fas fa-mobile-alt text-2xl text-white"})}),o("h3",{class:"text-xl font-semibold text-white mb-4",children:"媒体別最適化"}),o("p",{class:"text-gray-400 mb-4",children:"Instagram、GDN、YDNなど、各媒体の特性に合わせた最適化提案を実施。"}),o("ul",{class:"text-sm text-gray-500 space-y-1",children:[o("li",{children:[o("i",{class:"fas fa-check mr-2 text-purple-500"}),"媒体特化アドバイス"]}),o("li",{children:[o("i",{class:"fas fa-check mr-2 text-purple-500"}),"サイズ最適化"]}),o("li",{children:[o("i",{class:"fas fa-check mr-2 text-purple-500"}),"表示環境考慮"]})]})]}),o("div",{class:"group bg-navy-800/50 backdrop-blur-lg rounded-2xl p-8 border border-teal-500/20 hover:border-teal-500/50 transition-all duration-300 hover:transform hover:scale-105 animate-float delay-1000",children:[o("div",{class:"w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse-glow",children:o("i",{class:"fas fa-chart-area text-2xl text-white"})}),o("h3",{class:"text-xl font-semibold text-white mb-4",children:"効果予測レポート"}),o("p",{class:"text-gray-400 mb-4",children:"クリック率、コンバージョン率、ROI改善など、具体的な数値で効果を予測。"}),o("ul",{class:"text-sm text-gray-500 space-y-1",children:[o("li",{children:[o("i",{class:"fas fa-check mr-2 text-teal-500"}),"CTR予測"]}),o("li",{children:[o("i",{class:"fas fa-check mr-2 text-teal-500"}),"CVR改善試算"]}),o("li",{children:[o("i",{class:"fas fa-check mr-2 text-teal-500"}),"ROI分析"]})]})]})]})]})}),o("section",{class:"py-20",children:o("div",{class:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[o("div",{class:"text-center mb-16",children:[o("h2",{class:"text-4xl font-orbitron font-bold text-white mb-4",children:"プロフェッショナル実績"}),o("p",{class:"text-xl text-gray-300",children:"AIが支援する広告改善の成果"})]}),o("div",{class:"grid grid-cols-1 md:grid-cols-4 gap-8",children:[o("div",{class:"text-center group",children:o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl p-8 border border-cyber-blue/20 group-hover:border-cyber-blue/50 transition-all duration-300",children:[o("div",{class:"text-4xl font-orbitron font-bold text-cyber-blue mb-2",children:"92%"}),o("p",{class:"text-gray-300",children:"分析精度"})]})}),o("div",{class:"text-center group",children:o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl p-8 border border-cyber-green/20 group-hover:border-cyber-green/50 transition-all duration-300",children:[o("div",{class:"text-4xl font-orbitron font-bold text-cyber-green mb-2",children:"+28%"}),o("p",{class:"text-gray-300",children:"平均CVR改善"})]})}),o("div",{class:"text-center group",children:o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl p-8 border border-cyber-pink/20 group-hover:border-cyber-pink/50 transition-all duration-300",children:[o("div",{class:"text-4xl font-orbitron font-bold text-cyber-pink mb-2",children:"3.2秒"}),o("p",{class:"text-gray-300",children:"分析完了時間"})]})}),o("div",{class:"text-center group",children:o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl p-8 border border-cyber-orange/20 group-hover:border-cyber-orange/50 transition-all duration-300",children:[o("div",{class:"text-4xl font-orbitron font-bold text-cyber-orange mb-2",children:"5+"}),o("p",{class:"text-gray-300",children:"対応業界"})]})})]})]})}),o("section",{class:"py-20 bg-gradient-to-r from-navy-800/50 to-navy-700/50",children:o("div",{class:"max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8",children:[o("h2",{class:"text-4xl font-orbitron font-bold text-white mb-6",children:"今すぐAI診断を体験"}),o("p",{class:"text-xl text-gray-300 mb-8",children:"デモアカウントでお試しいただけます。登録不要で即座に体験可能。"}),o("div",{class:"flex flex-col sm:flex-row gap-4 justify-center items-center",children:[o("a",{href:"/analysis",class:"group relative px-10 py-4 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-cyber-blue/50 transition-all duration-300 transform hover:scale-110 hover:animate-pulse-glow",children:[o("i",{class:"fas fa-rocket mr-3"}),"AI診断を開始"]}),o("a",{href:"/login",class:"group relative px-10 py-4 bg-transparent border-2 border-cyber-blue rounded-full text-cyber-blue font-bold text-lg hover:bg-cyber-blue hover:text-white transition-all duration-300 transform hover:scale-105",children:[o("i",{class:"fas fa-user mr-3"}),"デモログイン"]})]}),o("div",{class:"mt-8 text-sm text-gray-400",children:o("p",{children:["デモアカウント: ",o("span",{class:"text-cyber-blue font-mono",children:"demo"})," / ",o("span",{class:"text-cyber-blue font-mono",children:"demo123"})]})})]})})]}),Tx=()=>o("div",{class:"min-h-screen pt-20 pb-20",children:[o("div",{class:"max-w-md mx-auto px-4 sm:px-6 lg:px-8",children:[o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-3xl border border-cyber-blue/20 p-8 shadow-2xl animate-slide-up",children:[o("div",{class:"text-center mb-8",children:[o("div",{class:"w-20 h-20 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow",children:o("i",{class:"fas fa-user-circle text-3xl text-white"})}),o("h1",{class:"text-3xl font-orbitron font-bold text-white mb-2",children:"ログイン"}),o("p",{class:"text-gray-400",children:"バナスコAIにアクセス"})]}),o("form",{id:"loginForm",class:"space-y-6",children:[o("div",{children:[o("label",{class:"block text-sm font-medium text-gray-300 mb-2",children:[o("i",{class:"fas fa-envelope mr-2 text-cyber-blue"}),"メールアドレス"]}),o("input",{type:"email",id:"email",name:"email",class:"w-full px-4 py-3 bg-navy-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/20 transition-all duration-300",placeholder:"メールアドレスを入力",required:!0,autocomplete:"email"})]}),o("div",{children:[o("label",{class:"block text-sm font-medium text-gray-300 mb-2",children:[o("i",{class:"fas fa-lock mr-2 text-cyber-blue"}),"パスワード"]}),o("input",{type:"password",id:"password",name:"password",class:"w-full px-4 py-3 bg-navy-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/20 transition-all duration-300",placeholder:"パスワードを入力",required:!0})]}),o("div",{id:"errorMessage",class:"hidden bg-red-500/10 border border-red-500/20 rounded-xl p-4",children:o("div",{class:"flex items-center text-red-400",children:[o("i",{class:"fas fa-exclamation-triangle mr-2"}),o("span",{id:"errorText",children:"エラーメッセージ"})]})}),o("div",{id:"successMessage",class:"hidden bg-green-500/10 border border-green-500/20 rounded-xl p-4",children:o("div",{class:"flex items-center text-green-400",children:[o("i",{class:"fas fa-check-circle mr-2"}),o("span",{id:"successText",children:"ログイン成功"})]})}),o("button",{type:"submit",id:"loginButton",class:"w-full py-3 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-xl text-white font-semibold hover:from-cyber-purple hover:to-cyber-pink transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyber-blue/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",children:[o("span",{id:"loginButtonText",children:[o("i",{class:"fas fa-sign-in-alt mr-2"}),"ログイン"]}),o("span",{id:"loginSpinner",class:"hidden",children:[o("i",{class:"fas fa-spinner fa-spin mr-2"}),"ログイン中..."]})]})]}),o("div",{class:"my-8 flex items-center",children:[o("div",{class:"flex-1 border-t border-gray-600"}),o("span",{class:"px-4 text-gray-400 text-sm",children:"または"}),o("div",{class:"flex-1 border-t border-gray-600"})]}),o("div",{class:"bg-cyber-blue/10 border border-cyber-blue/20 rounded-xl p-6 mb-6",children:[o("h3",{class:"text-lg font-semibold text-cyber-blue mb-3",children:[o("i",{class:"fas fa-rocket mr-2"}),"デモアカウント"]}),o("p",{class:"text-gray-300 text-sm mb-4",children:"すぐにお試しいただけるデモアカウントをご用意しています"}),o("div",{class:"bg-navy-700/50 rounded-lg p-4 mb-4",children:o("div",{class:"grid grid-cols-2 gap-4 text-sm",children:[o("div",{children:[o("span",{class:"text-gray-400",children:"メールアドレス:"}),o("div",{class:"text-cyber-blue font-mono font-semibold",children:"demo@banasuko.com"})]}),o("div",{children:[o("span",{class:"text-gray-400",children:"パスワード:"}),o("div",{class:"text-cyber-blue font-mono font-semibold",children:"demo123"})]})]})}),o("button",{id:"demoLoginButton",class:"w-full py-2 bg-cyber-blue/20 border border-cyber-blue/30 rounded-lg text-cyber-blue font-medium hover:bg-cyber-blue/30 transition-all duration-300",children:[o("i",{class:"fas fa-magic mr-2"}),"デモアカウントでログイン"]})]}),o("div",{class:"text-center",children:o("button",{id:"showRegisterForm",class:"text-cyber-pink hover:text-cyber-orange transition-colors duration-300",children:[o("i",{class:"fas fa-user-plus mr-2"}),"新規アカウント作成"]})})]}),o("div",{id:"registerForm",class:"hidden mt-8 bg-navy-800/50 backdrop-blur-lg rounded-3xl border border-cyber-pink/20 p-8 shadow-2xl animate-slide-up",children:[o("div",{class:"text-center mb-8",children:[o("div",{class:"w-20 h-20 bg-gradient-to-br from-cyber-pink to-cyber-orange rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow",children:o("i",{class:"fas fa-user-plus text-3xl text-white"})}),o("h1",{class:"text-3xl font-orbitron font-bold text-white mb-2",children:"新規登録"}),o("p",{class:"text-gray-400",children:"バナスコAIアカウント作成"})]}),o("form",{id:"registerFormElement",class:"space-y-6",children:[o("div",{children:[o("label",{class:"block text-sm font-medium text-gray-300 mb-2",children:[o("i",{class:"fas fa-user mr-2 text-cyber-pink"}),"ユーザー名"]}),o("input",{type:"text",id:"regUsername",name:"username",class:"w-full px-4 py-3 bg-navy-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyber-pink focus:ring-2 focus:ring-cyber-pink/20 transition-all duration-300",placeholder:"ユーザー名を入力",required:!0})]}),o("div",{children:[o("label",{class:"block text-sm font-medium text-gray-300 mb-2",children:[o("i",{class:"fas fa-envelope mr-2 text-cyber-pink"}),"メールアドレス"]}),o("input",{type:"email",id:"regEmail",name:"email",class:"w-full px-4 py-3 bg-navy-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyber-pink focus:ring-2 focus:ring-cyber-pink/20 transition-all duration-300",placeholder:"メールアドレスを入力",required:!0})]}),o("div",{children:[o("label",{class:"block text-sm font-medium text-gray-300 mb-2",children:[o("i",{class:"fas fa-lock mr-2 text-cyber-pink"}),"パスワード"]}),o("input",{type:"password",id:"regPassword",name:"password",class:"w-full px-4 py-3 bg-navy-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyber-pink focus:ring-2 focus:ring-cyber-pink/20 transition-all duration-300",placeholder:"パスワードを入力",required:!0})]}),o("div",{id:"regErrorMessage",class:"hidden bg-red-500/10 border border-red-500/20 rounded-xl p-4",children:o("div",{class:"flex items-center text-red-400",children:[o("i",{class:"fas fa-exclamation-triangle mr-2"}),o("span",{id:"regErrorText",children:"エラーメッセージ"})]})}),o("div",{id:"regSuccessMessage",class:"hidden bg-green-500/10 border border-green-500/20 rounded-xl p-4",children:o("div",{class:"flex items-center text-green-400",children:[o("i",{class:"fas fa-check-circle mr-2"}),o("span",{id:"regSuccessText",children:"登録成功"})]})}),o("button",{type:"submit",id:"registerButton",class:"w-full py-3 bg-gradient-to-r from-cyber-pink to-cyber-orange rounded-xl text-white font-semibold hover:from-cyber-orange hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyber-pink/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",children:[o("span",{id:"registerButtonText",children:[o("i",{class:"fas fa-user-plus mr-2"}),"アカウント作成"]}),o("span",{id:"registerSpinner",class:"hidden",children:[o("i",{class:"fas fa-spinner fa-spin mr-2"}),"作成中..."]})]})]}),o("div",{class:"text-center mt-6",children:o("button",{id:"showLoginForm",class:"text-cyber-blue hover:text-cyber-purple transition-colors duration-300",children:[o("i",{class:"fas fa-arrow-left mr-2"}),"ログインに戻る"]})})]}),o("div",{class:"mt-12 bg-navy-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/30 p-6",children:[o("h3",{class:"text-lg font-semibold text-white mb-4 text-center",children:[o("i",{class:"fas fa-star mr-2 text-cyber-blue"}),"ログイン後の機能"]}),o("div",{class:"space-y-3 text-sm",children:[o("div",{class:"flex items-center text-gray-300",children:[o("i",{class:"fas fa-chart-line mr-3 text-cyber-blue w-4"}),o("span",{children:"AI広告診断 - 詳細分析とスコアリング"})]}),o("div",{class:"flex items-center text-gray-300",children:[o("i",{class:"fas fa-balance-scale mr-3 text-cyber-green w-4"}),o("span",{children:"A/B比較分析 - 統計的有意性に基づく判定"})]}),o("div",{class:"flex items-center text-gray-300",children:[o("i",{class:"fas fa-magic mr-3 text-cyber-pink w-4"}),o("span",{children:"AIコピー生成 - 効果的な広告文の自動生成"})]}),o("div",{class:"flex items-center text-gray-300",children:[o("i",{class:"fas fa-chart-area mr-3 text-cyber-orange w-4"}),o("span",{children:"効果予測レポート - ROI・CVR改善予測"})]})]})]})]}),o("div",{class:"fixed inset-0 pointer-events-none overflow-hidden",children:[o("div",{class:"absolute top-1/4 left-1/4 w-2 h-2 bg-cyber-blue rounded-full animate-ping opacity-20"}),o("div",{class:"absolute top-3/4 right-1/4 w-1 h-1 bg-cyber-pink rounded-full animate-ping opacity-30 delay-1000"}),o("div",{class:"absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-cyber-green rounded-full animate-ping opacity-25 delay-2000"})]}),o("script",{src:"/static/js/auth.js"})]}),Sx=()=>o("div",{class:"min-h-screen pt-20 pb-20",children:[o("div",{class:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[o("div",{class:"text-center mb-12 animate-slide-up",children:[o("h1",{class:"text-4xl md:text-5xl font-orbitron font-bold mb-4",children:o("span",{class:"bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent",children:"AI広告診断"})}),o("p",{class:"text-xl text-gray-300 max-w-3xl mx-auto",children:"最先端banaAI Vision技術が画像を詳細分析し、効果予測と改善提案を提供"})]}),o("div",{class:"grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12",children:[o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-blue/20 p-6",children:[o("h3",{class:"text-xl font-semibold text-cyber-blue mb-6",children:[o("i",{class:"fas fa-user-cog mr-2"}),"基本情報"]}),o("div",{class:"space-y-4",children:[o("div",{children:[o("label",{class:"block text-sm font-medium text-gray-300 mb-2",children:"ユーザー名"}),o("input",{type:"text",id:"userName",class:"w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue transition-colors",placeholder:"あなたの名前"})]}),o("div",{children:[o("label",{class:"block text-sm font-medium text-gray-300 mb-2",children:"ターゲット年代"}),o("select",{id:"ageGroup",class:"w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyber-blue transition-colors",children:[o("option",{value:"",children:"指定なし"}),o("option",{value:"10代",children:"10代"}),o("option",{value:"20代",children:"20代"}),o("option",{value:"30代",children:"30代"}),o("option",{value:"40代",children:"40代"}),o("option",{value:"50代",children:"50代"}),o("option",{value:"60代以上",children:"60代以上"})]})]}),o("div",{children:[o("label",{class:"block text-sm font-medium text-gray-300 mb-2",children:"媒体"}),o("select",{id:"platform",class:"w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyber-blue transition-colors",children:[o("option",{value:"Instagram",children:"Instagram"}),o("option",{value:"GDN",children:"GDN"}),o("option",{value:"YDN",children:"YDN"})]})]}),o("div",{children:[o("label",{class:"block text-sm font-medium text-gray-300 mb-2",children:"目的"}),o("select",{id:"purpose",class:"w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyber-blue transition-colors",children:[o("option",{value:"プロフィール誘導",children:"プロフィール誘導"}),o("option",{value:"リンククリック",children:"リンククリック"}),o("option",{value:"保存数増加",children:"保存数増加"}),o("option",{value:"インプレッション増加",children:"インプレッション増加"})]})]})]})]}),o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-green/20 p-6",children:[o("h3",{class:"text-xl font-semibold text-cyber-green mb-6",children:[o("i",{class:"fas fa-industry mr-2"}),"業界情報"]}),o("div",{class:"space-y-4",children:[o("div",{children:[o("label",{class:"block text-sm font-medium text-gray-300 mb-2",children:"業界"}),o("select",{id:"industry",class:"w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyber-green transition-colors",children:[o("option",{value:"美容",children:"美容"}),o("option",{value:"飲食",children:"飲食"}),o("option",{value:"不動産",children:"不動産"}),o("option",{value:"子ども写真館",children:"子ども写真館"}),o("option",{value:"その他",children:"その他"})]})]}),o("div",{class:"flex items-center",children:[o("input",{type:"checkbox",id:"abMode",class:"w-4 h-4 text-cyber-green bg-navy-700 border-gray-600 rounded focus:ring-cyber-green/20 focus:ring-2"}),o("label",{for:"abMode",class:"ml-2 text-sm font-medium text-gray-300",children:"🆚 A/B比較分析モード"})]}),o("p",{class:"text-xs text-gray-400",children:"2つの画像を比較分析する場合にチェック"})]}),o("div",{class:"mt-6 p-4 bg-navy-700/30 rounded-lg border border-cyber-green/10",children:[o("h4",{class:"text-sm font-semibold text-cyber-green mb-3",children:[o("i",{class:"fas fa-clipboard-list mr-2"}),"採点基準"]}),o("div",{class:"space-y-2 text-xs",children:[o("div",{class:"flex items-center text-gray-400",children:[o("i",{class:"fas fa-bolt mr-2 text-cyber-blue w-4"}),o("span",{children:"瞬間伝達力 - 1秒で内容が理解できるか"})]}),o("div",{class:"flex items-center text-gray-400",children:[o("i",{class:"fas fa-eye mr-2 text-cyber-green w-4"}),o("span",{children:"視認性 - 文字が読みやすく配色が適切か"})]}),o("div",{class:"flex items-center text-gray-400",children:[o("i",{class:"fas fa-bullseye mr-2 text-cyber-pink w-4"}),o("span",{children:"行動喚起 - 明確なCTAでユーザーを誘導"})]}),o("div",{class:"flex items-center text-gray-400",children:[o("i",{class:"fas fa-sync mr-2 text-cyber-orange w-4"}),o("span",{children:"整合性 - 画像と文字内容の一致度"})]}),o("div",{class:"flex items-center text-gray-400",children:[o("i",{class:"fas fa-balance-scale mr-2 text-purple-400 w-4"}),o("span",{children:"情報バランス - 情報過多にならないか"})]})]})]})]})]}),o("div",{id:"singleUpload",class:"mb-12",children:o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-purple/20 p-8",children:[o("h3",{class:"text-2xl font-semibold text-cyber-purple mb-6 text-center",children:[o("i",{class:"fas fa-cloud-upload-alt mr-2"}),"画像アップロード"]}),o("div",{class:"border-2 border-dashed border-cyber-purple/30 rounded-xl p-8 text-center hover:border-cyber-purple/50 transition-colors duration-300",children:o("div",{id:"dropZone",class:"cursor-pointer",children:[o("i",{class:"fas fa-image text-6xl text-cyber-purple/50 mb-4"}),o("p",{class:"text-lg text-gray-300 mb-2",children:"画像をドラッグ&ドロップまたはクリックしてアップロード"}),o("p",{class:"text-sm text-gray-400",children:"PNG, JPG, JPEG対応（最大10MB）"}),o("input",{type:"file",id:"imageUpload",class:"hidden",accept:"image/*"})]})}),o("div",{id:"imagePreview",class:"hidden mt-6",children:[o("img",{id:"previewImage",class:"max-w-full h-auto rounded-lg border border-gray-600"}),o("p",{id:"imageName",class:"text-sm text-gray-400 mt-2"})]})]})}),o("div",{id:"abUpload",class:"hidden mb-12",children:o("div",{class:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-blue/20 p-6",children:[o("h3",{class:"text-xl font-semibold text-cyber-blue mb-4 text-center",children:"🅰️ パターンA"}),o("div",{class:"border-2 border-dashed border-cyber-blue/30 rounded-xl p-6 text-center hover:border-cyber-blue/50 transition-colors duration-300",children:o("div",{id:"dropZoneA",class:"cursor-pointer",children:[o("i",{class:"fas fa-image text-4xl text-cyber-blue/50 mb-3"}),o("p",{class:"text-gray-300 mb-1",children:"画像Aをアップロード"}),o("p",{class:"text-xs text-gray-400",children:"PNG, JPG, JPEG"}),o("input",{type:"file",id:"imageUploadA",class:"hidden",accept:"image/*"})]})}),o("div",{id:"imagePreviewA",class:"hidden mt-4",children:o("img",{id:"previewImageA",class:"w-full h-auto rounded-lg border border-gray-600"})})]}),o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-pink/20 p-6",children:[o("h3",{class:"text-xl font-semibold text-cyber-pink mb-4 text-center",children:"🅱️ パターンB"}),o("div",{class:"border-2 border-dashed border-cyber-pink/30 rounded-xl p-6 text-center hover:border-cyber-pink/50 transition-colors duration-300",children:o("div",{id:"dropZoneB",class:"cursor-pointer",children:[o("i",{class:"fas fa-image text-4xl text-cyber-pink/50 mb-3"}),o("p",{class:"text-gray-300 mb-1",children:"画像Bをアップロード"}),o("p",{class:"text-xs text-gray-400",children:"PNG, JPG, JPEG"}),o("input",{type:"file",id:"imageUploadB",class:"hidden",accept:"image/*"})]})}),o("div",{id:"imagePreviewB",class:"hidden mt-4",children:o("img",{id:"previewImageB",class:"w-full h-auto rounded-lg border border-gray-600"})})]})]})}),o("div",{class:"text-center mb-12",children:o("button",{id:"analyzeButton",disabled:!0,class:"px-12 py-4 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-cyber-blue/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",children:[o("span",{id:"analyzeButtonText",children:[o("i",{class:"fas fa-rocket mr-3"}),"AI分析開始"]}),o("span",{id:"analyzeSpinner",class:"hidden",children:[o("i",{class:"fas fa-spinner fa-spin mr-3"}),"AI分析中..."]})]})}),o("div",{id:"resultsSection",class:"hidden",children:[o("div",{id:"singleResults",class:"hidden",children:o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-green/20 p-8 mb-8 animate-slide-up",children:[o("h3",{class:"text-2xl font-semibold text-cyber-green mb-6 text-center",children:[o("i",{class:"fas fa-chart-line mr-2"}),"AI分析結果"]}),o("div",{class:"grid grid-cols-1 lg:grid-cols-3 gap-8",children:[o("div",{class:"space-y-4",children:[o("div",{class:"bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/10 border border-cyber-blue/30 rounded-xl p-6 text-center",children:[o("div",{id:"totalScore",class:"text-5xl font-orbitron font-bold text-cyber-blue mb-2",children:"82"}),o("p",{class:"text-gray-300",children:"総合スコア"}),o("p",{id:"scoreLevel",class:"text-cyber-green text-sm",children:"優秀レベル"})]}),o("div",{id:"individualScores",class:"space-y-3"})]}),o("div",{class:"lg:col-span-2 space-y-6",children:[o("div",{class:"bg-navy-700/30 rounded-xl p-6",children:[o("h4",{class:"text-lg font-semibold text-cyber-blue mb-4",children:[o("i",{class:"fas fa-bullseye mr-2"}),"ターゲット適合度"]}),o("div",{class:"flex items-center mb-2",children:[o("span",{class:"text-2xl font-bold text-cyber-green",id:"targetMatch",children:"91%"}),o("span",{class:"ml-2 text-gray-400",children:"適合"})]}),o("p",{class:"text-gray-300 text-sm",children:"選択されたターゲット層に対する訴求力が非常に高く、適切なトーンとメッセージングが使用されています。"})]}),o("div",{class:"bg-navy-700/30 rounded-xl p-6",children:[o("h4",{class:"text-lg font-semibold text-cyber-green mb-4",children:[o("i",{class:"fas fa-check-circle mr-2"}),"強み・優秀なポイント"]}),o("ul",{id:"strengthsList",class:"space-y-2 text-sm text-gray-300"})]}),o("div",{class:"bg-navy-700/30 rounded-xl p-6",children:[o("h4",{class:"text-lg font-semibold text-cyber-orange mb-4",children:[o("i",{class:"fas fa-exclamation-triangle mr-2"}),"改善提案"]}),o("ul",{id:"improvementsList",class:"space-y-2 text-sm text-gray-300"})]}),o("div",{class:"bg-navy-700/30 rounded-xl p-6",children:[o("h4",{class:"text-lg font-semibold text-cyber-pink mb-4",children:[o("i",{class:"fas fa-chart-area mr-2"}),"予想パフォーマンス"]}),o("div",{id:"performanceMetrics",class:"grid grid-cols-1 md:grid-cols-3 gap-4 text-sm"})]})]})]})]})}),o("div",{id:"abResults",class:"hidden",children:o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-pink/20 p-8 mb-8 animate-slide-up",children:[o("h3",{class:"text-2xl font-semibold text-cyber-pink mb-6 text-center",children:[o("i",{class:"fas fa-trophy mr-2"}),"A/B比較分析結果"]}),o("div",{id:"winnerAnnouncement",class:"bg-gradient-to-r from-cyber-pink/20 to-cyber-orange/10 border border-cyber-pink/30 rounded-xl p-8 mb-8 text-center"}),o("div",{class:"grid grid-cols-1 lg:grid-cols-3 gap-8",children:[o("div",{class:"bg-gradient-to-br from-cyber-blue/20 to-navy-700/30 border border-cyber-blue/30 rounded-xl p-6",children:[o("h4",{class:"text-xl font-semibold text-cyber-blue mb-4 text-center",children:"🥇 パターンA (勝者)"}),o("div",{class:"text-center mb-4",children:[o("div",{class:"text-3xl font-orbitron font-bold text-cyber-green",children:"87"}),o("p",{class:"text-gray-300 text-sm",children:"総合スコア"})]}),o("div",{id:"patternAScores",class:"space-y-2"})]}),o("div",{class:"flex flex-col justify-center items-center",children:[o("div",{class:"text-4xl font-orbitron font-bold text-cyber-pink mb-4",children:"VS"}),o("div",{class:"text-center",children:[o("p",{class:"text-gray-400 text-sm",children:"スコア差"}),o("p",{class:"text-2xl font-bold text-cyber-green",children:"+12点"})]})]}),o("div",{class:"bg-gradient-to-br from-gray-500/20 to-navy-700/30 border border-gray-500/30 rounded-xl p-6",children:[o("h4",{class:"text-xl font-semibold text-gray-400 mb-4 text-center",children:"🥈 パターンB"}),o("div",{class:"text-center mb-4",children:[o("div",{class:"text-3xl font-orbitron font-bold text-cyber-orange",children:"75"}),o("p",{class:"text-gray-300 text-sm",children:"総合スコア"})]}),o("div",{id:"patternBScores",class:"space-y-2"})]})]}),o("div",{class:"mt-8 bg-navy-700/30 rounded-xl p-6",children:[o("h4",{class:"text-lg font-semibold text-cyber-blue mb-4",children:[o("i",{class:"fas fa-clipboard-list mr-2"}),"詳細比較レポート"]}),o("div",{id:"comparisonReport",class:"space-y-4 text-sm text-gray-300"})]}),o("div",{class:"mt-6 bg-gradient-to-r from-cyber-green/20 to-green-600/10 border border-cyber-green/30 rounded-xl p-6",children:[o("h4",{class:"text-lg font-semibold text-cyber-green mb-4",children:[o("i",{class:"fas fa-bullseye mr-2"}),"実装推奨アクション"]}),o("div",{id:"actionRecommendations",class:"space-y-2 text-sm text-white"})]})]})})]})]}),o("script",{dangerouslySetInnerHTML:{__html:`
          document.addEventListener('DOMContentLoaded', function() {
            let uploadedImage = null;
            let uploadedImageA = null;
            let uploadedImageB = null;
            let isAnalyzing = false;
            
            // DOM Elements
            const abModeCheckbox = document.getElementById('abMode');
            const singleUpload = document.getElementById('singleUpload');
            const abUpload = document.getElementById('abUpload');
            const dropZone = document.getElementById('dropZone');
            const imageUpload = document.getElementById('imageUpload');
            const imagePreview = document.getElementById('imagePreview');
            const previewImage = document.getElementById('previewImage');
            const imageName = document.getElementById('imageName');
            const analyzeButton = document.getElementById('analyzeButton');
            const analyzeButtonText = document.getElementById('analyzeButtonText');
            const analyzeSpinner = document.getElementById('analyzeSpinner');
            const resultsSection = document.getElementById('resultsSection');
            const singleResults = document.getElementById('singleResults');
            const abResults = document.getElementById('abResults');
            
            // A/B mode toggle
            abModeCheckbox.addEventListener('change', function() {
              if (this.checked) {
                singleUpload.classList.add('hidden');
                abUpload.classList.remove('hidden');
                updateAnalyzeButton();
              } else {
                singleUpload.classList.remove('hidden');
                abUpload.classList.add('hidden');
                updateAnalyzeButton();
              }
            });
            
            // Single image upload
            dropZone.addEventListener('click', () => {
              imageUpload.click();
            });
            dropZone.addEventListener('dragover', (e) => {
              e.preventDefault();
              e.stopPropagation();
              dropZone.classList.add('border-cyber-purple');
            });
            dropZone.addEventListener('dragleave', (e) => {
              e.preventDefault();
              e.stopPropagation();
              dropZone.classList.remove('border-cyber-purple');
            });
            dropZone.addEventListener('drop', (e) => {
              e.preventDefault();
              e.stopPropagation();
              dropZone.classList.remove('border-cyber-purple');
              const files = e.dataTransfer.files;
              if (files.length > 0) {
                handleImageUpload(files[0]);
              }
            });
            
            imageUpload.addEventListener('change', (e) => {
              if (e.target.files.length > 0) {
                handleImageUpload(e.target.files[0]);
              }
            });
            
            function handleImageUpload(file) {
              if (!file.type.startsWith('image/')) {
                alert('画像ファイルを選択してください。');
                return;
              }
              
              if (file.size > 10 * 1024 * 1024) {
                alert('ファイルサイズは10MB以下にしてください。');
                return;
              }
              
              uploadedImage = file;
              const reader = new FileReader();
              reader.onload = (e) => {
                previewImage.src = e.target.result;
                imageName.textContent = file.name;
                imagePreview.classList.remove('hidden');
                updateAnalyzeButton();
              };
              reader.readAsDataURL(file);
            }
            
            // A/B upload handlers
            setupABUpload('A');
            setupABUpload('B');
            
            function setupABUpload(pattern) {
              const dropZone = document.getElementById('dropZone' + pattern);
              const imageUpload = document.getElementById('imageUpload' + pattern);
              const imagePreview = document.getElementById('imagePreview' + pattern);
              const previewImage = document.getElementById('previewImage' + pattern);
              
              dropZone.addEventListener('click', () => {
                imageUpload.click();
              });
              dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropZone.classList.add('border-cyber-' + (pattern === 'A' ? 'blue' : 'pink'));
              });
              dropZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropZone.classList.remove('border-cyber-' + (pattern === 'A' ? 'blue' : 'pink'));
              });
              dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropZone.classList.remove('border-cyber-' + (pattern === 'A' ? 'blue' : 'pink'));
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                  handleABImageUpload(files[0], pattern);
                }
              });
              
              imageUpload.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                  handleABImageUpload(e.target.files[0], pattern);
                }
              });
            }
            
            function handleABImageUpload(file, pattern) {
              if (!file.type.startsWith('image/')) {
                alert('画像ファイルを選択してください。');
                return;
              }
              
              if (file.size > 10 * 1024 * 1024) {
                alert('ファイルサイズは10MB以下にしてください。');
                return;
              }
              
              if (pattern === 'A') {
                uploadedImageA = file;
              } else {
                uploadedImageB = file;
              }
              
              const reader = new FileReader();
              reader.onload = (e) => {
                document.getElementById('previewImage' + pattern).src = e.target.result;
                document.getElementById('imagePreview' + pattern).classList.remove('hidden');
                updateAnalyzeButton();
              };
              reader.readAsDataURL(file);
            }
            
            function updateAnalyzeButton() {
              if (isAnalyzing) return;
              
              if (abModeCheckbox.checked) {
                analyzeButton.disabled = !uploadedImageA || !uploadedImageB;
              } else {
                analyzeButton.disabled = !uploadedImage;
              }
            }
            
            // Analysis button handler
            analyzeButton.addEventListener('click', async function() {
              if (isAnalyzing) return;
              
              isAnalyzing = true;
              analyzeButton.disabled = true;
              analyzeButtonText.classList.add('hidden');
              analyzeSpinner.classList.remove('hidden');
              
              try {
                if (abModeCheckbox.checked) {
                  await performABAnalysis();
                } else {
                  await performSingleAnalysis();
                }
              } catch (error) {
                console.error('Analysis error:', error);
                alert('分析中にエラーが発生しました。もう一度お試しください。');
              } finally {
                isAnalyzing = false;
                analyzeButton.disabled = false;
                analyzeButtonText.classList.remove('hidden');
                analyzeSpinner.classList.add('hidden');
                updateAnalyzeButton();
              }
            });
            
            async function performSingleAnalysis() {
              const formData = new FormData();
              formData.append('image', uploadedImage);
              
              const response = await fetch('/api/analysis/single', {
                method: 'POST',
                body: formData
              });
              
              const data = await response.json();
              
              if (data.success) {
                displaySingleResults(data.result);
              } else {
                throw new Error(data.message || '分析に失敗しました');
              }
            }
            
            async function performABAnalysis() {
              const formData = new FormData();
              formData.append('imageA', uploadedImageA);
              formData.append('imageB', uploadedImageB);
              
              const response = await fetch('/api/analysis/compare', {
                method: 'POST',
                body: formData
              });
              
              const data = await response.json();
              
              if (data.success) {
                displayABResults(data.result);
              } else {
                throw new Error(data.message || 'A/B比較分析に失敗しました');
              }
            }
            
            function displaySingleResults(result) {
              resultsSection.classList.remove('hidden');
              singleResults.classList.remove('hidden');
              abResults.classList.add('hidden');
              
              // Update total score
              document.getElementById('totalScore').textContent = result.totalScore;
              document.getElementById('scoreLevel').textContent = result.level;
              
              // Update individual scores
              const scoresContainer = document.getElementById('individualScores');
              scoresContainer.innerHTML = '';
              
              for (const [key, scoreData] of Object.entries(result.scores)) {
                const scoreDiv = document.createElement('div');
                scoreDiv.className = 'bg-navy-700/50 border border-gray-600 rounded-lg p-3 text-center';
                scoreDiv.innerHTML = \`
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-xs text-gray-400">\${scoreData.label}</span>
                    <span class="text-lg font-bold" style="color: \${scoreData.color}">\${scoreData.score}</span>
                  </div>
                  <div class="w-full bg-gray-700 rounded-full h-2">
                    <div class="h-2 rounded-full" style="width: \${scoreData.score}%; background-color: \${scoreData.color}"></div>
                  </div>
                \`;
                scoresContainer.appendChild(scoreDiv);
              }
              
              // Update target match
              document.getElementById('targetMatch').textContent = result.analysis.targetMatch + '%';
              
              // Update strengths
              const strengthsList = document.getElementById('strengthsList');
              strengthsList.innerHTML = '';
              result.analysis.strengths.forEach(strength => {
                const li = document.createElement('li');
                li.innerHTML = '<i class="fas fa-check text-cyber-green mr-2"></i>' + strength;
                strengthsList.appendChild(li);
              });
              
              // Update improvements
              const improvementsList = document.getElementById('improvementsList');
              improvementsList.innerHTML = '';
              result.analysis.improvements.forEach(improvement => {
                const li = document.createElement('li');
                li.innerHTML = '<i class="fas fa-arrow-up text-cyber-orange mr-2"></i>' + improvement;
                improvementsList.appendChild(li);
              });
              
              // Update performance metrics
              const performanceContainer = document.getElementById('performanceMetrics');
              performanceContainer.innerHTML = \`
                <div class="bg-gradient-to-r from-green-600/20 to-green-400/10 border border-green-400/30 rounded-lg p-4 text-center">
                  <div class="text-lg font-bold text-green-400">\${result.analysis.performance.clickRate.improved}%</div>
                  <div class="text-xs text-gray-400">クリック率（+\${result.analysis.performance.clickRate.change}%）</div>
                </div>
                <div class="bg-gradient-to-r from-blue-600/20 to-blue-400/10 border border-blue-400/30 rounded-lg p-4 text-center">
                  <div class="text-lg font-bold text-blue-400">\${result.analysis.performance.conversionRate.improved}%</div>
                  <div class="text-xs text-gray-400">コンバージョン率（+\${result.analysis.performance.conversionRate.change}%）</div>
                </div>
                <div class="bg-gradient-to-r from-purple-600/20 to-purple-400/10 border border-purple-400/30 rounded-lg p-4 text-center">
                  <div class="text-lg font-bold text-purple-400">+\${result.analysis.performance.brandAwareness.change}%</div>
                  <div class="text-xs text-gray-400">ブランド認知向上</div>
                </div>
              \`;
              
              // Show note if using demo data
              if (result.note) {
                const noteDiv = document.createElement('div');
                noteDiv.className = 'mt-4 p-3 bg-yellow-600/20 border border-yellow-400/30 rounded-lg text-center';
                noteDiv.innerHTML = '<i class="fas fa-info-circle mr-2 text-yellow-400"></i>' + result.note;
                performanceContainer.parentElement.appendChild(noteDiv);
              }
              
              // Scroll to results
              resultsSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            function displayABResults(result) {
              resultsSection.classList.remove('hidden');
              abResults.classList.remove('hidden');
              singleResults.classList.add('hidden');
              
              // Show note if using demo data
              if (result.note) {
                const noteDiv = document.createElement('div');
                noteDiv.className = 'mb-6 p-3 bg-yellow-600/20 border border-yellow-400/30 rounded-lg text-center';
                noteDiv.innerHTML = '<i class="fas fa-info-circle mr-2 text-yellow-400"></i>' + result.note;
                document.querySelector('#abResults .bg-navy-800\\/50').prepend(noteDiv);
              }
              
              // Scroll to results
              resultsSection.scrollIntoView({ behavior: 'smooth' });
            }
          });
        `}})]}),Rx=()=>o("div",{class:"min-h-screen pt-20 pb-20",children:[o("div",{class:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[o("div",{class:"text-center mb-12 animate-slide-up",children:[o("h1",{class:"text-4xl md:text-5xl font-orbitron font-bold mb-4",children:o("span",{class:"bg-gradient-to-r from-cyber-pink to-cyber-orange bg-clip-text text-transparent",children:"AIコピー生成"})}),o("p",{class:"text-xl text-gray-300 max-w-3xl mx-auto",children:"画像から効果的な広告コピーを自動生成。業界特化型AIが最適なメッセージを提案"})]}),o("div",{class:"grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12",children:[o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-pink/20 p-6",children:[o("h3",{class:"text-xl font-semibold text-cyber-pink mb-6",children:[o("i",{class:"fas fa-bullseye mr-2"}),"ターゲット設定"]}),o("div",{class:"space-y-4",children:[o("div",{children:[o("label",{class:"block text-sm font-medium text-gray-300 mb-2",children:"業界"}),o("select",{id:"copyIndustry",class:"w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyber-pink transition-colors",children:[o("option",{value:"美容",children:"美容"}),o("option",{value:"飲食",children:"飲食"}),o("option",{value:"不動産",children:"不動産"}),o("option",{value:"子ども写真館",children:"子ども写真館"}),o("option",{value:"ファッション",children:"ファッション"}),o("option",{value:"教育",children:"教育"}),o("option",{value:"その他",children:"その他"})]})]}),o("div",{children:[o("label",{class:"block text-sm font-medium text-gray-300 mb-2",children:"媒体"}),o("select",{id:"copyPlatform",class:"w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyber-pink transition-colors",children:[o("option",{value:"Instagram",children:"Instagram"}),o("option",{value:"Facebook",children:"Facebook"}),o("option",{value:"GDN",children:"GDN"}),o("option",{value:"YDN",children:"YDN"}),o("option",{value:"Twitter",children:"Twitter"}),o("option",{value:"LINE",children:"LINE広告"})]})]}),o("div",{children:[o("label",{class:"block text-sm font-medium text-gray-300 mb-2",children:"ターゲット年代"}),o("select",{id:"copyAgeGroup",class:"w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyber-pink transition-colors",children:[o("option",{value:"10代",children:"10代"}),o("option",{value:"20代",children:"20代"}),o("option",{value:"30代",children:"30代"}),o("option",{value:"40代",children:"40代"}),o("option",{value:"50代",children:"50代"}),o("option",{value:"60代以上",children:"60代以上"})]})]}),o("div",{children:[o("label",{class:"block text-sm font-medium text-gray-300 mb-2",children:"トーン"}),o("select",{id:"copyTone",class:"w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyber-pink transition-colors",children:[o("option",{value:"フレンドリー",children:"フレンドリー"}),o("option",{value:"プロフェッショナル",children:"プロフェッショナル"}),o("option",{value:"カジュアル",children:"カジュアル"}),o("option",{value:"エレガント",children:"エレガント"}),o("option",{value:"エネルギッシュ",children:"エネルギッシュ"}),o("option",{value:"信頼感",children:"信頼感"})]})]})]})]}),o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-orange/20 p-6",children:[o("h3",{class:"text-xl font-semibold text-cyber-orange mb-6",children:[o("i",{class:"fas fa-cog mr-2"}),"生成オプション"]}),o("div",{class:"space-y-4",children:[o("div",{children:[o("label",{class:"block text-sm font-medium text-gray-300 mb-2",children:"コピータイプ"}),o("div",{class:"space-y-2",children:[o("label",{class:"flex items-center",children:[o("input",{type:"checkbox",checked:!0,class:"w-4 h-4 text-cyber-orange bg-navy-700 border-gray-600 rounded focus:ring-cyber-orange/20 focus:ring-2"}),o("span",{class:"ml-2 text-sm text-gray-300",children:"メインコピー"})]}),o("label",{class:"flex items-center",children:[o("input",{type:"checkbox",checked:!0,class:"w-4 h-4 text-cyber-orange bg-navy-700 border-gray-600 rounded focus:ring-cyber-orange/20 focus:ring-2"}),o("span",{class:"ml-2 text-sm text-gray-300",children:"キャッチコピー"})]}),o("label",{class:"flex items-center",children:[o("input",{type:"checkbox",checked:!0,class:"w-4 h-4 text-cyber-orange bg-navy-700 border-gray-600 rounded focus:ring-cyber-orange/20 focus:ring-2"}),o("span",{class:"ml-2 text-sm text-gray-300",children:"CTAコピー"})]}),o("label",{class:"flex items-center",children:[o("input",{type:"checkbox",class:"w-4 h-4 text-cyber-orange bg-navy-700 border-gray-600 rounded focus:ring-cyber-orange/20 focus:ring-2"}),o("span",{class:"ml-2 text-sm text-gray-300",children:"サブコピー"})]})]})]}),o("div",{children:[o("label",{class:"block text-sm font-medium text-gray-300 mb-2",children:"生成数"}),o("select",{id:"copyCount",class:"w-full px-4 py-2 bg-navy-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyber-orange transition-colors",children:[o("option",{value:"3",children:"3パターン"}),o("option",{value:"5",selected:!0,children:"5パターン"}),o("option",{value:"7",children:"7パターン"}),o("option",{value:"10",children:"10パターン"})]})]}),o("div",{children:o("label",{class:"flex items-center",children:[o("input",{type:"checkbox",id:"includeEmoji",class:"w-4 h-4 text-cyber-orange bg-navy-700 border-gray-600 rounded focus:ring-cyber-orange/20 focus:ring-2"}),o("span",{class:"ml-2 text-sm text-gray-300",children:"絵文字を含める"})]})}),o("div",{children:o("label",{class:"flex items-center",children:[o("input",{type:"checkbox",id:"urgencyElement",class:"w-4 h-4 text-cyber-orange bg-navy-700 border-gray-600 rounded focus:ring-cyber-orange/20 focus:ring-2"}),o("span",{class:"ml-2 text-sm text-gray-300",children:"緊急性要素を含める"})]})})]}),o("div",{class:"mt-6 p-4 bg-cyber-orange/10 rounded-lg border border-cyber-orange/20",children:[o("h4",{class:"text-sm font-semibold text-cyber-orange mb-2",children:[o("i",{class:"fas fa-lightbulb mr-2"}),"AIのポイント"]}),o("ul",{class:"text-xs text-gray-300 space-y-1",children:[o("li",{children:"• 業界特性を考慮した最適化"}),o("li",{children:"• ターゲット層に響く言葉選び"}),o("li",{children:"• 媒体の文字制限に配慮"}),o("li",{children:"• 効果予測スコア付き"})]})]})]})]}),o("div",{class:"mb-12",children:o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-purple/20 p-8",children:[o("h3",{class:"text-2xl font-semibold text-cyber-purple mb-6 text-center",children:[o("i",{class:"fas fa-cloud-upload-alt mr-2"}),"バナー画像アップロード"]}),o("div",{class:"border-2 border-dashed border-cyber-purple/30 rounded-xl p-8 text-center hover:border-cyber-purple/50 transition-colors duration-300",children:o("div",{id:"copyDropZone",class:"cursor-pointer",children:[o("i",{class:"fas fa-image text-6xl text-cyber-purple/50 mb-4"}),o("p",{class:"text-lg text-gray-300 mb-2",children:"コピー生成用の画像をアップロード"}),o("p",{class:"text-sm text-gray-400",children:"PNG, JPG, JPEG対応（最大10MB）"}),o("input",{type:"file",id:"copyImageUpload",class:"hidden",accept:"image/*"})]})}),o("div",{id:"copyImagePreview",class:"hidden mt-6",children:[o("img",{id:"copyPreviewImage",class:"max-w-full h-auto rounded-lg border border-gray-600 mx-auto"}),o("p",{id:"copyImageName",class:"text-sm text-gray-400 mt-2 text-center"})]})]})}),o("div",{class:"text-center mb-12",children:o("button",{id:"generateButton",disabled:!0,class:"px-12 py-4 bg-gradient-to-r from-cyber-pink to-cyber-orange rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-cyber-pink/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",children:[o("span",{id:"generateButtonText",children:[o("i",{class:"fas fa-magic mr-3"}),"AIコピー生成開始"]}),o("span",{id:"generateSpinner",class:"hidden",children:[o("i",{class:"fas fa-spinner fa-spin mr-3"}),"生成中..."]})]})}),o("div",{id:"copyResultsSection",class:"hidden",children:o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-green/20 p-8 animate-slide-up",children:[o("h3",{class:"text-2xl font-semibold text-cyber-green mb-6 text-center",children:[o("i",{class:"fas fa-magic mr-2"}),"生成結果"]}),o("div",{class:"mb-8 p-6 bg-navy-700/30 rounded-xl",children:[o("h4",{class:"text-lg font-semibold text-cyber-blue mb-4",children:[o("i",{class:"fas fa-chart-bar mr-2"}),"全体分析"]}),o("div",{class:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[o("div",{class:"text-center",children:[o("div",{class:"text-2xl font-bold text-cyber-green",id:"overallScore",children:"88"}),o("p",{class:"text-gray-400 text-sm",children:"総合スコア"})]}),o("div",{class:"text-center",children:[o("div",{class:"text-2xl font-bold text-cyber-blue",id:"industryMatch",children:"95%"}),o("p",{class:"text-gray-400 text-sm",children:"業界適合度"})]}),o("div",{class:"text-center",children:[o("div",{class:"text-lg font-semibold text-cyber-pink",id:"targetAudience",children:"美容意識の高い20-40代女性"}),o("p",{class:"text-gray-400 text-sm",children:"推定ターゲット"})]})]})]}),o("div",{id:"generatedCopies",class:"space-y-6"}),o("div",{class:"mt-8 p-6 bg-gradient-to-r from-cyber-green/20 to-green-600/10 border border-cyber-green/30 rounded-xl",children:[o("h4",{class:"text-lg font-semibold text-cyber-green mb-4",children:[o("i",{class:"fas fa-bullseye mr-2"}),"実装推奨事項"]}),o("div",{id:"copyRecommendations",class:"space-y-2 text-sm text-white"})]}),o("div",{class:"mt-6 text-center",children:o("button",{id:"copyAllButton",class:"px-8 py-3 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full text-white font-semibold hover:from-cyber-purple hover:to-cyber-pink transition-all duration-300 transform hover:scale-105",children:[o("i",{class:"fas fa-copy mr-2"}),"全てのコピーをクリップボードにコピー"]})})]})}),o("div",{class:"mt-16 bg-navy-800/30 backdrop-blur-lg rounded-2xl border border-gray-700/30 p-8",children:[o("h3",{class:"text-2xl font-semibold text-white mb-6 text-center",children:[o("i",{class:"fas fa-lightbulb mr-2 text-cyber-blue"}),"生成例プレビュー"]}),o("div",{class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:[o("div",{class:"bg-navy-700/50 rounded-xl p-4 border border-cyber-blue/20",children:[o("div",{class:"flex items-center justify-between mb-3",children:[o("span",{class:"text-xs font-semibold text-cyber-blue bg-cyber-blue/20 px-2 py-1 rounded",children:"メインコピー"}),o("span",{class:"text-xs text-cyber-green font-semibold",children:"92%"})]}),o("p",{class:"text-white text-sm mb-2",children:'"美肌への近道、ここにあり。今すぐ体験してください。"'}),o("p",{class:"text-gray-400 text-xs",children:"緊急性と具体的なベネフィットを組み合わせた効果的なコピー"})]}),o("div",{class:"bg-navy-700/50 rounded-xl p-4 border border-cyber-green/20",children:[o("div",{class:"flex items-center justify-between mb-3",children:[o("span",{class:"text-xs font-semibold text-cyber-green bg-cyber-green/20 px-2 py-1 rounded",children:"キャッチコピー"}),o("span",{class:"text-xs text-cyber-green font-semibold",children:"89%"})]}),o("p",{class:"text-white text-sm mb-2",children:'"3日で実感！輝く美肌を手に入れる秘密"'}),o("p",{class:"text-gray-400 text-xs",children:"数字による具体性と期待感を高める表現が効果的"})]}),o("div",{class:"bg-navy-700/50 rounded-xl p-4 border border-cyber-pink/20",children:[o("div",{class:"flex items-center justify-between mb-3",children:[o("span",{class:"text-xs font-semibold text-cyber-pink bg-cyber-pink/20 px-2 py-1 rounded",children:"CTAコピー"}),o("span",{class:"text-xs text-cyber-green font-semibold",children:"87%"})]}),o("p",{class:"text-white text-sm mb-2",children:'"限定価格で今すぐ始める"'}),o("p",{class:"text-gray-400 text-xs",children:"限定性と行動喚起を組み合わせた強力なCTA"})]}),o("div",{class:"bg-navy-700/50 rounded-xl p-4 border border-cyber-orange/20",children:[o("div",{class:"flex items-center justify-between mb-3",children:[o("span",{class:"text-xs font-semibold text-cyber-orange bg-cyber-orange/20 px-2 py-1 rounded",children:"サブコピー"}),o("span",{class:"text-xs text-cyber-green font-semibold",children:"85%"})]}),o("p",{class:"text-white text-sm mb-2",children:'"94%のユーザーが満足した美容メソッド"'}),o("p",{class:"text-gray-400 text-xs",children:"社会的証明による信頼性向上"})]})]}),o("div",{class:"mt-6 text-center",children:o("p",{class:"text-gray-400 text-sm",children:[o("i",{class:"fas fa-info-circle mr-2 text-cyber-blue"}),"上記は生成例です。実際の画像をアップロードして、あなたのブランドに最適化されたコピーを生成してください。"]})})]})]}),o("script",{dangerouslySetInnerHTML:{__html:`
          document.addEventListener('DOMContentLoaded', function() {
            let uploadedImage = null;
            let isGenerating = false;
            
            // DOM Elements
            const dropZone = document.getElementById('copyDropZone');
            const imageUpload = document.getElementById('copyImageUpload');
            const imagePreview = document.getElementById('copyImagePreview');
            const previewImage = document.getElementById('copyPreviewImage');
            const generateButton = document.getElementById('generateButton');
            const generateButtonText = document.getElementById('generateButtonText');
            const generateSpinner = document.getElementById('generateSpinner');
            const resultsSection = document.getElementById('copyResultsSection');
            
            // Image upload handlers
            if (dropZone && imageUpload) {
              dropZone.addEventListener('click', () => {
                imageUpload.click();
              });
              dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropZone.classList.add('border-cyber-orange');
              });
              dropZone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropZone.classList.remove('border-cyber-orange');
              });
              dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropZone.classList.remove('border-cyber-orange');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                  handleImageUpload(files[0]);
                }
              });
              
              imageUpload.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                  handleImageUpload(e.target.files[0]);
                }
              });
            }
            
            function handleImageUpload(file) {
              if (!file.type.startsWith('image/')) {
                alert('画像ファイルを選択してください。');
                return;
              }
              
              if (file.size > 10 * 1024 * 1024) {
                alert('ファイルサイズは10MB以下にしてください。');
                return;
              }
              
              uploadedImage = file;
              const reader = new FileReader();
              reader.onload = (e) => {
                if (previewImage && imagePreview) {
                  previewImage.src = e.target.result;
                  imagePreview.classList.remove('hidden');
                  updateGenerateButton();
                }
              };
              reader.readAsDataURL(file);
            }
            
            function updateGenerateButton() {
              if (generateButton && !isGenerating) {
                generateButton.disabled = !uploadedImage;
              }
            }
            
            // Generate button handler
            if (generateButton) {
              generateButton.addEventListener('click', async function() {
                if (isGenerating || !uploadedImage) return;
                
                isGenerating = true;
                generateButton.disabled = true;
                if (generateButtonText) generateButtonText.classList.add('hidden');
                if (generateSpinner) generateSpinner.classList.remove('hidden');
                
                try {
                  await performCopyGeneration();
                } catch (error) {
                  console.error('Copy generation error:', error);
                  alert('コピー生成中にエラーが発生しました。もう一度お試しください。');
                } finally {
                  isGenerating = false;
                  generateButton.disabled = false;
                  if (generateButtonText) generateButtonText.classList.remove('hidden');
                  if (generateSpinner) generateSpinner.classList.add('hidden');
                  updateGenerateButton();
                }
              });
            }
            
            async function performCopyGeneration() {
              const formData = new FormData();
              formData.append('image', uploadedImage);
              
              const response = await fetch('/api/copy-generation', {
                method: 'POST',
                body: formData
              });
              
              const data = await response.json();
              
              if (data.success) {
                displayCopyResults(data.result);
              } else {
                throw new Error(data.message || 'コピー生成に失敗しました');
              }
            }
            
            function displayCopyResults(result) {
              if (resultsSection) {
                resultsSection.classList.remove('hidden');
                
                // Clear existing results
                const existingResults = resultsSection.querySelector('.copy-results-container');
                if (existingResults) {
                  existingResults.remove();
                }
                
                // Create results container
                const resultsContainer = document.createElement('div');
                resultsContainer.className = 'copy-results-container bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-orange/20 p-8 mb-8 animate-slide-up';
                
                resultsContainer.innerHTML = \`
                  <h3 class="text-2xl font-semibold text-cyber-orange mb-6 text-center">
                    <i class="fas fa-magic mr-2"></i>生成されたコピー
                  </h3>
                  
                  \${result.note ? \`
                    <div class="mb-6 p-3 bg-yellow-600/20 border border-yellow-400/30 rounded-lg text-center">
                      <i class="fas fa-info-circle mr-2 text-yellow-400"></i>\${result.note}
                    </div>
                  \` : ''}
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    \${result.copies.map(copy => \`
                      <div class="bg-navy-700/50 border border-gray-600/50 rounded-xl p-6 hover:border-cyber-orange/30 transition-colors">
                        <div class="flex justify-between items-start mb-4">
                          <h4 class="text-lg font-semibold text-cyber-orange">\${copy.type}</h4>
                          <span class="bg-gradient-to-r from-cyber-green/20 to-green-400/10 border border-cyber-green/30 px-3 py-1 rounded-full text-xs font-bold text-cyber-green">
                            効果度: \${copy.effectiveness}%
                          </span>
                        </div>
                        <p class="text-white text-lg mb-4 leading-relaxed">\${copy.text}</p>
                        <p class="text-gray-400 text-sm">\${copy.reasoning}</p>
                        <button class="mt-3 px-4 py-2 bg-cyber-orange/20 border border-cyber-orange/30 rounded-lg text-cyber-orange text-sm hover:bg-cyber-orange/30 transition-colors" onclick="navigator.clipboard.writeText('\${copy.text}'); this.textContent='コピー済み!'; setTimeout(() => this.textContent='コピー', 2000)">
                          <i class="fas fa-copy mr-2"></i>コピー
                        </button>
                      </div>
                    \`).join('')}
                  </div>
                  
                  <div class="bg-navy-700/30 rounded-xl p-6">
                    <h4 class="text-lg font-semibold text-cyber-green mb-4">
                      <i class="fas fa-chart-line mr-2"></i>分析サマリー
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div class="text-center">
                        <div class="text-2xl font-bold text-cyber-green">\${result.analysis.overallScore}</div>
                        <p class="text-gray-400 text-sm">総合スコア</p>
                      </div>
                      <div class="text-center">
                        <div class="text-2xl font-bold text-cyber-blue">\${result.analysis.industryMatch}%</div>
                        <p class="text-gray-400 text-sm">業界適合度</p>
                      </div>
                      <div class="text-center">
                        <div class="text-lg font-semibold text-cyber-pink">\${result.analysis.targetAudience}</div>
                        <p class="text-gray-400 text-sm">想定ターゲット</p>
                      </div>
                    </div>
                    
                    <div class="mt-6">
                      <h5 class="text-md font-semibold text-cyber-orange mb-3">実装推奨事項</h5>
                      <ul class="space-y-2">
                        \${result.analysis.recommendations.map(rec => \`
                          <li class="text-gray-300 text-sm">
                            <i class="fas fa-check-circle text-cyber-green mr-2"></i>\${rec}
                          </li>
                        \`).join('')}
                      </ul>
                    </div>
                  </div>
                \`;
                
                resultsSection.appendChild(resultsContainer);
                
                // Scroll to results
                resultsContainer.scrollIntoView({ behavior: 'smooth' });
              }
            }
          });
        `}})]}),Cx=()=>o("div",{class:"min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900",children:[o("header",{class:"bg-navy-800/50 backdrop-blur-lg border-b border-cyber-blue/20",children:o("div",{class:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:o("div",{class:"flex justify-between items-center py-6",children:[o("div",{class:"flex items-center",children:[o("div",{class:"w-12 h-12 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-xl flex items-center justify-center mr-4",children:o("i",{class:"fas fa-chart-line text-white text-xl"})}),o("div",{children:[o("h1",{class:"text-2xl font-orbitron font-bold text-white",children:"バナスコAI"}),o("p",{class:"text-cyber-blue text-sm",children:"運営管理ダッシュボード"})]})]}),o("div",{class:"flex items-center space-x-4",children:[o("div",{class:"text-right",children:[o("p",{class:"text-white font-medium",children:"管理者"}),o("p",{class:"text-gray-400 text-sm",children:"admin@banasuko.com"})]}),o("button",{class:"bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors",children:[o("i",{class:"fas fa-sign-out-alt mr-2"}),"ログアウト"]})]})]})})}),o("div",{class:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:[o("div",{class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",children:[o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-blue/20 p-6",children:o("div",{class:"flex items-center justify-between",children:[o("div",{children:[o("p",{class:"text-gray-400 text-sm font-medium",children:"総ユーザー数"}),o("p",{class:"text-3xl font-bold text-white mt-2",id:"totalUsers",children:"-"}),o("p",{class:"text-cyber-green text-sm mt-1",children:[o("i",{class:"fas fa-arrow-up mr-1"}),o("span",{id:"userGrowth",children:"-"})," 今月"]})]}),o("div",{class:"w-12 h-12 bg-cyber-blue/20 rounded-xl flex items-center justify-center",children:o("i",{class:"fas fa-users text-cyber-blue text-xl"})})]})}),o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-green/20 p-6",children:o("div",{class:"flex items-center justify-between",children:[o("div",{children:[o("p",{class:"text-gray-400 text-sm font-medium",children:"アクティブユーザー"}),o("p",{class:"text-3xl font-bold text-white mt-2",id:"activeUsers",children:"-"}),o("p",{class:"text-cyber-green text-sm mt-1",children:[o("span",{id:"activeRate",children:"-"}),"% アクティブ率"]})]}),o("div",{class:"w-12 h-12 bg-cyber-green/20 rounded-xl flex items-center justify-center",children:o("i",{class:"fas fa-user-check text-cyber-green text-xl"})})]})}),o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-pink/20 p-6",children:o("div",{class:"flex items-center justify-between",children:[o("div",{children:[o("p",{class:"text-gray-400 text-sm font-medium",children:"月間収益"}),o("p",{class:"text-3xl font-bold text-white mt-2",children:["¥",o("span",{id:"monthlyRevenue",children:"-"})]}),o("p",{class:"text-cyber-pink text-sm mt-1",children:[o("i",{class:"fas fa-arrow-up mr-1"}),o("span",{id:"revenueGrowth",children:"-"}),"% 前月比"]})]}),o("div",{class:"w-12 h-12 bg-cyber-pink/20 rounded-xl flex items-center justify-center",children:o("i",{class:"fas fa-yen-sign text-cyber-pink text-xl"})})]})}),o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-orange/20 p-6",children:o("div",{class:"flex items-center justify-between",children:[o("div",{children:[o("p",{class:"text-gray-400 text-sm font-medium",children:"月間API使用数"}),o("p",{class:"text-3xl font-bold text-white mt-2",id:"monthlyApiUsage",children:"-"}),o("p",{class:"text-cyber-orange text-sm mt-1",children:[o("span",{id:"apiUsageGrowth",children:"-"})," 前月比"]})]}),o("div",{class:"w-12 h-12 bg-cyber-orange/20 rounded-xl flex items-center justify-center",children:o("i",{class:"fas fa-chart-bar text-cyber-orange text-xl"})})]})})]}),o("div",{class:"grid grid-cols-1 lg:grid-cols-3 gap-8",children:[o("div",{class:"lg:col-span-2",children:o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/30 p-6",children:[o("div",{class:"flex items-center justify-between mb-6",children:[o("h2",{class:"text-xl font-semibold text-white",children:[o("i",{class:"fas fa-users-cog mr-2 text-cyber-blue"}),"ユーザー管理"]}),o("div",{class:"flex space-x-2",children:[o("select",{class:"bg-navy-700 text-white px-3 py-2 rounded-lg border border-gray-600 text-sm",children:[o("option",{children:"全プラン"}),o("option",{children:"フリー"}),o("option",{children:"ベーシック"}),o("option",{children:"プレミアム"})]}),o("button",{class:"bg-cyber-blue text-white px-4 py-2 rounded-lg hover:bg-cyber-purple transition-colors text-sm",children:[o("i",{class:"fas fa-download mr-2"}),"エクスポート"]})]})]}),o("div",{class:"overflow-x-auto",children:o("table",{class:"w-full",children:[o("thead",{children:o("tr",{class:"border-b border-gray-700",children:[o("th",{class:"text-left py-3 px-4 text-gray-400 font-medium text-sm",children:"ユーザー"}),o("th",{class:"text-left py-3 px-4 text-gray-400 font-medium text-sm",children:"プラン"}),o("th",{class:"text-left py-3 px-4 text-gray-400 font-medium text-sm",children:"使用数"}),o("th",{class:"text-left py-3 px-4 text-gray-400 font-medium text-sm",children:"登録日"}),o("th",{class:"text-left py-3 px-4 text-gray-400 font-medium text-sm",children:"操作"})]})}),o("tbody",{id:"userTableBody",children:o("tr",{class:"border-b border-gray-800 hover:bg-navy-700/30",children:[o("td",{class:"py-4 px-4",children:o("div",{class:"flex items-center",children:[o("div",{class:"w-10 h-10 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full flex items-center justify-center mr-3",children:o("span",{class:"text-white font-semibold text-sm",children:"U"})}),o("div",{children:[o("p",{class:"text-white font-medium",children:"ローディング中..."}),o("p",{class:"text-gray-400 text-sm",children:"user@example.com"})]})]})}),o("td",{class:"py-4 px-4",children:o("span",{class:"bg-cyber-blue/20 text-cyber-blue px-2 py-1 rounded-lg text-xs font-medium",children:"フリー"})}),o("td",{class:"py-4 px-4",children:o("div",{class:"text-white text-sm",children:[o("div",{children:"診断: -/-"}),o("div",{class:"text-gray-400",children:"A/B: -/-, コピー: -/-"})]})}),o("td",{class:"py-4 px-4 text-gray-400 text-sm",children:"-"}),o("td",{class:"py-4 px-4",children:o("div",{class:"flex space-x-2",children:[o("button",{class:"text-cyber-blue hover:text-cyber-purple transition-colors text-sm",children:o("i",{class:"fas fa-edit"})}),o("button",{class:"text-cyber-pink hover:text-red-400 transition-colors text-sm",children:o("i",{class:"fas fa-ban"})})]})})]})})]})}),o("div",{class:"flex items-center justify-between mt-6",children:[o("p",{class:"text-gray-400 text-sm",children:"1-10 of 100 ユーザー"}),o("div",{class:"flex space-x-2",children:[o("button",{class:"bg-navy-700 text-gray-400 px-3 py-1 rounded text-sm hover:bg-navy-600 transition-colors",children:"前へ"}),o("button",{class:"bg-cyber-blue text-white px-3 py-1 rounded text-sm",children:"1"}),o("button",{class:"bg-navy-700 text-gray-400 px-3 py-1 rounded text-sm hover:bg-navy-600 transition-colors",children:"2"}),o("button",{class:"bg-navy-700 text-gray-400 px-3 py-1 rounded text-sm hover:bg-navy-600 transition-colors",children:"次へ"})]})]})]})}),o("div",{class:"space-y-6",children:[o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/30 p-6",children:[o("h3",{class:"text-lg font-semibold text-white mb-4",children:[o("i",{class:"fas fa-chart-pie mr-2 text-cyber-green"}),"プラン別統計"]}),o("div",{class:"space-y-4",children:[o("div",{class:"flex items-center justify-between",children:[o("div",{class:"flex items-center",children:[o("div",{class:"w-3 h-3 bg-gray-400 rounded-full mr-2"}),o("span",{class:"text-gray-300 text-sm",children:"フリー"})]}),o("div",{class:"text-right",children:[o("span",{class:"text-white font-medium",id:"freePlanCount",children:"-"}),o("span",{class:"text-gray-400 text-xs ml-1",children:["(",o("span",{id:"freePlanPercent",children:"-"}),"%)"]})]})]}),o("div",{class:"flex items-center justify-between",children:[o("div",{class:"flex items-center",children:[o("div",{class:"w-3 h-3 bg-cyber-blue rounded-full mr-2"}),o("span",{class:"text-gray-300 text-sm",children:"ベーシック"})]}),o("div",{class:"text-right",children:[o("span",{class:"text-white font-medium",id:"basicPlanCount",children:"-"}),o("span",{class:"text-gray-400 text-xs ml-1",children:["(",o("span",{id:"basicPlanPercent",children:"-"}),"%)"]})]})]}),o("div",{class:"flex items-center justify-between",children:[o("div",{class:"flex items-center",children:[o("div",{class:"w-3 h-3 bg-cyber-pink rounded-full mr-2"}),o("span",{class:"text-gray-300 text-sm",children:"プレミアム"})]}),o("div",{class:"text-right",children:[o("span",{class:"text-white font-medium",id:"premiumPlanCount",children:"-"}),o("span",{class:"text-gray-400 text-xs ml-1",children:["(",o("span",{id:"premiumPlanPercent",children:"-"}),"%)"]})]})]})]})]}),o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/30 p-6",children:[o("h3",{class:"text-lg font-semibold text-white mb-4",children:[o("i",{class:"fas fa-clock mr-2 text-cyber-orange"}),"最近のアクティビティ"]}),o("div",{class:"space-y-3",id:"recentActivity",children:[o("div",{class:"flex items-center text-sm",children:[o("div",{class:"w-2 h-2 bg-cyber-green rounded-full mr-3"}),o("div",{class:"flex-1",children:[o("span",{class:"text-gray-300",children:"新規ユーザー登録"}),o("span",{class:"text-gray-500 ml-2",children:"5分前"})]})]}),o("div",{class:"flex items-center text-sm",children:[o("div",{class:"w-2 h-2 bg-cyber-blue rounded-full mr-3"}),o("div",{class:"flex-1",children:[o("span",{class:"text-gray-300",children:"プラン変更 (Basic→Premium)"}),o("span",{class:"text-gray-500 ml-2",children:"12分前"})]})]}),o("div",{class:"flex items-center text-sm",children:[o("div",{class:"w-2 h-2 bg-cyber-pink rounded-full mr-3"}),o("div",{class:"flex-1",children:[o("span",{class:"text-gray-300",children:"AI診断実行"}),o("span",{class:"text-gray-500 ml-2",children:"18分前"})]})]})]})]}),o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/30 p-6",children:[o("h3",{class:"text-lg font-semibold text-white mb-4",children:[o("i",{class:"fas fa-cogs mr-2 text-gray-400"}),"システム設定"]}),o("div",{class:"space-y-3",children:[o("button",{class:"w-full text-left bg-navy-700/50 hover:bg-navy-700 transition-colors p-3 rounded-lg",children:o("div",{class:"flex items-center justify-between",children:[o("span",{class:"text-gray-300 text-sm",children:[o("i",{class:"fas fa-refresh mr-2"}),"使用回数リセット"]}),o("i",{class:"fas fa-chevron-right text-gray-500"})]})}),o("button",{class:"w-full text-left bg-navy-700/50 hover:bg-navy-700 transition-colors p-3 rounded-lg",children:o("div",{class:"flex items-center justify-between",children:[o("span",{class:"text-gray-300 text-sm",children:[o("i",{class:"fas fa-download mr-2"}),"データエクスポート"]}),o("i",{class:"fas fa-chevron-right text-gray-500"})]})}),o("button",{class:"w-full text-left bg-navy-700/50 hover:bg-navy-700 transition-colors p-3 rounded-lg",children:o("div",{class:"flex items-center justify-between",children:[o("span",{class:"text-gray-300 text-sm",children:[o("i",{class:"fas fa-bell mr-2"}),"通知設定"]}),o("i",{class:"fas fa-chevron-right text-gray-500"})]})})]})]})]})]})]}),o("div",{id:"editUserModal",class:"fixed inset-0 bg-black/50 backdrop-blur-sm hidden z-50",children:o("div",{class:"flex items-center justify-center min-h-screen p-4",children:o("div",{class:"bg-navy-800 rounded-2xl border border-gray-700 p-6 w-full max-w-md",children:[o("div",{class:"flex items-center justify-between mb-4",children:[o("h3",{class:"text-lg font-semibold text-white",children:"ユーザー編集"}),o("button",{id:"closeEditModal",class:"text-gray-400 hover:text-white",children:o("i",{class:"fas fa-times"})})]}),o("form",{id:"editUserForm",class:"space-y-4",children:[o("div",{children:[o("label",{class:"block text-gray-300 text-sm mb-2",children:"ユーザー名"}),o("input",{type:"text",id:"editUsername",class:"w-full bg-navy-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-cyber-blue focus:outline-none"})]}),o("div",{children:[o("label",{class:"block text-gray-300 text-sm mb-2",children:"メールアドレス"}),o("input",{type:"email",id:"editEmail",class:"w-full bg-navy-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-cyber-blue focus:outline-none"})]}),o("div",{children:[o("label",{class:"block text-gray-300 text-sm mb-2",children:"プラン"}),o("select",{id:"editPlan",class:"w-full bg-navy-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-cyber-blue focus:outline-none",children:[o("option",{value:"free",children:"フリー"}),o("option",{value:"basic",children:"ベーシック"}),o("option",{value:"premium",children:"プレミアム"})]})]}),o("div",{class:"flex space-x-3 pt-4",children:[o("button",{type:"submit",class:"flex-1 bg-cyber-blue text-white py-2 rounded-lg hover:bg-cyber-purple transition-colors",children:"保存"}),o("button",{type:"button",id:"cancelEdit",class:"flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-500 transition-colors",children:"キャンセル"})]})]})]})})})]}),Px=()=>o("div",{class:"min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900",children:[o("header",{class:"bg-navy-800/50 backdrop-blur-lg border-b border-cyber-blue/20",children:o("div",{class:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:o("div",{class:"flex justify-between items-center py-6",children:[o("div",{class:"flex items-center",children:[o("div",{class:"w-12 h-12 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-xl flex items-center justify-center mr-4",children:o("i",{class:"fas fa-user text-white text-xl"})}),o("div",{children:[o("h1",{class:"text-2xl font-orbitron font-bold text-white",children:"マイダッシュボード"}),o("p",{class:"text-cyber-blue text-sm",children:"バナスコAI 使用状況"})]})]}),o("div",{class:"flex items-center space-x-4",children:[o("div",{class:"text-right",children:[o("p",{class:"text-white font-medium user-name",children:"ユーザー名"}),o("p",{class:"text-gray-400 text-sm user-plan",children:"プラン"})]}),o("button",{class:"logout-btn bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors",children:[o("i",{class:"fas fa-sign-out-alt mr-2"}),"ログアウト"]})]})]})})}),o("div",{class:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:[o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-blue/20 p-6 mb-8",children:o("div",{class:"flex items-center justify-between",children:[o("div",{class:"flex items-center",children:[o("div",{class:"w-20 h-20 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-2xl flex items-center justify-center mr-6",children:o("i",{class:"fas fa-user-circle text-white text-3xl"})}),o("div",{children:[o("h2",{class:"text-2xl font-semibold text-white user-name",children:"ユーザー名"}),o("p",{class:"text-gray-400 user-email",children:"user@example.com"}),o("div",{class:"flex items-center mt-2",children:[o("span",{class:"bg-cyber-blue/20 text-cyber-blue px-3 py-1 rounded-lg text-sm font-medium user-plan",children:"フリープラン"}),o("span",{class:"ml-3 text-gray-400 text-sm",children:[o("i",{class:"fas fa-calendar mr-1"}),o("span",{id:"daysUntilReset",children:"-"}),"日でリセット"]})]})]})]}),o("div",{class:"text-right",children:o("button",{id:"upgradePlanBtn",class:"bg-gradient-to-r from-cyber-pink to-cyber-orange text-white px-6 py-3 rounded-xl font-semibold hover:from-cyber-orange hover:to-yellow-500 transition-all duration-300 transform hover:scale-105",children:[o("i",{class:"fas fa-crown mr-2"}),"プランアップグレード"]})})]})}),o("div",{class:"grid grid-cols-1 md:grid-cols-3 gap-6 mb-8",children:[o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-blue/20 p-6",children:[o("div",{class:"flex items-center justify-between mb-4",children:o("div",{class:"flex items-center",children:[o("div",{class:"w-10 h-10 bg-cyber-blue/20 rounded-xl flex items-center justify-center mr-3",children:o("i",{class:"fas fa-chart-line text-cyber-blue"})}),o("h3",{class:"text-lg font-semibold text-white",children:"AI広告診断"})]})}),o("div",{class:"mb-4",children:[o("div",{class:"flex items-center justify-between mb-2",children:[o("span",{class:"text-gray-400 text-sm",children:"今月の使用量"}),o("span",{class:"text-white font-medium usage-single-analysis",children:"-/-"})]}),o("div",{class:"w-full bg-gray-700 rounded-full h-2",children:o("div",{id:"singleAnalysisProgress",class:"bg-cyber-blue h-2 rounded-full transition-all duration-300",style:"width: 0%"})}),o("div",{class:"flex items-center justify-between mt-2",children:[o("span",{class:"text-xs text-gray-500",children:"使用率"}),o("span",{id:"singleAnalysisPercentage",class:"text-xs text-cyber-blue",children:"0%"})]})]}),o("a",{href:"/analysis",class:"block w-full bg-cyber-blue/20 text-cyber-blue text-center py-2 rounded-lg hover:bg-cyber-blue/30 transition-colors text-sm font-medium",children:[o("i",{class:"fas fa-play mr-2"}),"診断を開始"]})]}),o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-green/20 p-6",children:[o("div",{class:"flex items-center justify-between mb-4",children:o("div",{class:"flex items-center",children:[o("div",{class:"w-10 h-10 bg-cyber-green/20 rounded-xl flex items-center justify-center mr-3",children:o("i",{class:"fas fa-balance-scale text-cyber-green"})}),o("h3",{class:"text-lg font-semibold text-white",children:"A/B比較分析"})]})}),o("div",{class:"mb-4",children:[o("div",{class:"flex items-center justify-between mb-2",children:[o("span",{class:"text-gray-400 text-sm",children:"今月の使用量"}),o("span",{class:"text-white font-medium usage-ab-comparison",children:"-/-"})]}),o("div",{class:"w-full bg-gray-700 rounded-full h-2",children:o("div",{id:"abComparisonProgress",class:"bg-cyber-green h-2 rounded-full transition-all duration-300",style:"width: 0%"})}),o("div",{class:"flex items-center justify-between mt-2",children:[o("span",{class:"text-xs text-gray-500",children:"使用率"}),o("span",{id:"abComparisonPercentage",class:"text-xs text-cyber-green",children:"0%"})]})]}),o("a",{href:"/analysis",class:"block w-full bg-cyber-green/20 text-cyber-green text-center py-2 rounded-lg hover:bg-cyber-green/30 transition-colors text-sm font-medium",children:[o("i",{class:"fas fa-play mr-2"}),"比較を開始"]})]}),o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-pink/20 p-6",children:[o("div",{class:"flex items-center justify-between mb-4",children:o("div",{class:"flex items-center",children:[o("div",{class:"w-10 h-10 bg-cyber-pink/20 rounded-xl flex items-center justify-center mr-3",children:o("i",{class:"fas fa-magic text-cyber-pink"})}),o("h3",{class:"text-lg font-semibold text-white",children:"AIコピー生成"})]})}),o("div",{class:"mb-4",children:[o("div",{class:"flex items-center justify-between mb-2",children:[o("span",{class:"text-gray-400 text-sm",children:"今月の使用量"}),o("span",{class:"text-white font-medium usage-copy-generation",children:"-/-"})]}),o("div",{class:"w-full bg-gray-700 rounded-full h-2",children:o("div",{id:"copyGenerationProgress",class:"bg-cyber-pink h-2 rounded-full transition-all duration-300",style:"width: 0%"})}),o("div",{class:"flex items-center justify-between mt-2",children:[o("span",{class:"text-xs text-gray-500",children:"使用率"}),o("span",{id:"copyGenerationPercentage",class:"text-xs text-cyber-pink",children:"0%"})]})]}),o("a",{href:"/copy-generation",class:"block w-full bg-cyber-pink/20 text-cyber-pink text-center py-2 rounded-lg hover:bg-cyber-pink/30 transition-colors text-sm font-medium",children:[o("i",{class:"fas fa-play mr-2"}),"生成を開始"]})]})]}),o("div",{class:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/30 p-6",children:[o("h3",{class:"text-xl font-semibold text-white mb-6",children:[o("i",{class:"fas fa-clock mr-2 text-cyber-orange"}),"最近のアクティビティ"]}),o("div",{class:"space-y-4",id:"recentActivity",children:[o("div",{class:"flex items-center p-3 bg-navy-700/30 rounded-lg",children:[o("div",{class:"w-8 h-8 bg-cyber-blue/20 rounded-lg flex items-center justify-center mr-3",children:o("i",{class:"fas fa-chart-line text-cyber-blue text-sm"})}),o("div",{class:"flex-1",children:[o("p",{class:"text-white text-sm",children:"AI広告診断を実行"}),o("p",{class:"text-gray-400 text-xs",children:"2分前"})]})]}),o("div",{class:"text-center py-8 text-gray-500",children:[o("i",{class:"fas fa-spinner fa-spin text-2xl mb-2"}),o("p",{children:"アクティビティを読み込み中..."})]})]})]}),o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/30 p-6",children:[o("h3",{class:"text-xl font-semibold text-white mb-6",children:[o("i",{class:"fas fa-crown mr-2 text-cyber-pink"}),"プラン変更"]}),o("div",{class:"space-y-4",children:[o("div",{class:"p-4 bg-gray-700/30 rounded-lg border border-gray-600",children:[o("div",{class:"flex items-center justify-between mb-2",children:[o("h4",{class:"text-lg font-semibold text-white",children:"フリープラン"}),o("span",{class:"text-gray-400 font-bold",children:"¥0"})]}),o("ul",{class:"text-gray-300 text-sm space-y-1 mb-3",children:[o("li",{children:"• AI広告診断 月10回まで"}),o("li",{children:"• A/B比較分析 月5回まで"}),o("li",{children:"• AIコピー生成 月3回まで"})]}),o("button",{class:"w-full bg-gray-600 text-gray-400 py-2 rounded-lg cursor-not-allowed",disabled:!0,children:"現在のプラン"})]}),o("div",{class:"p-4 bg-cyber-blue/10 rounded-lg border border-cyber-blue/30",children:[o("div",{class:"flex items-center justify-between mb-2",children:[o("h4",{class:"text-lg font-semibold text-white",children:"ベーシックプラン"}),o("span",{class:"text-cyber-blue font-bold",children:["¥2,980",o("span",{class:"text-sm",children:"/月"})]})]}),o("ul",{class:"text-gray-300 text-sm space-y-1 mb-3",children:[o("li",{children:"• AI広告診断 月100回まで"}),o("li",{children:"• A/B比較分析 月50回まで"}),o("li",{children:"• AIコピー生成 月30回まで"}),o("li",{children:"• 詳細レポート・統計機能"})]}),o("button",{class:"upgrade-plan-btn w-full bg-cyber-blue text-white py-2 rounded-lg hover:bg-cyber-purple transition-colors","data-plan":"basic",children:"ベーシックにアップグレード"})]}),o("div",{class:"p-4 bg-cyber-pink/10 rounded-lg border border-cyber-pink/30",children:[o("div",{class:"flex items-center justify-between mb-2",children:[o("h4",{class:"text-lg font-semibold text-white",children:"プレミアムプラン"}),o("span",{class:"text-cyber-pink font-bold",children:["¥9,800",o("span",{class:"text-sm",children:"/月"})]})]}),o("ul",{class:"text-gray-300 text-sm space-y-1 mb-3",children:[o("li",{children:"• 全機能 無制限利用"}),o("li",{children:"• 高度な分析・予測機能"}),o("li",{children:"• カスタムレポート作成"}),o("li",{children:"• API アクセス"})]}),o("button",{class:"upgrade-plan-btn w-full bg-cyber-pink text-white py-2 rounded-lg hover:bg-pink-500 transition-colors","data-plan":"premium",children:"プレミアムにアップグレード"})]})]})]})]})]}),o("div",{id:"planChangeModal",class:"fixed inset-0 bg-black/50 backdrop-blur-sm hidden z-50",children:o("div",{class:"flex items-center justify-center min-h-screen p-4",children:o("div",{class:"bg-navy-800 rounded-2xl border border-gray-700 p-6 w-full max-w-md",children:[o("div",{class:"flex items-center justify-between mb-4",children:[o("h3",{class:"text-lg font-semibold text-white",children:"プラン変更確認"}),o("button",{id:"closePlanModal",class:"text-gray-400 hover:text-white",children:o("i",{class:"fas fa-times"})})]}),o("div",{class:"mb-6",children:[o("p",{class:"text-gray-300 mb-2",children:"以下のプランに変更しますか？"}),o("div",{class:"bg-navy-700 rounded-lg p-4",children:o("div",{class:"flex items-center justify-between",children:[o("span",{id:"newPlanName",class:"text-white font-medium",children:"プレミアムプラン"}),o("span",{id:"newPlanPrice",class:"text-cyber-pink font-bold",children:"¥9,800/月"})]})}),o("p",{class:"text-gray-400 text-sm mt-2",children:"※ プラン変更は即座に適用され、使用制限がリセットされます。"})]}),o("div",{class:"flex space-x-3",children:[o("button",{id:"confirmPlanChange",class:"flex-1 bg-cyber-blue text-white py-2 rounded-lg hover:bg-cyber-purple transition-colors",children:"変更する"}),o("button",{id:"cancelPlanChange",class:"flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-500 transition-colors",children:"キャンセル"})]})]})})}),o("script",{src:"/static/js/dashboard.js"})]}),kx=()=>o("div",{class:"min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900",children:[o("header",{class:"bg-navy-800/50 backdrop-blur-lg border-b border-cyber-blue/20",children:o("div",{class:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:o("div",{class:"flex justify-between items-center py-6",children:[o("div",{class:"flex items-center",children:[o("div",{class:"w-12 h-12 bg-gradient-to-r from-cyber-pink to-cyber-orange rounded-xl flex items-center justify-center mr-4",children:o("i",{class:"fas fa-crown text-white text-xl"})}),o("div",{children:[o("h1",{class:"text-2xl font-orbitron font-bold text-white",children:"プラン管理"}),o("p",{class:"text-cyber-pink text-sm",children:"最適なプランを選択"})]})]}),o("div",{class:"flex items-center space-x-4",children:o("a",{href:"/dashboard",class:"text-gray-400 hover:text-white transition-colors",children:[o("i",{class:"fas fa-arrow-left mr-2"}),"ダッシュボードに戻る"]})})]})})}),o("div",{class:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",children:[o("div",{class:"text-center mb-12",children:[o("h2",{class:"text-3xl font-bold text-white mb-4",children:"現在のプラン"}),o("div",{class:"inline-block bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-blue/20 px-8 py-6",children:o("div",{class:"flex items-center justify-center space-x-4",children:[o("div",{class:"w-16 h-16 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-2xl flex items-center justify-center",children:o("i",{class:"fas fa-user text-white text-2xl"})}),o("div",{class:"text-left",children:[o("h3",{class:"text-xl font-semibold text-white user-plan",children:"フリープラン"}),o("p",{class:"text-gray-400 text-sm user-email",children:"user@example.com"})]})]})})]}),o("div",{class:"grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12",children:[o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/30 p-8 text-center",children:[o("div",{class:"mb-6",children:[o("div",{class:"w-20 h-20 bg-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4",children:o("i",{class:"fas fa-user text-white text-2xl"})}),o("h3",{class:"text-2xl font-bold text-white mb-2",children:"フリープラン"}),o("div",{class:"text-4xl font-bold text-gray-400 mb-2",children:["¥0",o("span",{class:"text-lg font-normal",children:"/月"})]}),o("p",{class:"text-gray-400 text-sm",children:"個人利用向け"})]}),o("div",{class:"space-y-4 mb-8",children:[o("div",{class:"flex items-center justify-between text-sm",children:[o("span",{class:"text-gray-300",children:"AI広告診断"}),o("span",{class:"text-white font-medium",children:"月10回"})]}),o("div",{class:"flex items-center justify-between text-sm",children:[o("span",{class:"text-gray-300",children:"A/B比較分析"}),o("span",{class:"text-white font-medium",children:"月5回"})]}),o("div",{class:"flex items-center justify-between text-sm",children:[o("span",{class:"text-gray-300",children:"AIコピー生成"}),o("span",{class:"text-white font-medium",children:"月3回"})]}),o("div",{class:"flex items-center justify-between text-sm",children:[o("span",{class:"text-gray-300",children:"基本レポート"}),o("span",{class:"text-cyber-green",children:o("i",{class:"fas fa-check"})})]}),o("div",{class:"flex items-center justify-between text-sm",children:[o("span",{class:"text-gray-300",children:"メールサポート"}),o("span",{class:"text-red-400",children:o("i",{class:"fas fa-times"})})]})]}),o("button",{class:"w-full bg-gray-600 text-gray-400 py-3 rounded-xl font-semibold cursor-not-allowed",disabled:!0,children:"現在のプラン"})]}),o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-blue/30 p-8 text-center relative",children:[o("div",{class:"absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2",children:o("span",{class:"bg-cyber-blue text-white px-4 py-1 rounded-full text-sm font-medium",children:"おすすめ"})}),o("div",{class:"mb-6",children:[o("div",{class:"w-20 h-20 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-2xl flex items-center justify-center mx-auto mb-4",children:o("i",{class:"fas fa-rocket text-white text-2xl"})}),o("h3",{class:"text-2xl font-bold text-white mb-2",children:"ベーシックプラン"}),o("div",{class:"text-4xl font-bold text-cyber-blue mb-2",children:["¥2,980",o("span",{class:"text-lg font-normal",children:"/月"})]}),o("p",{class:"text-gray-400 text-sm",children:"小〜中規模事業者向け"})]}),o("div",{class:"space-y-4 mb-8",children:[o("div",{class:"flex items-center justify-between text-sm",children:[o("span",{class:"text-gray-300",children:"AI広告診断"}),o("span",{class:"text-white font-medium",children:"月100回"})]}),o("div",{class:"flex items-center justify-between text-sm",children:[o("span",{class:"text-gray-300",children:"A/B比較分析"}),o("span",{class:"text-white font-medium",children:"月50回"})]}),o("div",{class:"flex items-center justify-between text-sm",children:[o("span",{class:"text-gray-300",children:"AIコピー生成"}),o("span",{class:"text-white font-medium",children:"月30回"})]}),o("div",{class:"flex items-center justify-between text-sm",children:[o("span",{class:"text-gray-300",children:"詳細レポート"}),o("span",{class:"text-cyber-green",children:o("i",{class:"fas fa-check"})})]}),o("div",{class:"flex items-center justify-between text-sm",children:[o("span",{class:"text-gray-300",children:"メールサポート"}),o("span",{class:"text-cyber-green",children:o("i",{class:"fas fa-check"})})]})]}),o("button",{class:"plan-select-btn w-full bg-gradient-to-r from-cyber-blue to-cyber-purple text-white py-3 rounded-xl font-semibold hover:from-cyber-purple hover:to-cyber-pink transition-all duration-300 transform hover:scale-105","data-plan":"basic",children:"ベーシックプランを選択"})]}),o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-cyber-pink/30 p-8 text-center relative",children:[o("div",{class:"absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2",children:o("span",{class:"bg-gradient-to-r from-cyber-pink to-cyber-orange text-white px-4 py-1 rounded-full text-sm font-medium",children:"プロ向け"})}),o("div",{class:"mb-6",children:[o("div",{class:"w-20 h-20 bg-gradient-to-r from-cyber-pink to-cyber-orange rounded-2xl flex items-center justify-center mx-auto mb-4",children:o("i",{class:"fas fa-crown text-white text-2xl"})}),o("h3",{class:"text-2xl font-bold text-white mb-2",children:"プレミアムプラン"}),o("div",{class:"text-4xl font-bold text-cyber-pink mb-2",children:["¥9,800",o("span",{class:"text-lg font-normal",children:"/月"})]}),o("p",{class:"text-gray-400 text-sm",children:"大規模事業者・代理店向け"})]}),o("div",{class:"space-y-4 mb-8",children:[o("div",{class:"flex items-center justify-between text-sm",children:[o("span",{class:"text-gray-300",children:"AI広告診断"}),o("span",{class:"text-white font-medium",children:"無制限"})]}),o("div",{class:"flex items-center justify-between text-sm",children:[o("span",{class:"text-gray-300",children:"A/B比較分析"}),o("span",{class:"text-white font-medium",children:"無制限"})]}),o("div",{class:"flex items-center justify-between text-sm",children:[o("span",{class:"text-gray-300",children:"AIコピー生成"}),o("span",{class:"text-white font-medium",children:"無制限"})]}),o("div",{class:"flex items-center justify-between text-sm",children:[o("span",{class:"text-gray-300",children:"カスタムレポート"}),o("span",{class:"text-cyber-green",children:o("i",{class:"fas fa-check"})})]}),o("div",{class:"flex items-center justify-between text-sm",children:[o("span",{class:"text-gray-300",children:"優先サポート"}),o("span",{class:"text-cyber-green",children:o("i",{class:"fas fa-check"})})]}),o("div",{class:"flex items-center justify-between text-sm",children:[o("span",{class:"text-gray-300",children:"API アクセス"}),o("span",{class:"text-cyber-green",children:o("i",{class:"fas fa-check"})})]})]}),o("button",{class:"plan-select-btn w-full bg-gradient-to-r from-cyber-pink to-cyber-orange text-white py-3 rounded-xl font-semibold hover:from-cyber-orange hover:to-yellow-500 transition-all duration-300 transform hover:scale-105","data-plan":"premium",children:"プレミアムプランを選択"})]})]}),o("div",{class:"bg-navy-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/30 p-8",children:[o("h3",{class:"text-2xl font-bold text-white mb-6 text-center",children:[o("i",{class:"fas fa-question-circle mr-2 text-cyber-blue"}),"よくある質問"]}),o("div",{class:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[o("div",{children:[o("h4",{class:"text-lg font-semibold text-white mb-3",children:"プラン変更について"}),o("div",{class:"space-y-4 text-gray-300 text-sm",children:[o("div",{children:[o("p",{class:"font-medium text-cyber-blue mb-1",children:"Q: いつでもプランを変更できますか？"}),o("p",{children:"A: はい、いつでもプランの変更が可能です。変更は即座に適用されます。"})]}),o("div",{children:[o("p",{class:"font-medium text-cyber-blue mb-1",children:"Q: ダウングレードはできますか？"}),o("p",{children:"A: はい、可能です。ただし、使用制限は次回リセット時（月初）に適用されます。"})]})]})]}),o("div",{children:[o("h4",{class:"text-lg font-semibold text-white mb-3",children:"料金・支払いについて"}),o("div",{class:"space-y-4 text-gray-300 text-sm",children:[o("div",{children:[o("p",{class:"font-medium text-cyber-green mb-1",children:"Q: 支払い方法は？"}),o("p",{children:"A: クレジットカード、銀行振込に対応しています。"})]}),o("div",{children:[o("p",{class:"font-medium text-cyber-green mb-1",children:"Q: 無料トライアルはありますか？"}),o("p",{children:"A: フリープランで機能をお試しいただけます。"})]})]})]})]})]})]}),o("div",{id:"planSelectModal",class:"fixed inset-0 bg-black/50 backdrop-blur-sm hidden z-50",children:o("div",{class:"flex items-center justify-center min-h-screen p-4",children:o("div",{class:"bg-navy-800 rounded-2xl border border-gray-700 p-6 w-full max-w-lg",children:[o("div",{class:"flex items-center justify-between mb-4",children:[o("h3",{class:"text-lg font-semibold text-white",children:"プラン変更確認"}),o("button",{id:"closePlanSelectModal",class:"text-gray-400 hover:text-white",children:o("i",{class:"fas fa-times"})})]}),o("div",{class:"mb-6",children:[o("div",{class:"bg-navy-700 rounded-lg p-6 mb-4",children:[o("div",{class:"flex items-center justify-between mb-4",children:[o("div",{children:[o("h4",{id:"selectedPlanName",class:"text-xl font-bold text-white",children:"プレミアムプラン"}),o("p",{class:"text-gray-400",children:"に変更します"})]}),o("div",{class:"text-right",children:[o("div",{id:"selectedPlanPrice",class:"text-2xl font-bold text-cyber-pink",children:"¥9,800"}),o("div",{class:"text-gray-400 text-sm",children:"/月"})]})]}),o("div",{class:"border-t border-gray-600 pt-4",children:[o("h5",{class:"text-white font-medium mb-2",children:"主な機能:"}),o("ul",{id:"selectedPlanFeatures",class:"text-gray-300 text-sm space-y-1",children:[o("li",{children:"• 全機能無制限利用"}),o("li",{children:"• カスタムレポート作成"}),o("li",{children:"• 優先サポート"})]})]})]}),o("div",{class:"bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4",children:o("div",{class:"flex items-start",children:[o("i",{class:"fas fa-exclamation-triangle text-yellow-500 mr-2 mt-1"}),o("div",{class:"text-yellow-200 text-sm",children:[o("p",{class:"font-medium mb-1",children:"ご注意:"}),o("p",{children:"プラン変更は即座に適用され、使用制限がリセットされます。課金は変更日から開始されます。"})]})]})})]}),o("div",{class:"flex space-x-3",children:[o("button",{id:"confirmPlanSelect",class:"flex-1 bg-cyber-blue text-white py-3 rounded-lg hover:bg-cyber-purple transition-colors font-semibold",children:"変更を確定する"}),o("button",{id:"cancelPlanSelect",class:"flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-500 transition-colors",children:"キャンセル"})]})]})})}),o("script",{src:"/static/js/plan-management.js"})]});var Nx=/^[\w!#$%&'*.^`|~+-]+$/,Dx=/^[ !#-:<-[\]-~]*$/,Ox=(n,e)=>{if(n.indexOf(e)===-1)return{};const t=n.trim().split(";"),r={};for(let s of t){s=s.trim();const i=s.indexOf("=");if(i===-1)continue;const a=s.substring(0,i).trim();if(e!==a||!Nx.test(a))continue;let l=s.substring(i+1).trim();if(l.startsWith('"')&&l.endsWith('"')&&(l=l.slice(1,-1)),Dx.test(l)){r[a]=l.indexOf("%")!==-1?ec(l,Uu):l;break}}return r},Mx=(n,e,t={})=>{let r=`${n}=${e}`;if(n.startsWith("__Secure-")&&!t.secure)throw new Error("__Secure- Cookie must have Secure attributes");if(n.startsWith("__Host-")){if(!t.secure)throw new Error("__Host- Cookie must have Secure attributes");if(t.path!=="/")throw new Error('__Host- Cookie must have Path attributes with "/"');if(t.domain)throw new Error("__Host- Cookie must not have Domain attributes")}if(t&&typeof t.maxAge=="number"&&t.maxAge>=0){if(t.maxAge>3456e4)throw new Error("Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration.");r+=`; Max-Age=${t.maxAge|0}`}if(t.domain&&t.prefix!=="host"&&(r+=`; Domain=${t.domain}`),t.path&&(r+=`; Path=${t.path}`),t.expires){if(t.expires.getTime()-Date.now()>3456e7)throw new Error("Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future.");r+=`; Expires=${t.expires.toUTCString()}`}if(t.httpOnly&&(r+="; HttpOnly"),t.secure&&(r+="; Secure"),t.sameSite&&(r+=`; SameSite=${t.sameSite.charAt(0).toUpperCase()+t.sameSite.slice(1)}`),t.priority&&(r+=`; Priority=${t.priority.charAt(0).toUpperCase()+t.priority.slice(1)}`),t.partitioned){if(!t.secure)throw new Error("Partitioned Cookie must have Secure attributes");r+="; Partitioned"}return r},gl=(n,e,t)=>(e=encodeURIComponent(e),Mx(n,e,t)),Vg=(n,e,t)=>{const r=n.req.raw.headers.get("Cookie");{if(!r)return;let s=e;return Ox(r,s)[s]}},Lx=(n,e,t)=>{let r;return(t==null?void 0:t.prefix)==="secure"?r=gl("__Secure-"+n,e,{path:"/",...t,secure:!0}):(t==null?void 0:t.prefix)==="host"?r=gl("__Host-"+n,e,{...t,path:"/",secure:!0,domain:void 0}):r=gl(n,e,{path:"/",...t}),r},tc=(n,e,t,r)=>{const s=Lx(e,t,r);n.header("Set-Cookie",s,{append:!0})},Ug=(n,e,t)=>{const r=Vg(n,e);return tc(n,e,"",{...t,maxAge:0}),r};const Vx=()=>{};var Of={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fg=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Ux=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],a=n[t++],l=n[t++],u=((s&7)<<18|(i&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},$g={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],a=s+1<n.length,l=a?n[s+1]:0,u=s+2<n.length,h=u?n[s+2]:0,f=i>>2,p=(i&3)<<4|l>>4;let g=(l&15)<<2|h>>6,_=h&63;u||(_=64,a||(g=64)),r.push(t[f],t[p],t[g],t[_])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Fg(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Ux(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||l==null||h==null||p==null)throw new Fx;const g=i<<2|l>>4;if(r.push(g),h!==64){const _=l<<4&240|h>>2;if(r.push(_),p!==64){const T=h<<6&192|p;r.push(T)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Fx extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const $x=function(n){const e=Fg(n);return $g.encodeByteArray(e,!0)},Ao=function(n){return $x(n).replace(/\./g,"")},jg=function(n){try{return $g.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jx(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bx=()=>jx().__FIREBASE_DEFAULTS__,qx=()=>{if(typeof process>"u"||typeof Of>"u")return;const n=Of.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Hx=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&jg(n[1]);return e&&JSON.parse(e)},nc=()=>{try{return Vx()||Bx()||qx()||Hx()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Bg=n=>{var e,t;return(t=(e=nc())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},Wx=n=>{const e=Bg(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},qg=()=>{var n;return(n=nc())==null?void 0:n.config},Hg=n=>{var e;return(e=nc())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zx{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ss(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Wg(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gx(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Ao(JSON.stringify(t)),Ao(JSON.stringify(a)),""].join(".")}const yi={};function Kx(){const n={prod:[],emulator:[]};for(const e of Object.keys(yi))yi[e]?n.emulator.push(e):n.prod.push(e);return n}function Qx(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Mf=!1;function zg(n,e){if(typeof window>"u"||typeof document>"u"||!Ss(window.location.host)||yi[n]===e||yi[n]||Mf)return;yi[n]=e;function t(g){return`__firebase__banner__${g}`}const r="__firebase__banner",i=Kx().prod.length>0;function a(){const g=document.getElementById(r);g&&g.remove()}function l(g){g.style.display="flex",g.style.background="#7faaf0",g.style.position="fixed",g.style.bottom="5px",g.style.left="5px",g.style.padding=".5em",g.style.borderRadius="5px",g.style.alignItems="center"}function u(g,_){g.setAttribute("width","24"),g.setAttribute("id",_),g.setAttribute("height","24"),g.setAttribute("viewBox","0 0 24 24"),g.setAttribute("fill","none"),g.style.marginLeft="-6px"}function h(){const g=document.createElement("span");return g.style.cursor="pointer",g.style.marginLeft="16px",g.style.fontSize="24px",g.innerHTML=" &times;",g.onclick=()=>{Mf=!0,a()},g}function f(g,_){g.setAttribute("id",_),g.innerText="Learn more",g.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",g.setAttribute("target","__blank"),g.style.paddingLeft="5px",g.style.textDecoration="underline"}function p(){const g=Qx(r),_=t("text"),T=document.getElementById(_)||document.createElement("span"),A=t("learnmore"),S=document.getElementById(A)||document.createElement("a"),U=t("preprendIcon"),N=document.getElementById(U)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(g.created){const V=g.element;l(V),f(S,A);const L=h();u(N,U),V.append(N,T,S,L),document.body.appendChild(V)}i?(T.innerText="Preview backend disconnected.",N.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(N.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,T.innerText="Preview backend running in this workspace."),T.setAttribute("id",_)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function et(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Jx(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(et())}function Xx(){var e;const n=(e=nc())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Yx(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Gg(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Zx(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function eE(){const n=et();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function tE(){return!Xx()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Kg(){try{return typeof indexedDB=="object"}catch{return!1}}function Qg(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}function nE(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rE="FirebaseError";class Mt extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=rE,Object.setPrototypeOf(this,Mt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Sr.prototype.create)}}class Sr{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?sE(i,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new Mt(s,l,r)}}function sE(n,e){return n.replace(iE,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const iE=/\{\$([^}]+)}/g;function aE(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Hn(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],a=e[s];if(Lf(i)&&Lf(a)){if(!Hn(i,a))return!1}else if(i!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Lf(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xi(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function ei(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function ti(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function oE(n,e){const t=new cE(n,e);return t.subscribe.bind(t)}class cE{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");lE(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=yl),s.error===void 0&&(s.error=yl),s.complete===void 0&&(s.complete=yl);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function lE(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function yl(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uE=1e3,hE=2,dE=14400*1e3,fE=.5;function Vf(n,e=uE,t=hE){const r=e*Math.pow(t,n),s=Math.round(fE*r*(Math.random()-.5)*2);return Math.min(dE,r+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ee(n){return n&&n._delegate?n._delegate:n}class Pt{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ar="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mE{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new zx;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(gE(e))try{this.getOrInitializeService({instanceIdentifier:ar})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=ar){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ar){return this.instances.has(e)}getOptions(e=ar){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:pE(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=ar){return this.component?this.component.multipleInstances?e:ar:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function pE(n){return n===ar?void 0:n}function gE(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yE{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new mE(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ie;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ie||(ie={}));const _E={debug:ie.DEBUG,verbose:ie.VERBOSE,info:ie.INFO,warn:ie.WARN,error:ie.ERROR,silent:ie.SILENT},bE=ie.INFO,vE={[ie.DEBUG]:"log",[ie.VERBOSE]:"log",[ie.INFO]:"info",[ie.WARN]:"warn",[ie.ERROR]:"error"},wE=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=vE[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class rc{constructor(e){this.name=e,this._logLevel=bE,this._logHandler=wE,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ie))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?_E[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ie.DEBUG,...e),this._logHandler(this,ie.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ie.VERBOSE,...e),this._logHandler(this,ie.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ie.INFO,...e),this._logHandler(this,ie.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ie.WARN,...e),this._logHandler(this,ie.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ie.ERROR,...e),this._logHandler(this,ie.ERROR,...e)}}const xE=(n,e)=>e.some(t=>n instanceof t);let Uf,Ff;function EE(){return Uf||(Uf=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function IE(){return Ff||(Ff=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Jg=new WeakMap,Kl=new WeakMap,Xg=new WeakMap,_l=new WeakMap,ju=new WeakMap;function AE(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",a)},i=()=>{t($n(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Jg.set(t,n)}).catch(()=>{}),ju.set(e,n),e}function TE(n){if(Kl.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",a),n.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",a),n.addEventListener("abort",a)});Kl.set(n,e)}let Ql={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Kl.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Xg.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return $n(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function SE(n){Ql=n(Ql)}function RE(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(bl(this),e,...t);return Xg.set(r,e.sort?e.sort():[e]),$n(r)}:IE().includes(n)?function(...e){return n.apply(bl(this),e),$n(Jg.get(this))}:function(...e){return $n(n.apply(bl(this),e))}}function CE(n){return typeof n=="function"?RE(n):(n instanceof IDBTransaction&&TE(n),xE(n,EE())?new Proxy(n,Ql):n)}function $n(n){if(n instanceof IDBRequest)return AE(n);if(_l.has(n))return _l.get(n);const e=CE(n);return e!==n&&(_l.set(n,e),ju.set(e,n)),e}const bl=n=>ju.get(n);function Yg(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(n,e),l=$n(a);return r&&a.addEventListener("upgradeneeded",u=>{r($n(a.result),u.oldVersion,u.newVersion,$n(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),l.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const PE=["get","getKey","getAll","getAllKeys","count"],kE=["put","add","delete","clear"],vl=new Map;function $f(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(vl.get(e))return vl.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=kE.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||PE.includes(t)))return;const i=async function(a,...l){const u=this.transaction(a,s?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[t](...l),s&&u.done]))[0]};return vl.set(e,i),i}SE(n=>({...n,get:(e,t,r)=>$f(e,t)||n.get(e,t,r),has:(e,t)=>!!$f(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NE{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(DE(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function DE(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Jl="@firebase/app",jf="0.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hn=new rc("@firebase/app"),OE="@firebase/app-compat",ME="@firebase/analytics-compat",LE="@firebase/analytics",VE="@firebase/app-check-compat",UE="@firebase/app-check",FE="@firebase/auth",$E="@firebase/auth-compat",jE="@firebase/database",BE="@firebase/data-connect",qE="@firebase/database-compat",HE="@firebase/functions",WE="@firebase/functions-compat",zE="@firebase/installations",GE="@firebase/installations-compat",KE="@firebase/messaging",QE="@firebase/messaging-compat",JE="@firebase/performance",XE="@firebase/performance-compat",YE="@firebase/remote-config",ZE="@firebase/remote-config-compat",eI="@firebase/storage",tI="@firebase/storage-compat",nI="@firebase/firestore",rI="@firebase/ai",sI="@firebase/firestore-compat",iI="firebase",aI="12.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xl="[DEFAULT]",oI={[Jl]:"fire-core",[OE]:"fire-core-compat",[LE]:"fire-analytics",[ME]:"fire-analytics-compat",[UE]:"fire-app-check",[VE]:"fire-app-check-compat",[FE]:"fire-auth",[$E]:"fire-auth-compat",[jE]:"fire-rtdb",[BE]:"fire-data-connect",[qE]:"fire-rtdb-compat",[HE]:"fire-fn",[WE]:"fire-fn-compat",[zE]:"fire-iid",[GE]:"fire-iid-compat",[KE]:"fire-fcm",[QE]:"fire-fcm-compat",[JE]:"fire-perf",[XE]:"fire-perf-compat",[YE]:"fire-rc",[ZE]:"fire-rc-compat",[eI]:"fire-gcs",[tI]:"fire-gcs-compat",[nI]:"fire-fst",[sI]:"fire-fst-compat",[rI]:"fire-vertex","fire-js":"fire-js",[iI]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const To=new Map,cI=new Map,Yl=new Map;function Bf(n,e){try{n.container.addComponent(e)}catch(t){hn.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Qt(n){const e=n.name;if(Yl.has(e))return hn.debug(`There were multiple attempts to register component ${e}.`),!1;Yl.set(e,n);for(const t of To.values())Bf(t,n);for(const t of cI.values())Bf(t,n);return!0}function Rr(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function yt(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lI={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},jn=new Sr("app","Firebase",lI);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uI{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Pt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw jn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rs=aI;function Zg(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Xl,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw jn.create("bad-app-name",{appName:String(s)});if(t||(t=qg()),!t)throw jn.create("no-options");const i=To.get(s);if(i){if(Hn(t,i.options)&&Hn(r,i.config))return i;throw jn.create("duplicate-app",{appName:s})}const a=new yE(s);for(const u of Yl.values())a.addComponent(u);const l=new uI(t,r,a);return To.set(s,l),l}function Bu(n=Xl){const e=To.get(n);if(!e&&n===Xl&&qg())return Zg();if(!e)throw jn.create("no-app",{appName:n});return e}function wt(n,e,t){let r=oI[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),hn.warn(a.join(" "));return}Qt(new Pt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hI="firebase-heartbeat-database",dI=1,Ci="firebase-heartbeat-store";let wl=null;function ey(){return wl||(wl=Yg(hI,dI,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ci)}catch(t){console.warn(t)}}}}).catch(n=>{throw jn.create("idb-open",{originalErrorMessage:n.message})})),wl}async function fI(n){try{const t=(await ey()).transaction(Ci),r=await t.objectStore(Ci).get(ty(n));return await t.done,r}catch(e){if(e instanceof Mt)hn.warn(e.message);else{const t=jn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});hn.warn(t.message)}}}async function qf(n,e){try{const r=(await ey()).transaction(Ci,"readwrite");await r.objectStore(Ci).put(e,ty(n)),await r.done}catch(t){if(t instanceof Mt)hn.warn(t.message);else{const r=jn.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});hn.warn(r.message)}}}function ty(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mI=1024,pI=30;class gI{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new _I(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Hf();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>pI){const a=bI(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){hn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Hf(),{heartbeatsToSend:r,unsentEntries:s}=yI(this._heartbeatsCache.heartbeats),i=Ao(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return hn.warn(t),""}}}function Hf(){return new Date().toISOString().substring(0,10)}function yI(n,e=mI){const t=[];let r=n.slice();for(const s of n){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Wf(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Wf(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class _I{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Kg()?Qg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await fI(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return qf(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return qf(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Wf(n){return Ao(JSON.stringify({version:2,heartbeats:n})).length}function bI(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vI(n){Qt(new Pt("platform-logger",e=>new NE(e),"PRIVATE")),Qt(new Pt("heartbeat",e=>new gI(e),"PRIVATE")),wt(Jl,jf,n),wt(Jl,jf,"esm2020"),wt("fire-js","")}vI("");var zf=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Bn,ny;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(x,b){function v(){}v.prototype=b.prototype,x.D=b.prototype,x.prototype=new v,x.prototype.constructor=x,x.C=function(E,I,R){for(var w=Array(arguments.length-2),He=2;He<arguments.length;He++)w[He-2]=arguments[He];return b.prototype[I].apply(E,w)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(x,b,v){v||(v=0);var E=Array(16);if(typeof b=="string")for(var I=0;16>I;++I)E[I]=b.charCodeAt(v++)|b.charCodeAt(v++)<<8|b.charCodeAt(v++)<<16|b.charCodeAt(v++)<<24;else for(I=0;16>I;++I)E[I]=b[v++]|b[v++]<<8|b[v++]<<16|b[v++]<<24;b=x.g[0],v=x.g[1],I=x.g[2];var R=x.g[3],w=b+(R^v&(I^R))+E[0]+3614090360&4294967295;b=v+(w<<7&4294967295|w>>>25),w=R+(I^b&(v^I))+E[1]+3905402710&4294967295,R=b+(w<<12&4294967295|w>>>20),w=I+(v^R&(b^v))+E[2]+606105819&4294967295,I=R+(w<<17&4294967295|w>>>15),w=v+(b^I&(R^b))+E[3]+3250441966&4294967295,v=I+(w<<22&4294967295|w>>>10),w=b+(R^v&(I^R))+E[4]+4118548399&4294967295,b=v+(w<<7&4294967295|w>>>25),w=R+(I^b&(v^I))+E[5]+1200080426&4294967295,R=b+(w<<12&4294967295|w>>>20),w=I+(v^R&(b^v))+E[6]+2821735955&4294967295,I=R+(w<<17&4294967295|w>>>15),w=v+(b^I&(R^b))+E[7]+4249261313&4294967295,v=I+(w<<22&4294967295|w>>>10),w=b+(R^v&(I^R))+E[8]+1770035416&4294967295,b=v+(w<<7&4294967295|w>>>25),w=R+(I^b&(v^I))+E[9]+2336552879&4294967295,R=b+(w<<12&4294967295|w>>>20),w=I+(v^R&(b^v))+E[10]+4294925233&4294967295,I=R+(w<<17&4294967295|w>>>15),w=v+(b^I&(R^b))+E[11]+2304563134&4294967295,v=I+(w<<22&4294967295|w>>>10),w=b+(R^v&(I^R))+E[12]+1804603682&4294967295,b=v+(w<<7&4294967295|w>>>25),w=R+(I^b&(v^I))+E[13]+4254626195&4294967295,R=b+(w<<12&4294967295|w>>>20),w=I+(v^R&(b^v))+E[14]+2792965006&4294967295,I=R+(w<<17&4294967295|w>>>15),w=v+(b^I&(R^b))+E[15]+1236535329&4294967295,v=I+(w<<22&4294967295|w>>>10),w=b+(I^R&(v^I))+E[1]+4129170786&4294967295,b=v+(w<<5&4294967295|w>>>27),w=R+(v^I&(b^v))+E[6]+3225465664&4294967295,R=b+(w<<9&4294967295|w>>>23),w=I+(b^v&(R^b))+E[11]+643717713&4294967295,I=R+(w<<14&4294967295|w>>>18),w=v+(R^b&(I^R))+E[0]+3921069994&4294967295,v=I+(w<<20&4294967295|w>>>12),w=b+(I^R&(v^I))+E[5]+3593408605&4294967295,b=v+(w<<5&4294967295|w>>>27),w=R+(v^I&(b^v))+E[10]+38016083&4294967295,R=b+(w<<9&4294967295|w>>>23),w=I+(b^v&(R^b))+E[15]+3634488961&4294967295,I=R+(w<<14&4294967295|w>>>18),w=v+(R^b&(I^R))+E[4]+3889429448&4294967295,v=I+(w<<20&4294967295|w>>>12),w=b+(I^R&(v^I))+E[9]+568446438&4294967295,b=v+(w<<5&4294967295|w>>>27),w=R+(v^I&(b^v))+E[14]+3275163606&4294967295,R=b+(w<<9&4294967295|w>>>23),w=I+(b^v&(R^b))+E[3]+4107603335&4294967295,I=R+(w<<14&4294967295|w>>>18),w=v+(R^b&(I^R))+E[8]+1163531501&4294967295,v=I+(w<<20&4294967295|w>>>12),w=b+(I^R&(v^I))+E[13]+2850285829&4294967295,b=v+(w<<5&4294967295|w>>>27),w=R+(v^I&(b^v))+E[2]+4243563512&4294967295,R=b+(w<<9&4294967295|w>>>23),w=I+(b^v&(R^b))+E[7]+1735328473&4294967295,I=R+(w<<14&4294967295|w>>>18),w=v+(R^b&(I^R))+E[12]+2368359562&4294967295,v=I+(w<<20&4294967295|w>>>12),w=b+(v^I^R)+E[5]+4294588738&4294967295,b=v+(w<<4&4294967295|w>>>28),w=R+(b^v^I)+E[8]+2272392833&4294967295,R=b+(w<<11&4294967295|w>>>21),w=I+(R^b^v)+E[11]+1839030562&4294967295,I=R+(w<<16&4294967295|w>>>16),w=v+(I^R^b)+E[14]+4259657740&4294967295,v=I+(w<<23&4294967295|w>>>9),w=b+(v^I^R)+E[1]+2763975236&4294967295,b=v+(w<<4&4294967295|w>>>28),w=R+(b^v^I)+E[4]+1272893353&4294967295,R=b+(w<<11&4294967295|w>>>21),w=I+(R^b^v)+E[7]+4139469664&4294967295,I=R+(w<<16&4294967295|w>>>16),w=v+(I^R^b)+E[10]+3200236656&4294967295,v=I+(w<<23&4294967295|w>>>9),w=b+(v^I^R)+E[13]+681279174&4294967295,b=v+(w<<4&4294967295|w>>>28),w=R+(b^v^I)+E[0]+3936430074&4294967295,R=b+(w<<11&4294967295|w>>>21),w=I+(R^b^v)+E[3]+3572445317&4294967295,I=R+(w<<16&4294967295|w>>>16),w=v+(I^R^b)+E[6]+76029189&4294967295,v=I+(w<<23&4294967295|w>>>9),w=b+(v^I^R)+E[9]+3654602809&4294967295,b=v+(w<<4&4294967295|w>>>28),w=R+(b^v^I)+E[12]+3873151461&4294967295,R=b+(w<<11&4294967295|w>>>21),w=I+(R^b^v)+E[15]+530742520&4294967295,I=R+(w<<16&4294967295|w>>>16),w=v+(I^R^b)+E[2]+3299628645&4294967295,v=I+(w<<23&4294967295|w>>>9),w=b+(I^(v|~R))+E[0]+4096336452&4294967295,b=v+(w<<6&4294967295|w>>>26),w=R+(v^(b|~I))+E[7]+1126891415&4294967295,R=b+(w<<10&4294967295|w>>>22),w=I+(b^(R|~v))+E[14]+2878612391&4294967295,I=R+(w<<15&4294967295|w>>>17),w=v+(R^(I|~b))+E[5]+4237533241&4294967295,v=I+(w<<21&4294967295|w>>>11),w=b+(I^(v|~R))+E[12]+1700485571&4294967295,b=v+(w<<6&4294967295|w>>>26),w=R+(v^(b|~I))+E[3]+2399980690&4294967295,R=b+(w<<10&4294967295|w>>>22),w=I+(b^(R|~v))+E[10]+4293915773&4294967295,I=R+(w<<15&4294967295|w>>>17),w=v+(R^(I|~b))+E[1]+2240044497&4294967295,v=I+(w<<21&4294967295|w>>>11),w=b+(I^(v|~R))+E[8]+1873313359&4294967295,b=v+(w<<6&4294967295|w>>>26),w=R+(v^(b|~I))+E[15]+4264355552&4294967295,R=b+(w<<10&4294967295|w>>>22),w=I+(b^(R|~v))+E[6]+2734768916&4294967295,I=R+(w<<15&4294967295|w>>>17),w=v+(R^(I|~b))+E[13]+1309151649&4294967295,v=I+(w<<21&4294967295|w>>>11),w=b+(I^(v|~R))+E[4]+4149444226&4294967295,b=v+(w<<6&4294967295|w>>>26),w=R+(v^(b|~I))+E[11]+3174756917&4294967295,R=b+(w<<10&4294967295|w>>>22),w=I+(b^(R|~v))+E[2]+718787259&4294967295,I=R+(w<<15&4294967295|w>>>17),w=v+(R^(I|~b))+E[9]+3951481745&4294967295,x.g[0]=x.g[0]+b&4294967295,x.g[1]=x.g[1]+(I+(w<<21&4294967295|w>>>11))&4294967295,x.g[2]=x.g[2]+I&4294967295,x.g[3]=x.g[3]+R&4294967295}r.prototype.u=function(x,b){b===void 0&&(b=x.length);for(var v=b-this.blockSize,E=this.B,I=this.h,R=0;R<b;){if(I==0)for(;R<=v;)s(this,x,R),R+=this.blockSize;if(typeof x=="string"){for(;R<b;)if(E[I++]=x.charCodeAt(R++),I==this.blockSize){s(this,E),I=0;break}}else for(;R<b;)if(E[I++]=x[R++],I==this.blockSize){s(this,E),I=0;break}}this.h=I,this.o+=b},r.prototype.v=function(){var x=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);x[0]=128;for(var b=1;b<x.length-8;++b)x[b]=0;var v=8*this.o;for(b=x.length-8;b<x.length;++b)x[b]=v&255,v/=256;for(this.u(x),x=Array(16),b=v=0;4>b;++b)for(var E=0;32>E;E+=8)x[v++]=this.g[b]>>>E&255;return x};function i(x,b){var v=l;return Object.prototype.hasOwnProperty.call(v,x)?v[x]:v[x]=b(x)}function a(x,b){this.h=b;for(var v=[],E=!0,I=x.length-1;0<=I;I--){var R=x[I]|0;E&&R==b||(v[I]=R,E=!1)}this.g=v}var l={};function u(x){return-128<=x&&128>x?i(x,function(b){return new a([b|0],0>b?-1:0)}):new a([x|0],0>x?-1:0)}function h(x){if(isNaN(x)||!isFinite(x))return p;if(0>x)return S(h(-x));for(var b=[],v=1,E=0;x>=v;E++)b[E]=x/v|0,v*=4294967296;return new a(b,0)}function f(x,b){if(x.length==0)throw Error("number format error: empty string");if(b=b||10,2>b||36<b)throw Error("radix out of range: "+b);if(x.charAt(0)=="-")return S(f(x.substring(1),b));if(0<=x.indexOf("-"))throw Error('number format error: interior "-" character');for(var v=h(Math.pow(b,8)),E=p,I=0;I<x.length;I+=8){var R=Math.min(8,x.length-I),w=parseInt(x.substring(I,I+R),b);8>R?(R=h(Math.pow(b,R)),E=E.j(R).add(h(w))):(E=E.j(v),E=E.add(h(w)))}return E}var p=u(0),g=u(1),_=u(16777216);n=a.prototype,n.m=function(){if(A(this))return-S(this).m();for(var x=0,b=1,v=0;v<this.g.length;v++){var E=this.i(v);x+=(0<=E?E:4294967296+E)*b,b*=4294967296}return x},n.toString=function(x){if(x=x||10,2>x||36<x)throw Error("radix out of range: "+x);if(T(this))return"0";if(A(this))return"-"+S(this).toString(x);for(var b=h(Math.pow(x,6)),v=this,E="";;){var I=L(v,b).g;v=U(v,I.j(b));var R=((0<v.g.length?v.g[0]:v.h)>>>0).toString(x);if(v=I,T(v))return R+E;for(;6>R.length;)R="0"+R;E=R+E}},n.i=function(x){return 0>x?0:x<this.g.length?this.g[x]:this.h};function T(x){if(x.h!=0)return!1;for(var b=0;b<x.g.length;b++)if(x.g[b]!=0)return!1;return!0}function A(x){return x.h==-1}n.l=function(x){return x=U(this,x),A(x)?-1:T(x)?0:1};function S(x){for(var b=x.g.length,v=[],E=0;E<b;E++)v[E]=~x.g[E];return new a(v,~x.h).add(g)}n.abs=function(){return A(this)?S(this):this},n.add=function(x){for(var b=Math.max(this.g.length,x.g.length),v=[],E=0,I=0;I<=b;I++){var R=E+(this.i(I)&65535)+(x.i(I)&65535),w=(R>>>16)+(this.i(I)>>>16)+(x.i(I)>>>16);E=w>>>16,R&=65535,w&=65535,v[I]=w<<16|R}return new a(v,v[v.length-1]&-2147483648?-1:0)};function U(x,b){return x.add(S(b))}n.j=function(x){if(T(this)||T(x))return p;if(A(this))return A(x)?S(this).j(S(x)):S(S(this).j(x));if(A(x))return S(this.j(S(x)));if(0>this.l(_)&&0>x.l(_))return h(this.m()*x.m());for(var b=this.g.length+x.g.length,v=[],E=0;E<2*b;E++)v[E]=0;for(E=0;E<this.g.length;E++)for(var I=0;I<x.g.length;I++){var R=this.i(E)>>>16,w=this.i(E)&65535,He=x.i(I)>>>16,Lt=x.i(I)&65535;v[2*E+2*I]+=w*Lt,N(v,2*E+2*I),v[2*E+2*I+1]+=R*Lt,N(v,2*E+2*I+1),v[2*E+2*I+1]+=w*He,N(v,2*E+2*I+1),v[2*E+2*I+2]+=R*He,N(v,2*E+2*I+2)}for(E=0;E<b;E++)v[E]=v[2*E+1]<<16|v[2*E];for(E=b;E<2*b;E++)v[E]=0;return new a(v,0)};function N(x,b){for(;(x[b]&65535)!=x[b];)x[b+1]+=x[b]>>>16,x[b]&=65535,b++}function V(x,b){this.g=x,this.h=b}function L(x,b){if(T(b))throw Error("division by zero");if(T(x))return new V(p,p);if(A(x))return b=L(S(x),b),new V(S(b.g),S(b.h));if(A(b))return b=L(x,S(b)),new V(S(b.g),b.h);if(30<x.g.length){if(A(x)||A(b))throw Error("slowDivide_ only works with positive integers.");for(var v=g,E=b;0>=E.l(x);)v=z(v),E=z(E);var I=W(v,1),R=W(E,1);for(E=W(E,2),v=W(v,2);!T(E);){var w=R.add(E);0>=w.l(x)&&(I=I.add(v),R=w),E=W(E,1),v=W(v,1)}return b=U(x,I.j(b)),new V(I,b)}for(I=p;0<=x.l(b);){for(v=Math.max(1,Math.floor(x.m()/b.m())),E=Math.ceil(Math.log(v)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),R=h(v),w=R.j(b);A(w)||0<w.l(x);)v-=E,R=h(v),w=R.j(b);T(R)&&(R=g),I=I.add(R),x=U(x,w)}return new V(I,x)}n.A=function(x){return L(this,x).h},n.and=function(x){for(var b=Math.max(this.g.length,x.g.length),v=[],E=0;E<b;E++)v[E]=this.i(E)&x.i(E);return new a(v,this.h&x.h)},n.or=function(x){for(var b=Math.max(this.g.length,x.g.length),v=[],E=0;E<b;E++)v[E]=this.i(E)|x.i(E);return new a(v,this.h|x.h)},n.xor=function(x){for(var b=Math.max(this.g.length,x.g.length),v=[],E=0;E<b;E++)v[E]=this.i(E)^x.i(E);return new a(v,this.h^x.h)};function z(x){for(var b=x.g.length+1,v=[],E=0;E<b;E++)v[E]=x.i(E)<<1|x.i(E-1)>>>31;return new a(v,x.h)}function W(x,b){var v=b>>5;b%=32;for(var E=x.g.length-v,I=[],R=0;R<E;R++)I[R]=0<b?x.i(R+v)>>>b|x.i(R+v+1)<<32-b:x.i(R+v);return new a(I,x.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,ny=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,Bn=a}).apply(typeof zf<"u"?zf:typeof self<"u"?self:typeof window<"u"?window:{});var Ma=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ry,ni,sy,no,Zl,iy,ay,oy;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(c,d,m){return c==Array.prototype||c==Object.prototype||(c[d]=m.value),c};function t(c){c=[typeof globalThis=="object"&&globalThis,c,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ma=="object"&&Ma];for(var d=0;d<c.length;++d){var m=c[d];if(m&&m.Math==Math)return m}throw Error("Cannot find global object")}var r=t(this);function s(c,d){if(d)e:{var m=r;c=c.split(".");for(var y=0;y<c.length-1;y++){var C=c[y];if(!(C in m))break e;m=m[C]}c=c[c.length-1],y=m[c],d=d(y),d!=y&&d!=null&&e(m,c,{configurable:!0,writable:!0,value:d})}}function i(c,d){c instanceof String&&(c+="");var m=0,y=!1,C={next:function(){if(!y&&m<c.length){var k=m++;return{value:d(k,c[k]),done:!1}}return y=!0,{done:!0,value:void 0}}};return C[Symbol.iterator]=function(){return C},C}s("Array.prototype.values",function(c){return c||function(){return i(this,function(d,m){return m})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function u(c){var d=typeof c;return d=d!="object"?d:c?Array.isArray(c)?"array":d:"null",d=="array"||d=="object"&&typeof c.length=="number"}function h(c){var d=typeof c;return d=="object"&&c!=null||d=="function"}function f(c,d,m){return c.call.apply(c.bind,arguments)}function p(c,d,m){if(!c)throw Error();if(2<arguments.length){var y=Array.prototype.slice.call(arguments,2);return function(){var C=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(C,y),c.apply(d,C)}}return function(){return c.apply(d,arguments)}}function g(c,d,m){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,g.apply(null,arguments)}function _(c,d){var m=Array.prototype.slice.call(arguments,1);return function(){var y=m.slice();return y.push.apply(y,arguments),c.apply(this,y)}}function T(c,d){function m(){}m.prototype=d.prototype,c.aa=d.prototype,c.prototype=new m,c.prototype.constructor=c,c.Qb=function(y,C,k){for(var $=Array(arguments.length-2),fe=2;fe<arguments.length;fe++)$[fe-2]=arguments[fe];return d.prototype[C].apply(y,$)}}function A(c){const d=c.length;if(0<d){const m=Array(d);for(let y=0;y<d;y++)m[y]=c[y];return m}return[]}function S(c,d){for(let m=1;m<arguments.length;m++){const y=arguments[m];if(u(y)){const C=c.length||0,k=y.length||0;c.length=C+k;for(let $=0;$<k;$++)c[C+$]=y[$]}else c.push(y)}}class U{constructor(d,m){this.i=d,this.j=m,this.h=0,this.g=null}get(){let d;return 0<this.h?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function N(c){return/^[\s\xa0]*$/.test(c)}function V(){var c=l.navigator;return c&&(c=c.userAgent)?c:""}function L(c){return L[" "](c),c}L[" "]=function(){};var z=V().indexOf("Gecko")!=-1&&!(V().toLowerCase().indexOf("webkit")!=-1&&V().indexOf("Edge")==-1)&&!(V().indexOf("Trident")!=-1||V().indexOf("MSIE")!=-1)&&V().indexOf("Edge")==-1;function W(c,d,m){for(const y in c)d.call(m,c[y],y,c)}function x(c,d){for(const m in c)d.call(void 0,c[m],m,c)}function b(c){const d={};for(const m in c)d[m]=c[m];return d}const v="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(c,d){let m,y;for(let C=1;C<arguments.length;C++){y=arguments[C];for(m in y)c[m]=y[m];for(let k=0;k<v.length;k++)m=v[k],Object.prototype.hasOwnProperty.call(y,m)&&(c[m]=y[m])}}function I(c){var d=1;c=c.split(":");const m=[];for(;0<d&&c.length;)m.push(c.shift()),d--;return c.length&&m.push(c.join(":")),m}function R(c){l.setTimeout(()=>{throw c},0)}function w(){var c=Lc;let d=null;return c.g&&(d=c.g,c.g=c.g.next,c.g||(c.h=null),d.next=null),d}class He{constructor(){this.h=this.g=null}add(d,m){const y=Lt.get();y.set(d,m),this.h?this.h.next=y:this.g=y,this.h=y}}var Lt=new U(()=>new fw,c=>c.reset());class fw{constructor(){this.next=this.g=this.h=null}set(d,m){this.h=d,this.g=m,this.next=null}reset(){this.next=this.g=this.h=null}}let Ms,Ls=!1,Lc=new He,md=()=>{const c=l.Promise.resolve(void 0);Ms=()=>{c.then(mw)}};var mw=()=>{for(var c;c=w();){try{c.h.call(c.g)}catch(m){R(m)}var d=Lt;d.j(c),100>d.h&&(d.h++,c.next=d.g,d.g=c)}Ls=!1};function vn(){this.s=this.s,this.C=this.C}vn.prototype.s=!1,vn.prototype.ma=function(){this.s||(this.s=!0,this.N())},vn.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function We(c,d){this.type=c,this.g=this.target=d,this.defaultPrevented=!1}We.prototype.h=function(){this.defaultPrevented=!0};var pw=(function(){if(!l.addEventListener||!Object.defineProperty)return!1;var c=!1,d=Object.defineProperty({},"passive",{get:function(){c=!0}});try{const m=()=>{};l.addEventListener("test",m,d),l.removeEventListener("test",m,d)}catch{}return c})();function Vs(c,d){if(We.call(this,c?c.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,c){var m=this.type=c.type,y=c.changedTouches&&c.changedTouches.length?c.changedTouches[0]:null;if(this.target=c.target||c.srcElement,this.g=d,d=c.relatedTarget){if(z){e:{try{L(d.nodeName);var C=!0;break e}catch{}C=!1}C||(d=null)}}else m=="mouseover"?d=c.fromElement:m=="mouseout"&&(d=c.toElement);this.relatedTarget=d,y?(this.clientX=y.clientX!==void 0?y.clientX:y.pageX,this.clientY=y.clientY!==void 0?y.clientY:y.pageY,this.screenX=y.screenX||0,this.screenY=y.screenY||0):(this.clientX=c.clientX!==void 0?c.clientX:c.pageX,this.clientY=c.clientY!==void 0?c.clientY:c.pageY,this.screenX=c.screenX||0,this.screenY=c.screenY||0),this.button=c.button,this.key=c.key||"",this.ctrlKey=c.ctrlKey,this.altKey=c.altKey,this.shiftKey=c.shiftKey,this.metaKey=c.metaKey,this.pointerId=c.pointerId||0,this.pointerType=typeof c.pointerType=="string"?c.pointerType:gw[c.pointerType]||"",this.state=c.state,this.i=c,c.defaultPrevented&&Vs.aa.h.call(this)}}T(Vs,We);var gw={2:"touch",3:"pen",4:"mouse"};Vs.prototype.h=function(){Vs.aa.h.call(this);var c=this.i;c.preventDefault?c.preventDefault():c.returnValue=!1};var ma="closure_listenable_"+(1e6*Math.random()|0),yw=0;function _w(c,d,m,y,C){this.listener=c,this.proxy=null,this.src=d,this.type=m,this.capture=!!y,this.ha=C,this.key=++yw,this.da=this.fa=!1}function pa(c){c.da=!0,c.listener=null,c.proxy=null,c.src=null,c.ha=null}function ga(c){this.src=c,this.g={},this.h=0}ga.prototype.add=function(c,d,m,y,C){var k=c.toString();c=this.g[k],c||(c=this.g[k]=[],this.h++);var $=Uc(c,d,y,C);return-1<$?(d=c[$],m||(d.fa=!1)):(d=new _w(d,this.src,k,!!y,C),d.fa=m,c.push(d)),d};function Vc(c,d){var m=d.type;if(m in c.g){var y=c.g[m],C=Array.prototype.indexOf.call(y,d,void 0),k;(k=0<=C)&&Array.prototype.splice.call(y,C,1),k&&(pa(d),c.g[m].length==0&&(delete c.g[m],c.h--))}}function Uc(c,d,m,y){for(var C=0;C<c.length;++C){var k=c[C];if(!k.da&&k.listener==d&&k.capture==!!m&&k.ha==y)return C}return-1}var Fc="closure_lm_"+(1e6*Math.random()|0),$c={};function pd(c,d,m,y,C){if(Array.isArray(d)){for(var k=0;k<d.length;k++)pd(c,d[k],m,y,C);return null}return m=_d(m),c&&c[ma]?c.K(d,m,h(y)?!!y.capture:!1,C):bw(c,d,m,!1,y,C)}function bw(c,d,m,y,C,k){if(!d)throw Error("Invalid event type");var $=h(C)?!!C.capture:!!C,fe=Bc(c);if(fe||(c[Fc]=fe=new ga(c)),m=fe.add(d,m,y,$,k),m.proxy)return m;if(y=vw(),m.proxy=y,y.src=c,y.listener=m,c.addEventListener)pw||(C=$),C===void 0&&(C=!1),c.addEventListener(d.toString(),y,C);else if(c.attachEvent)c.attachEvent(yd(d.toString()),y);else if(c.addListener&&c.removeListener)c.addListener(y);else throw Error("addEventListener and attachEvent are unavailable.");return m}function vw(){function c(m){return d.call(c.src,c.listener,m)}const d=ww;return c}function gd(c,d,m,y,C){if(Array.isArray(d))for(var k=0;k<d.length;k++)gd(c,d[k],m,y,C);else y=h(y)?!!y.capture:!!y,m=_d(m),c&&c[ma]?(c=c.i,d=String(d).toString(),d in c.g&&(k=c.g[d],m=Uc(k,m,y,C),-1<m&&(pa(k[m]),Array.prototype.splice.call(k,m,1),k.length==0&&(delete c.g[d],c.h--)))):c&&(c=Bc(c))&&(d=c.g[d.toString()],c=-1,d&&(c=Uc(d,m,y,C)),(m=-1<c?d[c]:null)&&jc(m))}function jc(c){if(typeof c!="number"&&c&&!c.da){var d=c.src;if(d&&d[ma])Vc(d.i,c);else{var m=c.type,y=c.proxy;d.removeEventListener?d.removeEventListener(m,y,c.capture):d.detachEvent?d.detachEvent(yd(m),y):d.addListener&&d.removeListener&&d.removeListener(y),(m=Bc(d))?(Vc(m,c),m.h==0&&(m.src=null,d[Fc]=null)):pa(c)}}}function yd(c){return c in $c?$c[c]:$c[c]="on"+c}function ww(c,d){if(c.da)c=!0;else{d=new Vs(d,this);var m=c.listener,y=c.ha||c.src;c.fa&&jc(c),c=m.call(y,d)}return c}function Bc(c){return c=c[Fc],c instanceof ga?c:null}var qc="__closure_events_fn_"+(1e9*Math.random()>>>0);function _d(c){return typeof c=="function"?c:(c[qc]||(c[qc]=function(d){return c.handleEvent(d)}),c[qc])}function ze(){vn.call(this),this.i=new ga(this),this.M=this,this.F=null}T(ze,vn),ze.prototype[ma]=!0,ze.prototype.removeEventListener=function(c,d,m,y){gd(this,c,d,m,y)};function tt(c,d){var m,y=c.F;if(y)for(m=[];y;y=y.F)m.push(y);if(c=c.M,y=d.type||d,typeof d=="string")d=new We(d,c);else if(d instanceof We)d.target=d.target||c;else{var C=d;d=new We(y,c),E(d,C)}if(C=!0,m)for(var k=m.length-1;0<=k;k--){var $=d.g=m[k];C=ya($,y,!0,d)&&C}if($=d.g=c,C=ya($,y,!0,d)&&C,C=ya($,y,!1,d)&&C,m)for(k=0;k<m.length;k++)$=d.g=m[k],C=ya($,y,!1,d)&&C}ze.prototype.N=function(){if(ze.aa.N.call(this),this.i){var c=this.i,d;for(d in c.g){for(var m=c.g[d],y=0;y<m.length;y++)pa(m[y]);delete c.g[d],c.h--}}this.F=null},ze.prototype.K=function(c,d,m,y){return this.i.add(String(c),d,!1,m,y)},ze.prototype.L=function(c,d,m,y){return this.i.add(String(c),d,!0,m,y)};function ya(c,d,m,y){if(d=c.i.g[String(d)],!d)return!0;d=d.concat();for(var C=!0,k=0;k<d.length;++k){var $=d[k];if($&&!$.da&&$.capture==m){var fe=$.listener,Le=$.ha||$.src;$.fa&&Vc(c.i,$),C=fe.call(Le,y)!==!1&&C}}return C&&!y.defaultPrevented}function bd(c,d,m){if(typeof c=="function")m&&(c=g(c,m));else if(c&&typeof c.handleEvent=="function")c=g(c.handleEvent,c);else throw Error("Invalid listener argument");return 2147483647<Number(d)?-1:l.setTimeout(c,d||0)}function vd(c){c.g=bd(()=>{c.g=null,c.i&&(c.i=!1,vd(c))},c.l);const d=c.h;c.h=null,c.m.apply(null,d)}class xw extends vn{constructor(d,m){super(),this.m=d,this.l=m,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:vd(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Us(c){vn.call(this),this.h=c,this.g={}}T(Us,vn);var wd=[];function xd(c){W(c.g,function(d,m){this.g.hasOwnProperty(m)&&jc(d)},c),c.g={}}Us.prototype.N=function(){Us.aa.N.call(this),xd(this)},Us.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Hc=l.JSON.stringify,Ew=l.JSON.parse,Iw=class{stringify(c){return l.JSON.stringify(c,void 0)}parse(c){return l.JSON.parse(c,void 0)}};function Wc(){}Wc.prototype.h=null;function Ed(c){return c.h||(c.h=c.i())}function Id(){}var Fs={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function zc(){We.call(this,"d")}T(zc,We);function Gc(){We.call(this,"c")}T(Gc,We);var er={},Ad=null;function _a(){return Ad=Ad||new ze}er.La="serverreachability";function Td(c){We.call(this,er.La,c)}T(Td,We);function $s(c){const d=_a();tt(d,new Td(d))}er.STAT_EVENT="statevent";function Sd(c,d){We.call(this,er.STAT_EVENT,c),this.stat=d}T(Sd,We);function nt(c){const d=_a();tt(d,new Sd(d,c))}er.Ma="timingevent";function Rd(c,d){We.call(this,er.Ma,c),this.size=d}T(Rd,We);function js(c,d){if(typeof c!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){c()},d)}function Bs(){this.g=!0}Bs.prototype.xa=function(){this.g=!1};function Aw(c,d,m,y,C,k){c.info(function(){if(c.g)if(k)for(var $="",fe=k.split("&"),Le=0;Le<fe.length;Le++){var ue=fe[Le].split("=");if(1<ue.length){var Ge=ue[0];ue=ue[1];var Ke=Ge.split("_");$=2<=Ke.length&&Ke[1]=="type"?$+(Ge+"="+ue+"&"):$+(Ge+"=redacted&")}}else $=null;else $=k;return"XMLHTTP REQ ("+y+") [attempt "+C+"]: "+d+`
`+m+`
`+$})}function Tw(c,d,m,y,C,k,$){c.info(function(){return"XMLHTTP RESP ("+y+") [ attempt "+C+"]: "+d+`
`+m+`
`+k+" "+$})}function Or(c,d,m,y){c.info(function(){return"XMLHTTP TEXT ("+d+"): "+Rw(c,m)+(y?" "+y:"")})}function Sw(c,d){c.info(function(){return"TIMEOUT: "+d})}Bs.prototype.info=function(){};function Rw(c,d){if(!c.g)return d;if(!d)return null;try{var m=JSON.parse(d);if(m){for(c=0;c<m.length;c++)if(Array.isArray(m[c])){var y=m[c];if(!(2>y.length)){var C=y[1];if(Array.isArray(C)&&!(1>C.length)){var k=C[0];if(k!="noop"&&k!="stop"&&k!="close")for(var $=1;$<C.length;$++)C[$]=""}}}}return Hc(m)}catch{return d}}var ba={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Cd={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Kc;function va(){}T(va,Wc),va.prototype.g=function(){return new XMLHttpRequest},va.prototype.i=function(){return{}},Kc=new va;function wn(c,d,m,y){this.j=c,this.i=d,this.l=m,this.R=y||1,this.U=new Us(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Pd}function Pd(){this.i=null,this.g="",this.h=!1}var kd={},Qc={};function Jc(c,d,m){c.L=1,c.v=Ia(Xt(d)),c.m=m,c.P=!0,Nd(c,null)}function Nd(c,d){c.F=Date.now(),wa(c),c.A=Xt(c.v);var m=c.A,y=c.R;Array.isArray(y)||(y=[String(y)]),zd(m.i,"t",y),c.C=0,m=c.j.J,c.h=new Pd,c.g=hf(c.j,m?d:null,!c.m),0<c.O&&(c.M=new xw(g(c.Y,c,c.g),c.O)),d=c.U,m=c.g,y=c.ca;var C="readystatechange";Array.isArray(C)||(C&&(wd[0]=C.toString()),C=wd);for(var k=0;k<C.length;k++){var $=pd(m,C[k],y||d.handleEvent,!1,d.h||d);if(!$)break;d.g[$.key]=$}d=c.H?b(c.H):{},c.m?(c.u||(c.u="POST"),d["Content-Type"]="application/x-www-form-urlencoded",c.g.ea(c.A,c.u,c.m,d)):(c.u="GET",c.g.ea(c.A,c.u,null,d)),$s(),Aw(c.i,c.u,c.A,c.l,c.R,c.m)}wn.prototype.ca=function(c){c=c.target;const d=this.M;d&&Yt(c)==3?d.j():this.Y(c)},wn.prototype.Y=function(c){try{if(c==this.g)e:{const Ke=Yt(this.g);var d=this.g.Ba();const Vr=this.g.Z();if(!(3>Ke)&&(Ke!=3||this.g&&(this.h.h||this.g.oa()||Zd(this.g)))){this.J||Ke!=4||d==7||(d==8||0>=Vr?$s(3):$s(2)),Xc(this);var m=this.g.Z();this.X=m;t:if(Dd(this)){var y=Zd(this.g);c="";var C=y.length,k=Yt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){tr(this),qs(this);var $="";break t}this.h.i=new l.TextDecoder}for(d=0;d<C;d++)this.h.h=!0,c+=this.h.i.decode(y[d],{stream:!(k&&d==C-1)});y.length=0,this.h.g+=c,this.C=0,$=this.h.g}else $=this.g.oa();if(this.o=m==200,Tw(this.i,this.u,this.A,this.l,this.R,Ke,m),this.o){if(this.T&&!this.K){t:{if(this.g){var fe,Le=this.g;if((fe=Le.g?Le.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!N(fe)){var ue=fe;break t}}ue=null}if(m=ue)Or(this.i,this.l,m,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Yc(this,m);else{this.o=!1,this.s=3,nt(12),tr(this),qs(this);break e}}if(this.P){m=!0;let xt;for(;!this.J&&this.C<$.length;)if(xt=Cw(this,$),xt==Qc){Ke==4&&(this.s=4,nt(14),m=!1),Or(this.i,this.l,null,"[Incomplete Response]");break}else if(xt==kd){this.s=4,nt(15),Or(this.i,this.l,$,"[Invalid Chunk]"),m=!1;break}else Or(this.i,this.l,xt,null),Yc(this,xt);if(Dd(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ke!=4||$.length!=0||this.h.h||(this.s=1,nt(16),m=!1),this.o=this.o&&m,!m)Or(this.i,this.l,$,"[Invalid Chunked Response]"),tr(this),qs(this);else if(0<$.length&&!this.W){this.W=!0;var Ge=this.j;Ge.g==this&&Ge.ba&&!Ge.M&&(Ge.j.info("Great, no buffering proxy detected. Bytes received: "+$.length),sl(Ge),Ge.M=!0,nt(11))}}else Or(this.i,this.l,$,null),Yc(this,$);Ke==4&&tr(this),this.o&&!this.J&&(Ke==4?of(this.j,this):(this.o=!1,wa(this)))}else zw(this.g),m==400&&0<$.indexOf("Unknown SID")?(this.s=3,nt(12)):(this.s=0,nt(13)),tr(this),qs(this)}}}catch{}finally{}};function Dd(c){return c.g?c.u=="GET"&&c.L!=2&&c.j.Ca:!1}function Cw(c,d){var m=c.C,y=d.indexOf(`
`,m);return y==-1?Qc:(m=Number(d.substring(m,y)),isNaN(m)?kd:(y+=1,y+m>d.length?Qc:(d=d.slice(y,y+m),c.C=y+m,d)))}wn.prototype.cancel=function(){this.J=!0,tr(this)};function wa(c){c.S=Date.now()+c.I,Od(c,c.I)}function Od(c,d){if(c.B!=null)throw Error("WatchDog timer not null");c.B=js(g(c.ba,c),d)}function Xc(c){c.B&&(l.clearTimeout(c.B),c.B=null)}wn.prototype.ba=function(){this.B=null;const c=Date.now();0<=c-this.S?(Sw(this.i,this.A),this.L!=2&&($s(),nt(17)),tr(this),this.s=2,qs(this)):Od(this,this.S-c)};function qs(c){c.j.G==0||c.J||of(c.j,c)}function tr(c){Xc(c);var d=c.M;d&&typeof d.ma=="function"&&d.ma(),c.M=null,xd(c.U),c.g&&(d=c.g,c.g=null,d.abort(),d.ma())}function Yc(c,d){try{var m=c.j;if(m.G!=0&&(m.g==c||Zc(m.h,c))){if(!c.K&&Zc(m.h,c)&&m.G==3){try{var y=m.Da.g.parse(d)}catch{y=null}if(Array.isArray(y)&&y.length==3){var C=y;if(C[0]==0){e:if(!m.u){if(m.g)if(m.g.F+3e3<c.F)Pa(m),Ra(m);else break e;rl(m),nt(18)}}else m.za=C[1],0<m.za-m.T&&37500>C[2]&&m.F&&m.v==0&&!m.C&&(m.C=js(g(m.Za,m),6e3));if(1>=Vd(m.h)&&m.ca){try{m.ca()}catch{}m.ca=void 0}}else rr(m,11)}else if((c.K||m.g==c)&&Pa(m),!N(d))for(C=m.Da.g.parse(d),d=0;d<C.length;d++){let ue=C[d];if(m.T=ue[0],ue=ue[1],m.G==2)if(ue[0]=="c"){m.K=ue[1],m.ia=ue[2];const Ge=ue[3];Ge!=null&&(m.la=Ge,m.j.info("VER="+m.la));const Ke=ue[4];Ke!=null&&(m.Aa=Ke,m.j.info("SVER="+m.Aa));const Vr=ue[5];Vr!=null&&typeof Vr=="number"&&0<Vr&&(y=1.5*Vr,m.L=y,m.j.info("backChannelRequestTimeoutMs_="+y)),y=m;const xt=c.g;if(xt){const Na=xt.g?xt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Na){var k=y.h;k.g||Na.indexOf("spdy")==-1&&Na.indexOf("quic")==-1&&Na.indexOf("h2")==-1||(k.j=k.l,k.g=new Set,k.h&&(el(k,k.h),k.h=null))}if(y.D){const il=xt.g?xt.g.getResponseHeader("X-HTTP-Session-Id"):null;il&&(y.ya=il,pe(y.I,y.D,il))}}m.G=3,m.l&&m.l.ua(),m.ba&&(m.R=Date.now()-c.F,m.j.info("Handshake RTT: "+m.R+"ms")),y=m;var $=c;if(y.qa=uf(y,y.J?y.ia:null,y.W),$.K){Ud(y.h,$);var fe=$,Le=y.L;Le&&(fe.I=Le),fe.B&&(Xc(fe),wa(fe)),y.g=$}else sf(y);0<m.i.length&&Ca(m)}else ue[0]!="stop"&&ue[0]!="close"||rr(m,7);else m.G==3&&(ue[0]=="stop"||ue[0]=="close"?ue[0]=="stop"?rr(m,7):nl(m):ue[0]!="noop"&&m.l&&m.l.ta(ue),m.v=0)}}$s(4)}catch{}}var Pw=class{constructor(c,d){this.g=c,this.map=d}};function Md(c){this.l=c||10,l.PerformanceNavigationTiming?(c=l.performance.getEntriesByType("navigation"),c=0<c.length&&(c[0].nextHopProtocol=="hq"||c[0].nextHopProtocol=="h2")):c=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=c?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ld(c){return c.h?!0:c.g?c.g.size>=c.j:!1}function Vd(c){return c.h?1:c.g?c.g.size:0}function Zc(c,d){return c.h?c.h==d:c.g?c.g.has(d):!1}function el(c,d){c.g?c.g.add(d):c.h=d}function Ud(c,d){c.h&&c.h==d?c.h=null:c.g&&c.g.has(d)&&c.g.delete(d)}Md.prototype.cancel=function(){if(this.i=Fd(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const c of this.g.values())c.cancel();this.g.clear()}};function Fd(c){if(c.h!=null)return c.i.concat(c.h.D);if(c.g!=null&&c.g.size!==0){let d=c.i;for(const m of c.g.values())d=d.concat(m.D);return d}return A(c.i)}function kw(c){if(c.V&&typeof c.V=="function")return c.V();if(typeof Map<"u"&&c instanceof Map||typeof Set<"u"&&c instanceof Set)return Array.from(c.values());if(typeof c=="string")return c.split("");if(u(c)){for(var d=[],m=c.length,y=0;y<m;y++)d.push(c[y]);return d}d=[],m=0;for(y in c)d[m++]=c[y];return d}function Nw(c){if(c.na&&typeof c.na=="function")return c.na();if(!c.V||typeof c.V!="function"){if(typeof Map<"u"&&c instanceof Map)return Array.from(c.keys());if(!(typeof Set<"u"&&c instanceof Set)){if(u(c)||typeof c=="string"){var d=[];c=c.length;for(var m=0;m<c;m++)d.push(m);return d}d=[],m=0;for(const y in c)d[m++]=y;return d}}}function $d(c,d){if(c.forEach&&typeof c.forEach=="function")c.forEach(d,void 0);else if(u(c)||typeof c=="string")Array.prototype.forEach.call(c,d,void 0);else for(var m=Nw(c),y=kw(c),C=y.length,k=0;k<C;k++)d.call(void 0,y[k],m&&m[k],c)}var jd=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Dw(c,d){if(c){c=c.split("&");for(var m=0;m<c.length;m++){var y=c[m].indexOf("="),C=null;if(0<=y){var k=c[m].substring(0,y);C=c[m].substring(y+1)}else k=c[m];d(k,C?decodeURIComponent(C.replace(/\+/g," ")):"")}}}function nr(c){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,c instanceof nr){this.h=c.h,xa(this,c.j),this.o=c.o,this.g=c.g,Ea(this,c.s),this.l=c.l;var d=c.i,m=new zs;m.i=d.i,d.g&&(m.g=new Map(d.g),m.h=d.h),Bd(this,m),this.m=c.m}else c&&(d=String(c).match(jd))?(this.h=!1,xa(this,d[1]||"",!0),this.o=Hs(d[2]||""),this.g=Hs(d[3]||"",!0),Ea(this,d[4]),this.l=Hs(d[5]||"",!0),Bd(this,d[6]||"",!0),this.m=Hs(d[7]||"")):(this.h=!1,this.i=new zs(null,this.h))}nr.prototype.toString=function(){var c=[],d=this.j;d&&c.push(Ws(d,qd,!0),":");var m=this.g;return(m||d=="file")&&(c.push("//"),(d=this.o)&&c.push(Ws(d,qd,!0),"@"),c.push(encodeURIComponent(String(m)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),m=this.s,m!=null&&c.push(":",String(m))),(m=this.l)&&(this.g&&m.charAt(0)!="/"&&c.push("/"),c.push(Ws(m,m.charAt(0)=="/"?Lw:Mw,!0))),(m=this.i.toString())&&c.push("?",m),(m=this.m)&&c.push("#",Ws(m,Uw)),c.join("")};function Xt(c){return new nr(c)}function xa(c,d,m){c.j=m?Hs(d,!0):d,c.j&&(c.j=c.j.replace(/:$/,""))}function Ea(c,d){if(d){if(d=Number(d),isNaN(d)||0>d)throw Error("Bad port number "+d);c.s=d}else c.s=null}function Bd(c,d,m){d instanceof zs?(c.i=d,Fw(c.i,c.h)):(m||(d=Ws(d,Vw)),c.i=new zs(d,c.h))}function pe(c,d,m){c.i.set(d,m)}function Ia(c){return pe(c,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),c}function Hs(c,d){return c?d?decodeURI(c.replace(/%25/g,"%2525")):decodeURIComponent(c):""}function Ws(c,d,m){return typeof c=="string"?(c=encodeURI(c).replace(d,Ow),m&&(c=c.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c):null}function Ow(c){return c=c.charCodeAt(0),"%"+(c>>4&15).toString(16)+(c&15).toString(16)}var qd=/[#\/\?@]/g,Mw=/[#\?:]/g,Lw=/[#\?]/g,Vw=/[#\?@]/g,Uw=/#/g;function zs(c,d){this.h=this.g=null,this.i=c||null,this.j=!!d}function xn(c){c.g||(c.g=new Map,c.h=0,c.i&&Dw(c.i,function(d,m){c.add(decodeURIComponent(d.replace(/\+/g," ")),m)}))}n=zs.prototype,n.add=function(c,d){xn(this),this.i=null,c=Mr(this,c);var m=this.g.get(c);return m||this.g.set(c,m=[]),m.push(d),this.h+=1,this};function Hd(c,d){xn(c),d=Mr(c,d),c.g.has(d)&&(c.i=null,c.h-=c.g.get(d).length,c.g.delete(d))}function Wd(c,d){return xn(c),d=Mr(c,d),c.g.has(d)}n.forEach=function(c,d){xn(this),this.g.forEach(function(m,y){m.forEach(function(C){c.call(d,C,y,this)},this)},this)},n.na=function(){xn(this);const c=Array.from(this.g.values()),d=Array.from(this.g.keys()),m=[];for(let y=0;y<d.length;y++){const C=c[y];for(let k=0;k<C.length;k++)m.push(d[y])}return m},n.V=function(c){xn(this);let d=[];if(typeof c=="string")Wd(this,c)&&(d=d.concat(this.g.get(Mr(this,c))));else{c=Array.from(this.g.values());for(let m=0;m<c.length;m++)d=d.concat(c[m])}return d},n.set=function(c,d){return xn(this),this.i=null,c=Mr(this,c),Wd(this,c)&&(this.h-=this.g.get(c).length),this.g.set(c,[d]),this.h+=1,this},n.get=function(c,d){return c?(c=this.V(c),0<c.length?String(c[0]):d):d};function zd(c,d,m){Hd(c,d),0<m.length&&(c.i=null,c.g.set(Mr(c,d),A(m)),c.h+=m.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const c=[],d=Array.from(this.g.keys());for(var m=0;m<d.length;m++){var y=d[m];const k=encodeURIComponent(String(y)),$=this.V(y);for(y=0;y<$.length;y++){var C=k;$[y]!==""&&(C+="="+encodeURIComponent(String($[y]))),c.push(C)}}return this.i=c.join("&")};function Mr(c,d){return d=String(d),c.j&&(d=d.toLowerCase()),d}function Fw(c,d){d&&!c.j&&(xn(c),c.i=null,c.g.forEach(function(m,y){var C=y.toLowerCase();y!=C&&(Hd(this,y),zd(this,C,m))},c)),c.j=d}function $w(c,d){const m=new Bs;if(l.Image){const y=new Image;y.onload=_(En,m,"TestLoadImage: loaded",!0,d,y),y.onerror=_(En,m,"TestLoadImage: error",!1,d,y),y.onabort=_(En,m,"TestLoadImage: abort",!1,d,y),y.ontimeout=_(En,m,"TestLoadImage: timeout",!1,d,y),l.setTimeout(function(){y.ontimeout&&y.ontimeout()},1e4),y.src=c}else d(!1)}function jw(c,d){const m=new Bs,y=new AbortController,C=setTimeout(()=>{y.abort(),En(m,"TestPingServer: timeout",!1,d)},1e4);fetch(c,{signal:y.signal}).then(k=>{clearTimeout(C),k.ok?En(m,"TestPingServer: ok",!0,d):En(m,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(C),En(m,"TestPingServer: error",!1,d)})}function En(c,d,m,y,C){try{C&&(C.onload=null,C.onerror=null,C.onabort=null,C.ontimeout=null),y(m)}catch{}}function Bw(){this.g=new Iw}function qw(c,d,m){const y=m||"";try{$d(c,function(C,k){let $=C;h(C)&&($=Hc(C)),d.push(y+k+"="+encodeURIComponent($))})}catch(C){throw d.push(y+"type="+encodeURIComponent("_badmap")),C}}function Aa(c){this.l=c.Ub||null,this.j=c.eb||!1}T(Aa,Wc),Aa.prototype.g=function(){return new Ta(this.l,this.j)},Aa.prototype.i=(function(c){return function(){return c}})({});function Ta(c,d){ze.call(this),this.D=c,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}T(Ta,ze),n=Ta.prototype,n.open=function(c,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=c,this.A=d,this.readyState=1,Ks(this)},n.send=function(c){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const d={headers:this.u,method:this.B,credentials:this.m,cache:void 0};c&&(d.body=c),(this.D||l).fetch(new Request(this.A,d)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Gs(this)),this.readyState=0},n.Sa=function(c){if(this.g&&(this.l=c,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=c.headers,this.readyState=2,Ks(this)),this.g&&(this.readyState=3,Ks(this),this.g)))if(this.responseType==="arraybuffer")c.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in c){if(this.j=c.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Gd(this)}else c.text().then(this.Ra.bind(this),this.ga.bind(this))};function Gd(c){c.j.read().then(c.Pa.bind(c)).catch(c.ga.bind(c))}n.Pa=function(c){if(this.g){if(this.o&&c.value)this.response.push(c.value);else if(!this.o){var d=c.value?c.value:new Uint8Array(0);(d=this.v.decode(d,{stream:!c.done}))&&(this.response=this.responseText+=d)}c.done?Gs(this):Ks(this),this.readyState==3&&Gd(this)}},n.Ra=function(c){this.g&&(this.response=this.responseText=c,Gs(this))},n.Qa=function(c){this.g&&(this.response=c,Gs(this))},n.ga=function(){this.g&&Gs(this)};function Gs(c){c.readyState=4,c.l=null,c.j=null,c.v=null,Ks(c)}n.setRequestHeader=function(c,d){this.u.append(c,d)},n.getResponseHeader=function(c){return this.h&&this.h.get(c.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const c=[],d=this.h.entries();for(var m=d.next();!m.done;)m=m.value,c.push(m[0]+": "+m[1]),m=d.next();return c.join(`\r
`)};function Ks(c){c.onreadystatechange&&c.onreadystatechange.call(c)}Object.defineProperty(Ta.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(c){this.m=c?"include":"same-origin"}});function Kd(c){let d="";return W(c,function(m,y){d+=y,d+=":",d+=m,d+=`\r
`}),d}function tl(c,d,m){e:{for(y in m){var y=!1;break e}y=!0}y||(m=Kd(m),typeof c=="string"?m!=null&&encodeURIComponent(String(m)):pe(c,d,m))}function ye(c){ze.call(this),this.headers=new Map,this.o=c||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}T(ye,ze);var Hw=/^https?$/i,Ww=["POST","PUT"];n=ye.prototype,n.Ha=function(c){this.J=c},n.ea=function(c,d,m,y){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+c);d=d?d.toUpperCase():"GET",this.D=c,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Kc.g(),this.v=this.o?Ed(this.o):Ed(Kc),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(d,String(c),!0),this.B=!1}catch(k){Qd(this,k);return}if(c=m||"",m=new Map(this.headers),y)if(Object.getPrototypeOf(y)===Object.prototype)for(var C in y)m.set(C,y[C]);else if(typeof y.keys=="function"&&typeof y.get=="function")for(const k of y.keys())m.set(k,y.get(k));else throw Error("Unknown input type for opt_headers: "+String(y));y=Array.from(m.keys()).find(k=>k.toLowerCase()=="content-type"),C=l.FormData&&c instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Ww,d,void 0))||y||C||m.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[k,$]of m)this.g.setRequestHeader(k,$);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Yd(this),this.u=!0,this.g.send(c),this.u=!1}catch(k){Qd(this,k)}};function Qd(c,d){c.h=!1,c.g&&(c.j=!0,c.g.abort(),c.j=!1),c.l=d,c.m=5,Jd(c),Sa(c)}function Jd(c){c.A||(c.A=!0,tt(c,"complete"),tt(c,"error"))}n.abort=function(c){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=c||7,tt(this,"complete"),tt(this,"abort"),Sa(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Sa(this,!0)),ye.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Xd(this):this.bb())},n.bb=function(){Xd(this)};function Xd(c){if(c.h&&typeof a<"u"&&(!c.v[1]||Yt(c)!=4||c.Z()!=2)){if(c.u&&Yt(c)==4)bd(c.Ea,0,c);else if(tt(c,"readystatechange"),Yt(c)==4){c.h=!1;try{const $=c.Z();e:switch($){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var m;if(!(m=d)){var y;if(y=$===0){var C=String(c.D).match(jd)[1]||null;!C&&l.self&&l.self.location&&(C=l.self.location.protocol.slice(0,-1)),y=!Hw.test(C?C.toLowerCase():"")}m=y}if(m)tt(c,"complete"),tt(c,"success");else{c.m=6;try{var k=2<Yt(c)?c.g.statusText:""}catch{k=""}c.l=k+" ["+c.Z()+"]",Jd(c)}}finally{Sa(c)}}}}function Sa(c,d){if(c.g){Yd(c);const m=c.g,y=c.v[0]?()=>{}:null;c.g=null,c.v=null,d||tt(c,"ready");try{m.onreadystatechange=y}catch{}}}function Yd(c){c.I&&(l.clearTimeout(c.I),c.I=null)}n.isActive=function(){return!!this.g};function Yt(c){return c.g?c.g.readyState:0}n.Z=function(){try{return 2<Yt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(c){if(this.g){var d=this.g.responseText;return c&&d.indexOf(c)==0&&(d=d.substring(c.length)),Ew(d)}};function Zd(c){try{if(!c.g)return null;if("response"in c.g)return c.g.response;switch(c.H){case"":case"text":return c.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in c.g)return c.g.mozResponseArrayBuffer}return null}catch{return null}}function zw(c){const d={};c=(c.g&&2<=Yt(c)&&c.g.getAllResponseHeaders()||"").split(`\r
`);for(let y=0;y<c.length;y++){if(N(c[y]))continue;var m=I(c[y]);const C=m[0];if(m=m[1],typeof m!="string")continue;m=m.trim();const k=d[C]||[];d[C]=k,k.push(m)}x(d,function(y){return y.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Qs(c,d,m){return m&&m.internalChannelParams&&m.internalChannelParams[c]||d}function ef(c){this.Aa=0,this.i=[],this.j=new Bs,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Qs("failFast",!1,c),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Qs("baseRetryDelayMs",5e3,c),this.cb=Qs("retryDelaySeedMs",1e4,c),this.Wa=Qs("forwardChannelMaxRetries",2,c),this.wa=Qs("forwardChannelRequestTimeoutMs",2e4,c),this.pa=c&&c.xmlHttpFactory||void 0,this.Xa=c&&c.Tb||void 0,this.Ca=c&&c.useFetchStreams||!1,this.L=void 0,this.J=c&&c.supportsCrossDomainXhr||!1,this.K="",this.h=new Md(c&&c.concurrentRequestLimit),this.Da=new Bw,this.P=c&&c.fastHandshake||!1,this.O=c&&c.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=c&&c.Rb||!1,c&&c.xa&&this.j.xa(),c&&c.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&c&&c.detectBufferingProxy||!1,this.ja=void 0,c&&c.longPollingTimeout&&0<c.longPollingTimeout&&(this.ja=c.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=ef.prototype,n.la=8,n.G=1,n.connect=function(c,d,m,y){nt(0),this.W=c,this.H=d||{},m&&y!==void 0&&(this.H.OSID=m,this.H.OAID=y),this.F=this.X,this.I=uf(this,null,this.W),Ca(this)};function nl(c){if(tf(c),c.G==3){var d=c.U++,m=Xt(c.I);if(pe(m,"SID",c.K),pe(m,"RID",d),pe(m,"TYPE","terminate"),Js(c,m),d=new wn(c,c.j,d),d.L=2,d.v=Ia(Xt(m)),m=!1,l.navigator&&l.navigator.sendBeacon)try{m=l.navigator.sendBeacon(d.v.toString(),"")}catch{}!m&&l.Image&&(new Image().src=d.v,m=!0),m||(d.g=hf(d.j,null),d.g.ea(d.v)),d.F=Date.now(),wa(d)}lf(c)}function Ra(c){c.g&&(sl(c),c.g.cancel(),c.g=null)}function tf(c){Ra(c),c.u&&(l.clearTimeout(c.u),c.u=null),Pa(c),c.h.cancel(),c.s&&(typeof c.s=="number"&&l.clearTimeout(c.s),c.s=null)}function Ca(c){if(!Ld(c.h)&&!c.s){c.s=!0;var d=c.Ga;Ms||md(),Ls||(Ms(),Ls=!0),Lc.add(d,c),c.B=0}}function Gw(c,d){return Vd(c.h)>=c.h.j-(c.s?1:0)?!1:c.s?(c.i=d.D.concat(c.i),!0):c.G==1||c.G==2||c.B>=(c.Va?0:c.Wa)?!1:(c.s=js(g(c.Ga,c,d),cf(c,c.B)),c.B++,!0)}n.Ga=function(c){if(this.s)if(this.s=null,this.G==1){if(!c){this.U=Math.floor(1e5*Math.random()),c=this.U++;const C=new wn(this,this.j,c);let k=this.o;if(this.S&&(k?(k=b(k),E(k,this.S)):k=this.S),this.m!==null||this.O||(C.H=k,k=null),this.P)e:{for(var d=0,m=0;m<this.i.length;m++){t:{var y=this.i[m];if("__data__"in y.map&&(y=y.map.__data__,typeof y=="string")){y=y.length;break t}y=void 0}if(y===void 0)break;if(d+=y,4096<d){d=m;break e}if(d===4096||m===this.i.length-1){d=m+1;break e}}d=1e3}else d=1e3;d=rf(this,C,d),m=Xt(this.I),pe(m,"RID",c),pe(m,"CVER",22),this.D&&pe(m,"X-HTTP-Session-Id",this.D),Js(this,m),k&&(this.O?d="headers="+encodeURIComponent(String(Kd(k)))+"&"+d:this.m&&tl(m,this.m,k)),el(this.h,C),this.Ua&&pe(m,"TYPE","init"),this.P?(pe(m,"$req",d),pe(m,"SID","null"),C.T=!0,Jc(C,m,null)):Jc(C,m,d),this.G=2}}else this.G==3&&(c?nf(this,c):this.i.length==0||Ld(this.h)||nf(this))};function nf(c,d){var m;d?m=d.l:m=c.U++;const y=Xt(c.I);pe(y,"SID",c.K),pe(y,"RID",m),pe(y,"AID",c.T),Js(c,y),c.m&&c.o&&tl(y,c.m,c.o),m=new wn(c,c.j,m,c.B+1),c.m===null&&(m.H=c.o),d&&(c.i=d.D.concat(c.i)),d=rf(c,m,1e3),m.I=Math.round(.5*c.wa)+Math.round(.5*c.wa*Math.random()),el(c.h,m),Jc(m,y,d)}function Js(c,d){c.H&&W(c.H,function(m,y){pe(d,y,m)}),c.l&&$d({},function(m,y){pe(d,y,m)})}function rf(c,d,m){m=Math.min(c.i.length,m);var y=c.l?g(c.l.Na,c.l,c):null;e:{var C=c.i;let k=-1;for(;;){const $=["count="+m];k==-1?0<m?(k=C[0].g,$.push("ofs="+k)):k=0:$.push("ofs="+k);let fe=!0;for(let Le=0;Le<m;Le++){let ue=C[Le].g;const Ge=C[Le].map;if(ue-=k,0>ue)k=Math.max(0,C[Le].g-100),fe=!1;else try{qw(Ge,$,"req"+ue+"_")}catch{y&&y(Ge)}}if(fe){y=$.join("&");break e}}}return c=c.i.splice(0,m),d.D=c,y}function sf(c){if(!c.g&&!c.u){c.Y=1;var d=c.Fa;Ms||md(),Ls||(Ms(),Ls=!0),Lc.add(d,c),c.v=0}}function rl(c){return c.g||c.u||3<=c.v?!1:(c.Y++,c.u=js(g(c.Fa,c),cf(c,c.v)),c.v++,!0)}n.Fa=function(){if(this.u=null,af(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var c=2*this.R;this.j.info("BP detection timer enabled: "+c),this.A=js(g(this.ab,this),c)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,nt(10),Ra(this),af(this))};function sl(c){c.A!=null&&(l.clearTimeout(c.A),c.A=null)}function af(c){c.g=new wn(c,c.j,"rpc",c.Y),c.m===null&&(c.g.H=c.o),c.g.O=0;var d=Xt(c.qa);pe(d,"RID","rpc"),pe(d,"SID",c.K),pe(d,"AID",c.T),pe(d,"CI",c.F?"0":"1"),!c.F&&c.ja&&pe(d,"TO",c.ja),pe(d,"TYPE","xmlhttp"),Js(c,d),c.m&&c.o&&tl(d,c.m,c.o),c.L&&(c.g.I=c.L);var m=c.g;c=c.ia,m.L=1,m.v=Ia(Xt(d)),m.m=null,m.P=!0,Nd(m,c)}n.Za=function(){this.C!=null&&(this.C=null,Ra(this),rl(this),nt(19))};function Pa(c){c.C!=null&&(l.clearTimeout(c.C),c.C=null)}function of(c,d){var m=null;if(c.g==d){Pa(c),sl(c),c.g=null;var y=2}else if(Zc(c.h,d))m=d.D,Ud(c.h,d),y=1;else return;if(c.G!=0){if(d.o)if(y==1){m=d.m?d.m.length:0,d=Date.now()-d.F;var C=c.B;y=_a(),tt(y,new Rd(y,m)),Ca(c)}else sf(c);else if(C=d.s,C==3||C==0&&0<d.X||!(y==1&&Gw(c,d)||y==2&&rl(c)))switch(m&&0<m.length&&(d=c.h,d.i=d.i.concat(m)),C){case 1:rr(c,5);break;case 4:rr(c,10);break;case 3:rr(c,6);break;default:rr(c,2)}}}function cf(c,d){let m=c.Ta+Math.floor(Math.random()*c.cb);return c.isActive()||(m*=2),m*d}function rr(c,d){if(c.j.info("Error code "+d),d==2){var m=g(c.fb,c),y=c.Xa;const C=!y;y=new nr(y||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||xa(y,"https"),Ia(y),C?$w(y.toString(),m):jw(y.toString(),m)}else nt(2);c.G=0,c.l&&c.l.sa(d),lf(c),tf(c)}n.fb=function(c){c?(this.j.info("Successfully pinged google.com"),nt(2)):(this.j.info("Failed to ping google.com"),nt(1))};function lf(c){if(c.G=0,c.ka=[],c.l){const d=Fd(c.h);(d.length!=0||c.i.length!=0)&&(S(c.ka,d),S(c.ka,c.i),c.h.i.length=0,A(c.i),c.i.length=0),c.l.ra()}}function uf(c,d,m){var y=m instanceof nr?Xt(m):new nr(m);if(y.g!="")d&&(y.g=d+"."+y.g),Ea(y,y.s);else{var C=l.location;y=C.protocol,d=d?d+"."+C.hostname:C.hostname,C=+C.port;var k=new nr(null);y&&xa(k,y),d&&(k.g=d),C&&Ea(k,C),m&&(k.l=m),y=k}return m=c.D,d=c.ya,m&&d&&pe(y,m,d),pe(y,"VER",c.la),Js(c,y),y}function hf(c,d,m){if(d&&!c.J)throw Error("Can't create secondary domain capable XhrIo object.");return d=c.Ca&&!c.pa?new ye(new Aa({eb:m})):new ye(c.pa),d.Ha(c.J),d}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function df(){}n=df.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function ka(){}ka.prototype.g=function(c,d){return new lt(c,d)};function lt(c,d){ze.call(this),this.g=new ef(d),this.l=c,this.h=d&&d.messageUrlParams||null,c=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(c?c["X-Client-Protocol"]="webchannel":c={"X-Client-Protocol":"webchannel"}),this.g.o=c,c=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(c?c["X-WebChannel-Content-Type"]=d.messageContentType:c={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.va&&(c?c["X-WebChannel-Client-Profile"]=d.va:c={"X-WebChannel-Client-Profile":d.va}),this.g.S=c,(c=d&&d.Sb)&&!N(c)&&(this.g.m=c),this.v=d&&d.supportsCrossDomainXhr||!1,this.u=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!N(d)&&(this.g.D=d,c=this.h,c!==null&&d in c&&(c=this.h,d in c&&delete c[d])),this.j=new Lr(this)}T(lt,ze),lt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},lt.prototype.close=function(){nl(this.g)},lt.prototype.o=function(c){var d=this.g;if(typeof c=="string"){var m={};m.__data__=c,c=m}else this.u&&(m={},m.__data__=Hc(c),c=m);d.i.push(new Pw(d.Ya++,c)),d.G==3&&Ca(d)},lt.prototype.N=function(){this.g.l=null,delete this.j,nl(this.g),delete this.g,lt.aa.N.call(this)};function ff(c){zc.call(this),c.__headers__&&(this.headers=c.__headers__,this.statusCode=c.__status__,delete c.__headers__,delete c.__status__);var d=c.__sm__;if(d){e:{for(const m in d){c=m;break e}c=void 0}(this.i=c)&&(c=this.i,d=d!==null&&c in d?d[c]:void 0),this.data=d}else this.data=c}T(ff,zc);function mf(){Gc.call(this),this.status=1}T(mf,Gc);function Lr(c){this.g=c}T(Lr,df),Lr.prototype.ua=function(){tt(this.g,"a")},Lr.prototype.ta=function(c){tt(this.g,new ff(c))},Lr.prototype.sa=function(c){tt(this.g,new mf)},Lr.prototype.ra=function(){tt(this.g,"b")},ka.prototype.createWebChannel=ka.prototype.g,lt.prototype.send=lt.prototype.o,lt.prototype.open=lt.prototype.m,lt.prototype.close=lt.prototype.close,oy=function(){return new ka},ay=function(){return _a()},iy=er,Zl={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},ba.NO_ERROR=0,ba.TIMEOUT=8,ba.HTTP_ERROR=6,no=ba,Cd.COMPLETE="complete",sy=Cd,Id.EventType=Fs,Fs.OPEN="a",Fs.CLOSE="b",Fs.ERROR="c",Fs.MESSAGE="d",ze.prototype.listen=ze.prototype.K,ni=Id,ye.prototype.listenOnce=ye.prototype.L,ye.prototype.getLastError=ye.prototype.Ka,ye.prototype.getLastErrorCode=ye.prototype.Ba,ye.prototype.getStatus=ye.prototype.Z,ye.prototype.getResponseJson=ye.prototype.Oa,ye.prototype.getResponseText=ye.prototype.oa,ye.prototype.send=ye.prototype.ea,ye.prototype.setWithCredentials=ye.prototype.Ha,ry=ye}).apply(typeof Ma<"u"?Ma:typeof self<"u"?self:typeof window<"u"?window:{});const Gf="@firebase/firestore",Kf="4.9.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ye.UNAUTHENTICATED=new Ye(null),Ye.GOOGLE_CREDENTIALS=new Ye("google-credentials-uid"),Ye.FIRST_PARTY=new Ye("first-party-uid"),Ye.MOCK_USER=new Ye("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Cs="12.0.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vr=new rc("@firebase/firestore");function Gr(){return vr.logLevel}function B(n,...e){if(vr.logLevel<=ie.DEBUG){const t=e.map(qu);vr.debug(`Firestore (${Cs}): ${n}`,...t)}}function dn(n,...e){if(vr.logLevel<=ie.ERROR){const t=e.map(qu);vr.error(`Firestore (${Cs}): ${n}`,...t)}}function ys(n,...e){if(vr.logLevel<=ie.WARN){const t=e.map(qu);vr.warn(`Firestore (${Cs}): ${n}`,...t)}}function qu(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,cy(n,r,t)}function cy(n,e,t){let r=`FIRESTORE (${Cs}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw dn(r),new Error(r)}function de(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||cy(e,s,r)}function ee(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class j extends Mt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ly{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class wI{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Ye.UNAUTHENTICATED)))}shutdown(){}}class xI{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class EI{constructor(e){this.t=e,this.currentUser=Ye.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){de(this.o===void 0,42304);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let i=new Bt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Bt,e.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const u=i;e.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},l=u=>{B("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((u=>l(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(B("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Bt)}}),0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(B("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(de(typeof r.accessToken=="string",31837,{l:r}),new ly(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return de(e===null||typeof e=="string",2055,{h:e}),new Ye(e)}}class II{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Ye.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class AI{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new II(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(Ye.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Qf{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class TI{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,yt(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){de(this.o===void 0,3512);const r=i=>{i.error!=null&&B("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,B("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{B("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):B("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Qf(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(de(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Qf(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function SI(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hu{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=SI(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function ae(n,e){return n<e?-1:n>e?1:0}function eu(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return xl(s)===xl(i)?ae(s,i):xl(s)?1:-1}return ae(n.length,e.length)}const RI=55296,CI=57343;function xl(n){const e=n.charCodeAt(0);return e>=RI&&e<=CI}function _s(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jf="__name__";class Ut{constructor(e,t,r){t===void 0?t=0:t>e.length&&J(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&J(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Ut.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ut?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=Ut.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return ae(e.length,t.length)}static compareSegments(e,t){const r=Ut.isNumericId(e),s=Ut.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?Ut.extractNumericId(e).compare(Ut.extractNumericId(t)):eu(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Bn.fromString(e.substring(4,e.length-2))}}class me extends Ut{construct(e,t,r){return new me(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new j(O.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new me(t)}static emptyPath(){return new me([])}}const PI=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class je extends Ut{construct(e,t,r){return new je(e,t,r)}static isValidIdentifier(e){return PI.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),je.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Jf}static keyField(){return new je([Jf])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new j(O.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new j(O.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new j(O.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(i(),s++)}if(i(),a)throw new j(O.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new je(t)}static emptyPath(){return new je([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{constructor(e){this.path=e}static fromPath(e){return new q(me.fromString(e))}static fromName(e){return new q(me.fromString(e).popFirst(5))}static empty(){return new q(me.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&me.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return me.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new q(new me(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uy(n,e,t){if(!t)throw new j(O.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function kI(n,e,t,r){if(e===!0&&r===!0)throw new j(O.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Xf(n){if(!q.isDocumentKey(n))throw new j(O.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Yf(n){if(q.isDocumentKey(n))throw new j(O.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function hy(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function sc(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":J(12329,{type:typeof n})}function kt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new j(O.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=sc(n);throw new j(O.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function NI(n,e){if(e<=0)throw new j(O.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Se(n,e){const t={typeString:n};return e&&(t.value=e),t}function Yi(n,e){if(!hy(n))throw new j(O.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new j(O.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zf=-62135596800,em=1e6;class se{static now(){return se.fromMillis(Date.now())}static fromDate(e){return se.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*em);return new se(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new j(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new j(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Zf)throw new j(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new j(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/em}_compareTo(e){return this.seconds===e.seconds?ae(this.nanoseconds,e.nanoseconds):ae(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:se._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Yi(e,se._jsonSchema))return new se(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Zf;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}se._jsonSchemaVersion="firestore/timestamp/1.0",se._jsonSchema={type:Se("string",se._jsonSchemaVersion),seconds:Se("number"),nanoseconds:Se("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{static fromTimestamp(e){return new te(e)}static min(){return new te(new se(0,0))}static max(){return new te(new se(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pi=-1;function DI(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=te.fromTimestamp(r===1e9?new se(t+1,0):new se(t,r));return new Wn(s,q.empty(),e)}function OI(n){return new Wn(n.readTime,n.key,Pi)}class Wn{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Wn(te.min(),q.empty(),Pi)}static max(){return new Wn(te.max(),q.empty(),Pi)}}function MI(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=q.comparator(n.documentKey,e.documentKey),t!==0?t:ae(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LI="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class VI{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ps(n){if(n.code!==O.FAILED_PRECONDITION||n.message!==LI)throw n;B("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&J(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new M(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof M?t:M.resolve(t)}catch(t){return M.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):M.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):M.reject(t)}static resolve(e){return new M(((t,r)=>{t(e)}))}static reject(e){return new M(((t,r)=>{r(e)}))}static waitFor(e){return new M(((t,r)=>{let s=0,i=0,a=!1;e.forEach((l=>{++s,l.next((()=>{++i,a&&i===s&&t()}),(u=>r(u)))})),a=!0,i===s&&t()}))}static or(e){let t=M.resolve(!1);for(const r of e)t=t.next((s=>s?M.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new M(((r,s)=>{const i=e.length,a=new Array(i);let l=0;for(let u=0;u<i;u++){const h=u;t(e[h]).next((f=>{a[h]=f,++l,l===i&&r(a)}),(f=>s(f)))}}))}static doWhile(e,t){return new M(((r,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}}function UI(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function ks(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ic{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}ic.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wu=-1;function ac(n){return n==null}function So(n){return n===0&&1/n==-1/0}function FI(n){return typeof n=="number"&&Number.isInteger(n)&&!So(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dy="";function $I(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=tm(e)),e=jI(n.get(t),e);return tm(e)}function jI(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case dy:t+="";break;default:t+=i}}return t}function tm(n){return n+dy+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nm(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Xn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function BI(n,e){const t=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function fy(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(e,t){this.comparator=e,this.root=t||$e.EMPTY}insert(e,t){return new ge(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,$e.BLACK,null,null))}remove(e){return new ge(this.comparator,this.root.remove(e,this.comparator).copy(null,null,$e.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new La(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new La(this.root,e,this.comparator,!1)}getReverseIterator(){return new La(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new La(this.root,e,this.comparator,!0)}}class La{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class $e{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??$e.RED,this.left=s??$e.EMPTY,this.right=i??$e.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new $e(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return $e.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return $e.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,$e.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,$e.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw J(43730,{key:this.key,value:this.value});if(this.right.isRed())throw J(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw J(27949);return e+(this.isRed()?0:1)}}$e.EMPTY=null,$e.RED=!0,$e.BLACK=!1;$e.EMPTY=new class{constructor(){this.size=0}get key(){throw J(57766)}get value(){throw J(16141)}get color(){throw J(16727)}get left(){throw J(29726)}get right(){throw J(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new $e(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(e){this.comparator=e,this.data=new ge(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new rm(this.data.getIterator())}getIteratorFrom(e){return new rm(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof De)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new De(this.comparator);return t.data=e,t}}class rm{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(e){this.fields=e,e.sort(je.comparator)}static empty(){return new ft([])}unionWith(e){let t=new De(je.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new ft(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return _s(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class my extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new my("Invalid base64 string: "+i):i}})(e);return new Be(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i})(e);return new Be(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ae(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Be.EMPTY_BYTE_STRING=new Be("");const qI=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function zn(n){if(de(!!n,39018),typeof n=="string"){let e=0;const t=qI.exec(n);if(de(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:we(n.seconds),nanos:we(n.nanos)}}function we(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Gn(n){return typeof n=="string"?Be.fromBase64String(n):Be.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const py="server_timestamp",gy="__type__",yy="__previous_value__",_y="__local_write_time__";function oc(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[gy])==null?void 0:r.stringValue)===py}function cc(n){const e=n.mapValue.fields[yy];return oc(e)?cc(e):e}function ki(n){const e=zn(n.mapValue.fields[_y].timestampValue);return new se(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HI{constructor(e,t,r,s,i,a,l,u,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f}}const Ro="(default)";class Ni{constructor(e,t){this.projectId=e,this.database=t||Ro}static empty(){return new Ni("","")}get isDefaultDatabase(){return this.database===Ro}isEqual(e){return e instanceof Ni&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const by="__type__",WI="__max__",Va={mapValue:{}},vy="__vector__",Co="value";function Kn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?oc(n)?4:GI(n)?9007199254740991:zI(n)?10:11:J(28295,{value:n})}function Jt(n,e){if(n===e)return!0;const t=Kn(n);if(t!==Kn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ki(n).isEqual(ki(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=zn(s.timestampValue),l=zn(i.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(s,i){return Gn(s.bytesValue).isEqual(Gn(i.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(s,i){return we(s.geoPointValue.latitude)===we(i.geoPointValue.latitude)&&we(s.geoPointValue.longitude)===we(i.geoPointValue.longitude)})(n,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return we(s.integerValue)===we(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=we(s.doubleValue),l=we(i.doubleValue);return a===l?So(a)===So(l):isNaN(a)&&isNaN(l)}return!1})(n,e);case 9:return _s(n.arrayValue.values||[],e.arrayValue.values||[],Jt);case 10:case 11:return(function(s,i){const a=s.mapValue.fields||{},l=i.mapValue.fields||{};if(nm(a)!==nm(l))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(l[u]===void 0||!Jt(a[u],l[u])))return!1;return!0})(n,e);default:return J(52216,{left:n})}}function Di(n,e){return(n.values||[]).find((t=>Jt(t,e)))!==void 0}function bs(n,e){if(n===e)return 0;const t=Kn(n),r=Kn(e);if(t!==r)return ae(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ae(n.booleanValue,e.booleanValue);case 2:return(function(i,a){const l=we(i.integerValue||i.doubleValue),u=we(a.integerValue||a.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1})(n,e);case 3:return sm(n.timestampValue,e.timestampValue);case 4:return sm(ki(n),ki(e));case 5:return eu(n.stringValue,e.stringValue);case 6:return(function(i,a){const l=Gn(i),u=Gn(a);return l.compareTo(u)})(n.bytesValue,e.bytesValue);case 7:return(function(i,a){const l=i.split("/"),u=a.split("/");for(let h=0;h<l.length&&h<u.length;h++){const f=ae(l[h],u[h]);if(f!==0)return f}return ae(l.length,u.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,a){const l=ae(we(i.latitude),we(a.latitude));return l!==0?l:ae(we(i.longitude),we(a.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return im(n.arrayValue,e.arrayValue);case 10:return(function(i,a){var g,_,T,A;const l=i.fields||{},u=a.fields||{},h=(g=l[Co])==null?void 0:g.arrayValue,f=(_=u[Co])==null?void 0:_.arrayValue,p=ae(((T=h==null?void 0:h.values)==null?void 0:T.length)||0,((A=f==null?void 0:f.values)==null?void 0:A.length)||0);return p!==0?p:im(h,f)})(n.mapValue,e.mapValue);case 11:return(function(i,a){if(i===Va.mapValue&&a===Va.mapValue)return 0;if(i===Va.mapValue)return 1;if(a===Va.mapValue)return-1;const l=i.fields||{},u=Object.keys(l),h=a.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const g=eu(u[p],f[p]);if(g!==0)return g;const _=bs(l[u[p]],h[f[p]]);if(_!==0)return _}return ae(u.length,f.length)})(n.mapValue,e.mapValue);default:throw J(23264,{he:t})}}function sm(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ae(n,e);const t=zn(n),r=zn(e),s=ae(t.seconds,r.seconds);return s!==0?s:ae(t.nanos,r.nanos)}function im(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=bs(t[s],r[s]);if(i)return i}return ae(t.length,r.length)}function vs(n){return tu(n)}function tu(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=zn(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return Gn(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return q.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=tu(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of r)i?i=!1:s+=",",s+=`${a}:${tu(t.fields[a])}`;return s+"}"})(n.mapValue):J(61005,{value:n})}function ro(n){switch(Kn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=cc(n);return e?16+ro(e):16;case 5:return 2*n.stringValue.length;case 6:return Gn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+ro(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return Xn(r.fields,((i,a)=>{s+=i.length+ro(a)})),s})(n.mapValue);default:throw J(13486,{value:n})}}function Po(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function nu(n){return!!n&&"integerValue"in n}function zu(n){return!!n&&"arrayValue"in n}function am(n){return!!n&&"nullValue"in n}function om(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function so(n){return!!n&&"mapValue"in n}function zI(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[by])==null?void 0:r.stringValue)===vy}function _i(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Xn(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=_i(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=_i(n.arrayValue.values[t]);return e}return{...n}}function GI(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===WI}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(e){this.value=e}static empty(){return new ot({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!so(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=_i(t)}setAll(e){let t=je.emptyPath(),r={},s=[];e.forEach(((a,l)=>{if(!t.isImmediateParentOf(l)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=l.popLast()}a?r[l.lastSegment()]=_i(a):s.push(l.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());so(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Jt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];so(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Xn(t,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new ot(_i(this.value))}}function wy(n){const e=[];return Xn(n.fields,((t,r)=>{const s=new je([t]);if(so(r)){const i=wy(r.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)})),new ft(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(e,t,r,s,i,a,l){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=a,this.documentState=l}static newInvalidDocument(e){return new Ze(e,0,te.min(),te.min(),te.min(),ot.empty(),0)}static newFoundDocument(e,t,r,s){return new Ze(e,1,t,te.min(),r,s,0)}static newNoDocument(e,t){return new Ze(e,2,t,te.min(),te.min(),ot.empty(),0)}static newUnknownDocument(e,t){return new Ze(e,3,t,te.min(),te.min(),ot.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(te.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ot.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ot.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=te.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ze&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ze(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(e,t){this.position=e,this.inclusive=t}}function cm(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],a=n.position[s];if(i.field.isKeyField()?r=q.comparator(q.fromName(a.referenceValue),t.key):r=bs(a,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function lm(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Jt(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi{constructor(e,t="asc"){this.field=e,this.dir=t}}function KI(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xy{}class Te extends xy{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new JI(e,t,r):t==="array-contains"?new ZI(e,r):t==="in"?new eA(e,r):t==="not-in"?new tA(e,r):t==="array-contains-any"?new nA(e,r):new Te(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new XI(e,r):new YI(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(bs(t,this.value)):t!==null&&Kn(this.value)===Kn(t)&&this.matchesComparison(bs(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return J(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Nt extends xy{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new Nt(e,t)}matches(e){return Ey(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Ey(n){return n.op==="and"}function Iy(n){return QI(n)&&Ey(n)}function QI(n){for(const e of n.filters)if(e instanceof Nt)return!1;return!0}function ru(n){if(n instanceof Te)return n.field.canonicalString()+n.op.toString()+vs(n.value);if(Iy(n))return n.filters.map((e=>ru(e))).join(",");{const e=n.filters.map((t=>ru(t))).join(",");return`${n.op}(${e})`}}function Ay(n,e){return n instanceof Te?(function(r,s){return s instanceof Te&&r.op===s.op&&r.field.isEqual(s.field)&&Jt(r.value,s.value)})(n,e):n instanceof Nt?(function(r,s){return s instanceof Nt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,a,l)=>i&&Ay(a,s.filters[l])),!0):!1})(n,e):void J(19439)}function Ty(n){return n instanceof Te?(function(t){return`${t.field.canonicalString()} ${t.op} ${vs(t.value)}`})(n):n instanceof Nt?(function(t){return t.op.toString()+" {"+t.getFilters().map(Ty).join(" ,")+"}"})(n):"Filter"}class JI extends Te{constructor(e,t,r){super(e,t,r),this.key=q.fromName(r.referenceValue)}matches(e){const t=q.comparator(e.key,this.key);return this.matchesComparison(t)}}class XI extends Te{constructor(e,t){super(e,"in",t),this.keys=Sy("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class YI extends Te{constructor(e,t){super(e,"not-in",t),this.keys=Sy("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Sy(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map((r=>q.fromName(r.referenceValue)))}class ZI extends Te{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return zu(t)&&Di(t.arrayValue,this.value)}}class eA extends Te{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Di(this.value.arrayValue,t)}}class tA extends Te{constructor(e,t){super(e,"not-in",t)}matches(e){if(Di(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Di(this.value.arrayValue,t)}}class nA extends Te{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!zu(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>Di(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rA{constructor(e,t=null,r=[],s=[],i=null,a=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=a,this.endAt=l,this.Te=null}}function um(n,e=null,t=[],r=[],s=null,i=null,a=null){return new rA(n,e,t,r,s,i,a)}function Gu(n){const e=ee(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>ru(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),ac(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>vs(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>vs(r))).join(",")),e.Te=t}return e.Te}function Ku(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!KI(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Ay(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!lm(n.startAt,e.startAt)&&lm(n.endAt,e.endAt)}function su(n){return q.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr{constructor(e,t=null,r=[],s=[],i=null,a="F",l=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=a,this.startAt=l,this.endAt=u,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function sA(n,e,t,r,s,i,a,l){return new Cr(n,e,t,r,s,i,a,l)}function Qu(n){return new Cr(n)}function hm(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Ju(n){return n.collectionGroup!==null}function ss(n){const e=ee(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new De(je.comparator);return a.filters.forEach((u=>{u.getFlattenedFilters().forEach((h=>{h.isInequality()&&(l=l.add(h.field))}))})),l})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new Oi(i,r))})),t.has(je.keyField().canonicalString())||e.Ie.push(new Oi(je.keyField(),r))}return e.Ie}function qt(n){const e=ee(n);return e.Ee||(e.Ee=Ry(e,ss(n))),e.Ee}function iA(n){const e=ee(n);return e.de||(e.de=Ry(e,n.explicitOrderBy)),e.de}function Ry(n,e){if(n.limitType==="F")return um(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Oi(s.field,i)}));const t=n.endAt?new ws(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new ws(n.startAt.position,n.startAt.inclusive):null;return um(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function iu(n,e){const t=n.filters.concat([e]);return new Cr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function ko(n,e,t){return new Cr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function lc(n,e){return Ku(qt(n),qt(e))&&n.limitType===e.limitType}function Cy(n){return`${Gu(qt(n))}|lt:${n.limitType}`}function Kr(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>Ty(s))).join(", ")}]`),ac(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>vs(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>vs(s))).join(",")),`Target(${r})`})(qt(n))}; limitType=${n.limitType})`}function uc(n,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):q.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(const i of ss(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(a,l,u){const h=cm(a,l,u);return a.inclusive?h<=0:h<0})(r.startAt,ss(r),s)||r.endAt&&!(function(a,l,u){const h=cm(a,l,u);return a.inclusive?h>=0:h>0})(r.endAt,ss(r),s))})(n,e)}function aA(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Py(n){return(e,t)=>{let r=!1;for(const s of ss(n)){const i=oA(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function oA(n,e,t){const r=n.field.isKeyField()?q.comparator(e.key,t.key):(function(i,a,l){const u=a.data.field(i),h=l.data.field(i);return u!==null&&h!==null?bs(u,h):J(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return J(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Xn(this.inner,((t,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return fy(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cA=new ge(q.comparator);function fn(){return cA}const ky=new ge(q.comparator);function ri(...n){let e=ky;for(const t of n)e=e.insert(t.key,t);return e}function Ny(n){let e=ky;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function lr(){return bi()}function Dy(){return bi()}function bi(){return new Pr((n=>n.toString()),((n,e)=>n.isEqual(e)))}const lA=new ge(q.comparator),uA=new De(q.comparator);function oe(...n){let e=uA;for(const t of n)e=e.add(t);return e}const hA=new De(ae);function dA(){return hA}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xu(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:So(e)?"-0":e}}function Oy(n){return{integerValue:""+n}}function My(n,e){return FI(e)?Oy(e):Xu(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(){this._=void 0}}function fA(n,e,t){return n instanceof Mi?(function(s,i){const a={fields:{[gy]:{stringValue:py},[_y]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&oc(i)&&(i=cc(i)),i&&(a.fields[yy]=i),{mapValue:a}})(t,e):n instanceof Li?Vy(n,e):n instanceof Vi?Uy(n,e):(function(s,i){const a=Ly(s,i),l=dm(a)+dm(s.Ae);return nu(a)&&nu(s.Ae)?Oy(l):Xu(s.serializer,l)})(n,e)}function mA(n,e,t){return n instanceof Li?Vy(n,e):n instanceof Vi?Uy(n,e):t}function Ly(n,e){return n instanceof Ui?(function(r){return nu(r)||(function(i){return!!i&&"doubleValue"in i})(r)})(e)?e:{integerValue:0}:null}class Mi extends hc{}class Li extends hc{constructor(e){super(),this.elements=e}}function Vy(n,e){const t=Fy(e);for(const r of n.elements)t.some((s=>Jt(s,r)))||t.push(r);return{arrayValue:{values:t}}}class Vi extends hc{constructor(e){super(),this.elements=e}}function Uy(n,e){let t=Fy(e);for(const r of n.elements)t=t.filter((s=>!Jt(s,r)));return{arrayValue:{values:t}}}class Ui extends hc{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function dm(n){return we(n.integerValue||n.doubleValue)}function Fy(n){return zu(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $y{constructor(e,t){this.field=e,this.transform=t}}function pA(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof Li&&s instanceof Li||r instanceof Vi&&s instanceof Vi?_s(r.elements,s.elements,Jt):r instanceof Ui&&s instanceof Ui?Jt(r.Ae,s.Ae):r instanceof Mi&&s instanceof Mi})(n.transform,e.transform)}class gA{constructor(e,t){this.version=e,this.transformResults=t}}class Ct{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ct}static exists(e){return new Ct(void 0,e)}static updateTime(e){return new Ct(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function io(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class dc{}function jy(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new qy(n.key,Ct.none()):new Zi(n.key,n.data,Ct.none());{const t=n.data,r=ot.empty();let s=new De(je.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?r.delete(i):r.set(i,a),s=s.add(i)}return new Yn(n.key,r,new ft(s.toArray()),Ct.none())}}function yA(n,e,t){n instanceof Zi?(function(s,i,a){const l=s.value.clone(),u=mm(s.fieldTransforms,i,a.transformResults);l.setAll(u),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()})(n,e,t):n instanceof Yn?(function(s,i,a){if(!io(s.precondition,i))return void i.convertToUnknownDocument(a.version);const l=mm(s.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(By(s)),u.setAll(l),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()})(n,e,t):(function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,t)}function vi(n,e,t,r){return n instanceof Zi?(function(i,a,l,u){if(!io(i.precondition,a))return l;const h=i.value.clone(),f=pm(i.fieldTransforms,u,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null})(n,e,t,r):n instanceof Yn?(function(i,a,l,u){if(!io(i.precondition,a))return l;const h=pm(i.fieldTransforms,u,a),f=a.data;return f.setAll(By(i)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((p=>p.field)))})(n,e,t,r):(function(i,a,l){return io(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l})(n,e,t)}function _A(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=Ly(r.transform,s||null);i!=null&&(t===null&&(t=ot.empty()),t.set(r.field,i))}return t||null}function fm(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&_s(r,s,((i,a)=>pA(i,a)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Zi extends dc{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Yn extends dc{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function By(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function mm(n,e,t){const r=new Map;de(n.length===t.length,32656,{Re:t.length,Ve:n.length});for(let s=0;s<t.length;s++){const i=n[s],a=i.transform,l=e.data.field(i.field);r.set(i.field,mA(a,l,t[s]))}return r}function pm(n,e,t){const r=new Map;for(const s of n){const i=s.transform,a=t.data.field(s.field);r.set(s.field,fA(i,a,e))}return r}class qy extends dc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class bA extends dc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vA{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&yA(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=vi(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=vi(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Dy();return this.mutations.forEach((s=>{const i=e.get(s.key),a=i.overlayedDocument;let l=this.applyToLocalView(a,i.mutatedFields);l=t.has(s.key)?null:l;const u=jy(a,l);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument(te.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),oe())}isEqual(e){return this.batchId===e.batchId&&_s(this.mutations,e.mutations,((t,r)=>fm(t,r)))&&_s(this.baseMutations,e.baseMutations,((t,r)=>fm(t,r)))}}class Yu{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){de(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=(function(){return lA})();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,r[a].version);return new Yu(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wA{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xA{constructor(e,t,r){this.alias=e,this.aggregateType=t,this.fieldPath=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EA{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ie,le;function IA(n){switch(n){case O.OK:return J(64938);case O.CANCELLED:case O.UNKNOWN:case O.DEADLINE_EXCEEDED:case O.RESOURCE_EXHAUSTED:case O.INTERNAL:case O.UNAVAILABLE:case O.UNAUTHENTICATED:return!1;case O.INVALID_ARGUMENT:case O.NOT_FOUND:case O.ALREADY_EXISTS:case O.PERMISSION_DENIED:case O.FAILED_PRECONDITION:case O.ABORTED:case O.OUT_OF_RANGE:case O.UNIMPLEMENTED:case O.DATA_LOSS:return!0;default:return J(15467,{code:n})}}function Hy(n){if(n===void 0)return dn("GRPC error has no .code"),O.UNKNOWN;switch(n){case Ie.OK:return O.OK;case Ie.CANCELLED:return O.CANCELLED;case Ie.UNKNOWN:return O.UNKNOWN;case Ie.DEADLINE_EXCEEDED:return O.DEADLINE_EXCEEDED;case Ie.RESOURCE_EXHAUSTED:return O.RESOURCE_EXHAUSTED;case Ie.INTERNAL:return O.INTERNAL;case Ie.UNAVAILABLE:return O.UNAVAILABLE;case Ie.UNAUTHENTICATED:return O.UNAUTHENTICATED;case Ie.INVALID_ARGUMENT:return O.INVALID_ARGUMENT;case Ie.NOT_FOUND:return O.NOT_FOUND;case Ie.ALREADY_EXISTS:return O.ALREADY_EXISTS;case Ie.PERMISSION_DENIED:return O.PERMISSION_DENIED;case Ie.FAILED_PRECONDITION:return O.FAILED_PRECONDITION;case Ie.ABORTED:return O.ABORTED;case Ie.OUT_OF_RANGE:return O.OUT_OF_RANGE;case Ie.UNIMPLEMENTED:return O.UNIMPLEMENTED;case Ie.DATA_LOSS:return O.DATA_LOSS;default:return J(39323,{code:n})}}(le=Ie||(Ie={}))[le.OK=0]="OK",le[le.CANCELLED=1]="CANCELLED",le[le.UNKNOWN=2]="UNKNOWN",le[le.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",le[le.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",le[le.NOT_FOUND=5]="NOT_FOUND",le[le.ALREADY_EXISTS=6]="ALREADY_EXISTS",le[le.PERMISSION_DENIED=7]="PERMISSION_DENIED",le[le.UNAUTHENTICATED=16]="UNAUTHENTICATED",le[le.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",le[le.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",le[le.ABORTED=10]="ABORTED",le[le.OUT_OF_RANGE=11]="OUT_OF_RANGE",le[le.UNIMPLEMENTED=12]="UNIMPLEMENTED",le[le.INTERNAL=13]="INTERNAL",le[le.UNAVAILABLE=14]="UNAVAILABLE",le[le.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AA(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TA=new Bn([4294967295,4294967295],0);function gm(n){const e=AA().encode(n),t=new ny;return t.update(e),new Uint8Array(t.digest())}function ym(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Bn([t,r],0),new Bn([s,i],0)]}class Zu{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new si(`Invalid padding: ${t}`);if(r<0)throw new si(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new si(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new si(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Bn.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(Bn.fromNumber(r)));return s.compare(TA)===1&&(s=new Bn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=gm(e),[r,s]=ym(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);if(!this.we(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Zu(i,s,t);return r.forEach((l=>a.insert(l))),a}insert(e){if(this.ge===0)return;const t=gm(e),[r,s]=ym(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(r,s,i);this.Se(a)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class si extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fc{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,ea.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new fc(te.min(),s,new ge(ae),fn(),oe())}}class ea{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new ea(r,t,oe(),oe(),oe())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ao{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class Wy{constructor(e,t){this.targetId=e,this.Ce=t}}class zy{constructor(e,t,r=Be.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class _m{constructor(){this.ve=0,this.Fe=bm(),this.Me=Be.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=oe(),t=oe(),r=oe();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:J(38017,{changeType:i})}})),new ea(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=bm()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,de(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class SA{constructor(e){this.Ge=e,this.ze=new Map,this.je=fn(),this.Je=Ua(),this.He=Ua(),this.Ye=new ge(ae)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:J(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((r,s)=>{this.rt(s)&&t(s)}))}st(e){const t=e.targetId,r=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(su(i))if(r===0){const a=new q(i.path);this.et(t,a,Ze.newNoDocument(a,te.min()))}else de(r===1,20013,{expectedCount:r});else{const a=this._t(t);if(a!==r){const l=this.ut(e),u=l?this.ct(l,e,a):1;if(u!==0){this.it(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,h)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let a,l;try{a=Gn(r).toUint8Array()}catch(u){if(u instanceof my)return ys("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new Zu(a,s,i)}catch(u){return ys(u instanceof si?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.ge===0?null:l}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach((i=>{const a=this.Ge.ht(),l=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.et(t,i,null),s++)})),s}Tt(e){const t=new Map;this.ze.forEach(((i,a)=>{const l=this.ot(a);if(l){if(i.current&&su(l.target)){const u=new q(l.target.path);this.It(u).has(a)||this.Et(a,u)||this.et(a,u,Ze.newNoDocument(u,e))}i.Be&&(t.set(a,i.ke()),i.qe())}}));let r=oe();this.He.forEach(((i,a)=>{let l=!0;a.forEachWhile((u=>{const h=this.ot(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)})),l&&(r=r.add(i))})),this.je.forEach(((i,a)=>a.setReadTime(e)));const s=new fc(e,t,this.Ye,this.je,r);return this.je=fn(),this.Je=Ua(),this.He=Ua(),this.Ye=new ge(ae),s}Xe(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,t)?s.Qe(t,1):s.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new _m,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new De(ae),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new De(ae),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||B("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new _m),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Ua(){return new ge(q.comparator)}function bm(){return new ge(q.comparator)}const RA={asc:"ASCENDING",desc:"DESCENDING"},CA={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},PA={and:"AND",or:"OR"};class kA{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function au(n,e){return n.useProto3Json||ac(e)?e:{value:e}}function No(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Gy(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function NA(n,e){return No(n,e.toTimestamp())}function Ht(n){return de(!!n,49232),te.fromTimestamp((function(t){const r=zn(t);return new se(r.seconds,r.nanos)})(n))}function eh(n,e){return ou(n,e).canonicalString()}function ou(n,e){const t=(function(s){return new me(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function Ky(n){const e=me.fromString(n);return de(e_(e),10190,{key:e.toString()}),e}function cu(n,e){return eh(n.databaseId,e.path)}function El(n,e){const t=Ky(e);if(t.get(1)!==n.databaseId.projectId)throw new j(O.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new j(O.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new q(Jy(t))}function Qy(n,e){return eh(n.databaseId,e)}function DA(n){const e=Ky(n);return e.length===4?me.emptyPath():Jy(e)}function lu(n){return new me(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Jy(n){return de(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function vm(n,e,t){return{name:cu(n,e),fields:t.value.mapValue.fields}}function OA(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:J(39313,{state:h})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(de(f===void 0||typeof f=="string",58123),Be.fromBase64String(f||"")):(de(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Be.fromUint8Array(f||new Uint8Array))})(n,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&(function(h){const f=h.code===void 0?O.UNKNOWN:Hy(h.code);return new j(f,h.message||"")})(a);t=new zy(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=El(n,r.document.name),i=Ht(r.document.updateTime),a=r.document.createTime?Ht(r.document.createTime):te.min(),l=new ot({mapValue:{fields:r.document.fields}}),u=Ze.newFoundDocument(s,i,a,l),h=r.targetIds||[],f=r.removedTargetIds||[];t=new ao(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=El(n,r.document),i=r.readTime?Ht(r.readTime):te.min(),a=Ze.newNoDocument(s,i),l=r.removedTargetIds||[];t=new ao([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=El(n,r.document),i=r.removedTargetIds||[];t=new ao([],i,s,null)}else{if(!("filter"in e))return J(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,a=new EA(s,i),l=r.targetId;t=new Wy(l,a)}}return t}function MA(n,e){let t;if(e instanceof Zi)t={update:vm(n,e.key,e.value)};else if(e instanceof qy)t={delete:cu(n,e.key)};else if(e instanceof Yn)t={update:vm(n,e.key,e.data),updateMask:HA(e.fieldMask)};else{if(!(e instanceof bA))return J(16599,{Vt:e.type});t={verify:cu(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(i,a){const l=a.transform;if(l instanceof Mi)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Li)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Vi)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Ui)return{fieldPath:a.field.canonicalString(),increment:l.Ae};throw J(20930,{transform:a.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:NA(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:J(27497)})(n,e.precondition)),t}function LA(n,e){return n&&n.length>0?(de(e!==void 0,14353),n.map((t=>(function(s,i){let a=s.updateTime?Ht(s.updateTime):Ht(i);return a.isEqual(te.min())&&(a=Ht(i)),new gA(a,s.transformResults||[])})(t,e)))):[]}function VA(n,e){return{documents:[Qy(n,e.path)]}}function Xy(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Qy(n,s);const i=(function(h){if(h.length!==0)return Zy(Nt.create(h,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const a=(function(h){if(h.length!==0)return h.map((f=>(function(g){return{field:Sn(g.field),direction:jA(g.dir)}})(f)))})(e.orderBy);a&&(t.structuredQuery.orderBy=a);const l=au(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{ft:t,parent:s}}function UA(n,e,t,r){const{ft:s,parent:i}=Xy(n,e),a={},l=[];let u=0;return t.forEach((h=>{const f="aggregate_"+u++;a[f]=h.alias,h.aggregateType==="count"?l.push({alias:f,count:{}}):h.aggregateType==="avg"?l.push({alias:f,avg:{field:Sn(h.fieldPath)}}):h.aggregateType==="sum"&&l.push({alias:f,sum:{field:Sn(h.fieldPath)}})})),{request:{structuredAggregationQuery:{aggregations:l,structuredQuery:s.structuredQuery},parent:s.parent},gt:a,parent:i}}function FA(n){let e=DA(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){de(r===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=(function(p){const g=Yy(p);return g instanceof Nt&&Iy(g)?g.getFilters():[g]})(t.where));let a=[];t.orderBy&&(a=(function(p){return p.map((g=>(function(T){return new Oi(Qr(T.field),(function(S){switch(S){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(T.direction))})(g)))})(t.orderBy));let l=null;t.limit&&(l=(function(p){let g;return g=typeof p=="object"?p.value:p,ac(g)?null:g})(t.limit));let u=null;t.startAt&&(u=(function(p){const g=!!p.before,_=p.values||[];return new ws(_,g)})(t.startAt));let h=null;return t.endAt&&(h=(function(p){const g=!p.before,_=p.values||[];return new ws(_,g)})(t.endAt)),sA(e,s,a,i,l,"F",u,h)}function $A(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return J(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Yy(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Qr(t.unaryFilter.field);return Te.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Qr(t.unaryFilter.field);return Te.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Qr(t.unaryFilter.field);return Te.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Qr(t.unaryFilter.field);return Te.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return J(61313);default:return J(60726)}})(n):n.fieldFilter!==void 0?(function(t){return Te.create(Qr(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return J(58110);default:return J(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return Nt.create(t.compositeFilter.filters.map((r=>Yy(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return J(1026)}})(t.compositeFilter.op))})(n):J(30097,{filter:n})}function jA(n){return RA[n]}function BA(n){return CA[n]}function qA(n){return PA[n]}function Sn(n){return{fieldPath:n.canonicalString()}}function Qr(n){return je.fromServerFormat(n.fieldPath)}function Zy(n){return n instanceof Te?(function(t){if(t.op==="=="){if(om(t.value))return{unaryFilter:{field:Sn(t.field),op:"IS_NAN"}};if(am(t.value))return{unaryFilter:{field:Sn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(om(t.value))return{unaryFilter:{field:Sn(t.field),op:"IS_NOT_NAN"}};if(am(t.value))return{unaryFilter:{field:Sn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Sn(t.field),op:BA(t.op),value:t.value}}})(n):n instanceof Nt?(function(t){const r=t.getFilters().map((s=>Zy(s)));return r.length===1?r[0]:{compositeFilter:{op:qA(t.op),filters:r}}})(n):J(54877,{filter:n})}function HA(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function e_(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un{constructor(e,t,r,s,i=te.min(),a=te.min(),l=Be.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new Un(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Un(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Un(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Un(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WA{constructor(e){this.yt=e}}function zA(n){const e=FA({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ko(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GA{constructor(){this.Cn=new KA}addToCollectionParentIndex(e,t){return this.Cn.add(t),M.resolve()}getCollectionParents(e,t){return M.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return M.resolve()}deleteFieldIndex(e,t){return M.resolve()}deleteAllFieldIndexes(e){return M.resolve()}createTargetIndexes(e,t){return M.resolve()}getDocumentsMatchingTarget(e,t){return M.resolve(null)}getIndexType(e,t){return M.resolve(0)}getFieldIndexes(e,t){return M.resolve([])}getNextCollectionGroupToUpdate(e){return M.resolve(null)}getMinOffset(e,t){return M.resolve(Wn.min())}getMinOffsetFromCollectionGroup(e,t){return M.resolve(Wn.min())}updateCollectionGroup(e,t,r){return M.resolve()}updateIndexEntries(e,t){return M.resolve()}}class KA{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new De(me.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new De(me.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wm={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},t_=41943040;class it{static withCacheSize(e){return new it(e,it.DEFAULT_COLLECTION_PERCENTILE,it.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */it.DEFAULT_COLLECTION_PERCENTILE=10,it.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,it.DEFAULT=new it(t_,it.DEFAULT_COLLECTION_PERCENTILE,it.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),it.DISABLED=new it(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new xs(0)}static cr(){return new xs(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xm="LruGarbageCollector",QA=1048576;function Em([n,e],[t,r]){const s=ae(n,t);return s===0?ae(e,r):s}class JA{constructor(e){this.Ir=e,this.buffer=new De(Em),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Em(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class XA{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){B(xm,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){ks(t)?B(xm,"Ignoring IndexedDB error during garbage collection: ",t):await Ps(t)}await this.Vr(3e5)}))}}class YA{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return M.resolve(ic.ce);const r=new JA(t);return this.mr.forEachTarget(e,(s=>r.Ar(s.sequenceNumber))).next((()=>this.mr.pr(e,(s=>r.Ar(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.mr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(B("LruGarbageCollector","Garbage collection skipped; disabled"),M.resolve(wm)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(B("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),wm):this.yr(e,t)))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let r,s,i,a,l,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(B("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,a=Date.now(),this.nthSequenceNumber(e,s)))).next((p=>(r=p,l=Date.now(),this.removeTargets(e,r,t)))).next((p=>(i=p,u=Date.now(),this.removeOrphanedDocuments(e,r)))).next((p=>(h=Date.now(),Gr()<=ie.DEBUG&&B("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(l-a)+`ms
	Removed ${i} targets in `+(u-l)+`ms
	Removed ${p} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),M.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p}))))}}function ZA(n,e){return new YA(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eT{constructor(){this.changes=new Pr((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ze.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?M.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tT{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nT{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&vi(r.mutation,s,ft.empty(),se.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,oe()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=oe()){const s=lr();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let a=ri();return i.forEach(((l,u)=>{a=a.insert(l,u.overlayedDocument)})),a}))))}getOverlayedDocuments(e,t){const r=lr();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,oe())))}populateOverlays(e,t,r){const s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((a,l)=>{t.set(a,l)}))}))}computeViews(e,t,r,s){let i=fn();const a=bi(),l=(function(){return bi()})();return t.forEach(((u,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof Yn)?i=i.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),vi(f.mutation,h,f.mutation.getFieldMask(),se.now())):a.set(h.key,ft.empty())})),this.recalculateAndSaveOverlays(e,i).next((u=>(u.forEach(((h,f)=>a.set(h,f))),t.forEach(((h,f)=>l.set(h,new tT(f,a.get(h)??null)))),l)))}recalculateAndSaveOverlays(e,t){const r=bi();let s=new ge(((a,l)=>a-l)),i=oe();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((a=>{for(const l of a)l.keys().forEach((u=>{const h=t.get(u);if(h===null)return;let f=r.get(u)||ft.empty();f=l.applyToLocalView(h,f),r.set(u,f);const p=(s.get(l.batchId)||oe()).add(u);s=s.insert(l.batchId,p)}))})).next((()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),h=u.key,f=u.value,p=Dy();f.forEach((g=>{if(!i.has(g)){const _=jy(t.get(g),r.get(g));_!==null&&p.set(g,_),i=i.add(g)}})),a.push(this.documentOverlayCache.saveOverlays(e,h,p))}return M.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return(function(a){return q.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0})(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Ju(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):M.resolve(lr());let l=Pi,u=i;return a.next((h=>M.forEach(h,((f,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),i.get(f)?M.resolve():this.remoteDocumentCache.getEntry(e,f).next((g=>{u=u.insert(f,g)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,u,h,oe()))).next((f=>({batchId:l,changes:Ny(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new q(t)).next((r=>{let s=ri();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let a=ri();return this.indexManager.getCollectionParents(e,i).next((l=>M.forEach(l,(u=>{const h=(function(p,g){return new Cr(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next((f=>{f.forEach(((p,g)=>{a=a.insert(p,g)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((a=>{i.forEach(((u,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,Ze.newInvalidDocument(f)))}));let l=ri();return a.forEach(((u,h)=>{const f=i.get(u);f!==void 0&&vi(f.mutation,h,ft.empty(),se.now()),uc(t,h)&&(l=l.insert(u,h))})),l}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rT{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return M.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:Ht(s.createTime)}})(t)),M.resolve()}getNamedQuery(e,t){return M.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,(function(s){return{name:s.name,query:zA(s.bundledQuery),readTime:Ht(s.readTime)}})(t)),M.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sT{constructor(){this.overlays=new ge(q.comparator),this.qr=new Map}getOverlay(e,t){return M.resolve(this.overlays.get(t))}getOverlays(e,t){const r=lr();return M.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.St(e,t,i)})),M.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.qr.delete(r)),M.resolve()}getOverlaysForCollection(e,t,r){const s=lr(),i=t.length+1,a=new q(t.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const u=l.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return M.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new ge(((h,f)=>h-f));const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=i.get(h.largestBatchId);f===null&&(f=lr(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const l=lr(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((h,f)=>l.set(h,f))),!(l.size()>=s)););return M.resolve(l)}St(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new wA(t,r));let i=this.qr.get(t);i===void 0&&(i=oe(),this.qr.set(t,i)),this.qr.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iT{constructor(){this.sessionToken=Be.EMPTY_BYTE_STRING}getSessionToken(e){return M.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,M.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class th{constructor(){this.Qr=new De(Me.$r),this.Ur=new De(Me.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const r=new Me(e,t);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Gr(new Me(e,t))}zr(e,t){e.forEach((r=>this.removeReference(r,t)))}jr(e){const t=new q(new me([])),r=new Me(t,e),s=new Me(t,e+1),i=[];return this.Ur.forEachInRange([r,s],(a=>{this.Gr(a),i.push(a.key)})),i}Jr(){this.Qr.forEach((e=>this.Gr(e)))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new q(new me([])),r=new Me(t,e),s=new Me(t,e+1);let i=oe();return this.Ur.forEachInRange([r,s],(a=>{i=i.add(a.key)})),i}containsKey(e){const t=new Me(e,0),r=this.Qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Me{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return q.comparator(e.key,t.key)||ae(e.Yr,t.Yr)}static Kr(e,t){return ae(e.Yr,t.Yr)||q.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aT{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new De(Me.$r)}checkEmpty(e){return M.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new vA(i,t,r,s);this.mutationQueue.push(a);for(const l of s)this.Zr=this.Zr.add(new Me(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return M.resolve(a)}lookupMutationBatch(e,t){return M.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.ei(r),i=s<0?0:s;return M.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return M.resolve(this.mutationQueue.length===0?Wu:this.tr-1)}getAllMutationBatches(e){return M.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Me(t,0),s=new Me(t,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,s],(a=>{const l=this.Xr(a.Yr);i.push(l)})),M.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new De(ae);return t.forEach((s=>{const i=new Me(s,0),a=new Me(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,a],(l=>{r=r.add(l.Yr)}))})),M.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;q.isDocumentKey(i)||(i=i.child(""));const a=new Me(new q(i),0);let l=new De(ae);return this.Zr.forEachWhile((u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(l=l.add(u.Yr)),!0)}),a),M.resolve(this.ti(l))}ti(e){const t=[];return e.forEach((r=>{const s=this.Xr(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){de(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return M.forEach(t.mutations,(s=>{const i=new Me(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Zr=r}))}ir(e){}containsKey(e,t){const r=new Me(t,0),s=this.Zr.firstAfterOrEqual(r);return M.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,M.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oT{constructor(e){this.ri=e,this.docs=(function(){return new ge(q.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,a=this.ri(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return M.resolve(r?r.document.mutableCopy():Ze.newInvalidDocument(t))}getEntries(e,t){let r=fn();return t.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():Ze.newInvalidDocument(s))})),M.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=fn();const a=t.path,l=new q(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||MI(OI(f),r)<=0||(s.has(f.key)||uc(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return M.resolve(i)}getAllFromCollectionGroup(e,t,r,s){J(9500)}ii(e,t){return M.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new cT(this)}getSize(e){return M.resolve(this.size)}}class cT extends eT{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(r)})),M.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lT{constructor(e){this.persistence=e,this.si=new Pr((t=>Gu(t)),Ku),this.lastRemoteSnapshotVersion=te.min(),this.highestTargetId=0,this.oi=0,this._i=new th,this.targetCount=0,this.ai=xs.ur()}forEachTarget(e,t){return this.si.forEach(((r,s)=>t(s))),M.resolve()}getLastRemoteSnapshotVersion(e){return M.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return M.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),M.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.oi&&(this.oi=t),M.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new xs(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,M.resolve()}updateTargetData(e,t){return this.Pr(t),M.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,M.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.si.forEach(((a,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.si.delete(a),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)})),M.waitFor(i).next((()=>s))}getTargetCount(e){return M.resolve(this.targetCount)}getTargetData(e,t){const r=this.si.get(t)||null;return M.resolve(r)}addMatchingKeys(e,t,r){return this._i.Wr(t,r),M.resolve()}removeMatchingKeys(e,t,r){this._i.zr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((a=>{i.push(s.markPotentiallyOrphaned(e,a))})),M.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),M.resolve()}getMatchingKeysForTargetId(e,t){const r=this._i.Hr(t);return M.resolve(r)}containsKey(e,t){return M.resolve(this._i.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n_{constructor(e,t){this.ui={},this.overlays={},this.ci=new ic(0),this.li=!1,this.li=!0,this.hi=new iT,this.referenceDelegate=e(this),this.Pi=new lT(this),this.indexManager=new GA,this.remoteDocumentCache=(function(s){return new oT(s)})((r=>this.referenceDelegate.Ti(r))),this.serializer=new WA(t),this.Ii=new rT(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new sT,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ui[e.toKey()];return r||(r=new aT(t,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,r){B("MemoryPersistence","Starting transaction:",e);const s=new uT(this.ci.next());return this.referenceDelegate.Ei(),r(s).next((i=>this.referenceDelegate.di(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ai(e,t){return M.or(Object.values(this.ui).map((r=>()=>r.containsKey(e,t))))}}class uT extends VI{constructor(e){super(),this.currentSequenceNumber=e}}class nh{constructor(e){this.persistence=e,this.Ri=new th,this.Vi=null}static mi(e){return new nh(e)}get fi(){if(this.Vi)return this.Vi;throw J(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.fi.delete(r.toString()),M.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.fi.add(r.toString()),M.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),M.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach((s=>this.fi.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.fi.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return M.forEach(this.fi,(r=>{const s=q.fromPath(r);return this.gi(e,s).next((i=>{i||t.removeEntry(s,te.min())}))})).next((()=>(this.Vi=null,t.apply(e))))}updateLimboDocument(e,t){return this.gi(e,t).next((r=>{r?this.fi.delete(t.toString()):this.fi.add(t.toString())}))}Ti(e){return 0}gi(e,t){return M.or([()=>M.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class Do{constructor(e,t){this.persistence=e,this.pi=new Pr((r=>$I(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=ZA(this,t)}static mi(e,t){return new Do(e,t)}Ei(){}di(e){return M.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}wr(e){let t=0;return this.pr(e,(r=>{t++})).next((()=>t))}pr(e,t){return M.forEach(this.pi,((r,s)=>this.br(e,r,s).next((i=>i?M.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(e,(a=>this.br(e,a,t).next((l=>{l||(r++,i.removeEntry(a,te.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),M.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),M.resolve()}removeReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),M.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),M.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=ro(e.data.value)),t}br(e,t,r){return M.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.pi.get(t);return M.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rh{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Es=r,this.ds=s}static As(e,t){let r=oe(),s=oe();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new rh(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hT{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dT{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return tE()?8:UI(et())>0?6:4})()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.ys(e,t).next((a=>{i.result=a})).next((()=>{if(!i.result)return this.ws(e,t,s,r).next((a=>{i.result=a}))})).next((()=>{if(i.result)return;const a=new hT;return this.Ss(e,t,a).next((l=>{if(i.result=l,this.Vs)return this.bs(e,t,a,l.size)}))})).next((()=>i.result))}bs(e,t,r,s){return r.documentReadCount<this.fs?(Gr()<=ie.DEBUG&&B("QueryEngine","SDK will not create cache indexes for query:",Kr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),M.resolve()):(Gr()<=ie.DEBUG&&B("QueryEngine","Query:",Kr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(Gr()<=ie.DEBUG&&B("QueryEngine","The SDK decides to create cache indexes for query:",Kr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,qt(t))):M.resolve())}ys(e,t){if(hm(t))return M.resolve(null);let r=qt(t);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=ko(t,null,"F"),r=qt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((i=>{const a=oe(...i);return this.ps.getDocuments(e,a).next((l=>this.indexManager.getMinOffset(e,r).next((u=>{const h=this.Ds(t,l);return this.Cs(t,h,a,u.readTime)?this.ys(e,ko(t,null,"F")):this.vs(e,h,t,u)}))))})))))}ws(e,t,r,s){return hm(t)||s.isEqual(te.min())?M.resolve(null):this.ps.getDocuments(e,r).next((i=>{const a=this.Ds(t,i);return this.Cs(t,a,r,s)?M.resolve(null):(Gr()<=ie.DEBUG&&B("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Kr(t)),this.vs(e,a,t,DI(s,Pi)).next((l=>l)))}))}Ds(e,t){let r=new De(Py(e));return t.forEach(((s,i)=>{uc(e,i)&&(r=r.add(i))})),r}Cs(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(e,t,r){return Gr()<=ie.DEBUG&&B("QueryEngine","Using full collection scan to execute query:",Kr(t)),this.ps.getDocumentsMatchingQuery(e,t,Wn.min(),r)}vs(e,t,r,s){return this.ps.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((a=>{i=i.insert(a.key,a)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sh="LocalStore",fT=3e8;class mT{constructor(e,t,r,s){this.persistence=e,this.Fs=t,this.serializer=s,this.Ms=new ge(ae),this.xs=new Pr((i=>Gu(i)),Ku),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new nT(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Ms)))}}function pT(n,e,t,r){return new mT(n,e,t,r)}async function r_(n,e){const t=ee(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.Bs(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{const a=[],l=[];let u=oe();for(const h of s){a.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of i){l.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next((h=>({Ls:h,removedBatchIds:a,addedBatchIds:l})))}))}))}function gT(n,e){const t=ee(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),i=t.Ns.newChangeBuffer({trackRemovals:!0});return(function(l,u,h,f){const p=h.batch,g=p.keys();let _=M.resolve();return g.forEach((T=>{_=_.next((()=>f.getEntry(u,T))).next((A=>{const S=h.docVersions.get(T);de(S!==null,48541),A.version.compareTo(S)<0&&(p.applyToRemoteDocument(A,h),A.isValidDocument()&&(A.setReadTime(h.commitVersion),f.addEntry(A)))}))})),_.next((()=>l.mutationQueue.removeMutationBatch(u,p)))})(t,r,e,i).next((()=>i.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(l){let u=oe();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(u=u.add(l.batch.mutations[h].key));return u})(e)))).next((()=>t.localDocuments.getDocuments(r,s)))}))}function s_(n){const e=ee(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Pi.getLastRemoteSnapshotVersion(t)))}function yT(n,e){const t=ee(n),r=e.snapshotVersion;let s=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const a=t.Ns.newChangeBuffer({trackRemovals:!0});s=t.Ms;const l=[];e.targetChanges.forEach(((f,p)=>{const g=s.get(p);if(!g)return;l.push(t.Pi.removeMatchingKeys(i,f.removedDocuments,p).next((()=>t.Pi.addMatchingKeys(i,f.addedDocuments,p))));let _=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?_=_.withResumeToken(Be.EMPTY_BYTE_STRING,te.min()).withLastLimboFreeSnapshotVersion(te.min()):f.resumeToken.approximateByteSize()>0&&(_=_.withResumeToken(f.resumeToken,r)),s=s.insert(p,_),(function(A,S,U){return A.resumeToken.approximateByteSize()===0||S.snapshotVersion.toMicroseconds()-A.snapshotVersion.toMicroseconds()>=fT?!0:U.addedDocuments.size+U.modifiedDocuments.size+U.removedDocuments.size>0})(g,_,f)&&l.push(t.Pi.updateTargetData(i,_))}));let u=fn(),h=oe();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))})),l.push(_T(i,a,e.documentUpdates).next((f=>{u=f.ks,h=f.qs}))),!r.isEqual(te.min())){const f=t.Pi.getLastRemoteSnapshotVersion(i).next((p=>t.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r)));l.push(f)}return M.waitFor(l).next((()=>a.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,u,h))).next((()=>u))})).then((i=>(t.Ms=s,i)))}function _T(n,e,t){let r=oe(),s=oe();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let a=fn();return t.forEach(((l,u)=>{const h=i.get(l);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(l)),u.isNoDocument()&&u.version.isEqual(te.min())?(e.removeEntry(l,u.readTime),a=a.insert(l,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),a=a.insert(l,u)):B(sh,"Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",u.version)})),{ks:a,qs:s}}))}function bT(n,e){const t=ee(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=Wu),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function vT(n,e){const t=ee(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.Pi.getTargetData(r,e).next((i=>i?(s=i,M.resolve(s)):t.Pi.allocateTargetId(r).next((a=>(s=new Un(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Pi.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=t.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(r.targetId,r),t.xs.set(e,r.targetId)),r}))}async function uu(n,e,t){const r=ee(n),s=r.Ms.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!ks(a))throw a;B(sh,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Ms=r.Ms.remove(e),r.xs.delete(s.target)}function Im(n,e,t){const r=ee(n);let s=te.min(),i=oe();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(u,h,f){const p=ee(u),g=p.xs.get(f);return g!==void 0?M.resolve(p.Ms.get(g)):p.Pi.getTargetData(h,f)})(r,a,qt(e)).next((l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(a,l.targetId).next((u=>{i=u}))})).next((()=>r.Fs.getDocumentsMatchingQuery(a,e,t?s:te.min(),t?i:oe()))).next((l=>(wT(r,aA(e),l),{documents:l,Qs:i})))))}function wT(n,e,t){let r=n.Os.get(e)||te.min();t.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),n.Os.set(e,r)}class Am{constructor(){this.activeTargetIds=dA()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class xT{constructor(){this.Mo=new Am,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,r){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Am,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ET{Oo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tm="ConnectivityMonitor";class Sm{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){B(Tm,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){B(Tm,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fa=null;function hu(){return Fa===null?Fa=(function(){return 268435456+Math.round(2147483648*Math.random())})():Fa++,"0x"+Fa.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Il="RestConnection",IT={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class AT{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===Ro?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(e,t,r,s,i){const a=hu(),l=this.zo(e,t.toUriEncodedString());B(Il,`Sending RPC '${e}' ${a}:`,l,r);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(u,s,i);const{host:h}=new URL(l),f=Ss(h);return this.Jo(e,l,u,r,f).then((p=>(B(Il,`Received RPC '${e}' ${a}: `,p),p)),(p=>{throw ys(Il,`RPC '${e}' ${a} failed with error: `,p,"url: ",l,"request:",r),p}))}Ho(e,t,r,s,i,a){return this.Go(e,t,r,s,i)}jo(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Cs})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}zo(e,t){const r=IT[e];return`${this.Uo}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TT{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qe="WebChannelConnection";class ST extends AT{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,r,s,i){const a=hu();return new Promise(((l,u)=>{const h=new ry;h.setWithCredentials(!0),h.listenOnce(sy.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case no.NO_ERROR:const p=h.getResponseJson();B(Qe,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(p)),l(p);break;case no.TIMEOUT:B(Qe,`RPC '${e}' ${a} timed out`),u(new j(O.DEADLINE_EXCEEDED,"Request time out"));break;case no.HTTP_ERROR:const g=h.getStatus();if(B(Qe,`RPC '${e}' ${a} failed with status:`,g,"response text:",h.getResponseText()),g>0){let _=h.getResponseJson();Array.isArray(_)&&(_=_[0]);const T=_==null?void 0:_.error;if(T&&T.status&&T.message){const A=(function(U){const N=U.toLowerCase().replace(/_/g,"-");return Object.values(O).indexOf(N)>=0?N:O.UNKNOWN})(T.status);u(new j(A,T.message))}else u(new j(O.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new j(O.UNAVAILABLE,"Connection failed."));break;default:J(9055,{l_:e,streamId:a,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{B(Qe,`RPC '${e}' ${a} completed.`)}}));const f=JSON.stringify(s);B(Qe,`RPC '${e}' ${a} sending request:`,s),h.send(t,"POST",f,r,15)}))}T_(e,t,r){const s=hu(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=oy(),l=ay(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.jo(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const f=i.join("");B(Qe,`Creating RPC '${e}' stream ${s}: ${f}`,u);const p=a.createWebChannel(f,u);this.I_(p);let g=!1,_=!1;const T=new TT({Yo:S=>{_?B(Qe,`Not sending because RPC '${e}' stream ${s} is closed:`,S):(g||(B(Qe,`Opening RPC '${e}' stream ${s} transport.`),p.open(),g=!0),B(Qe,`RPC '${e}' stream ${s} sending:`,S),p.send(S))},Zo:()=>p.close()}),A=(S,U,N)=>{S.listen(U,(V=>{try{N(V)}catch(L){setTimeout((()=>{throw L}),0)}}))};return A(p,ni.EventType.OPEN,(()=>{_||(B(Qe,`RPC '${e}' stream ${s} transport opened.`),T.o_())})),A(p,ni.EventType.CLOSE,(()=>{_||(_=!0,B(Qe,`RPC '${e}' stream ${s} transport closed`),T.a_(),this.E_(p))})),A(p,ni.EventType.ERROR,(S=>{_||(_=!0,ys(Qe,`RPC '${e}' stream ${s} transport errored. Name:`,S.name,"Message:",S.message),T.a_(new j(O.UNAVAILABLE,"The operation could not be completed")))})),A(p,ni.EventType.MESSAGE,(S=>{var U;if(!_){const N=S.data[0];de(!!N,16349);const V=N,L=(V==null?void 0:V.error)||((U=V[0])==null?void 0:U.error);if(L){B(Qe,`RPC '${e}' stream ${s} received error:`,L);const z=L.status;let W=(function(v){const E=Ie[v];if(E!==void 0)return Hy(E)})(z),x=L.message;W===void 0&&(W=O.INTERNAL,x="Unknown error status: "+z+" with message "+L.message),_=!0,T.a_(new j(W,x)),p.close()}else B(Qe,`RPC '${e}' stream ${s} received:`,N),T.u_(N)}})),A(l,iy.STAT_EVENT,(S=>{S.stat===Zl.PROXY?B(Qe,`RPC '${e}' stream ${s} detected buffering proxy`):S.stat===Zl.NOPROXY&&B(Qe,`RPC '${e}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{T.__()}),0),T}terminate(){this.c_.forEach((e=>e.close())),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter((t=>t===e))}}function Al(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mc(n){return new kA(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i_{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=r,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-r);s>0&&B("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rm="PersistentStream";class a_{constructor(e,t,r,s,i,a,l,u){this.Mi=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new i_(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===O.RESOURCE_EXHAUSTED?(dn(t.toString()),dn("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===O.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.D_===t&&this.G_(r,s)}),(r=>{e((()=>{const s=new j(O.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)}))}))}G_(e,t){const r=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo((()=>{r((()=>this.listener.Xo()))})),this.stream.t_((()=>{r((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((s=>{r((()=>this.z_(s)))})),this.stream.onMessage((s=>{r((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return B(Rm,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget((()=>this.D_===e?t():(B(Rm,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class RT extends a_{constructor(e,t,r,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=OA(this.serializer,e),r=(function(i){if(!("targetChange"in i))return te.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?te.min():a.readTime?Ht(a.readTime):te.min()})(e);return this.listener.H_(t,r)}Y_(e){const t={};t.database=lu(this.serializer),t.addTarget=(function(i,a){let l;const u=a.target;if(l=su(u)?{documents:VA(i,u)}:{query:Xy(i,u).ft},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=Gy(i,a.resumeToken);const h=au(i,a.expectedCount);h!==null&&(l.expectedCount=h)}else if(a.snapshotVersion.compareTo(te.min())>0){l.readTime=No(i,a.snapshotVersion.toTimestamp());const h=au(i,a.expectedCount);h!==null&&(l.expectedCount=h)}return l})(this.serializer,e);const r=$A(this.serializer,e);r&&(t.labels=r),this.q_(t)}Z_(e){const t={};t.database=lu(this.serializer),t.removeTarget=e,this.q_(t)}}class CT extends a_{constructor(e,t,r,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return de(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,de(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){de(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=LA(e.writeResults,e.commitTime),r=Ht(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=lu(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>MA(this.serializer,r)))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PT{}class kT extends PT{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new j(O.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.Go(e,ou(t,r),s,i,a))).catch((i=>{throw i.name==="FirebaseError"?(i.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new j(O.UNKNOWN,i.toString())}))}Ho(e,t,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,l])=>this.connection.Ho(e,ou(t,r),s,a,l,i))).catch((a=>{throw a.name==="FirebaseError"?(a.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new j(O.UNKNOWN,a.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}class NT{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(dn(t),this.aa=!1):B("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wr="RemoteStore";class DT{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo((a=>{r.enqueueAndForget((async()=>{kr(this)&&(B(wr,"Restarting streams for network reachability change."),await(async function(u){const h=ee(u);h.Ea.add(4),await ta(h),h.Ra.set("Unknown"),h.Ea.delete(4),await pc(h)})(this))}))})),this.Ra=new NT(r,s)}}async function pc(n){if(kr(n))for(const e of n.da)await e(!0)}async function ta(n){for(const e of n.da)await e(!1)}function o_(n,e){const t=ee(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),ch(t)?oh(t):Ns(t).O_()&&ah(t,e))}function ih(n,e){const t=ee(n),r=Ns(t);t.Ia.delete(e),r.O_()&&c_(t,e),t.Ia.size===0&&(r.O_()?r.L_():kr(t)&&t.Ra.set("Unknown"))}function ah(n,e){if(n.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(te.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Ns(n).Y_(e)}function c_(n,e){n.Va.Ue(e),Ns(n).Z_(e)}function oh(n){n.Va=new SA({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),Ns(n).start(),n.Ra.ua()}function ch(n){return kr(n)&&!Ns(n).x_()&&n.Ia.size>0}function kr(n){return ee(n).Ea.size===0}function l_(n){n.Va=void 0}async function OT(n){n.Ra.set("Online")}async function MT(n){n.Ia.forEach(((e,t)=>{ah(n,e)}))}async function LT(n,e){l_(n),ch(n)?(n.Ra.ha(e),oh(n)):n.Ra.set("Unknown")}async function VT(n,e,t){if(n.Ra.set("Online"),e instanceof zy&&e.state===2&&e.cause)try{await(async function(s,i){const a=i.cause;for(const l of i.targetIds)s.Ia.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.Ia.delete(l),s.Va.removeTarget(l))})(n,e)}catch(r){B(wr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Oo(n,r)}else if(e instanceof ao?n.Va.Ze(e):e instanceof Wy?n.Va.st(e):n.Va.tt(e),!t.isEqual(te.min()))try{const r=await s_(n.localStore);t.compareTo(r)>=0&&await(function(i,a){const l=i.Va.Tt(a);return l.targetChanges.forEach(((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.Ia.get(h);f&&i.Ia.set(h,f.withResumeToken(u.resumeToken,a))}})),l.targetMismatches.forEach(((u,h)=>{const f=i.Ia.get(u);if(!f)return;i.Ia.set(u,f.withResumeToken(Be.EMPTY_BYTE_STRING,f.snapshotVersion)),c_(i,u);const p=new Un(f.target,u,h,f.sequenceNumber);ah(i,p)})),i.remoteSyncer.applyRemoteEvent(l)})(n,t)}catch(r){B(wr,"Failed to raise snapshot:",r),await Oo(n,r)}}async function Oo(n,e,t){if(!ks(e))throw e;n.Ea.add(1),await ta(n),n.Ra.set("Offline"),t||(t=()=>s_(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{B(wr,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await pc(n)}))}function u_(n,e){return e().catch((t=>Oo(n,t,e)))}async function gc(n){const e=ee(n),t=Qn(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Wu;for(;UT(e);)try{const s=await bT(e.localStore,r);if(s===null){e.Ta.length===0&&t.L_();break}r=s.batchId,FT(e,s)}catch(s){await Oo(e,s)}h_(e)&&d_(e)}function UT(n){return kr(n)&&n.Ta.length<10}function FT(n,e){n.Ta.push(e);const t=Qn(n);t.O_()&&t.X_&&t.ea(e.mutations)}function h_(n){return kr(n)&&!Qn(n).x_()&&n.Ta.length>0}function d_(n){Qn(n).start()}async function $T(n){Qn(n).ra()}async function jT(n){const e=Qn(n);for(const t of n.Ta)e.ea(t.mutations)}async function BT(n,e,t){const r=n.Ta.shift(),s=Yu.from(r,e,t);await u_(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await gc(n)}async function qT(n,e){e&&Qn(n).X_&&await(async function(r,s){if((function(a){return IA(a)&&a!==O.ABORTED})(s.code)){const i=r.Ta.shift();Qn(r).B_(),await u_(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await gc(r)}})(n,e),h_(n)&&d_(n)}async function Cm(n,e){const t=ee(n);t.asyncQueue.verifyOperationInProgress(),B(wr,"RemoteStore received new credentials");const r=kr(t);t.Ea.add(3),await ta(t),r&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await pc(t)}async function HT(n,e){const t=ee(n);e?(t.Ea.delete(2),await pc(t)):e||(t.Ea.add(2),await ta(t),t.Ra.set("Unknown"))}function Ns(n){return n.ma||(n.ma=(function(t,r,s){const i=ee(t);return i.sa(),new RT(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Xo:OT.bind(null,n),t_:MT.bind(null,n),r_:LT.bind(null,n),H_:VT.bind(null,n)}),n.da.push((async e=>{e?(n.ma.B_(),ch(n)?oh(n):n.Ra.set("Unknown")):(await n.ma.stop(),l_(n))}))),n.ma}function Qn(n){return n.fa||(n.fa=(function(t,r,s){const i=ee(t);return i.sa(),new CT(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:$T.bind(null,n),r_:qT.bind(null,n),ta:jT.bind(null,n),na:BT.bind(null,n)}),n.da.push((async e=>{e?(n.fa.B_(),await gc(n)):(await n.fa.stop(),n.Ta.length>0&&(B(wr,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lh{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Bt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const a=Date.now()+r,l=new lh(e,t,a,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new j(O.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function uh(n,e){if(dn("AsyncQueue",`${e}: ${n}`),ks(n))return new j(O.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{static emptySet(e){return new is(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||q.comparator(t.key,r.key):(t,r)=>q.comparator(t.key,r.key),this.keyedMap=ri(),this.sortedSet=new ge(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof is)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new is;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pm{constructor(){this.ga=new ge(q.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):J(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,r)=>{e.push(r)})),e}}class Es{constructor(e,t,r,s,i,a,l,u,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const a=[];return t.forEach((l=>{a.push({type:0,doc:l})})),new Es(e,t,is.emptySet(t),a,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&lc(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WT{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class zT{constructor(){this.queries=km(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const s=ee(t),i=s.queries;s.queries=km(),i.forEach(((a,l)=>{for(const u of l.Sa)u.onError(r)}))})(this,new j(O.ABORTED,"Firestore shutting down"))}}function km(){return new Pr((n=>Cy(n)),lc)}async function f_(n,e){const t=ee(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new WT,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const l=uh(a,`Initialization of query '${Kr(e.query)}' failed`);return void e.onError(l)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&hh(t)}async function m_(n,e){const t=ee(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const a=i.Sa.indexOf(e);a>=0&&(i.Sa.splice(a,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function GT(n,e){const t=ee(n);let r=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const l of a.Sa)l.Fa(s)&&(r=!0);a.wa=s}}r&&hh(t)}function KT(n,e,t){const r=ee(n),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);r.queries.delete(e)}function hh(n){n.Ca.forEach((e=>{e.next()}))}var du,Nm;(Nm=du||(du={})).Ma="default",Nm.Cache="cache";class p_{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Es(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Es.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==du.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g_{constructor(e){this.key=e}}class y_{constructor(e){this.key=e}}class QT{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=oe(),this.mutatedKeys=oe(),this.eu=Py(e),this.tu=new is(this.eu)}get nu(){return this.Ya}ru(e,t){const r=t?t.iu:new Pm,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,l=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((f,p)=>{const g=s.get(f),_=uc(this.query,p)?p:null,T=!!g&&this.mutatedKeys.has(g.key),A=!!_&&(_.hasLocalMutations||this.mutatedKeys.has(_.key)&&_.hasCommittedMutations);let S=!1;g&&_?g.data.isEqual(_.data)?T!==A&&(r.track({type:3,doc:_}),S=!0):this.su(g,_)||(r.track({type:2,doc:_}),S=!0,(u&&this.eu(_,u)>0||h&&this.eu(_,h)<0)&&(l=!0)):!g&&_?(r.track({type:0,doc:_}),S=!0):g&&!_&&(r.track({type:1,doc:g}),S=!0,(u||h)&&(l=!0)),S&&(_?(a=a.add(_),i=A?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{tu:a,iu:r,Cs:l,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort(((f,p)=>(function(_,T){const A=S=>{switch(S){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return J(20277,{Rt:S})}};return A(_)-A(T)})(f.type,p.type)||this.eu(f.doc,p.doc))),this.ou(r),s=s??!1;const l=t&&!s?this._u():[],u=this.Xa.size===0&&this.current&&!s?1:0,h=u!==this.Za;return this.Za=u,a.length!==0||h?{snapshot:new Es(this.query,e.tu,i,a,e.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Pm,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Ya=this.Ya.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Ya=this.Ya.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=oe(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))}));const t=[];return e.forEach((r=>{this.Xa.has(r)||t.push(new y_(r))})),this.Xa.forEach((r=>{e.has(r)||t.push(new g_(r))})),t}cu(e){this.Ya=e.Qs,this.Xa=oe();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Es.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const dh="SyncEngine";class JT{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class XT{constructor(e){this.key=e,this.hu=!1}}class YT{constructor(e,t,r,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new Pr((l=>Cy(l)),lc),this.Iu=new Map,this.Eu=new Set,this.du=new ge(q.comparator),this.Au=new Map,this.Ru=new th,this.Vu={},this.mu=new Map,this.fu=xs.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function ZT(n,e,t=!0){const r=E_(n);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await __(r,e,t,!0),s}async function eS(n,e){const t=E_(n);await __(t,e,!0,!1)}async function __(n,e,t,r){const s=await vT(n.localStore,qt(e)),i=s.targetId,a=n.sharedClientState.addLocalQueryTarget(i,t);let l;return r&&(l=await tS(n,e,i,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&o_(n.remoteStore,s),l}async function tS(n,e,t,r,s){n.pu=(p,g,_)=>(async function(A,S,U,N){let V=S.view.ru(U);V.Cs&&(V=await Im(A.localStore,S.query,!1).then((({documents:x})=>S.view.ru(x,V))));const L=N&&N.targetChanges.get(S.targetId),z=N&&N.targetMismatches.get(S.targetId)!=null,W=S.view.applyChanges(V,A.isPrimaryClient,L,z);return Om(A,S.targetId,W.au),W.snapshot})(n,p,g,_);const i=await Im(n.localStore,e,!0),a=new QT(e,i.Qs),l=a.ru(i.documents),u=ea.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=a.applyChanges(l,n.isPrimaryClient,u);Om(n,t,h.au);const f=new JT(e,t,a);return n.Tu.set(e,f),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),h.snapshot}async function nS(n,e,t){const r=ee(n),s=r.Tu.get(e),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter((a=>!lc(a,e)))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await uu(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&ih(r.remoteStore,s.targetId),fu(r,s.targetId)})).catch(Ps)):(fu(r,s.targetId),await uu(r.localStore,s.targetId,!0))}async function rS(n,e){const t=ee(n),r=t.Tu.get(e),s=t.Iu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),ih(t.remoteStore,r.targetId))}async function sS(n,e,t){const r=hS(n);try{const s=await(function(a,l){const u=ee(a),h=se.now(),f=l.reduce(((_,T)=>_.add(T.key)),oe());let p,g;return u.persistence.runTransaction("Locally write mutations","readwrite",(_=>{let T=fn(),A=oe();return u.Ns.getEntries(_,f).next((S=>{T=S,T.forEach(((U,N)=>{N.isValidDocument()||(A=A.add(U))}))})).next((()=>u.localDocuments.getOverlayedDocuments(_,T))).next((S=>{p=S;const U=[];for(const N of l){const V=_A(N,p.get(N.key).overlayedDocument);V!=null&&U.push(new Yn(N.key,V,wy(V.value.mapValue),Ct.exists(!0)))}return u.mutationQueue.addMutationBatch(_,h,U,l)})).next((S=>{g=S;const U=S.applyToLocalDocumentSet(p,A);return u.documentOverlayCache.saveOverlays(_,S.batchId,U)}))})).then((()=>({batchId:g.batchId,changes:Ny(p)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(a,l,u){let h=a.Vu[a.currentUser.toKey()];h||(h=new ge(ae)),h=h.insert(l,u),a.Vu[a.currentUser.toKey()]=h})(r,s.batchId,t),await na(r,s.changes),await gc(r.remoteStore)}catch(s){const i=uh(s,"Failed to persist write");t.reject(i)}}async function b_(n,e){const t=ee(n);try{const r=await yT(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const a=t.Au.get(i);a&&(de(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?de(a.hu,14607):s.removedDocuments.size>0&&(de(a.hu,42227),a.hu=!1))})),await na(t,r,e)}catch(r){await Ps(r)}}function Dm(n,e,t){const r=ee(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Tu.forEach(((i,a)=>{const l=a.view.va(e);l.snapshot&&s.push(l.snapshot)})),(function(a,l){const u=ee(a);u.onlineState=l;let h=!1;u.queries.forEach(((f,p)=>{for(const g of p.Sa)g.va(l)&&(h=!0)})),h&&hh(u)})(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function iS(n,e,t){const r=ee(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Au.get(e),i=s&&s.key;if(i){let a=new ge(q.comparator);a=a.insert(i,Ze.newNoDocument(i,te.min()));const l=oe().add(i),u=new fc(te.min(),new Map,new ge(ae),a,l);await b_(r,u),r.du=r.du.remove(i),r.Au.delete(e),fh(r)}else await uu(r.localStore,e,!1).then((()=>fu(r,e,t))).catch(Ps)}async function aS(n,e){const t=ee(n),r=e.batch.batchId;try{const s=await gT(t.localStore,e);w_(t,r,null),v_(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await na(t,s)}catch(s){await Ps(s)}}async function oS(n,e,t){const r=ee(n);try{const s=await(function(a,l){const u=ee(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return u.mutationQueue.lookupMutationBatch(h,l).next((p=>(de(p!==null,37113),f=p.keys(),u.mutationQueue.removeMutationBatch(h,p)))).next((()=>u.mutationQueue.performConsistencyCheck(h))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,l))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>u.localDocuments.getDocuments(h,f)))}))})(r.localStore,e);w_(r,e,t),v_(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await na(r,s)}catch(s){await Ps(s)}}function v_(n,e){(n.mu.get(e)||[]).forEach((t=>{t.resolve()})),n.mu.delete(e)}function w_(n,e,t){const r=ee(n);let s=r.Vu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Vu[r.currentUser.toKey()]=s}}function fu(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Iu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Iu.delete(e),n.isPrimaryClient&&n.Ru.jr(e).forEach((r=>{n.Ru.containsKey(r)||x_(n,r)}))}function x_(n,e){n.Eu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(ih(n.remoteStore,t),n.du=n.du.remove(e),n.Au.delete(t),fh(n))}function Om(n,e,t){for(const r of t)r instanceof g_?(n.Ru.addReference(r.key,e),cS(n,r)):r instanceof y_?(B(dh,"Document no longer in limbo: "+r.key),n.Ru.removeReference(r.key,e),n.Ru.containsKey(r.key)||x_(n,r.key)):J(19791,{wu:r})}function cS(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Eu.has(r)||(B(dh,"New document in limbo: "+t),n.Eu.add(r),fh(n))}function fh(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new q(me.fromString(e)),r=n.fu.next();n.Au.set(r,new XT(t)),n.du=n.du.insert(t,r),o_(n.remoteStore,new Un(qt(Qu(t.path)),r,"TargetPurposeLimboResolution",ic.ce))}}async function na(n,e,t){const r=ee(n),s=[],i=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach(((l,u)=>{a.push(r.pu(u,e,t).then((h=>{var f;if((h||t)&&r.isPrimaryClient){const p=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))==null?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(h){s.push(h);const p=rh.As(u.targetId,h);i.push(p)}})))})),await Promise.all(a),r.Pu.H_(s),await(async function(u,h){const f=ee(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>M.forEach(h,(g=>M.forEach(g.Es,(_=>f.persistence.referenceDelegate.addReference(p,g.targetId,_))).next((()=>M.forEach(g.ds,(_=>f.persistence.referenceDelegate.removeReference(p,g.targetId,_)))))))))}catch(p){if(!ks(p))throw p;B(sh,"Failed to update sequence numbers: "+p)}for(const p of h){const g=p.targetId;if(!p.fromCache){const _=f.Ms.get(g),T=_.snapshotVersion,A=_.withLastLimboFreeSnapshotVersion(T);f.Ms=f.Ms.insert(g,A)}}})(r.localStore,i))}async function lS(n,e){const t=ee(n);if(!t.currentUser.isEqual(e)){B(dh,"User change. New user:",e.toKey());const r=await r_(t.localStore,e);t.currentUser=e,(function(i,a){i.mu.forEach((l=>{l.forEach((u=>{u.reject(new j(O.CANCELLED,a))}))})),i.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await na(t,r.Ls)}}function uS(n,e){const t=ee(n),r=t.Au.get(e);if(r&&r.hu)return oe().add(r.key);{let s=oe();const i=t.Iu.get(e);if(!i)return s;for(const a of i){const l=t.Tu.get(a);s=s.unionWith(l.view.nu)}return s}}function E_(n){const e=ee(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=b_.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=uS.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=iS.bind(null,e),e.Pu.H_=GT.bind(null,e.eventManager),e.Pu.yu=KT.bind(null,e.eventManager),e}function hS(n){const e=ee(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=aS.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=oS.bind(null,e),e}class Mo{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=mc(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return pT(this.persistence,new dT,e.initialUser,this.serializer)}Cu(e){return new n_(nh.mi,this.serializer)}Du(e){return new xT}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Mo.provider={build:()=>new Mo};class dS extends Mo{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){de(this.persistence.referenceDelegate instanceof Do,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new XA(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?it.withCacheSize(this.cacheSizeBytes):it.DEFAULT;return new n_((r=>Do.mi(r,t)),this.serializer)}}class mu{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Dm(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=lS.bind(null,this.syncEngine),await HT(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new zT})()}createDatastore(e){const t=mc(e.databaseInfo.databaseId),r=(function(i){return new ST(i)})(e.databaseInfo);return(function(i,a,l,u){return new kT(i,a,l,u)})(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,a,l){return new DT(r,s,i,a,l)})(this.localStore,this.datastore,e.asyncQueue,(t=>Dm(this.syncEngine,t,0)),(function(){return Sm.v()?new Sm:new ET})())}createSyncEngine(e,t){return(function(s,i,a,l,u,h,f){const p=new YT(s,i,a,l,u,h);return f&&(p.gu=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(s){const i=ee(s);B(wr,"RemoteStore shutting down."),i.Ea.add(5),await ta(i),i.Aa.shutdown(),i.Ra.set("Unknown")})(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}mu.provider={build:()=>new mu};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I_{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):dn("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jn="FirestoreClient";class fS{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=Ye.UNAUTHENTICATED,this.clientId=Hu.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async a=>{B(Jn,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(B(Jn,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Bt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=uh(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function Tl(n,e){n.asyncQueue.verifyOperationInProgress(),B(Jn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await r_(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function Mm(n,e){n.asyncQueue.verifyOperationInProgress();const t=await mS(n);B(Jn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>Cm(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>Cm(e.remoteStore,s))),n._onlineComponents=e}async function mS(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){B(Jn,"Using user provided OfflineComponentProvider");try{await Tl(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===O.FAILED_PRECONDITION||s.code===O.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;ys("Error using user provided cache. Falling back to memory cache: "+t),await Tl(n,new Mo)}}else B(Jn,"Using default OfflineComponentProvider"),await Tl(n,new dS(void 0));return n._offlineComponents}async function mh(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(B(Jn,"Using user provided OnlineComponentProvider"),await Mm(n,n._uninitializedComponentsProvider._online)):(B(Jn,"Using default OnlineComponentProvider"),await Mm(n,new mu))),n._onlineComponents}function pS(n){return mh(n).then((e=>e.syncEngine))}function gS(n){return mh(n).then((e=>e.datastore))}async function A_(n){const e=await mh(n),t=e.eventManager;return t.onListen=ZT.bind(null,e.syncEngine),t.onUnlisten=nS.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=eS.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=rS.bind(null,e.syncEngine),t}function yS(n,e,t={}){const r=new Bt;return n.asyncQueue.enqueueAndForget((async()=>(function(i,a,l,u,h){const f=new I_({next:g=>{f.Nu(),a.enqueueAndForget((()=>m_(i,p)));const _=g.docs.has(l);!_&&g.fromCache?h.reject(new j(O.UNAVAILABLE,"Failed to get document because the client is offline.")):_&&g.fromCache&&u&&u.source==="server"?h.reject(new j(O.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(g)},error:g=>h.reject(g)}),p=new p_(Qu(l.path),f,{includeMetadataChanges:!0,qa:!0});return f_(i,p)})(await A_(n),n.asyncQueue,e,t,r))),r.promise}function _S(n,e,t={}){const r=new Bt;return n.asyncQueue.enqueueAndForget((async()=>(function(i,a,l,u,h){const f=new I_({next:g=>{f.Nu(),a.enqueueAndForget((()=>m_(i,p))),g.fromCache&&u.source==="server"?h.reject(new j(O.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(g)},error:g=>h.reject(g)}),p=new p_(l,f,{includeMetadataChanges:!0,qa:!0});return f_(i,p)})(await A_(n),n.asyncQueue,e,t,r))),r.promise}function bS(n,e,t){const r=new Bt;return n.asyncQueue.enqueueAndForget((async()=>{try{const s=await gS(n);r.resolve((async function(a,l,u){var A;const h=ee(a),{request:f,gt:p,parent:g}=UA(h.serializer,iA(l),u);h.connection.$o||delete f.parent;const _=(await h.Ho("RunAggregationQuery",h.serializer.databaseId,g,f,1)).filter((S=>!!S.result));de(_.length===1,64727);const T=(A=_[0].result)==null?void 0:A.aggregateFields;return Object.keys(T).reduce(((S,U)=>(S[p[U]]=T[U],S)),{})})(s,e,t))}catch(s){r.reject(s)}})),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T_(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lm=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S_="firestore.googleapis.com",Vm=!0;class Um{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new j(O.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=S_,this.ssl=Vm}else this.host=e.host,this.ssl=e.ssl??Vm;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=t_;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<QA)throw new j(O.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}kI("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=T_(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new j(O.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new j(O.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new j(O.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class yc{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Um({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new j(O.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new j(O.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Um(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new wI;switch(r.type){case"firstParty":return new AI(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new j(O.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=Lm.get(t);r&&(B("ComponentProvider","Removing Datastore"),Lm.delete(t),r.terminate())})(this),Promise.resolve()}}function vS(n,e,t,r={}){var h;n=kt(n,yc);const s=Ss(e),i=n._getSettings(),a={...i,emulatorOptions:n._getEmulatorOptions()},l=`${e}:${t}`;s&&(Wg(`https://${l}`),zg("Firestore",!0)),i.host!==S_&&i.host!==l&&ys("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...i,host:l,ssl:s,emulatorOptions:r};if(!Hn(u,a)&&(n._setSettings(u),r.mockUserToken)){let f,p;if(typeof r.mockUserToken=="string")f=r.mockUserToken,p=Ye.MOCK_USER;else{f=Gx(r.mockUserToken,(h=n._app)==null?void 0:h.options.projectId);const g=r.mockUserToken.sub||r.mockUserToken.user_id;if(!g)throw new j(O.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new Ye(g)}n._authCredentials=new xI(new ly(f,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new gn(this.firestore,e,this._query)}}class xe{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new qn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new xe(this.firestore,e,this._key)}toJSON(){return{type:xe._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Yi(t,xe._jsonSchema))return new xe(e,r||null,new q(me.fromString(t.referencePath)))}}xe._jsonSchemaVersion="firestore/documentReference/1.0",xe._jsonSchema={type:Se("string",xe._jsonSchemaVersion),referencePath:Se("string")};class qn extends gn{constructor(e,t,r){super(e,t,Qu(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new xe(this.firestore,null,new q(e))}withConverter(e){return new qn(this.firestore,e,this._path)}}function gt(n,e,...t){if(n=Ee(n),uy("collection","path",e),n instanceof yc){const r=me.fromString(e,...t);return Yf(r),new qn(n,null,r)}{if(!(n instanceof xe||n instanceof qn))throw new j(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(me.fromString(e,...t));return Yf(r),new qn(n.firestore,null,r)}}function Ft(n,e,...t){if(n=Ee(n),arguments.length===1&&(e=Hu.newId()),uy("doc","path",e),n instanceof yc){const r=me.fromString(e,...t);return Xf(r),new xe(n,null,new q(r))}{if(!(n instanceof xe||n instanceof qn))throw new j(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(me.fromString(e,...t));return Xf(r),new xe(n.firestore,n instanceof qn?n.converter:null,new q(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fm="AsyncQueue";class $m{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new i_(this,"async_queue_retry"),this._c=()=>{const r=Al();r&&B(Fm,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=Al();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Al();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new Bt;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Xu.push(e),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!ks(e))throw e;B(Fm,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((r=>{throw this.nc=r,this.rc=!1,dn("INTERNAL UNHANDLED ERROR: ",jm(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=lh.createAndSchedule(this,e,t,r,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&J(47125,{Pc:jm(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then((()=>{this.tc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function jm(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class Nr extends yc{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new $m,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new $m(e),this._firestoreClient=void 0,await e}}}function wS(n,e){const t=typeof n=="object"?n:Bu(),r=typeof n=="string"?n:Ro,s=Rr(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Wx("firestore");i&&vS(s,...i)}return s}function _c(n){if(n._terminated)throw new j(O.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||xS(n),n._firestoreClient}function xS(n){var r,s,i;const e=n._freezeSettings(),t=(function(l,u,h,f){return new HI(l,u,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,T_(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)})(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,e);n._componentsProvider||(s=e.localCache)!=null&&s._offlineComponentProvider&&((i=e.localCache)!=null&&i._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new fS(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ES{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class IS{constructor(e,t,r){this._userDataWriter=t,this._data=r,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(e){this._byteString=e}static fromBase64String(e){try{return new _t(Be.fromBase64String(e))}catch(t){throw new j(O.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new _t(Be.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:_t._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Yi(e,_t._jsonSchema))return _t.fromBase64String(e.bytes)}}_t._jsonSchemaVersion="firestore/bytes/1.0",_t._jsonSchema={type:Se("string",_t._jsonSchemaVersion),bytes:Se("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bc{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new j(O.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new je(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ra{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new j(O.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new j(O.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ae(this._lat,e._lat)||ae(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Wt._jsonSchemaVersion}}static fromJSON(e){if(Yi(e,Wt._jsonSchema))return new Wt(e.latitude,e.longitude)}}Wt._jsonSchemaVersion="firestore/geoPoint/1.0",Wt._jsonSchema={type:Se("string",Wt._jsonSchemaVersion),latitude:Se("number"),longitude:Se("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:zt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Yi(e,zt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new zt(e.vectorValues);throw new j(O.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}zt._jsonSchemaVersion="firestore/vectorValue/1.0",zt._jsonSchema={type:Se("string",zt._jsonSchemaVersion),vectorValues:Se("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AS=/^__.*__$/;class TS{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Yn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Zi(e,this.data,t,this.fieldTransforms)}}class R_{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Yn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function C_(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw J(40011,{Ac:n})}}class ph{constructor(e,t,r,s,i,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new ph({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.Vc({path:t,fc:!1});return r.gc(e),r}yc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.Vc({path:t,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return Lo(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(C_(this.Ac)&&AS.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class SS{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||mc(e)}Cc(e,t,r,s=!1){return new ph({Ac:e,methodName:t,Dc:r,path:je.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function sa(n){const e=n._freezeSettings(),t=mc(n._databaseId);return new SS(n._databaseId,!!e.ignoreUndefinedProperties,t)}function P_(n,e,t,r,s,i={}){const a=n.Cc(i.merge||i.mergeFields?2:0,e,t,s);_h("Data must be an object, but it was:",a,r);const l=N_(r,a);let u,h;if(i.merge)u=new ft(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const g=pu(e,p,t);if(!a.contains(g))throw new j(O.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);O_(f,g)||f.push(g)}u=new ft(f),h=a.fieldTransforms.filter((p=>u.covers(p.field)))}else u=null,h=a.fieldTransforms;return new TS(new ot(l),u,h)}class vc extends ra{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof vc}}class gh extends ra{_toFieldTransform(e){return new $y(e.path,new Mi)}isEqual(e){return e instanceof gh}}class yh extends ra{constructor(e,t){super(e),this.Fc=t}_toFieldTransform(e){const t=new Ui(e.serializer,My(e.serializer,this.Fc));return new $y(e.path,t)}isEqual(e){return e instanceof yh&&this.Fc===e.Fc}}function RS(n,e,t,r){const s=n.Cc(1,e,t);_h("Data must be an object, but it was:",s,r);const i=[],a=ot.empty();Xn(r,((u,h)=>{const f=bh(e,u,t);h=Ee(h);const p=s.yc(f);if(h instanceof vc)i.push(f);else{const g=ia(h,p);g!=null&&(i.push(f),a.set(f,g))}}));const l=new ft(i);return new R_(a,l,s.fieldTransforms)}function CS(n,e,t,r,s,i){const a=n.Cc(1,e,t),l=[pu(e,r,t)],u=[s];if(i.length%2!=0)throw new j(O.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)l.push(pu(e,i[g])),u.push(i[g+1]);const h=[],f=ot.empty();for(let g=l.length-1;g>=0;--g)if(!O_(h,l[g])){const _=l[g];let T=u[g];T=Ee(T);const A=a.yc(_);if(T instanceof vc)h.push(_);else{const S=ia(T,A);S!=null&&(h.push(_),f.set(_,S))}}const p=new ft(h);return new R_(f,p,a.fieldTransforms)}function k_(n,e,t,r=!1){return ia(t,n.Cc(r?4:3,e))}function ia(n,e){if(D_(n=Ee(n)))return _h("Unsupported field value:",e,n),N_(n,e);if(n instanceof ra)return(function(r,s){if(!C_(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return(function(r,s){const i=[];let a=0;for(const l of r){let u=ia(l,s.wc(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}})(n,e)}return(function(r,s){if((r=Ee(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return My(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=se.fromDate(r);return{timestampValue:No(s.serializer,i)}}if(r instanceof se){const i=new se(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:No(s.serializer,i)}}if(r instanceof Wt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof _t)return{bytesValue:Gy(s.serializer,r._byteString)};if(r instanceof xe){const i=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(i))throw s.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:eh(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof zt)return(function(a,l){return{mapValue:{fields:{[by]:{stringValue:vy},[Co]:{arrayValue:{values:a.toArray().map((h=>{if(typeof h!="number")throw l.Sc("VectorValues must only contain numeric values.");return Xu(l.serializer,h)}))}}}}}})(r,s);throw s.Sc(`Unsupported field value: ${sc(r)}`)})(n,e)}function N_(n,e){const t={};return fy(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Xn(n,((r,s)=>{const i=ia(s,e.mc(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function D_(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof se||n instanceof Wt||n instanceof _t||n instanceof xe||n instanceof ra||n instanceof zt)}function _h(n,e,t){if(!D_(t)||!hy(t)){const r=sc(t);throw r==="an object"?e.Sc(n+" a custom object"):e.Sc(n+" "+r)}}function pu(n,e,t){if((e=Ee(e))instanceof bc)return e._internalPath;if(typeof e=="string")return bh(n,e);throw Lo("Field path arguments must be of type string or ",n,!1,void 0,t)}const PS=new RegExp("[~\\*/\\[\\]]");function bh(n,e,t){if(e.search(PS)>=0)throw Lo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new bc(...e.split("."))._internalPath}catch{throw Lo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Lo(n,e,t,r,s){const i=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new j(O.INVALID_ARGUMENT,l+n+u)}function O_(n,e){return n.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vh{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new xe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new kS(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(wc("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class kS extends vh{data(){return super.data()}}function wc(n,e){return typeof e=="string"?bh(n,e):e instanceof bc?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function NS(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new j(O.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class wh{}class xc extends wh{}function Xe(n,e,...t){let r=[];e instanceof wh&&r.push(e),r=r.concat(t),(function(i){const a=i.filter((u=>u instanceof xh)).length,l=i.filter((u=>u instanceof Ec)).length;if(a>1||a>0&&l>0)throw new j(O.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class Ec extends xc{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Ec(e,t,r)}_apply(e){const t=this._parse(e);return M_(e._query,t),new gn(e.firestore,e.converter,iu(e._query,t))}_parse(e){const t=sa(e.firestore);return(function(i,a,l,u,h,f,p){let g;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new j(O.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){qm(p,f);const T=[];for(const A of p)T.push(Bm(u,i,A));g={arrayValue:{values:T}}}else g=Bm(u,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||qm(p,f),g=k_(l,a,p,f==="in"||f==="not-in");return Te.create(h,f,g)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Ae(n,e,t){const r=e,s=wc("where",n);return Ec._create(s,r,t)}class xh extends wh{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new xh(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:Nt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let a=s;const l=i.getFlattenedFilters();for(const u of l)M_(a,u),a=iu(a,u)})(e._query,t),new gn(e.firestore,e.converter,iu(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Eh extends xc{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Eh(e,t)}_apply(e){const t=(function(s,i,a){if(s.startAt!==null)throw new j(O.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new j(O.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Oi(i,a)})(e._query,this._field,this._direction);return new gn(e.firestore,e.converter,(function(s,i){const a=s.explicitOrderBy.concat([i]);return new Cr(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)})(e._query,t))}}function es(n,e="asc"){const t=e,r=wc("orderBy",n);return Eh._create(r,t)}class Ih extends xc{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Ih(e,t,r)}_apply(e){return new gn(e.firestore,e.converter,ko(e._query,this._limit,this._limitType))}}function ur(n){return NI("limit",n),Ih._create("limit",n,"F")}class Ah extends xc{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Ah(e,t,r)}_apply(e){const t=OS(e,this.type,this._docOrFields,this._inclusive);return new gn(e.firestore,e.converter,(function(s,i){return new Cr(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),s.limit,s.limitType,i,s.endAt)})(e._query,t))}}function DS(...n){return Ah._create("startAfter",n,!1)}function OS(n,e,t,r){if(t[0]=Ee(t[0]),t[0]instanceof vh)return(function(i,a,l,u,h){if(!u)throw new j(O.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${l}().`);const f=[];for(const p of ss(i))if(p.field.isKeyField())f.push(Po(a,u.key));else{const g=u.data.field(p.field);if(oc(g))throw new j(O.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+p.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(g===null){const _=p.field.canonicalString();throw new j(O.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${_}' (used as the orderBy) does not exist.`)}f.push(g)}return new ws(f,h)})(n._query,n.firestore._databaseId,e,t[0]._document,r);{const s=sa(n.firestore);return(function(a,l,u,h,f,p){const g=a.explicitOrderBy;if(f.length>g.length)throw new j(O.INVALID_ARGUMENT,`Too many arguments provided to ${h}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const _=[];for(let T=0;T<f.length;T++){const A=f[T];if(g[T].field.isKeyField()){if(typeof A!="string")throw new j(O.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${h}(), but got a ${typeof A}`);if(!Ju(a)&&A.indexOf("/")!==-1)throw new j(O.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${h}() must be a plain document ID, but '${A}' contains a slash.`);const S=a.path.child(me.fromString(A));if(!q.isDocumentKey(S))throw new j(O.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${h}() must result in a valid document path, but '${S}' is not because it contains an odd number of segments.`);const U=new q(S);_.push(Po(l,U))}else{const S=k_(u,h,A);_.push(S)}}return new ws(_,p)})(n._query,n.firestore._databaseId,s,e,t,r)}}function Bm(n,e,t){if(typeof(t=Ee(t))=="string"){if(t==="")throw new j(O.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Ju(e)&&t.indexOf("/")!==-1)throw new j(O.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(me.fromString(t));if(!q.isDocumentKey(r))throw new j(O.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Po(n,new q(r))}if(t instanceof xe)return Po(n,t._key);throw new j(O.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${sc(t)}.`)}function qm(n,e){if(!Array.isArray(n)||n.length===0)throw new j(O.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function M_(n,e){const t=(function(s,i){for(const a of s)for(const l of a.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new j(O.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new j(O.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class MS{convertValue(e,t="none"){switch(Kn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return we(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Gn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw J(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Xn(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){var r,s,i;const t=(i=(s=(r=e.fields)==null?void 0:r[Co].arrayValue)==null?void 0:s.values)==null?void 0:i.map((a=>we(a.doubleValue)));return new zt(t)}convertGeoPoint(e){return new Wt(we(e.latitude),we(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=cc(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(ki(e));default:return null}}convertTimestamp(e){const t=zn(e);return new se(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=me.fromString(e);de(e_(r),9688,{name:e});const s=new Ni(r.get(1),r.get(3)),i=new q(r.popFirst(5));return s.isEqual(t)||dn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L_(n,e,t){let r;return r=n?n.toFirestore(e):e,r}function LS(){return new ES("count")}class ii{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class br extends vh{constructor(e,t,r,s,i,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new oo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(wc("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new j(O.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=br._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}br._jsonSchemaVersion="firestore/documentSnapshot/1.0",br._jsonSchema={type:Se("string",br._jsonSchemaVersion),bundleSource:Se("string","DocumentSnapshot"),bundleName:Se("string"),bundle:Se("string")};class oo extends br{data(e={}){return super.data(e)}}class as{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new ii(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new oo(this._firestore,this._userDataWriter,r.key,r,new ii(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new j(O.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((l=>{const u=new oo(s._firestore,s._userDataWriter,l.doc.key,l.doc,new ii(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((l=>i||l.type!==3)).map((l=>{const u=new oo(s._firestore,s._userDataWriter,l.doc.key,l.doc,new ii(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return l.type!==0&&(h=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),f=a.indexOf(l.doc.key)),{type:VS(l.type),doc:u,oldIndex:h,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new j(O.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=as._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Hu.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function VS(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return J(61501,{type:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V_(n){n=kt(n,xe);const e=kt(n.firestore,Nr);return yS(_c(e),n._key).then((t=>$S(e,n,t)))}as._jsonSchemaVersion="firestore/querySnapshot/1.0",as._jsonSchema={type:Se("string",as._jsonSchemaVersion),bundleSource:Se("string","QuerySnapshot"),bundleName:Se("string"),bundle:Se("string")};class Th extends MS{constructor(e){super(),this.firestore=e}convertBytes(e){return new _t(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new xe(this.firestore,null,t)}}function on(n){n=kt(n,gn);const e=kt(n.firestore,Nr),t=_c(e),r=new Th(e);return NS(n._query),_S(t,n._query).then((s=>new as(e,r,n,s)))}function US(n,e,t){n=kt(n,xe);const r=kt(n.firestore,Nr),s=L_(n.converter,e);return Sh(r,[P_(sa(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,Ct.none())])}function Jr(n,e,t,...r){n=kt(n,xe);const s=kt(n.firestore,Nr),i=sa(s);let a;return a=typeof(e=Ee(e))=="string"||e instanceof bc?CS(i,"updateDoc",n._key,e,t,r):RS(i,"updateDoc",n._key,e),Sh(s,[a.toMutation(n._key,Ct.exists(!0))])}function FS(n,e){const t=kt(n.firestore,Nr),r=Ft(n),s=L_(n.converter,e);return Sh(t,[P_(sa(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,Ct.exists(!1))]).then((()=>r))}function Sh(n,e){return(function(r,s){const i=new Bt;return r.asyncQueue.enqueueAndForget((async()=>sS(await pS(r),s,i))),i.promise})(_c(n),e)}function $S(n,e,t){const r=t.docs.get(e._key),s=new Th(n);return new br(n,s,e._key,r,new ii(t.hasPendingWrites,t.fromCache),e.converter)}function $r(n){return jS(n,{count:LS()})}function jS(n,e){const t=kt(n.firestore,Nr),r=_c(t),s=BI(e,((i,a)=>new xA(a,i.aggregateType,i._internalFieldPath)));return bS(r,n._query,s).then((i=>(function(l,u,h){const f=new Th(l);return new IS(u,f,h)})(t,n,i)))}function BS(){return new gh("serverTimestamp")}function qS(n){return new yh("increment",n)}(function(e,t=!0){(function(s){Cs=s})(Rs),Qt(new Pt("firestore",((r,{instanceIdentifier:s,options:i})=>{const a=r.getProvider("app").getImmediate(),l=new Nr(new EI(r.getProvider("auth-internal")),new TI(a,r.getProvider("app-check-internal")),(function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new j(O.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ni(h.options.projectId,f)})(a,s),a);return i={useFetchStreams:t,...i},l._setSettings(i),l}),"PUBLIC").setMultipleInstances(!0)),wt(Gf,Kf,e),wt(Gf,Kf,"esm2020")})();function U_(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const HS=U_,F_=new Sr("auth","Firebase",U_());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vo=new rc("@firebase/auth");function WS(n,...e){Vo.logLevel<=ie.WARN&&Vo.warn(`Auth (${Rs}): ${n}`,...e)}function co(n,...e){Vo.logLevel<=ie.ERROR&&Vo.error(`Auth (${Rs}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dt(n,...e){throw Rh(n,...e)}function Gt(n,...e){return Rh(n,...e)}function $_(n,e,t){const r={...HS(),[e]:t};return new Sr("auth","Firebase",r).create(e,{appName:n.name})}function un(n){return $_(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Rh(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return F_.create(n,...e)}function Q(n,e,...t){if(!n)throw Rh(e,...t)}function cn(n){const e="INTERNAL ASSERTION FAILED: "+n;throw co(e),new Error(e)}function mn(n,e){n||cn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gu(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function zS(){return Hm()==="http:"||Hm()==="https:"}function Hm(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GS(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(zS()||Gg()||"connection"in navigator)?navigator.onLine:!0}function KS(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{constructor(e,t){this.shortDelay=e,this.longDelay=t,mn(t>e,"Short delay should be less than long delay!"),this.isMobile=Jx()||Zx()}get(){return GS()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ch(n,e){mn(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j_{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;cn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;cn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;cn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QS={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JS=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],XS=new aa(3e4,6e4);function Zn(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function yn(n,e,t,r,s={}){return B_(n,s,async()=>{let i={},a={};r&&(e==="GET"?a=r:i={body:JSON.stringify(r)});const l=Xi({key:n.config.apiKey,...a}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const h={method:e,headers:u,...i};return Yx()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&Ss(n.emulatorConfig.host)&&(h.credentials="include"),j_.fetch()(await q_(n,n.config.apiHost,t,l),h)})}async function B_(n,e,t){n._canInitEmulator=!1;const r={...QS,...e};try{const s=new ZS(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw $a(n,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const l=i.ok?a.errorMessage:a.error.message,[u,h]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw $a(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw $a(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw $a(n,"user-disabled",a);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw $_(n,f,h);Dt(n,f)}}catch(s){if(s instanceof Mt)throw s;Dt(n,"network-request-failed",{message:String(s)})}}async function oa(n,e,t,r,s={}){const i=await yn(n,e,t,r,s);return"mfaPendingCredential"in i&&Dt(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function q_(n,e,t,r){const s=`${e}${t}?${r}`,i=n,a=i.config.emulator?Ch(n.config,s):`${n.config.apiScheme}://${s}`;return JS.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}function YS(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class ZS{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Gt(this.auth,"network-request-failed")),XS.get())})}}function $a(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=Gt(n,e,r);return s.customData._tokenResponse=t,s}function Wm(n){return n!==void 0&&n.enterprise!==void 0}class eR{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return YS(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function tR(n,e){return yn(n,"GET","/v2/recaptchaConfig",Zn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nR(n,e){return yn(n,"POST","/v1/accounts:delete",e)}async function Uo(n,e){return yn(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wi(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function rR(n,e=!1){const t=Ee(n),r=await t.getIdToken(e),s=Ph(r);Q(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:wi(Sl(s.auth_time)),issuedAtTime:wi(Sl(s.iat)),expirationTime:wi(Sl(s.exp)),signInProvider:a||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Sl(n){return Number(n)*1e3}function Ph(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return co("JWT malformed, contained fewer than 3 sections"),null;try{const s=jg(t);return s?JSON.parse(s):(co("Failed to decode base64 JWT payload"),null)}catch(s){return co("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function zm(n){const e=Ph(n);return Q(e,"internal-error"),Q(typeof e.exp<"u","internal-error"),Q(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Is(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Mt&&sR(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function sR({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iR{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yu{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=wi(this.lastLoginAt),this.creationTime=wi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fo(n){var p;const e=n.auth,t=await n.getIdToken(),r=await Is(n,Uo(e,{idToken:t}));Q(r==null?void 0:r.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=(p=s.providerUserInfo)!=null&&p.length?H_(s.providerUserInfo):[],a=oR(n.providerData,i),l=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),h=l?u:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new yu(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,f)}async function aR(n){const e=Ee(n);await Fo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function oR(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function H_(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cR(n,e){const t=await B_(n,{},async()=>{const r=Xi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,a=await q_(n,s,"/v1/token",`key=${i}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:l,body:r};return n.emulatorConfig&&Ss(n.emulatorConfig.host)&&(u.credentials="include"),j_.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function lR(n,e){return yn(n,"POST","/v2/accounts:revokeToken",Zn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class os{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Q(e.idToken,"internal-error"),Q(typeof e.idToken<"u","internal-error"),Q(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):zm(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){Q(e.length!==0,"internal-error");const t=zm(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(Q(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await cR(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,a=new os;return r&&(Q(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(Q(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(Q(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new os,this.toJSON())}_performRefresh(){return cn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function In(n,e){Q(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class St{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new iR(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new yu(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Is(this,this.stsTokenManager.getToken(this.auth,e));return Q(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return rR(this,e)}reload(){return aR(this)}_assign(e){this!==e&&(Q(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new St({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){Q(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Fo(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(yt(this.auth.app))return Promise.reject(un(this.auth));const e=await this.getIdToken();return await Is(this,nR(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,l=t.tenantId??void 0,u=t._redirectEventId??void 0,h=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:p,emailVerified:g,isAnonymous:_,providerData:T,stsTokenManager:A}=t;Q(p&&A,e,"internal-error");const S=os.fromJSON(this.name,A);Q(typeof p=="string",e,"internal-error"),In(r,e.name),In(s,e.name),Q(typeof g=="boolean",e,"internal-error"),Q(typeof _=="boolean",e,"internal-error"),In(i,e.name),In(a,e.name),In(l,e.name),In(u,e.name),In(h,e.name),In(f,e.name);const U=new St({uid:p,auth:e,email:s,emailVerified:g,displayName:r,isAnonymous:_,photoURL:a,phoneNumber:i,tenantId:l,stsTokenManager:S,createdAt:h,lastLoginAt:f});return T&&Array.isArray(T)&&(U.providerData=T.map(N=>({...N}))),u&&(U._redirectEventId=u),U}static async _fromIdTokenResponse(e,t,r=!1){const s=new os;s.updateFromServerResponse(t);const i=new St({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Fo(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];Q(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?H_(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new os;l.updateFromIdToken(r);const u=new St({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new yu(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gm=new Map;function ln(n){mn(n instanceof Function,"Expected a class definition");let e=Gm.get(n);return e?(mn(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Gm.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W_{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}W_.type="NONE";const Km=W_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lo(n,e,t){return`firebase:${n}:${e}:${t}`}class cs{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=lo(this.userKey,s.apiKey,i),this.fullPersistenceKey=lo("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Uo(this.auth,{idToken:e}).catch(()=>{});return t?St._fromGetAccountInfoResponse(this.auth,t,e):null}return St._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new cs(ln(Km),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||ln(Km);const a=lo(r,e.config.apiKey,e.name);let l=null;for(const h of t)try{const f=await h._get(a);if(f){let p;if(typeof f=="string"){const g=await Uo(e,{idToken:f}).catch(()=>{});if(!g)break;p=await St._fromGetAccountInfoResponse(e,g,f)}else p=St._fromJSON(e,f);h!==i&&(l=p),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new cs(i,e,r):(i=u[0],l&&await i._set(a,l.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(a)}catch{}})),new cs(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qm(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Q_(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(z_(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(X_(e))return"Blackberry";if(Y_(e))return"Webos";if(G_(e))return"Safari";if((e.includes("chrome/")||K_(e))&&!e.includes("edge/"))return"Chrome";if(J_(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function z_(n=et()){return/firefox\//i.test(n)}function G_(n=et()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function K_(n=et()){return/crios\//i.test(n)}function Q_(n=et()){return/iemobile/i.test(n)}function J_(n=et()){return/android/i.test(n)}function X_(n=et()){return/blackberry/i.test(n)}function Y_(n=et()){return/webos/i.test(n)}function kh(n=et()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function uR(n=et()){var e;return kh(n)&&!!((e=window.navigator)!=null&&e.standalone)}function hR(){return eE()&&document.documentMode===10}function Z_(n=et()){return kh(n)||J_(n)||Y_(n)||X_(n)||/windows phone/i.test(n)||Q_(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eb(n,e=[]){let t;switch(n){case"Browser":t=Qm(et());break;case"Worker":t=`${Qm(et())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Rs}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dR{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((a,l)=>{try{const u=e(i);a(u)}catch(u){l(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fR(n,e={}){return yn(n,"GET","/v2/passwordPolicy",Zn(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mR=6;class pR{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??mR,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gR{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Jm(this),this.idTokenSubscription=new Jm(this),this.beforeStateQueue=new dR(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=F_,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ln(t)),this._initializationPromise=this.queue(async()=>{var r,s,i;if(!this._deleted&&(this.persistenceManager=await cs.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Uo(this,{idToken:e}),r=await St._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(yt(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(i=this.redirectUser)==null?void 0:i._redirectEventId,l=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===l)&&(u!=null&&u.user)&&(r=u.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return Q(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Fo(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=KS()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(yt(this.app))return Promise.reject(un(this));const t=e?Ee(e):null;return t&&Q(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&Q(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return yt(this.app)?Promise.reject(un(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return yt(this.app)?Promise.reject(un(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ln(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await fR(this),t=new pR(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Sr("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await lR(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&ln(e)||this._popupRedirectResolver;Q(t,this,"argument-error"),this.redirectPersistenceManager=await cs.create(this,[ln(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(Q(l,this,"internal-error"),l.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Q(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=eb(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(yt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&WS(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Dr(n){return Ee(n)}class Jm{constructor(e){this.auth=e,this.observer=null,this.addObserver=oE(t=>this.observer=t)}get next(){return Q(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ic={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function yR(n){Ic=n}function tb(n){return Ic.loadJS(n)}function _R(){return Ic.recaptchaEnterpriseScript}function bR(){return Ic.gapiScript}function vR(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class wR{constructor(){this.enterprise=new xR}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class xR{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const ER="recaptcha-enterprise",nb="NO_RECAPTCHA";class IR{constructor(e){this.type=ER,this.auth=Dr(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(a,l)=>{tR(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const h=new eR(u);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,a(h.siteKey)}}).catch(u=>{l(u)})})}function s(i,a,l){const u=window.grecaptcha;Wm(u)?u.enterprise.ready(()=>{u.enterprise.execute(i,{action:e}).then(h=>{a(h)}).catch(()=>{a(nb)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new wR().execute("siteKey",{action:"verify"}):new Promise((i,a)=>{r(this.auth).then(l=>{if(!t&&Wm(window.grecaptcha))s(l,i,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=_R();u.length!==0&&(u+=l),tb(u).then(()=>{s(l,i,a)}).catch(h=>{a(h)})}}).catch(l=>{a(l)})})}}async function Xm(n,e,t,r=!1,s=!1){const i=new IR(n);let a;if(s)a=nb;else try{a=await i.verify(t)}catch{a=await i.verify(t,!0)}const l={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in l){const u=l.phoneEnrollmentInfo.phoneNumber,h=l.phoneEnrollmentInfo.recaptchaToken;Object.assign(l,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:h,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in l){const u=l.phoneSignInInfo.recaptchaToken;Object.assign(l,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return l}return r?Object.assign(l,{captchaResp:a}):Object.assign(l,{captchaResponse:a}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function _u(n,e,t,r,s){var i;if((i=n._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await Xm(n,e,t,t==="getOobCode");return r(n,a)}else return r(n,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const l=await Xm(n,e,t,t==="getOobCode");return r(n,l)}else return Promise.reject(a)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AR(n,e){const t=Rr(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(Hn(i,e??{}))return s;Dt(s,"already-initialized")}return t.initialize({options:e})}function TR(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(ln);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function SR(n,e,t){const r=Dr(n);Q(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=rb(e),{host:a,port:l}=RR(e),u=l===null?"":`:${l}`,h={url:`${i}//${a}${u}/`},f=Object.freeze({host:a,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){Q(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),Q(Hn(h,r.config.emulator)&&Hn(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,Ss(a)?(Wg(`${i}//${a}${u}`),zg("Auth",!0)):CR()}function rb(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function RR(n){const e=rb(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Ym(r.substr(i.length+1))}}else{const[i,a]=r.split(":");return{host:i,port:Ym(a)}}}function Ym(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function CR(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nh{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return cn("not implemented")}_getIdTokenResponse(e){return cn("not implemented")}_linkToIdToken(e,t){return cn("not implemented")}_getReauthenticationResolver(e){return cn("not implemented")}}async function PR(n,e){return yn(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kR(n,e){return oa(n,"POST","/v1/accounts:signInWithPassword",Zn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function NR(n,e){return oa(n,"POST","/v1/accounts:signInWithEmailLink",Zn(n,e))}async function DR(n,e){return oa(n,"POST","/v1/accounts:signInWithEmailLink",Zn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fi extends Nh{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Fi(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new Fi(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return _u(e,t,"signInWithPassword",kR);case"emailLink":return NR(e,{email:this._email,oobCode:this._password});default:Dt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return _u(e,r,"signUpPassword",PR);case"emailLink":return DR(e,{idToken:t,email:this._email,oobCode:this._password});default:Dt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ls(n,e){return oa(n,"POST","/v1/accounts:signInWithIdp",Zn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OR="http://localhost";class xr extends Nh{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new xr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Dt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const a=new xr(r,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return ls(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,ls(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,ls(e,t)}buildRequest(){const e={requestUri:OR,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Xi(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MR(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function LR(n){const e=ei(ti(n)).link,t=e?ei(ti(e)).deep_link_id:null,r=ei(ti(n)).deep_link_id;return(r?ei(ti(r)).link:null)||r||t||e||n}class Dh{constructor(e){const t=ei(ti(e)),r=t.apiKey??null,s=t.oobCode??null,i=MR(t.mode??null);Q(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=LR(e);try{return new Dh(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds{constructor(){this.providerId=Ds.PROVIDER_ID}static credential(e,t){return Fi._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Dh.parseLink(t);return Q(r,"argument-error"),Fi._fromEmailAndCode(e,r.code,r.tenantId)}}Ds.PROVIDER_ID="password";Ds.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ds.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sb{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ca extends sb{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn extends ca{constructor(){super("facebook.com")}static credential(e){return xr._fromParams({providerId:Rn.PROVIDER_ID,signInMethod:Rn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Rn.credentialFromTaggedObject(e)}static credentialFromError(e){return Rn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Rn.credential(e.oauthAccessToken)}catch{return null}}}Rn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Rn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn extends ca{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return xr._fromParams({providerId:Cn.PROVIDER_ID,signInMethod:Cn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Cn.credentialFromTaggedObject(e)}static credentialFromError(e){return Cn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Cn.credential(t,r)}catch{return null}}}Cn.GOOGLE_SIGN_IN_METHOD="google.com";Cn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn extends ca{constructor(){super("github.com")}static credential(e){return xr._fromParams({providerId:Pn.PROVIDER_ID,signInMethod:Pn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Pn.credentialFromTaggedObject(e)}static credentialFromError(e){return Pn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Pn.credential(e.oauthAccessToken)}catch{return null}}}Pn.GITHUB_SIGN_IN_METHOD="github.com";Pn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn extends ca{constructor(){super("twitter.com")}static credential(e,t){return xr._fromParams({providerId:kn.PROVIDER_ID,signInMethod:kn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return kn.credentialFromTaggedObject(e)}static credentialFromError(e){return kn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return kn.credential(t,r)}catch{return null}}}kn.TWITTER_SIGN_IN_METHOD="twitter.com";kn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function VR(n,e){return oa(n,"POST","/v1/accounts:signUp",Zn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await St._fromIdTokenResponse(e,r,s),a=Zm(r);return new Er({user:i,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Zm(r);return new Er({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Zm(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o extends Mt{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,$o.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new $o(e,t,r,s)}}function ib(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?$o._fromErrorAndOperation(n,i,e,r):i})}async function UR(n,e,t=!1){const r=await Is(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Er._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FR(n,e,t=!1){const{auth:r}=n;if(yt(r.app))return Promise.reject(un(r));const s="reauthenticate";try{const i=await Is(n,ib(r,s,e,n),t);Q(i.idToken,r,"internal-error");const a=Ph(i.idToken);Q(a,r,"internal-error");const{sub:l}=a;return Q(n.uid===l,r,"user-mismatch"),Er._forOperation(n,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Dt(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ab(n,e,t=!1){if(yt(n.app))return Promise.reject(un(n));const r="signIn",s=await ib(n,r,e),i=await Er._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function $R(n,e){return ab(Dr(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ob(n){const e=Dr(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function jR(n,e,t){if(yt(n.app))return Promise.reject(un(n));const r=Dr(n),a=await _u(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",VR).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&ob(n),u}),l=await Er._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(l.user),l}function BR(n,e,t){return yt(n.app)?Promise.reject(un(n)):$R(Ee(n),Ds.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&ob(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qR(n,e){return yn(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function HR(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=Ee(n),i={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},a=await Is(r,qR(r.auth,i));r.displayName=a.displayName||null,r.photoURL=a.photoUrl||null;const l=r.providerData.find(({providerId:u})=>u==="password");l&&(l.displayName=r.displayName,l.photoURL=r.photoURL),await r._updateTokensIfNecessary(a)}function WR(n,e,t,r){return Ee(n).onIdTokenChanged(e,t,r)}function zR(n,e,t){return Ee(n).beforeAuthStateChanged(e,t)}function GR(n){return Ee(n).signOut()}const jo="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cb{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(jo,"1"),this.storage.removeItem(jo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KR=1e3,QR=10;class lb extends cb{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Z_(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},i=this.storage.getItem(r);hR()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,QR):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},KR)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}lb.type="LOCAL";const JR=lb;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ub extends cb{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}ub.type="SESSION";const hb=ub;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function XR(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ac{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new Ac(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(a).map(async h=>h(t.origin,i)),u=await XR(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ac.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oh(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YR{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((l,u)=>{const h=Oh("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(p){const g=p;if(g.data.eventId===h)switch(g.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(g.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kt(){return window}function ZR(n){Kt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function db(){return typeof Kt().WorkerGlobalScope<"u"&&typeof Kt().importScripts=="function"}async function eC(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function tC(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function nC(){return db()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fb="firebaseLocalStorageDb",rC=1,Bo="firebaseLocalStorage",mb="fbase_key";class la{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Tc(n,e){return n.transaction([Bo],e?"readwrite":"readonly").objectStore(Bo)}function sC(){const n=indexedDB.deleteDatabase(fb);return new la(n).toPromise()}function bu(){const n=indexedDB.open(fb,rC);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Bo,{keyPath:mb})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Bo)?e(r):(r.close(),await sC(),e(await bu()))})})}async function ep(n,e,t){const r=Tc(n,!0).put({[mb]:e,value:t});return new la(r).toPromise()}async function iC(n,e){const t=Tc(n,!1).get(e),r=await new la(t).toPromise();return r===void 0?null:r.value}function tp(n,e){const t=Tc(n,!0).delete(e);return new la(t).toPromise()}const aC=800,oC=3;class pb{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await bu(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>oC)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return db()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ac._getInstance(nC()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await eC(),!this.activeServiceWorker)return;this.sender=new YR(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||tC()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await bu();return await ep(e,jo,"1"),await tp(e,jo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>ep(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>iC(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>tp(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Tc(s,!1).getAll();return new la(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),aC)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}pb.type="LOCAL";const cC=pb;new aa(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lC(n,e){return e?ln(e):(Q(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mh extends Nh{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ls(e,this._buildIdpRequest())}_linkToIdToken(e,t){return ls(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return ls(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function uC(n){return ab(n.auth,new Mh(n),n.bypassAuthState)}function hC(n){const{auth:e,user:t}=n;return Q(t,e,"internal-error"),FR(t,new Mh(n),n.bypassAuthState)}async function dC(n){const{auth:e,user:t}=n;return Q(t,e,"internal-error"),UR(t,new Mh(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gb{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:a,type:l}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return uC;case"linkViaPopup":case"linkViaRedirect":return dC;case"reauthViaPopup":case"reauthViaRedirect":return hC;default:Dt(this.auth,"internal-error")}}resolve(e){mn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){mn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fC=new aa(2e3,1e4);class ts extends gb{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,ts.currentPopupAction&&ts.currentPopupAction.cancel(),ts.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Q(e,this.auth,"internal-error"),e}async onExecution(){mn(this.filter.length===1,"Popup operations only handle one event");const e=Oh();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Gt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Gt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ts.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Gt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,fC.get())};e()}}ts.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mC="pendingRedirect",uo=new Map;class pC extends gb{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=uo.get(this.auth._key());if(!e){try{const r=await gC(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}uo.set(this.auth._key(),e)}return this.bypassAuthState||uo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function gC(n,e){const t=bC(e),r=_C(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function yC(n,e){uo.set(n._key(),e)}function _C(n){return ln(n._redirectPersistence)}function bC(n){return lo(mC,n.config.apiKey,n.name)}async function vC(n,e,t=!1){if(yt(n.app))return Promise.reject(un(n));const r=Dr(n),s=lC(r,e),a=await new pC(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wC=600*1e3;class xC{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!EC(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!yb(e)){const s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(Gt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=wC&&this.cachedEventUids.clear(),this.cachedEventUids.has(np(e))}saveEventToCache(e){this.cachedEventUids.add(np(e)),this.lastProcessedEventTime=Date.now()}}function np(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function yb({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function EC(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return yb(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function IC(n,e={}){return yn(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AC=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,TC=/^https?/;async function SC(n){if(n.config.emulator)return;const{authorizedDomains:e}=await IC(n);for(const t of e)try{if(RC(t))return}catch{}Dt(n,"unauthorized-domain")}function RC(n){const e=gu(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!TC.test(t))return!1;if(AC.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CC=new aa(3e4,6e4);function rp(){const n=Kt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function PC(n){return new Promise((e,t)=>{var s,i,a;function r(){rp(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{rp(),t(Gt(n,"network-request-failed"))},timeout:CC.get()})}if((i=(s=Kt().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((a=Kt().gapi)!=null&&a.load)r();else{const l=vR("iframefcb");return Kt()[l]=()=>{gapi.load?r():t(Gt(n,"network-request-failed"))},tb(`${bR()}?onload=${l}`).catch(u=>t(u))}}).catch(e=>{throw ho=null,e})}let ho=null;function kC(n){return ho=ho||PC(n),ho}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NC=new aa(5e3,15e3),DC="__/auth/iframe",OC="emulator/auth/iframe",MC={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},LC=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function VC(n){const e=n.config;Q(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Ch(e,OC):`https://${n.config.authDomain}/${DC}`,r={apiKey:e.apiKey,appName:n.name,v:Rs},s=LC.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${Xi(r).slice(1)}`}async function UC(n){const e=await kC(n),t=Kt().gapi;return Q(t,n,"internal-error"),e.open({where:document.body,url:VC(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:MC,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const a=Gt(n,"network-request-failed"),l=Kt().setTimeout(()=>{i(a)},NC.get());function u(){Kt().clearTimeout(l),s(r)}r.ping(u).then(u,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FC={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},$C=500,jC=600,BC="_blank",qC="http://localhost";class sp{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function HC(n,e,t,r=$C,s=jC){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u={...FC,width:r.toString(),height:s.toString(),top:i,left:a},h=et().toLowerCase();t&&(l=K_(h)?BC:t),z_(h)&&(e=e||qC,u.scrollbars="yes");const f=Object.entries(u).reduce((g,[_,T])=>`${g}${_}=${T},`,"");if(uR(h)&&l!=="_self")return WC(e||"",l),new sp(null);const p=window.open(e||"",l,f);Q(p,n,"popup-blocked");try{p.focus()}catch{}return new sp(p)}function WC(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zC="__/auth/handler",GC="emulator/auth/handler",KC=encodeURIComponent("fac");async function ip(n,e,t,r,s,i){Q(n.config.authDomain,n,"auth-domain-config-required"),Q(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Rs,eventId:s};if(e instanceof sb){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",aE(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))a[f]=p}if(e instanceof ca){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const u=await n._getAppCheckToken(),h=u?`#${KC}=${encodeURIComponent(u)}`:"";return`${QC(n)}?${Xi(l).slice(1)}${h}`}function QC({config:n}){return n.emulator?Ch(n,GC):`https://${n.authDomain}/${zC}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rl="webStorageSupport";class JC{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=hb,this._completeRedirectFn=vC,this._overrideRedirectResult=yC}async _openPopup(e,t,r,s){var a;mn((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const i=await ip(e,t,r,gu(),s);return HC(e,i,Oh())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await ip(e,t,r,gu(),s);return ZR(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(mn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await UC(e),r=new xC(e);return t.register("authEvent",s=>(Q(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Rl,{type:Rl},s=>{var a;const i=(a=s==null?void 0:s[0])==null?void 0:a[Rl];i!==void 0&&t(!!i),Dt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=SC(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Z_()||G_()||kh()}}const XC=JC;var ap="@firebase/auth",op="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YC{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){Q(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ZC(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function eP(n){Qt(new Pt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;Q(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:eb(n)},h=new gR(r,s,i,u);return TR(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Qt(new Pt("auth-internal",e=>{const t=Dr(e.getProvider("auth").getImmediate());return(r=>new YC(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),wt(ap,op,ZC(n)),wt(ap,op,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tP=300,nP=Hg("authIdTokenMaxAge")||tP;let cp=null;const rP=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>nP)return;const s=t==null?void 0:t.token;cp!==s&&(cp=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function sP(n=Bu()){const e=Rr(n,"auth");if(e.isInitialized())return e.getImmediate();const t=AR(n,{popupRedirectResolver:XC,persistence:[cC,JR,hb]}),r=Hg("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const a=rP(i.toString());zR(t,a,()=>a(t.currentUser)),WR(t,l=>a(l))}}const s=Bg("auth");return s&&SR(t,`http://${s}`),t}function iP(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}yR({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=Gt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",iP().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});eP("Browser");var aP="firebase",oP="12.1.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */wt(aP,oP,"app");const _b="@firebase/installations",Lh="0.6.19";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bb=1e4,vb=`w:${Lh}`,wb="FIS_v2",cP="https://firebaseinstallations.googleapis.com/v1",lP=3600*1e3,uP="installations",hP="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dP={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Ir=new Sr(uP,hP,dP);function xb(n){return n instanceof Mt&&n.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eb({projectId:n}){return`${cP}/projects/${n}/installations`}function Ib(n){return{token:n.token,requestStatus:2,expiresIn:mP(n.expiresIn),creationTime:Date.now()}}async function Ab(n,e){const r=(await e.json()).error;return Ir.create("request-failed",{requestName:n,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Tb({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function fP(n,{refreshToken:e}){const t=Tb(n);return t.append("Authorization",pP(e)),t}async function Sb(n){const e=await n();return e.status>=500&&e.status<600?n():e}function mP(n){return Number(n.replace("s","000"))}function pP(n){return`${wb} ${n}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gP({appConfig:n,heartbeatServiceProvider:e},{fid:t}){const r=Eb(n),s=Tb(n),i=e.getImmediate({optional:!0});if(i){const h=await i.getHeartbeatsHeader();h&&s.append("x-firebase-client",h)}const a={fid:t,authVersion:wb,appId:n.appId,sdkVersion:vb},l={method:"POST",headers:s,body:JSON.stringify(a)},u=await Sb(()=>fetch(r,l));if(u.ok){const h=await u.json();return{fid:h.fid||t,registrationStatus:2,refreshToken:h.refreshToken,authToken:Ib(h.authToken)}}else throw await Ab("Create Installation",u)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rb(n){return new Promise(e=>{setTimeout(e,n)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yP(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _P=/^[cdef][\w-]{21}$/,vu="";function bP(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const t=vP(n);return _P.test(t)?t:vu}catch{return vu}}function vP(n){return yP(n).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sc(n){return`${n.appName}!${n.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cb=new Map;function Pb(n,e){const t=Sc(n);kb(t,e),wP(t,e)}function kb(n,e){const t=Cb.get(n);if(t)for(const r of t)r(e)}function wP(n,e){const t=xP();t&&t.postMessage({key:n,fid:e}),EP()}let hr=null;function xP(){return!hr&&"BroadcastChannel"in self&&(hr=new BroadcastChannel("[Firebase] FID Change"),hr.onmessage=n=>{kb(n.data.key,n.data.fid)}),hr}function EP(){Cb.size===0&&hr&&(hr.close(),hr=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IP="firebase-installations-database",AP=1,Ar="firebase-installations-store";let Cl=null;function Vh(){return Cl||(Cl=Yg(IP,AP,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(Ar)}}})),Cl}async function qo(n,e){const t=Sc(n),s=(await Vh()).transaction(Ar,"readwrite"),i=s.objectStore(Ar),a=await i.get(t);return await i.put(e,t),await s.done,(!a||a.fid!==e.fid)&&Pb(n,e.fid),e}async function Nb(n){const e=Sc(n),r=(await Vh()).transaction(Ar,"readwrite");await r.objectStore(Ar).delete(e),await r.done}async function Rc(n,e){const t=Sc(n),s=(await Vh()).transaction(Ar,"readwrite"),i=s.objectStore(Ar),a=await i.get(t),l=e(a);return l===void 0?await i.delete(t):await i.put(l,t),await s.done,l&&(!a||a.fid!==l.fid)&&Pb(n,l.fid),l}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Uh(n){let e;const t=await Rc(n.appConfig,r=>{const s=TP(r),i=SP(n,s);return e=i.registrationPromise,i.installationEntry});return t.fid===vu?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function TP(n){const e=n||{fid:bP(),registrationStatus:0};return Db(e)}function SP(n,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(Ir.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=RP(n,t);return{installationEntry:t,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:CP(n)}:{installationEntry:e}}async function RP(n,e){try{const t=await gP(n,e);return qo(n.appConfig,t)}catch(t){throw xb(t)&&t.customData.serverCode===409?await Nb(n.appConfig):await qo(n.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function CP(n){let e=await lp(n.appConfig);for(;e.registrationStatus===1;)await Rb(100),e=await lp(n.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:r}=await Uh(n);return r||t}return e}function lp(n){return Rc(n,e=>{if(!e)throw Ir.create("installation-not-found");return Db(e)})}function Db(n){return PP(n)?{fid:n.fid,registrationStatus:0}:n}function PP(n){return n.registrationStatus===1&&n.registrationTime+bb<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kP({appConfig:n,heartbeatServiceProvider:e},t){const r=NP(n,t),s=fP(n,t),i=e.getImmediate({optional:!0});if(i){const h=await i.getHeartbeatsHeader();h&&s.append("x-firebase-client",h)}const a={installation:{sdkVersion:vb,appId:n.appId}},l={method:"POST",headers:s,body:JSON.stringify(a)},u=await Sb(()=>fetch(r,l));if(u.ok){const h=await u.json();return Ib(h)}else throw await Ab("Generate Auth Token",u)}function NP(n,{fid:e}){return`${Eb(n)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fh(n,e=!1){let t;const r=await Rc(n.appConfig,i=>{if(!Ob(i))throw Ir.create("not-registered");const a=i.authToken;if(!e&&MP(a))return i;if(a.requestStatus===1)return t=DP(n,e),i;{if(!navigator.onLine)throw Ir.create("app-offline");const l=VP(i);return t=OP(n,l),l}});return t?await t:r.authToken}async function DP(n,e){let t=await up(n.appConfig);for(;t.authToken.requestStatus===1;)await Rb(100),t=await up(n.appConfig);const r=t.authToken;return r.requestStatus===0?Fh(n,e):r}function up(n){return Rc(n,e=>{if(!Ob(e))throw Ir.create("not-registered");const t=e.authToken;return UP(t)?{...e,authToken:{requestStatus:0}}:e})}async function OP(n,e){try{const t=await kP(n,e),r={...e,authToken:t};return await qo(n.appConfig,r),t}catch(t){if(xb(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await Nb(n.appConfig);else{const r={...e,authToken:{requestStatus:0}};await qo(n.appConfig,r)}throw t}}function Ob(n){return n!==void 0&&n.registrationStatus===2}function MP(n){return n.requestStatus===2&&!LP(n)}function LP(n){const e=Date.now();return e<n.creationTime||n.creationTime+n.expiresIn<e+lP}function VP(n){const e={requestStatus:1,requestTime:Date.now()};return{...n,authToken:e}}function UP(n){return n.requestStatus===1&&n.requestTime+bb<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FP(n){const e=n,{installationEntry:t,registrationPromise:r}=await Uh(e);return r?r.catch(console.error):Fh(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $P(n,e=!1){const t=n;return await jP(t),(await Fh(t,e)).token}async function jP(n){const{registrationPromise:e}=await Uh(n);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BP(n){if(!n||!n.options)throw Pl("App Configuration");if(!n.name)throw Pl("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!n.options[t])throw Pl(t);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function Pl(n){return Ir.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mb="installations",qP="installations-internal",HP=n=>{const e=n.getProvider("app").getImmediate(),t=BP(e),r=Rr(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},WP=n=>{const e=n.getProvider("app").getImmediate(),t=Rr(e,Mb).getImmediate();return{getId:()=>FP(t),getToken:s=>$P(t,s)}};function zP(){Qt(new Pt(Mb,HP,"PUBLIC")),Qt(new Pt(qP,WP,"PRIVATE"))}zP();wt(_b,Lh);wt(_b,Lh,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ho="analytics",GP="firebase_id",KP="origin",QP=60*1e3,JP="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",$h="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ct=new rc("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XP={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},mt=new Sr("analytics","Analytics",XP);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function YP(n){if(!n.startsWith($h)){const e=mt.create("invalid-gtag-resource",{gtagURL:n});return ct.warn(e.message),""}return n}function Lb(n){return Promise.all(n.map(e=>e.catch(t=>t)))}function ZP(n,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(n,e)),t}function ek(n,e){const t=ZP("firebase-js-sdk-policy",{createScriptURL:YP}),r=document.createElement("script"),s=`${$h}?l=${n}&id=${e}`;r.src=t?t==null?void 0:t.createScriptURL(s):s,r.async=!0,document.head.appendChild(r)}function tk(n){let e=[];return Array.isArray(window[n])?e=window[n]:window[n]=e,e}async function nk(n,e,t,r,s,i){const a=r[s];try{if(a)await e[a];else{const u=(await Lb(t)).find(h=>h.measurementId===s);u&&await e[u.appId]}}catch(l){ct.error(l)}n("config",s,i)}async function rk(n,e,t,r,s){try{let i=[];if(s&&s.send_to){let a=s.send_to;Array.isArray(a)||(a=[a]);const l=await Lb(t);for(const u of a){const h=l.find(p=>p.measurementId===u),f=h&&e[h.appId];if(f)i.push(f);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),n("event",r,s||{})}catch(i){ct.error(i)}}function sk(n,e,t,r){async function s(i,...a){try{if(i==="event"){const[l,u]=a;await rk(n,e,t,l,u)}else if(i==="config"){const[l,u]=a;await nk(n,e,t,r,l,u)}else if(i==="consent"){const[l,u]=a;n("consent",l,u)}else if(i==="get"){const[l,u,h]=a;n("get",l,u,h)}else if(i==="set"){const[l]=a;n("set",l)}else n(i,...a)}catch(l){ct.error(l)}}return s}function ik(n,e,t,r,s){let i=function(...a){window[r].push(arguments)};return window[s]&&typeof window[s]=="function"&&(i=window[s]),window[s]=sk(i,n,e,t),{gtagCore:i,wrappedGtag:window[s]}}function ak(n){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes($h)&&t.src.includes(n))return t;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ok=30,ck=1e3;class lk{constructor(e={},t=ck){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Vb=new lk;function uk(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function hk(n){var a;const{appId:e,apiKey:t}=n,r={method:"GET",headers:uk(t)},s=JP.replace("{app-id}",e),i=await fetch(s,r);if(i.status!==200&&i.status!==304){let l="";try{const u=await i.json();(a=u.error)!=null&&a.message&&(l=u.error.message)}catch{}throw mt.create("config-fetch-failed",{httpStatus:i.status,responseMessage:l})}return i.json()}async function dk(n,e=Vb,t){const{appId:r,apiKey:s,measurementId:i}=n.options;if(!r)throw mt.create("no-app-id");if(!s){if(i)return{measurementId:i,appId:r};throw mt.create("no-api-key")}const a=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},l=new pk;return setTimeout(async()=>{l.abort()},QP),Ub({appId:r,apiKey:s,measurementId:i},a,l,e)}async function Ub(n,{throttleEndTimeMillis:e,backoffCount:t},r,s=Vb){var l;const{appId:i,measurementId:a}=n;try{await fk(r,e)}catch(u){if(a)return ct.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:i,measurementId:a};throw u}try{const u=await hk(n);return s.deleteThrottleMetadata(i),u}catch(u){const h=u;if(!mk(h)){if(s.deleteThrottleMetadata(i),a)return ct.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${h==null?void 0:h.message}]`),{appId:i,measurementId:a};throw u}const f=Number((l=h==null?void 0:h.customData)==null?void 0:l.httpStatus)===503?Vf(t,s.intervalMillis,ok):Vf(t,s.intervalMillis),p={throttleEndTimeMillis:Date.now()+f,backoffCount:t+1};return s.setThrottleMetadata(i,p),ct.debug(`Calling attemptFetch again in ${f} millis`),Ub(n,p,r,s)}}function fk(n,e){return new Promise((t,r)=>{const s=Math.max(e-Date.now(),0),i=setTimeout(t,s);n.addEventListener(()=>{clearTimeout(i),r(mt.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function mk(n){if(!(n instanceof Mt)||!n.customData)return!1;const e=Number(n.customData.httpStatus);return e===429||e===500||e===503||e===504}class pk{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function gk(n,e,t,r,s){if(s&&s.global){n("event",t,r);return}else{const i=await e,a={...r,send_to:i};n("event",t,a)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yk(){if(Kg())try{await Qg()}catch(n){return ct.warn(mt.create("indexeddb-unavailable",{errorInfo:n==null?void 0:n.toString()}).message),!1}else return ct.warn(mt.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function _k(n,e,t,r,s,i,a){const l=dk(n);l.then(g=>{t[g.measurementId]=g.appId,n.options.measurementId&&g.measurementId!==n.options.measurementId&&ct.warn(`The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${g.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(g=>ct.error(g)),e.push(l);const u=yk().then(g=>{if(g)return r.getId()}),[h,f]=await Promise.all([l,u]);ak(i)||ek(i,h.measurementId),s("js",new Date);const p=(a==null?void 0:a.config)??{};return p[KP]="firebase",p.update=!0,f!=null&&(p[GP]=f),s("config",h.measurementId,p),h.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bk{constructor(e){this.app=e}_delete(){return delete xi[this.app.options.appId],Promise.resolve()}}let xi={},hp=[];const dp={};let kl="dataLayer",vk="gtag",fp,Fb,mp=!1;function wk(){const n=[];if(Gg()&&n.push("This is a browser extension environment."),nE()||n.push("Cookies are not available."),n.length>0){const e=n.map((r,s)=>`(${s+1}) ${r}`).join(" "),t=mt.create("invalid-analytics-context",{errorInfo:e});ct.warn(t.message)}}function xk(n,e,t){wk();const r=n.options.appId;if(!r)throw mt.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)ct.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw mt.create("no-api-key");if(xi[r]!=null)throw mt.create("already-exists",{id:r});if(!mp){tk(kl);const{wrappedGtag:i,gtagCore:a}=ik(xi,hp,dp,kl,vk);Fb=i,fp=a,mp=!0}return xi[r]=_k(n,hp,dp,e,fp,kl,t),new bk(n)}function Ek(n=Bu()){n=Ee(n);const e=Rr(n,Ho);return e.isInitialized()?e.getImmediate():Ik(n)}function Ik(n,e={}){const t=Rr(n,Ho);if(t.isInitialized()){const s=t.getImmediate();if(Hn(e,t.getOptions()))return s;throw mt.create("already-initialized")}return t.initialize({options:e})}function Ak(n,e,t,r){n=Ee(n),gk(Fb,xi[n.app.options.appId],e,t,r).catch(s=>ct.error(s))}const pp="@firebase/analytics",gp="0.10.18";function Tk(){Qt(new Pt(Ho,(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return xk(r,s,t)},"PUBLIC")),Qt(new Pt("analytics-internal",n,"PRIVATE")),wt(pp,gp),wt(pp,gp,"esm2020");function n(e){try{const t=e.getProvider(Ho).getImmediate();return{logEvent:(r,s,i)=>Ak(t,r,s,i)}}catch(t){throw mt.create("interop-component-reg-failed",{reason:t})}}}Tk();const Sk={apiKey:"AIzaSyAflp1vqSA21sSYihZDTpje-MB1mCALxBs",authDomain:"banasuko-auth.firebaseapp.com",projectId:"banasuko-auth",storageBucket:"banasuko-auth.firebasestorage.app",messagingSenderId:"753581941845",appId:"1:753581941845:web:18418afb254c309933e0dc",measurementId:"G-09515RW8KC"},jh=Zg(Sk),Nl=sP(jh),ve=wS(jh);typeof window<"u"&&Ek(jh);const ns={free:{id:"free",name:"free",displayName:"フリープラン",maxUsage:10,price:0,features:["AI広告診断 月10回まで","A/B比較分析 月5回まで","基本的なレポート"],isActive:!0},basic:{id:"basic",name:"basic",displayName:"ベーシックプラン",maxUsage:100,price:2980,features:["AI広告診断 月100回まで","A/B比較分析 月50回まで","AIコピー生成 月30回まで","詳細レポート・統計","メールサポート"],isActive:!0},premium:{id:"premium",name:"premium",displayName:"プレミアムプラン",maxUsage:-1,price:9800,features:["AI広告診断 無制限","A/B比較分析 無制限","AIコピー生成 無制限","高度な分析・予測機能","カスタムレポート作成","優先サポート","API アクセス"],isActive:!0}};class be{static async registerUser(e,t,r,s){try{const a=(await jR(Nl,e,t)).user;s&&await HR(a,{displayName:s});const l={uid:a.uid,email:a.email,username:r,displayName:s||r,plan:"free",usageCount:0,maxUsage:ns.free.maxUsage,createdAt:se.now(),lastLoginAt:se.now(),isActive:!0};return a.photoURL&&(l.photoURL=a.photoURL),await US(Ft(ve,"users",a.uid),l),console.log("User registered successfully:",l.uid),l}catch(i){throw console.error("User registration error:",i),i}}static async loginUser(e,t){try{const s=(await BR(Nl,e,t)).user;await this.updateLastLogin(s.uid);const i=await this.getUserById(s.uid);return console.log("User logged in successfully:",i.uid),i}catch(r){throw console.error("User login error:",r),r}}static async logoutUser(){try{await GR(Nl),console.log("User logged out successfully")}catch(e){throw console.error("User logout error:",e),e}}static async getUserById(e){try{const t=await V_(Ft(ve,"users",e));if(!t.exists())throw new Error("User not found");return{uid:e,...t.data()}}catch(t){throw console.error("Get user error:",t),t}}static async getUserByEmail(e){try{const t=gt(ve,"users"),r=Xe(t,Ae("email","==",e),ur(1)),s=await on(r);if(s.empty)return null;const i=s.docs[0];return{uid:i.id,...i.data()}}catch(t){return console.error("Get user by email error:",t),null}}static async updateLastLogin(e){try{await Jr(Ft(ve,"users",e),{lastLoginAt:BS()})}catch(t){console.error("Update last login error:",t)}}static async updateUserPlan(e,t){try{const r=ns[t];await Jr(Ft(ve,"users",e),{plan:t,maxUsage:r.maxUsage}),console.log(`User ${e} plan updated to ${t}`)}catch(r){throw console.error("Update user plan error:",r),r}}static async checkUsageLimit(e){try{const t=await this.getUserById(e);if(t.plan==="premium")return{canUse:!0,remaining:-1};const r=t.maxUsage-t.usageCount;return{canUse:r>0,remaining:r}}catch(t){return console.error("Check usage limit error:",t),{canUse:!1,remaining:0}}}static async incrementUsageCount(e,t){try{const{canUse:r}=await this.checkUsageLimit(e);if(!r)throw new Error("Usage limit exceeded");await Jr(Ft(ve,"users",e),{usageCount:qS(1)}),await this.recordUsageLog(e,t,!0),console.log(`Usage incremented for user ${e}:`,t)}catch(r){throw console.error("Increment usage error:",r),await this.recordUsageLog(e,t,!1,r.message),r}}static async recordUsageLog(e,t,r,s,i){try{const a={userId:e,actionType:t,timestamp:se.now(),metadata:{success:r,errorMessage:s,...i}};await FS(gt(ve,"usage_logs"),a)}catch(a){console.error("Record usage log error:",a)}}static async resetUsageCount(e){try{await Jr(Ft(ve,"users",e),{usageCount:0}),console.log(`Usage count reset for user ${e}`)}catch(t){throw console.error("Reset usage count error:",t),t}}static async getAllUsers(e=50){try{const t=gt(ve,"users"),r=Xe(t,es("createdAt","desc"),ur(e));return(await on(r)).docs.map(i=>({uid:i.id,...i.data()}))}catch(t){return console.error("Get all users error:",t),[]}}static async getActiveUserCount(){try{const e=gt(ve,"users"),t=Xe(e,Ae("isActive","==",!0));return(await on(t)).size}catch(e){return console.error("Get active user count error:",e),0}}static async deactivateUser(e){try{await Jr(Ft(ve,"users",e),{isActive:!1}),console.log(`User ${e} deactivated`)}catch(t){throw console.error("Deactivate user error:",t),t}}}function Bh(n){const e={uid:n.uid,email:n.email,iat:Math.floor(Date.now()/1e3),exp:Math.floor(Date.now()/1e3)+604800};return btoa(JSON.stringify(e))}function Rk(n){try{const e=JSON.parse(atob(n));return e.exp<Math.floor(Date.now()/1e3)?null:e}catch{return null}}async function Ck(n,e){let t=Vg(n,"auth-token");if(!t){const r=n.req.header("Authorization");r&&r.startsWith("Bearer ")&&(t=r.substring(7))}if(t){const r=Rk(t);if(r)try{if(r.uid==="demo-user-123"){const s={uid:"demo-user-123",email:"demo@banasuko.com",username:"demo",displayName:"デモユーザー",plan:"basic",usageCount:5,maxUsage:100,createdAt:{seconds:Date.now()/1e3,nanoseconds:0},lastLoginAt:{seconds:Date.now()/1e3,nanoseconds:0},isActive:!0};n.set("user",s)}else{const s=await be.getUserById(r.uid);n.set("user",s)}}catch{Ug(n,"auth-token")}}await e()}async function $b(n){try{const e={uid:"demo-user-123",email:"demo@banasuko.com",username:"demo",displayName:"デモユーザー",plan:"basic",usageCount:5,maxUsage:100,createdAt:{seconds:Date.now()/1e3,nanoseconds:0},lastLoginAt:{seconds:Date.now()/1e3,nanoseconds:0},isActive:!0},t=Bh(e);return tc(n,"auth-token",t,{maxAge:10080*60,httpOnly:!0,secure:!0,sameSite:"Lax"}),n.json({success:!0,user:e,token:t,message:"デモログインが完了しました"})}catch(e){return console.error("Demo login error:",e),n.json({success:!1,error:"デモログインに失敗しました"},500)}}async function Pk(n){try{const{email:e,password:t}=await n.req.json(),r=await be.loginUser(e,t),s=Bh(r);return tc(n,"auth-token",s,{maxAge:10080*60,httpOnly:!0,secure:!0,sameSite:"Lax"}),n.json({success:!0,user:r,token:s,message:"ログインが完了しました"})}catch(e){return console.error("Firebase login error:",e),n.json({success:!1,error:e.message||"ログインに失敗しました"},401)}}async function kk(n){try{const{email:e,password:t,username:r,displayName:s}=await n.req.json(),i=await be.registerUser(e,t,r,s),a=Bh(i);return tc(n,"auth-token",a,{maxAge:10080*60,httpOnly:!0,secure:!0,sameSite:"Lax"}),n.json({success:!0,user:i,token:a,message:"アカウントが作成されました"})}catch(e){return console.error("Firebase register error:",e),n.json({success:!1,error:e.message||"アカウント作成に失敗しました"},400)}}async function Nk(n){try{return n.get("user")&&await be.logoutUser(),Ug(n,"auth-token"),n.json({success:!0,message:"ログアウトしました"})}catch(e){return console.error("Logout error:",e),n.json({success:!1,error:"ログアウトに失敗しました"},500)}}class Ot{static async checkActionUsageLimit(e,t){try{const r=await be.getUserById(e);if(r.plan==="premium")return{canUse:!0,remaining:-1,actionLimit:-1};const i=this.getActionLimits(r.plan)[t]||0,a=await this.getMonthlyActionUsage(e,t),l=i-a;return{canUse:l>0,remaining:l,actionLimit:i}}catch(r){return console.error("Check action usage limit error:",r),{canUse:!1,remaining:0,actionLimit:0}}}static getActionLimits(e){switch(e){case"free":return{single_analysis:10,ab_comparison:5,copy_generation:3};case"basic":return{single_analysis:100,ab_comparison:50,copy_generation:30};case"premium":return{single_analysis:-1,ab_comparison:-1,copy_generation:-1};default:return{single_analysis:0,ab_comparison:0,copy_generation:0}}}static async getMonthlyActionUsage(e,t){try{const r=new Date,s=new Date(r.getFullYear(),r.getMonth(),1),i=new Date(r.getFullYear(),r.getMonth()+1,0,23,59,59),a=gt(ve,"usage_logs"),l=Xe(a,Ae("userId","==",e),Ae("actionType","==",t),Ae("timestamp",">=",se.fromDate(s)),Ae("timestamp","<=",se.fromDate(i)),Ae("metadata.success","==",!0));return(await on(l)).size}catch(r){return console.error("Get monthly action usage error:",r),0}}static async getMonthlyUsageStats(e){try{const t=await be.getUserById(e),r=this.getActionLimits(t.plan),s=["single_analysis","ab_comparison","copy_generation"],i={},a={};let l=0;for(const u of s){const h=await this.getMonthlyActionUsage(e,u);i[u]=h;const f=r[u];a[u]=f===-1?-1:Math.max(0,f-h),l+=h}return{totalUsage:l,actionUsage:i,remainingUsage:a,plan:t.plan,limits:r}}catch(t){return console.error("Get monthly usage stats error:",t),{totalUsage:0,actionUsage:{single_analysis:0,ab_comparison:0,copy_generation:0},remainingUsage:{single_analysis:0,ab_comparison:0,copy_generation:0},plan:"free",limits:{single_analysis:0,ab_comparison:0,copy_generation:0}}}}static async resetMonthlyUsage(){try{const e=await be.getAllUsers(1e3);for(const t of e)await be.resetUsageCount(t.uid);console.log(`Monthly usage reset completed for ${e.length} users`)}catch(e){throw console.error("Reset monthly usage error:",e),e}}static canUpgradePlan(e,t){const r={free:0,basic:1,premium:2};return r[t]>r[e]}static canDowngradePlan(e,t){const r={free:0,basic:1,premium:2};return r[t]<r[e]}static checkFeatureAccess(e,t){var s;return((s={free:["single_analysis","basic_reports"],basic:["single_analysis","ab_comparison","copy_generation","detailed_reports","email_support"],premium:["single_analysis","ab_comparison","copy_generation","detailed_reports","custom_reports","api_access","priority_support","advanced_analytics"]}[e])==null?void 0:s.includes(t))||!1}static getUpgradeRecommendation(e,t){if(e==="premium")return{shouldUpgrade:!1,recommendedPlan:"premium",message:"プレミアムプランをご利用中です",benefits:[]};const r={free:{shouldUpgrade:!0,recommendedPlan:"basic",message:"ベーシックプランにアップグレードして、より多くの分析を実行しましょう",benefits:["AI広告診断 月100回まで","A/B比較分析 月50回まで","AIコピー生成 月30回まで","詳細レポート・統計機能","メールサポート"]},basic:{shouldUpgrade:!0,recommendedPlan:"premium",message:"プレミアムプランで無制限の分析を体験しましょう",benefits:["全機能 無制限利用","高度な分析・予測機能","カスタムレポート作成","API アクセス","優先サポート"]}};return r[e]||r.free}static async getDashboardStats(e){try{const t=await this.getMonthlyUsageStats(e),r={};for(const u of Object.keys(t.actionUsage)){const h=t.actionUsage[u],f=t.limits[u];r[u]=f===-1?0:Math.round(h/f*100)}const s=new Date,i=new Date(s.getFullYear(),s.getMonth()+1,0),a=Math.ceil((i.getTime()-s.getTime())/(1e3*60*60*24)),l=await this.getRecentActivity(e,10);return{currentUsage:t.actionUsage,limits:t.limits,usagePercentage:r,plan:t.plan,daysUntilReset:a,recentActivity:l}}catch(t){throw console.error("Get dashboard stats error:",t),t}}static async getRecentActivity(e,t=10){try{const r=gt(ve,"usage_logs"),s=Xe(r,Ae("userId","==",e),es("timestamp","desc"),ur(t));return(await on(s)).docs.map(a=>({id:a.id,...a.data()}))}catch(r){return console.error("Get recent activity error:",r),[]}}}class _n{static async checkAdminAccess(e){try{return(await V_(Ft(ve,"admins",e))).exists()}catch(t){return console.error("Admin access check error:",t),!1}}static async getDashboardStats(){try{const e=new Date,t=new Date(e.getFullYear(),e.getMonth(),1),r=new Date(e.getFullYear(),e.getMonth()-1,1),s=new Date(e.getFullYear(),e.getMonth(),0,23,59,59),i=gt(ve,"users"),l=(await $r(i)).data().count,u=Xe(i,Ae("createdAt",">=",se.fromDate(t))),f=(await $r(u)).data().count,p=Xe(i,Ae("lastLoginAt",">=",se.fromDate(t)),Ae("isActive","==",!0)),_=(await $r(p)).data().count,T=l>0?Math.round(_/l*100):0,A={free:0,basic:0,premium:0};for(const w of Object.keys(A)){const He=Xe(i,Ae("plan","==",w)),Lt=await $r(He);A[w]=Lt.data().count}const S=A.basic*ns.basic.price+A.premium*ns.premium.price,U=Xe(i,Ae("createdAt",">=",se.fromDate(r)),Ae("createdAt","<=",se.fromDate(s))),N=await on(U);let V=0;N.docs.forEach(w=>{const He=w.data();He.plan==="basic"&&(V+=ns.basic.price),He.plan==="premium"&&(V+=ns.premium.price)});const L=V>0?Math.round((S-V)/V*100):0,z=gt(ve,"usage_logs"),W=Xe(z,Ae("timestamp",">=",se.fromDate(t)),Ae("metadata.success","==",!0)),b=(await $r(W)).data().count,v=Xe(z,Ae("timestamp",">=",se.fromDate(r)),Ae("timestamp","<=",se.fromDate(s)),Ae("metadata.success","==",!0)),I=(await $r(v)).data().count,R=I>0?b-I:b;return{totalUsers:l,activeUsers:_,monthlyRevenue:S,monthlyApiUsage:b,userGrowth:f,activeRate:T,revenueGrowth:L,apiUsageGrowth:R,planDistribution:A}}catch(e){return console.error("Get dashboard stats error:",e),{totalUsers:0,activeUsers:0,monthlyRevenue:0,monthlyApiUsage:0,userGrowth:0,activeRate:0,revenueGrowth:0,apiUsageGrowth:0,planDistribution:{free:0,basic:0,premium:0}}}}static async getUsersList(e=10,t,r){try{let s=Xe(gt(ve,"users"),es("createdAt","desc"),ur(e));r&&(s=Xe(gt(ve,"users"),Ae("plan","==",r),es("createdAt","desc"),ur(e))),t&&(s=Xe(s,DS(t)));const i=await on(s),a=[];for(const h of i.docs){const f={uid:h.id,...h.data()};try{const p=await Ot.getMonthlyUsageStats(f.uid);a.push({...f,usageStats:p})}catch{a.push(f)}}const l=i.docs.length===e,u=i.docs[i.docs.length-1];return{users:a,hasMore:l,lastDoc:u}}catch(s){return console.error("Get users list error:",s),{users:[],hasMore:!1,lastDoc:null}}}static async updateUser(e,t){try{t.plan&&(await be.updateUserPlan(e,t.plan),delete t.plan),Object.keys(t).length>0&&await Jr(Ft(ve,"users",e),t),console.log(`User ${e} updated successfully`)}catch(r){throw console.error("Update user error:",r),r}}static async deactivateUser(e){try{await be.deactivateUser(e),console.log(`User ${e} deactivated`)}catch(t){throw console.error("Deactivate user error:",t),t}}static async getRecentActivity(e=20){try{const t=[],r=Xe(gt(ve,"users"),es("createdAt","desc"),ur(5));(await on(r)).docs.forEach(l=>{const u=l.data();t.push({type:"user_registration",userId:u.uid,username:u.username,details:`新規ユーザー登録 (${u.plan}プラン)`,timestamp:u.createdAt})});const i=Xe(gt(ve,"usage_logs"),es("timestamp","desc"),ur(10));return(await on(i)).docs.forEach(l=>{const u=l.data(),h={single_analysis:"AI診断実行",ab_comparison:"A/B比較分析",copy_generation:"AIコピー生成"};t.push({type:"api_usage",userId:u.userId,details:h[u.actionType],timestamp:u.timestamp})}),t.sort((l,u)=>u.timestamp.seconds-l.timestamp.seconds),t.slice(0,e)}catch(t){return console.error("Get recent activity error:",t),[]}}static async resetAllUsageCounts(){try{const e=await be.getAllUsers(1e3);let t=0,r=0;for(const s of e)try{await be.resetUsageCount(s.uid),t++}catch(i){console.error(`Failed to reset usage for user ${s.uid}:`,i),r++}return console.log(`Usage reset completed: ${t} success, ${r} failed`),{success:t,failed:r}}catch(e){return console.error("Reset all usage counts error:",e),{success:0,failed:0}}}static async exportUserData(){try{const e=await be.getAllUsers(1e4),t={free:0,basic:0,premium:0};return e.forEach(r=>{t[r.plan]=(t[r.plan]||0)+1}),{users:e,summary:{totalUsers:e.length,planDistribution:t,exportDate:new Date().toISOString()}}}catch(e){throw console.error("Export user data error:",e),e}}static async searchUsers(e){try{return(await be.getAllUsers(1e3)).filter(s=>s.email.toLowerCase().includes(e.toLowerCase())||s.username.toLowerCase().includes(e.toLowerCase())).slice(0,50)}catch(t){return console.error("Search users error:",t),[]}}}function Y(n,e,t,r,s){if(typeof e=="function"?n!==e||!0:!e.has(n))throw new TypeError("Cannot write private member to an object whose class did not declare it");return e.set(n,t),t}function P(n,e,t,r){if(t==="a"&&!r)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?n!==e||!r:!e.has(n))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?r:t==="a"?r.call(n):r?r.value:e.get(n)}let jb=function(){const{crypto:n}=globalThis;if(n!=null&&n.randomUUID)return jb=n.randomUUID.bind(n),n.randomUUID();const e=new Uint8Array(1),t=n?()=>n.getRandomValues(e)[0]:()=>Math.random()*255&255;return"10000000-1000-4000-8000-100000000000".replace(/[018]/g,r=>(+r^t()&15>>+r/4).toString(16))};function wu(n){return typeof n=="object"&&n!==null&&("name"in n&&n.name==="AbortError"||"message"in n&&String(n.message).includes("FetchRequestCanceledException"))}const xu=n=>{if(n instanceof Error)return n;if(typeof n=="object"&&n!==null){try{if(Object.prototype.toString.call(n)==="[object Error]"){const e=new Error(n.message,n.cause?{cause:n.cause}:{});return n.stack&&(e.stack=n.stack),n.cause&&!e.cause&&(e.cause=n.cause),n.name&&(e.name=n.name),e}}catch{}try{return new Error(JSON.stringify(n))}catch{}}return new Error(n)};class K extends Error{}class qe extends K{constructor(e,t,r,s){super(`${qe.makeMessage(e,t,r)}`),this.status=e,this.headers=s,this.requestID=s==null?void 0:s.get("x-request-id"),this.error=t;const i=t;this.code=i==null?void 0:i.code,this.param=i==null?void 0:i.param,this.type=i==null?void 0:i.type}static makeMessage(e,t,r){const s=t!=null&&t.message?typeof t.message=="string"?t.message:JSON.stringify(t.message):t?JSON.stringify(t):r;return e&&s?`${e} ${s}`:e?`${e} status code (no body)`:s||"(no status code or body)"}static generate(e,t,r,s){if(!e||!s)return new Cc({message:r,cause:xu(t)});const i=t==null?void 0:t.error;return e===400?new Bb(e,i,r,s):e===401?new qb(e,i,r,s):e===403?new Hb(e,i,r,s):e===404?new Wb(e,i,r,s):e===409?new zb(e,i,r,s):e===422?new Gb(e,i,r,s):e===429?new Kb(e,i,r,s):e>=500?new Qb(e,i,r,s):new qe(e,i,r,s)}}class bt extends qe{constructor({message:e}={}){super(void 0,void 0,e||"Request was aborted.",void 0)}}class Cc extends qe{constructor({message:e,cause:t}){super(void 0,void 0,e||"Connection error.",void 0),t&&(this.cause=t)}}class qh extends Cc{constructor({message:e}={}){super({message:e??"Request timed out."})}}class Bb extends qe{}class qb extends qe{}class Hb extends qe{}class Wb extends qe{}class zb extends qe{}class Gb extends qe{}class Kb extends qe{}class Qb extends qe{}class Jb extends K{constructor(){super("Could not parse response content as the length limit was reached")}}class Xb extends K{constructor(){super("Could not parse response content as the request was rejected by the content filter")}}class ai extends Error{constructor(e){super(e)}}const Dk=/^[a-z][a-z0-9+.-]*:/i,Ok=n=>Dk.test(n);let at=n=>(at=Array.isArray,at(n)),yp=at;function Yb(n){return typeof n!="object"?{}:n??{}}function Mk(n){if(!n)return!0;for(const e in n)return!1;return!0}function Lk(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Dl(n){return n!=null&&typeof n=="object"&&!Array.isArray(n)}const Vk=(n,e)=>{if(typeof e!="number"||!Number.isInteger(e))throw new K(`${n} must be an integer`);if(e<0)throw new K(`${n} must be a positive integer`);return e},Uk=n=>{try{return JSON.parse(n)}catch{return}},ua=n=>new Promise(e=>setTimeout(e,n)),Xr="5.15.0",Fk=()=>typeof window<"u"&&typeof window.document<"u"&&typeof navigator<"u";function $k(){return typeof Deno<"u"&&Deno.build!=null?"deno":typeof EdgeRuntime<"u"?"edge":Object.prototype.toString.call(typeof globalThis.process<"u"?globalThis.process:0)==="[object process]"?"node":"unknown"}const jk=()=>{var t;const n=$k();if(n==="deno")return{"X-Stainless-Lang":"js","X-Stainless-Package-Version":Xr,"X-Stainless-OS":bp(Deno.build.os),"X-Stainless-Arch":_p(Deno.build.arch),"X-Stainless-Runtime":"deno","X-Stainless-Runtime-Version":typeof Deno.version=="string"?Deno.version:((t=Deno.version)==null?void 0:t.deno)??"unknown"};if(typeof EdgeRuntime<"u")return{"X-Stainless-Lang":"js","X-Stainless-Package-Version":Xr,"X-Stainless-OS":"Unknown","X-Stainless-Arch":`other:${EdgeRuntime}`,"X-Stainless-Runtime":"edge","X-Stainless-Runtime-Version":globalThis.process.version};if(n==="node")return{"X-Stainless-Lang":"js","X-Stainless-Package-Version":Xr,"X-Stainless-OS":bp(globalThis.process.platform??"unknown"),"X-Stainless-Arch":_p(globalThis.process.arch??"unknown"),"X-Stainless-Runtime":"node","X-Stainless-Runtime-Version":globalThis.process.version??"unknown"};const e=Bk();return e?{"X-Stainless-Lang":"js","X-Stainless-Package-Version":Xr,"X-Stainless-OS":"Unknown","X-Stainless-Arch":"unknown","X-Stainless-Runtime":`browser:${e.browser}`,"X-Stainless-Runtime-Version":e.version}:{"X-Stainless-Lang":"js","X-Stainless-Package-Version":Xr,"X-Stainless-OS":"Unknown","X-Stainless-Arch":"unknown","X-Stainless-Runtime":"unknown","X-Stainless-Runtime-Version":"unknown"}};function Bk(){if(typeof navigator>"u"||!navigator)return null;const n=[{key:"edge",pattern:/Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"ie",pattern:/MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"ie",pattern:/Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"chrome",pattern:/Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"firefox",pattern:/Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/},{key:"safari",pattern:/(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/}];for(const{key:e,pattern:t}of n){const r=t.exec(navigator.userAgent);if(r){const s=r[1]||0,i=r[2]||0,a=r[3]||0;return{browser:e,version:`${s}.${i}.${a}`}}}return null}const _p=n=>n==="x32"?"x32":n==="x86_64"||n==="x64"?"x64":n==="arm"?"arm":n==="aarch64"||n==="arm64"?"arm64":n?`other:${n}`:"unknown",bp=n=>(n=n.toLowerCase(),n.includes("ios")?"iOS":n==="android"?"Android":n==="darwin"?"MacOS":n==="win32"?"Windows":n==="freebsd"?"FreeBSD":n==="openbsd"?"OpenBSD":n==="linux"?"Linux":n?`Other:${n}`:"Unknown");let vp;const qk=()=>vp??(vp=jk());function Hk(){if(typeof fetch<"u")return fetch;throw new Error("`fetch` is not defined as a global; Either pass `fetch` to the client, `new OpenAI({ fetch })` or polyfill the global, `globalThis.fetch = fetch`")}function Zb(...n){const e=globalThis.ReadableStream;if(typeof e>"u")throw new Error("`ReadableStream` is not defined as a global; You will need to polyfill it, `globalThis.ReadableStream = ReadableStream`");return new e(...n)}function ev(n){let e=Symbol.asyncIterator in n?n[Symbol.asyncIterator]():n[Symbol.iterator]();return Zb({start(){},async pull(t){const{done:r,value:s}=await e.next();r?t.close():t.enqueue(s)},async cancel(){var t;await((t=e.return)==null?void 0:t.call(e))}})}function tv(n){if(n[Symbol.asyncIterator])return n;const e=n.getReader();return{async next(){try{const t=await e.read();return t!=null&&t.done&&e.releaseLock(),t}catch(t){throw e.releaseLock(),t}},async return(){const t=e.cancel();return e.releaseLock(),await t,{done:!0,value:void 0}},[Symbol.asyncIterator](){return this}}}async function Wk(n){var r,s;if(n===null||typeof n!="object")return;if(n[Symbol.asyncIterator]){await((s=(r=n[Symbol.asyncIterator]()).return)==null?void 0:s.call(r));return}const e=n.getReader(),t=e.cancel();e.releaseLock(),await t}const zk=({headers:n,body:e})=>({bodyHeaders:{"content-type":"application/json"},body:JSON.stringify(e)}),nv="RFC3986",rv=n=>String(n),wp={RFC1738:n=>String(n).replace(/%20/g,"+"),RFC3986:rv},Gk="RFC1738";let Eu=(n,e)=>(Eu=Object.hasOwn??Function.prototype.call.bind(Object.prototype.hasOwnProperty),Eu(n,e));const Vt=(()=>{const n=[];for(let e=0;e<256;++e)n.push("%"+((e<16?"0":"")+e.toString(16)).toUpperCase());return n})(),Ol=1024,Kk=(n,e,t,r,s)=>{if(n.length===0)return n;let i=n;if(typeof n=="symbol"?i=Symbol.prototype.toString.call(n):typeof n!="string"&&(i=String(n)),t==="iso-8859-1")return escape(i).replace(/%u[0-9a-f]{4}/gi,function(l){return"%26%23"+parseInt(l.slice(2),16)+"%3B"});let a="";for(let l=0;l<i.length;l+=Ol){const u=i.length>=Ol?i.slice(l,l+Ol):i,h=[];for(let f=0;f<u.length;++f){let p=u.charCodeAt(f);if(p===45||p===46||p===95||p===126||p>=48&&p<=57||p>=65&&p<=90||p>=97&&p<=122||s===Gk&&(p===40||p===41)){h[h.length]=u.charAt(f);continue}if(p<128){h[h.length]=Vt[p];continue}if(p<2048){h[h.length]=Vt[192|p>>6]+Vt[128|p&63];continue}if(p<55296||p>=57344){h[h.length]=Vt[224|p>>12]+Vt[128|p>>6&63]+Vt[128|p&63];continue}f+=1,p=65536+((p&1023)<<10|u.charCodeAt(f)&1023),h[h.length]=Vt[240|p>>18]+Vt[128|p>>12&63]+Vt[128|p>>6&63]+Vt[128|p&63]}a+=h.join("")}return a};function Qk(n){return!n||typeof n!="object"?!1:!!(n.constructor&&n.constructor.isBuffer&&n.constructor.isBuffer(n))}function xp(n,e){if(at(n)){const t=[];for(let r=0;r<n.length;r+=1)t.push(e(n[r]));return t}return e(n)}const sv={brackets(n){return String(n)+"[]"},comma:"comma",indices(n,e){return String(n)+"["+e+"]"},repeat(n){return String(n)}},iv=function(n,e){Array.prototype.push.apply(n,at(e)?e:[e])};let Ep;const ke={addQueryPrefix:!1,allowDots:!1,allowEmptyArrays:!1,arrayFormat:"indices",charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encodeDotInKeys:!1,encoder:Kk,encodeValuesOnly:!1,format:nv,formatter:rv,indices:!1,serializeDate(n){return(Ep??(Ep=Function.prototype.call.bind(Date.prototype.toISOString)))(n)},skipNulls:!1,strictNullHandling:!1};function Jk(n){return typeof n=="string"||typeof n=="number"||typeof n=="boolean"||typeof n=="symbol"||typeof n=="bigint"}const Ml={};function av(n,e,t,r,s,i,a,l,u,h,f,p,g,_,T,A,S,U){let N=n,V=U,L=0,z=!1;for(;(V=V.get(Ml))!==void 0&&!z;){const E=V.get(n);if(L+=1,typeof E<"u"){if(E===L)throw new RangeError("Cyclic object value");z=!0}typeof V.get(Ml)>"u"&&(L=0)}if(typeof h=="function"?N=h(e,N):N instanceof Date?N=g==null?void 0:g(N):t==="comma"&&at(N)&&(N=xp(N,function(E){return E instanceof Date?g==null?void 0:g(E):E})),N===null){if(i)return u&&!A?u(e,ke.encoder,S,"key",_):e;N=""}if(Jk(N)||Qk(N)){if(u){const E=A?e:u(e,ke.encoder,S,"key",_);return[(T==null?void 0:T(E))+"="+(T==null?void 0:T(u(N,ke.encoder,S,"value",_)))]}return[(T==null?void 0:T(e))+"="+(T==null?void 0:T(String(N)))]}const W=[];if(typeof N>"u")return W;let x;if(t==="comma"&&at(N))A&&u&&(N=xp(N,u)),x=[{value:N.length>0?N.join(",")||null:void 0}];else if(at(h))x=h;else{const E=Object.keys(N);x=f?E.sort(f):E}const b=l?String(e).replace(/\./g,"%2E"):String(e),v=r&&at(N)&&N.length===1?b+"[]":b;if(s&&at(N)&&N.length===0)return v+"[]";for(let E=0;E<x.length;++E){const I=x[E],R=typeof I=="object"&&typeof I.value<"u"?I.value:N[I];if(a&&R===null)continue;const w=p&&l?I.replace(/\./g,"%2E"):I,He=at(N)?typeof t=="function"?t(v,w):v:v+(p?"."+w:"["+w+"]");U.set(n,L);const Lt=new WeakMap;Lt.set(Ml,U),iv(W,av(R,He,t,r,s,i,a,l,t==="comma"&&A&&at(N)?null:u,h,f,p,g,_,T,A,S,Lt))}return W}function Xk(n=ke){if(typeof n.allowEmptyArrays<"u"&&typeof n.allowEmptyArrays!="boolean")throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");if(typeof n.encodeDotInKeys<"u"&&typeof n.encodeDotInKeys!="boolean")throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");if(n.encoder!==null&&typeof n.encoder<"u"&&typeof n.encoder!="function")throw new TypeError("Encoder has to be a function.");const e=n.charset||ke.charset;if(typeof n.charset<"u"&&n.charset!=="utf-8"&&n.charset!=="iso-8859-1")throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");let t=nv;if(typeof n.format<"u"){if(!Eu(wp,n.format))throw new TypeError("Unknown format option provided.");t=n.format}const r=wp[t];let s=ke.filter;(typeof n.filter=="function"||at(n.filter))&&(s=n.filter);let i;if(n.arrayFormat&&n.arrayFormat in sv?i=n.arrayFormat:"indices"in n?i=n.indices?"indices":"repeat":i=ke.arrayFormat,"commaRoundTrip"in n&&typeof n.commaRoundTrip!="boolean")throw new TypeError("`commaRoundTrip` must be a boolean, or absent");const a=typeof n.allowDots>"u"?n.encodeDotInKeys?!0:ke.allowDots:!!n.allowDots;return{addQueryPrefix:typeof n.addQueryPrefix=="boolean"?n.addQueryPrefix:ke.addQueryPrefix,allowDots:a,allowEmptyArrays:typeof n.allowEmptyArrays=="boolean"?!!n.allowEmptyArrays:ke.allowEmptyArrays,arrayFormat:i,charset:e,charsetSentinel:typeof n.charsetSentinel=="boolean"?n.charsetSentinel:ke.charsetSentinel,commaRoundTrip:!!n.commaRoundTrip,delimiter:typeof n.delimiter>"u"?ke.delimiter:n.delimiter,encode:typeof n.encode=="boolean"?n.encode:ke.encode,encodeDotInKeys:typeof n.encodeDotInKeys=="boolean"?n.encodeDotInKeys:ke.encodeDotInKeys,encoder:typeof n.encoder=="function"?n.encoder:ke.encoder,encodeValuesOnly:typeof n.encodeValuesOnly=="boolean"?n.encodeValuesOnly:ke.encodeValuesOnly,filter:s,format:t,formatter:r,serializeDate:typeof n.serializeDate=="function"?n.serializeDate:ke.serializeDate,skipNulls:typeof n.skipNulls=="boolean"?n.skipNulls:ke.skipNulls,sort:typeof n.sort=="function"?n.sort:null,strictNullHandling:typeof n.strictNullHandling=="boolean"?n.strictNullHandling:ke.strictNullHandling}}function Yk(n,e={}){let t=n;const r=Xk(e);let s,i;typeof r.filter=="function"?(i=r.filter,t=i("",t)):at(r.filter)&&(i=r.filter,s=i);const a=[];if(typeof t!="object"||t===null)return"";const l=sv[r.arrayFormat],u=l==="comma"&&r.commaRoundTrip;s||(s=Object.keys(t)),r.sort&&s.sort(r.sort);const h=new WeakMap;for(let g=0;g<s.length;++g){const _=s[g];r.skipNulls&&t[_]===null||iv(a,av(t[_],_,l,u,r.allowEmptyArrays,r.strictNullHandling,r.skipNulls,r.encodeDotInKeys,r.encode?r.encoder:null,r.filter,r.sort,r.allowDots,r.serializeDate,r.format,r.formatter,r.encodeValuesOnly,r.charset,h))}const f=a.join(r.delimiter);let p=r.addQueryPrefix===!0?"?":"";return r.charsetSentinel&&(r.charset==="iso-8859-1"?p+="utf8=%26%2310003%3B&":p+="utf8=%E2%9C%93&"),f.length>0?p+f:""}function Zk(n){let e=0;for(const s of n)e+=s.length;const t=new Uint8Array(e);let r=0;for(const s of n)t.set(s,r),r+=s.length;return t}let Ip;function Hh(n){let e;return(Ip??(e=new globalThis.TextEncoder,Ip=e.encode.bind(e)))(n)}let Ap;function Tp(n){let e;return(Ap??(e=new globalThis.TextDecoder,Ap=e.decode.bind(e)))(n)}var ut,ht;class Pc{constructor(){ut.set(this,void 0),ht.set(this,void 0),Y(this,ut,new Uint8Array),Y(this,ht,null)}decode(e){if(e==null)return[];const t=e instanceof ArrayBuffer?new Uint8Array(e):typeof e=="string"?Hh(e):e;Y(this,ut,Zk([P(this,ut,"f"),t]));const r=[];let s;for(;(s=e1(P(this,ut,"f"),P(this,ht,"f")))!=null;){if(s.carriage&&P(this,ht,"f")==null){Y(this,ht,s.index);continue}if(P(this,ht,"f")!=null&&(s.index!==P(this,ht,"f")+1||s.carriage)){r.push(Tp(P(this,ut,"f").subarray(0,P(this,ht,"f")-1))),Y(this,ut,P(this,ut,"f").subarray(P(this,ht,"f"))),Y(this,ht,null);continue}const i=P(this,ht,"f")!==null?s.preceding-1:s.preceding,a=Tp(P(this,ut,"f").subarray(0,i));r.push(a),Y(this,ut,P(this,ut,"f").subarray(s.index)),Y(this,ht,null)}return r}flush(){return P(this,ut,"f").length?this.decode(`
`):[]}}ut=new WeakMap,ht=new WeakMap;Pc.NEWLINE_CHARS=new Set([`
`,"\r"]);Pc.NEWLINE_REGEXP=/\r\n|[\n\r]/g;function e1(n,e){for(let s=e??0;s<n.length;s++){if(n[s]===10)return{preceding:s,index:s+1,carriage:!1};if(n[s]===13)return{preceding:s,index:s+1,carriage:!0}}return null}function t1(n){for(let r=0;r<n.length-1;r++){if(n[r]===10&&n[r+1]===10||n[r]===13&&n[r+1]===13)return r+2;if(n[r]===13&&n[r+1]===10&&r+3<n.length&&n[r+2]===13&&n[r+3]===10)return r+4}return-1}const Wo={off:0,error:200,warn:300,info:400,debug:500},Sp=(n,e,t)=>{if(n){if(Lk(Wo,n))return n;Ue(t).warn(`${e} was set to ${JSON.stringify(n)}, expected one of ${JSON.stringify(Object.keys(Wo))}`)}};function oi(){}function ja(n,e,t){return!e||Wo[n]>Wo[t]?oi:e[n].bind(e)}const n1={error:oi,warn:oi,info:oi,debug:oi};let Rp=new WeakMap;function Ue(n){const e=n.logger,t=n.logLevel??"off";if(!e)return n1;const r=Rp.get(e);if(r&&r[0]===t)return r[1];const s={error:ja("error",e,t),warn:ja("warn",e,t),info:ja("info",e,t),debug:ja("debug",e,t)};return Rp.set(e,[t,s]),s}const or=n=>(n.options&&(n.options={...n.options},delete n.options.headers),n.headers&&(n.headers=Object.fromEntries((n.headers instanceof Headers?[...n.headers]:Object.entries(n.headers)).map(([e,t])=>[e,e.toLowerCase()==="authorization"||e.toLowerCase()==="cookie"||e.toLowerCase()==="set-cookie"?"***":t]))),"retryOfRequestLogID"in n&&(n.retryOfRequestLogID&&(n.retryOf=n.retryOfRequestLogID),delete n.retryOfRequestLogID),n);var Ys;class jt{constructor(e,t,r){this.iterator=e,Ys.set(this,void 0),this.controller=t,Y(this,Ys,r)}static fromSSEResponse(e,t,r){let s=!1;const i=r?Ue(r):console;async function*a(){if(s)throw new K("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");s=!0;let l=!1;try{for await(const u of r1(e,t))if(!l){if(u.data.startsWith("[DONE]")){l=!0;continue}if(u.event===null||!u.event.startsWith("thread.")){let h;try{h=JSON.parse(u.data)}catch(f){throw i.error("Could not parse message into JSON:",u.data),i.error("From chunk:",u.raw),f}if(h&&h.error)throw new qe(void 0,h.error,void 0,e.headers);yield h}else{let h;try{h=JSON.parse(u.data)}catch(f){throw console.error("Could not parse message into JSON:",u.data),console.error("From chunk:",u.raw),f}if(u.event=="error")throw new qe(void 0,h.error,h.message,void 0);yield{event:u.event,data:h}}}l=!0}catch(u){if(wu(u))return;throw u}finally{l||t.abort()}}return new jt(a,t,r)}static fromReadableStream(e,t,r){let s=!1;async function*i(){const l=new Pc,u=tv(e);for await(const h of u)for(const f of l.decode(h))yield f;for(const h of l.flush())yield h}async function*a(){if(s)throw new K("Cannot iterate over a consumed stream, use `.tee()` to split the stream.");s=!0;let l=!1;try{for await(const u of i())l||u&&(yield JSON.parse(u));l=!0}catch(u){if(wu(u))return;throw u}finally{l||t.abort()}}return new jt(a,t,r)}[(Ys=new WeakMap,Symbol.asyncIterator)](){return this.iterator()}tee(){const e=[],t=[],r=this.iterator(),s=i=>({next:()=>{if(i.length===0){const a=r.next();e.push(a),t.push(a)}return i.shift()}});return[new jt(()=>s(e),this.controller,P(this,Ys,"f")),new jt(()=>s(t),this.controller,P(this,Ys,"f"))]}toReadableStream(){const e=this;let t;return Zb({async start(){t=e[Symbol.asyncIterator]()},async pull(r){try{const{value:s,done:i}=await t.next();if(i)return r.close();const a=Hh(JSON.stringify(s)+`
`);r.enqueue(a)}catch(s){r.error(s)}},async cancel(){var r;await((r=t.return)==null?void 0:r.call(t))}})}}async function*r1(n,e){if(!n.body)throw e.abort(),typeof globalThis.navigator<"u"&&globalThis.navigator.product==="ReactNative"?new K("The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api"):new K("Attempted to iterate over a response with no body");const t=new i1,r=new Pc,s=tv(n.body);for await(const i of s1(s))for(const a of r.decode(i)){const l=t.decode(a);l&&(yield l)}for(const i of r.flush()){const a=t.decode(i);a&&(yield a)}}async function*s1(n){let e=new Uint8Array;for await(const t of n){if(t==null)continue;const r=t instanceof ArrayBuffer?new Uint8Array(t):typeof t=="string"?Hh(t):t;let s=new Uint8Array(e.length+r.length);s.set(e),s.set(r,e.length),e=s;let i;for(;(i=t1(e))!==-1;)yield e.slice(0,i),e=e.slice(i)}e.length>0&&(yield e)}class i1{constructor(){this.event=null,this.data=[],this.chunks=[]}decode(e){if(e.endsWith("\r")&&(e=e.substring(0,e.length-1)),!e){if(!this.event&&!this.data.length)return null;const i={event:this.event,data:this.data.join(`
`),raw:this.chunks};return this.event=null,this.data=[],this.chunks=[],i}if(this.chunks.push(e),e.startsWith(":"))return null;let[t,r,s]=a1(e,":");return s.startsWith(" ")&&(s=s.substring(1)),t==="event"?this.event=s:t==="data"&&this.data.push(s),null}}function a1(n,e){const t=n.indexOf(e);return t!==-1?[n.substring(0,t),e,n.substring(t+e.length)]:[n,"",""]}async function ov(n,e){const{response:t,requestLogID:r,retryOfRequestLogID:s,startTime:i}=e,a=await(async()=>{var p;if(e.options.stream)return Ue(n).debug("response",t.status,t.url,t.headers,t.body),e.options.__streamClass?e.options.__streamClass.fromSSEResponse(t,e.controller,n):jt.fromSSEResponse(t,e.controller,n);if(t.status===204)return null;if(e.options.__binaryResponse)return t;const l=t.headers.get("content-type"),u=(p=l==null?void 0:l.split(";")[0])==null?void 0:p.trim();if((u==null?void 0:u.includes("application/json"))||(u==null?void 0:u.endsWith("+json"))){const g=await t.json();return cv(g,t)}return await t.text()})();return Ue(n).debug(`[${r}] response parsed`,or({retryOfRequestLogID:s,url:t.url,status:t.status,body:a,durationMs:Date.now()-i})),a}function cv(n,e){return!n||typeof n!="object"||Array.isArray(n)?n:Object.defineProperty(n,"_request_id",{value:e.headers.get("x-request-id"),enumerable:!1})}var ci;class kc extends Promise{constructor(e,t,r=ov){super(s=>{s(null)}),this.responsePromise=t,this.parseResponse=r,ci.set(this,void 0),Y(this,ci,e)}_thenUnwrap(e){return new kc(P(this,ci,"f"),this.responsePromise,async(t,r)=>cv(e(await this.parseResponse(t,r),r),r.response))}asResponse(){return this.responsePromise.then(e=>e.response)}async withResponse(){const[e,t]=await Promise.all([this.parse(),this.asResponse()]);return{data:e,response:t,request_id:t.headers.get("x-request-id")}}parse(){return this.parsedPromise||(this.parsedPromise=this.responsePromise.then(e=>this.parseResponse(P(this,ci,"f"),e))),this.parsedPromise}then(e,t){return this.parse().then(e,t)}catch(e){return this.parse().catch(e)}finally(e){return this.parse().finally(e)}}ci=new WeakMap;var Ba;class Wh{constructor(e,t,r,s){Ba.set(this,void 0),Y(this,Ba,e),this.options=s,this.response=t,this.body=r}hasNextPage(){return this.getPaginatedItems().length?this.nextPageRequestOptions()!=null:!1}async getNextPage(){const e=this.nextPageRequestOptions();if(!e)throw new K("No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.");return await P(this,Ba,"f").requestAPIList(this.constructor,e)}async*iterPages(){let e=this;for(yield e;e.hasNextPage();)e=await e.getNextPage(),yield e}async*[(Ba=new WeakMap,Symbol.asyncIterator)](){for await(const e of this.iterPages())for(const t of e.getPaginatedItems())yield t}}class o1 extends kc{constructor(e,t,r){super(e,t,async(s,i)=>new r(s,i.response,await ov(s,i),i.options))}async*[Symbol.asyncIterator](){const e=await this;for await(const t of e)yield t}}class Nc extends Wh{constructor(e,t,r,s){super(e,t,r,s),this.data=r.data||[],this.object=r.object}getPaginatedItems(){return this.data??[]}nextPageRequestOptions(){return null}}class Re extends Wh{constructor(e,t,r,s){super(e,t,r,s),this.data=r.data||[],this.has_more=r.has_more||!1}getPaginatedItems(){return this.data??[]}hasNextPage(){return this.has_more===!1?!1:super.hasNextPage()}nextPageRequestOptions(){var r;const e=this.getPaginatedItems(),t=(r=e[e.length-1])==null?void 0:r.id;return t?{...this.options,query:{...Yb(this.options.query),after:t}}:null}}class c1 extends Wh{constructor(e,t,r,s){super(e,t,r,s),this.data=r.data||[],this.has_more=r.has_more||!1,this.last_id=r.last_id||""}getPaginatedItems(){return this.data??[]}hasNextPage(){return this.has_more===!1?!1:super.hasNextPage()}nextPageRequestOptions(){const e=this.last_id;return e?{...this.options,query:{...Yb(this.options.query),after:e}}:null}}const lv=()=>{var n;if(typeof File>"u"){const{process:e}=globalThis,t=typeof((n=e==null?void 0:e.versions)==null?void 0:n.node)=="string"&&parseInt(e.versions.node.split("."))<20;throw new Error("`File` is not defined as a global, which is required for file uploads."+(t?" Update to Node 20 LTS or newer, or set `globalThis.File` to `import('node:buffer').File`.":""))}};function Ei(n,e,t){return lv(),new File(n,e??"unknown_file",t)}function fo(n){return(typeof n=="object"&&n!==null&&("name"in n&&n.name&&String(n.name)||"url"in n&&n.url&&String(n.url)||"filename"in n&&n.filename&&String(n.filename)||"path"in n&&n.path&&String(n.path))||"").split(/[\\/]/).pop()||void 0}const uv=n=>n!=null&&typeof n=="object"&&typeof n[Symbol.asyncIterator]=="function",Tr=async(n,e)=>({...n,body:await u1(n.body,e)}),Cp=new WeakMap;function l1(n){const e=typeof n=="function"?n:n.fetch,t=Cp.get(e);if(t)return t;const r=(async()=>{try{const s="Response"in e?e.Response:(await e("data:,")).constructor,i=new FormData;return i.toString()!==await new s(i).text()}catch{return!0}})();return Cp.set(e,r),r}const u1=async(n,e)=>{if(!await l1(e))throw new TypeError("The provided fetch function does not support file uploads with the current global FormData class.");const t=new FormData;return await Promise.all(Object.entries(n||{}).map(([r,s])=>Iu(t,r,s))),t},h1=n=>n instanceof Blob&&"name"in n,Iu=async(n,e,t)=>{if(t!==void 0){if(t==null)throw new TypeError(`Received null for "${e}"; to pass null in FormData, you must use the string 'null'`);if(typeof t=="string"||typeof t=="number"||typeof t=="boolean")n.append(e,String(t));else if(t instanceof Response)n.append(e,Ei([await t.blob()],fo(t)));else if(uv(t))n.append(e,Ei([await new Response(ev(t)).blob()],fo(t)));else if(h1(t))n.append(e,t,fo(t));else if(Array.isArray(t))await Promise.all(t.map(r=>Iu(n,e+"[]",r)));else if(typeof t=="object")await Promise.all(Object.entries(t).map(([r,s])=>Iu(n,`${e}[${r}]`,s)));else throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${t} instead`)}},hv=n=>n!=null&&typeof n=="object"&&typeof n.size=="number"&&typeof n.type=="string"&&typeof n.text=="function"&&typeof n.slice=="function"&&typeof n.arrayBuffer=="function",d1=n=>n!=null&&typeof n=="object"&&typeof n.name=="string"&&typeof n.lastModified=="number"&&hv(n),f1=n=>n!=null&&typeof n=="object"&&typeof n.url=="string"&&typeof n.blob=="function";async function m1(n,e,t){if(lv(),n=await n,d1(n))return n instanceof File?n:Ei([await n.arrayBuffer()],n.name);if(f1(n)){const s=await n.blob();return e||(e=new URL(n.url).pathname.split(/[\\/]/).pop()),Ei(await Au(s),e,t)}const r=await Au(n);if(e||(e=fo(n)),!(t!=null&&t.type)){const s=r.find(i=>typeof i=="object"&&"type"in i&&i.type);typeof s=="string"&&(t={...t,type:s})}return Ei(r,e,t)}async function Au(n){var t;let e=[];if(typeof n=="string"||ArrayBuffer.isView(n)||n instanceof ArrayBuffer)e.push(n);else if(hv(n))e.push(n instanceof Blob?n:await n.arrayBuffer());else if(uv(n))for await(const r of n)e.push(...await Au(r));else{const r=(t=n==null?void 0:n.constructor)==null?void 0:t.name;throw new Error(`Unexpected data type: ${typeof n}${r?`; constructor: ${r}`:""}${p1(n)}`)}return e}function p1(n){return typeof n!="object"||n===null?"":`; props: [${Object.getOwnPropertyNames(n).map(t=>`"${t}"`).join(", ")}]`}class X{constructor(e){this._client=e}}function dv(n){return n.replace(/[^A-Za-z0-9\-._~!$&'()*+,;=:@]+/g,encodeURIComponent)}const Pp=Object.freeze(Object.create(null)),g1=(n=dv)=>function(t,...r){if(t.length===1)return t[0];let s=!1;const i=[],a=t.reduce((f,p,g)=>{var A;/[?#]/.test(p)&&(s=!0);const _=r[g];let T=(s?encodeURIComponent:n)(""+_);return g!==r.length&&(_==null||typeof _=="object"&&_.toString===((A=Object.getPrototypeOf(Object.getPrototypeOf(_.hasOwnProperty??Pp)??Pp))==null?void 0:A.toString))&&(T=_+"",i.push({start:f.length+p.length,length:T.length,error:`Value of type ${Object.prototype.toString.call(_).slice(8,-1)} is not a valid path parameter`})),f+p+(g===r.length?"":T)},""),l=a.split(/[?#]/,1)[0],u=new RegExp("(?<=^|\\/)(?:\\.|%2e){1,2}(?=\\/|$)","gi");let h;for(;(h=u.exec(l))!==null;)i.push({start:h.index,length:h[0].length,error:`Value "${h[0]}" can't be safely passed as a path parameter`});if(i.sort((f,p)=>f.start-p.start),i.length>0){let f=0;const p=i.reduce((g,_)=>{const T=" ".repeat(_.start-f),A="^".repeat(_.length);return f=_.start+_.length,g+T+A},"");throw new K(`Path parameters result in path with invalid segments:
${i.map(g=>g.error).join(`
`)}
${a}
${p}`)}return a},F=g1(dv);let fv=class extends X{list(e,t={},r){return this._client.getAPIList(F`/chat/completions/${e}/messages`,Re,{query:t,...r})}};function zo(n){return n!==void 0&&"function"in n&&n.function!==void 0}function zh(n){return(n==null?void 0:n.$brand)==="auto-parseable-response-format"}function ha(n){return(n==null?void 0:n.$brand)==="auto-parseable-tool"}function y1(n,e){return!e||!mv(e)?{...n,choices:n.choices.map(t=>(pv(t.message.tool_calls),{...t,message:{...t.message,parsed:null,...t.message.tool_calls?{tool_calls:t.message.tool_calls}:void 0}}))}:Gh(n,e)}function Gh(n,e){const t=n.choices.map(r=>{var s;if(r.finish_reason==="length")throw new Jb;if(r.finish_reason==="content_filter")throw new Xb;return pv(r.message.tool_calls),{...r,message:{...r.message,...r.message.tool_calls?{tool_calls:((s=r.message.tool_calls)==null?void 0:s.map(i=>b1(e,i)))??void 0}:void 0,parsed:r.message.content&&!r.message.refusal?_1(e,r.message.content):null}}});return{...n,choices:t}}function _1(n,e){var t,r;return((t=n.response_format)==null?void 0:t.type)!=="json_schema"?null:((r=n.response_format)==null?void 0:r.type)==="json_schema"?"$parseRaw"in n.response_format?n.response_format.$parseRaw(e):JSON.parse(e):null}function b1(n,e){var r;const t=(r=n.tools)==null?void 0:r.find(s=>{var i;return zo(s)&&((i=s.function)==null?void 0:i.name)===e.function.name});return{...e,function:{...e.function,parsed_arguments:ha(t)?t.$parseRaw(e.function.arguments):t!=null&&t.function.strict?JSON.parse(e.function.arguments):null}}}function v1(n,e){var r;if(!n||!("tools"in n)||!n.tools)return!1;const t=(r=n.tools)==null?void 0:r.find(s=>{var i;return zo(s)&&((i=s.function)==null?void 0:i.name)===e.function.name});return zo(t)&&(ha(t)||(t==null?void 0:t.function.strict)||!1)}function mv(n){var e;return zh(n.response_format)?!0:((e=n.tools)==null?void 0:e.some(t=>ha(t)||t.type==="function"&&t.function.strict===!0))??!1}function pv(n){for(const e of n||[])if(e.type!=="function")throw new K(`Currently only \`function\` tool calls are supported; Received \`${e.type}\``)}function w1(n){for(const e of n??[]){if(e.type!=="function")throw new K(`Currently only \`function\` tool types support auto-parsing; Received \`${e.type}\``);if(e.function.strict!==!0)throw new K(`The \`${e.function.name}\` tool is not marked with \`strict: true\`. Only strict function tools can be auto-parsed`)}}const Go=n=>(n==null?void 0:n.role)==="assistant",gv=n=>(n==null?void 0:n.role)==="tool";var Tu,mo,po,li,ui,go,hi,en,di,Ko,Qo,Yr,yv;class Kh{constructor(){Tu.add(this),this.controller=new AbortController,mo.set(this,void 0),po.set(this,()=>{}),li.set(this,()=>{}),ui.set(this,void 0),go.set(this,()=>{}),hi.set(this,()=>{}),en.set(this,{}),di.set(this,!1),Ko.set(this,!1),Qo.set(this,!1),Yr.set(this,!1),Y(this,mo,new Promise((e,t)=>{Y(this,po,e,"f"),Y(this,li,t,"f")})),Y(this,ui,new Promise((e,t)=>{Y(this,go,e,"f"),Y(this,hi,t,"f")})),P(this,mo,"f").catch(()=>{}),P(this,ui,"f").catch(()=>{})}_run(e){setTimeout(()=>{e().then(()=>{this._emitFinal(),this._emit("end")},P(this,Tu,"m",yv).bind(this))},0)}_connected(){this.ended||(P(this,po,"f").call(this),this._emit("connect"))}get ended(){return P(this,di,"f")}get errored(){return P(this,Ko,"f")}get aborted(){return P(this,Qo,"f")}abort(){this.controller.abort()}on(e,t){return(P(this,en,"f")[e]||(P(this,en,"f")[e]=[])).push({listener:t}),this}off(e,t){const r=P(this,en,"f")[e];if(!r)return this;const s=r.findIndex(i=>i.listener===t);return s>=0&&r.splice(s,1),this}once(e,t){return(P(this,en,"f")[e]||(P(this,en,"f")[e]=[])).push({listener:t,once:!0}),this}emitted(e){return new Promise((t,r)=>{Y(this,Yr,!0),e!=="error"&&this.once("error",r),this.once(e,t)})}async done(){Y(this,Yr,!0),await P(this,ui,"f")}_emit(e,...t){if(P(this,di,"f"))return;e==="end"&&(Y(this,di,!0),P(this,go,"f").call(this));const r=P(this,en,"f")[e];if(r&&(P(this,en,"f")[e]=r.filter(s=>!s.once),r.forEach(({listener:s})=>s(...t))),e==="abort"){const s=t[0];!P(this,Yr,"f")&&!(r!=null&&r.length)&&Promise.reject(s),P(this,li,"f").call(this,s),P(this,hi,"f").call(this,s),this._emit("end");return}if(e==="error"){const s=t[0];!P(this,Yr,"f")&&!(r!=null&&r.length)&&Promise.reject(s),P(this,li,"f").call(this,s),P(this,hi,"f").call(this,s),this._emit("end")}}_emitFinal(){}}mo=new WeakMap,po=new WeakMap,li=new WeakMap,ui=new WeakMap,go=new WeakMap,hi=new WeakMap,en=new WeakMap,di=new WeakMap,Ko=new WeakMap,Qo=new WeakMap,Yr=new WeakMap,Tu=new WeakSet,yv=function(e){if(Y(this,Ko,!0),e instanceof Error&&e.name==="AbortError"&&(e=new bt),e instanceof bt)return Y(this,Qo,!0),this._emit("abort",e);if(e instanceof K)return this._emit("error",e);if(e instanceof Error){const t=new K(e.message);return t.cause=e,this._emit("error",t)}return this._emit("error",new K(String(e)))};function x1(n){return typeof n.parse=="function"}var rt,Su,Jo,Ru,Cu,Pu,_v,bv;const E1=10;class vv extends Kh{constructor(){super(...arguments),rt.add(this),this._chatCompletions=[],this.messages=[]}_addChatCompletion(e){var r;this._chatCompletions.push(e),this._emit("chatCompletion",e);const t=(r=e.choices[0])==null?void 0:r.message;return t&&this._addMessage(t),e}_addMessage(e,t=!0){if("content"in e||(e.content=null),this.messages.push(e),t){if(this._emit("message",e),gv(e)&&e.content)this._emit("functionToolCallResult",e.content);else if(Go(e)&&e.tool_calls)for(const r of e.tool_calls)r.type==="function"&&this._emit("functionToolCall",r.function)}}async finalChatCompletion(){await this.done();const e=this._chatCompletions[this._chatCompletions.length-1];if(!e)throw new K("stream ended without producing a ChatCompletion");return e}async finalContent(){return await this.done(),P(this,rt,"m",Su).call(this)}async finalMessage(){return await this.done(),P(this,rt,"m",Jo).call(this)}async finalFunctionToolCall(){return await this.done(),P(this,rt,"m",Ru).call(this)}async finalFunctionToolCallResult(){return await this.done(),P(this,rt,"m",Cu).call(this)}async totalUsage(){return await this.done(),P(this,rt,"m",Pu).call(this)}allChatCompletions(){return[...this._chatCompletions]}_emitFinal(){const e=this._chatCompletions[this._chatCompletions.length-1];e&&this._emit("finalChatCompletion",e);const t=P(this,rt,"m",Jo).call(this);t&&this._emit("finalMessage",t);const r=P(this,rt,"m",Su).call(this);r&&this._emit("finalContent",r);const s=P(this,rt,"m",Ru).call(this);s&&this._emit("finalFunctionToolCall",s);const i=P(this,rt,"m",Cu).call(this);i!=null&&this._emit("finalFunctionToolCallResult",i),this._chatCompletions.some(a=>a.usage)&&this._emit("totalUsage",P(this,rt,"m",Pu).call(this))}async _createChatCompletion(e,t,r){const s=r==null?void 0:r.signal;s&&(s.aborted&&this.controller.abort(),s.addEventListener("abort",()=>this.controller.abort())),P(this,rt,"m",_v).call(this,t);const i=await e.chat.completions.create({...t,stream:!1},{...r,signal:this.controller.signal});return this._connected(),this._addChatCompletion(Gh(i,t))}async _runChatCompletion(e,t,r){for(const s of t.messages)this._addMessage(s,!1);return await this._createChatCompletion(e,t,r)}async _runTools(e,t,r){var _,T,A;const s="tool",{tool_choice:i="auto",stream:a,...l}=t,u=typeof i!="string"&&i.type==="function"&&((_=i==null?void 0:i.function)==null?void 0:_.name),{maxChatCompletions:h=E1}=r||{},f=t.tools.map(S=>{if(ha(S)){if(!S.$callback)throw new K("Tool given to `.runTools()` that does not have an associated function");return{type:"function",function:{function:S.$callback,name:S.function.name,description:S.function.description||"",parameters:S.function.parameters,parse:S.$parseRaw,strict:!0}}}return S}),p={};for(const S of f)S.type==="function"&&(p[S.function.name||S.function.function.name]=S.function);const g="tools"in t?f.map(S=>S.type==="function"?{type:"function",function:{name:S.function.name||S.function.function.name,parameters:S.function.parameters,description:S.function.description,strict:S.function.strict}}:S):void 0;for(const S of t.messages)this._addMessage(S,!1);for(let S=0;S<h;++S){const N=(T=(await this._createChatCompletion(e,{...l,tool_choice:i,tools:g,messages:[...this.messages]},r)).choices[0])==null?void 0:T.message;if(!N)throw new K("missing message in ChatCompletion response");if(!((A=N.tool_calls)!=null&&A.length))return;for(const V of N.tool_calls){if(V.type!=="function")continue;const L=V.id,{name:z,arguments:W}=V.function,x=p[z];if(x){if(u&&u!==z){const I=`Invalid tool_call: ${JSON.stringify(z)}. ${JSON.stringify(u)} requested. Please try again`;this._addMessage({role:s,tool_call_id:L,content:I});continue}}else{const I=`Invalid tool_call: ${JSON.stringify(z)}. Available options are: ${Object.keys(p).map(R=>JSON.stringify(R)).join(", ")}. Please try again`;this._addMessage({role:s,tool_call_id:L,content:I});continue}let b;try{b=x1(x)?await x.parse(W):W}catch(I){const R=I instanceof Error?I.message:String(I);this._addMessage({role:s,tool_call_id:L,content:R});continue}const v=await x.function(b,this),E=P(this,rt,"m",bv).call(this,v);if(this._addMessage({role:s,tool_call_id:L,content:E}),u)return}}}}rt=new WeakSet,Su=function(){return P(this,rt,"m",Jo).call(this).content??null},Jo=function(){let e=this.messages.length;for(;e-- >0;){const t=this.messages[e];if(Go(t))return{...t,content:t.content??null,refusal:t.refusal??null}}throw new K("stream ended without producing a ChatCompletionMessage with role=assistant")},Ru=function(){var e,t;for(let r=this.messages.length-1;r>=0;r--){const s=this.messages[r];if(Go(s)&&((e=s==null?void 0:s.tool_calls)!=null&&e.length))return(t=s.tool_calls.filter(i=>i.type==="function").at(-1))==null?void 0:t.function}},Cu=function(){for(let e=this.messages.length-1;e>=0;e--){const t=this.messages[e];if(gv(t)&&t.content!=null&&typeof t.content=="string"&&this.messages.some(r=>{var s;return r.role==="assistant"&&((s=r.tool_calls)==null?void 0:s.some(i=>i.type==="function"&&i.id===t.tool_call_id))}))return t.content}},Pu=function(){const e={completion_tokens:0,prompt_tokens:0,total_tokens:0};for(const{usage:t}of this._chatCompletions)t&&(e.completion_tokens+=t.completion_tokens,e.prompt_tokens+=t.prompt_tokens,e.total_tokens+=t.total_tokens);return e},_v=function(e){if(e.n!=null&&e.n>1)throw new K("ChatCompletion convenience helpers only support n=1 at this time. To use n>1, please use chat.completions.create() directly.")},bv=function(e){return typeof e=="string"?e:e===void 0?"undefined":JSON.stringify(e)};class Qh extends vv{static runTools(e,t,r){const s=new Qh,i={...r,headers:{...r==null?void 0:r.headers,"X-Stainless-Helper-Method":"runTools"}};return s._run(()=>s._runTools(e,t,i)),s}_addMessage(e,t=!0){super._addMessage(e,t),Go(e)&&e.content&&this._emit("content",e.content)}}const wv=1,xv=2,Ev=4,Iv=8,Av=16,Tv=32,Sv=64,Rv=128,Cv=256,Pv=Rv|Cv,kv=Av|Tv|Pv|Sv,Nv=wv|xv|kv,Dv=Ev|Iv,I1=Nv|Dv,Oe={STR:wv,NUM:xv,ARR:Ev,OBJ:Iv,NULL:Av,BOOL:Tv,NAN:Sv,INFINITY:Rv,MINUS_INFINITY:Cv,INF:Pv,SPECIAL:kv,ATOM:Nv,COLLECTION:Dv,ALL:I1};class A1 extends Error{}class T1 extends Error{}function S1(n,e=Oe.ALL){if(typeof n!="string")throw new TypeError(`expecting str, got ${typeof n}`);if(!n.trim())throw new Error(`${n} is empty`);return R1(n.trim(),e)}const R1=(n,e)=>{const t=n.length;let r=0;const s=g=>{throw new A1(`${g} at position ${r}`)},i=g=>{throw new T1(`${g} at position ${r}`)},a=()=>(p(),r>=t&&s("Unexpected end of input"),n[r]==='"'?l():n[r]==="{"?u():n[r]==="["?h():n.substring(r,r+4)==="null"||Oe.NULL&e&&t-r<4&&"null".startsWith(n.substring(r))?(r+=4,null):n.substring(r,r+4)==="true"||Oe.BOOL&e&&t-r<4&&"true".startsWith(n.substring(r))?(r+=4,!0):n.substring(r,r+5)==="false"||Oe.BOOL&e&&t-r<5&&"false".startsWith(n.substring(r))?(r+=5,!1):n.substring(r,r+8)==="Infinity"||Oe.INFINITY&e&&t-r<8&&"Infinity".startsWith(n.substring(r))?(r+=8,1/0):n.substring(r,r+9)==="-Infinity"||Oe.MINUS_INFINITY&e&&1<t-r&&t-r<9&&"-Infinity".startsWith(n.substring(r))?(r+=9,-1/0):n.substring(r,r+3)==="NaN"||Oe.NAN&e&&t-r<3&&"NaN".startsWith(n.substring(r))?(r+=3,NaN):f()),l=()=>{const g=r;let _=!1;for(r++;r<t&&(n[r]!=='"'||_&&n[r-1]==="\\");)_=n[r]==="\\"?!_:!1,r++;if(n.charAt(r)=='"')try{return JSON.parse(n.substring(g,++r-Number(_)))}catch(T){i(String(T))}else if(Oe.STR&e)try{return JSON.parse(n.substring(g,r-Number(_))+'"')}catch{return JSON.parse(n.substring(g,n.lastIndexOf("\\"))+'"')}s("Unterminated string literal")},u=()=>{r++,p();const g={};try{for(;n[r]!=="}";){if(p(),r>=t&&Oe.OBJ&e)return g;const _=l();p(),r++;try{const T=a();Object.defineProperty(g,_,{value:T,writable:!0,enumerable:!0,configurable:!0})}catch(T){if(Oe.OBJ&e)return g;throw T}p(),n[r]===","&&r++}}catch{if(Oe.OBJ&e)return g;s("Expected '}' at end of object")}return r++,g},h=()=>{r++;const g=[];try{for(;n[r]!=="]";)g.push(a()),p(),n[r]===","&&r++}catch{if(Oe.ARR&e)return g;s("Expected ']' at end of array")}return r++,g},f=()=>{if(r===0){n==="-"&&Oe.NUM&e&&s("Not sure what '-' is");try{return JSON.parse(n)}catch(_){if(Oe.NUM&e)try{return n[n.length-1]==="."?JSON.parse(n.substring(0,n.lastIndexOf("."))):JSON.parse(n.substring(0,n.lastIndexOf("e")))}catch{}i(String(_))}}const g=r;for(n[r]==="-"&&r++;n[r]&&!",]}".includes(n[r]);)r++;r==t&&!(Oe.NUM&e)&&s("Unterminated number literal");try{return JSON.parse(n.substring(g,r))}catch{n.substring(g,r)==="-"&&Oe.NUM&e&&s("Not sure what '-' is");try{return JSON.parse(n.substring(g,n.lastIndexOf("e")))}catch(T){i(String(T))}}},p=()=>{for(;r<t&&` 
\r	`.includes(n[r]);)r++};return a()},kp=n=>S1(n,Oe.ALL^Oe.NUM);var Ce,Zt,jr,An,Ll,qa,Vl,Ul,Fl,Ha,$l,Np;class $i extends vv{constructor(e){super(),Ce.add(this),Zt.set(this,void 0),jr.set(this,void 0),An.set(this,void 0),Y(this,Zt,e),Y(this,jr,[])}get currentChatCompletionSnapshot(){return P(this,An,"f")}static fromReadableStream(e){const t=new $i(null);return t._run(()=>t._fromReadableStream(e)),t}static createChatCompletion(e,t,r){const s=new $i(t);return s._run(()=>s._runChatCompletion(e,{...t,stream:!0},{...r,headers:{...r==null?void 0:r.headers,"X-Stainless-Helper-Method":"stream"}})),s}async _createChatCompletion(e,t,r){var a;super._createChatCompletion;const s=r==null?void 0:r.signal;s&&(s.aborted&&this.controller.abort(),s.addEventListener("abort",()=>this.controller.abort())),P(this,Ce,"m",Ll).call(this);const i=await e.chat.completions.create({...t,stream:!0},{...r,signal:this.controller.signal});this._connected();for await(const l of i)P(this,Ce,"m",Vl).call(this,l);if((a=i.controller.signal)!=null&&a.aborted)throw new bt;return this._addChatCompletion(P(this,Ce,"m",Ha).call(this))}async _fromReadableStream(e,t){var a;const r=t==null?void 0:t.signal;r&&(r.aborted&&this.controller.abort(),r.addEventListener("abort",()=>this.controller.abort())),P(this,Ce,"m",Ll).call(this),this._connected();const s=jt.fromReadableStream(e,this.controller);let i;for await(const l of s)i&&i!==l.id&&this._addChatCompletion(P(this,Ce,"m",Ha).call(this)),P(this,Ce,"m",Vl).call(this,l),i=l.id;if((a=s.controller.signal)!=null&&a.aborted)throw new bt;return this._addChatCompletion(P(this,Ce,"m",Ha).call(this))}[(Zt=new WeakMap,jr=new WeakMap,An=new WeakMap,Ce=new WeakSet,Ll=function(){this.ended||Y(this,An,void 0)},qa=function(t){let r=P(this,jr,"f")[t.index];return r||(r={content_done:!1,refusal_done:!1,logprobs_content_done:!1,logprobs_refusal_done:!1,done_tool_calls:new Set,current_tool_call_index:null},P(this,jr,"f")[t.index]=r,r)},Vl=function(t){var s,i,a,l,u,h,f,p,g,_,T,A,S,U,N;if(this.ended)return;const r=P(this,Ce,"m",Np).call(this,t);this._emit("chunk",t,r);for(const V of t.choices){const L=r.choices[V.index];V.delta.content!=null&&((s=L.message)==null?void 0:s.role)==="assistant"&&((i=L.message)!=null&&i.content)&&(this._emit("content",V.delta.content,L.message.content),this._emit("content.delta",{delta:V.delta.content,snapshot:L.message.content,parsed:L.message.parsed})),V.delta.refusal!=null&&((a=L.message)==null?void 0:a.role)==="assistant"&&((l=L.message)!=null&&l.refusal)&&this._emit("refusal.delta",{delta:V.delta.refusal,snapshot:L.message.refusal}),((u=V.logprobs)==null?void 0:u.content)!=null&&((h=L.message)==null?void 0:h.role)==="assistant"&&this._emit("logprobs.content.delta",{content:(f=V.logprobs)==null?void 0:f.content,snapshot:((p=L.logprobs)==null?void 0:p.content)??[]}),((g=V.logprobs)==null?void 0:g.refusal)!=null&&((_=L.message)==null?void 0:_.role)==="assistant"&&this._emit("logprobs.refusal.delta",{refusal:(T=V.logprobs)==null?void 0:T.refusal,snapshot:((A=L.logprobs)==null?void 0:A.refusal)??[]});const z=P(this,Ce,"m",qa).call(this,L);L.finish_reason&&(P(this,Ce,"m",Fl).call(this,L),z.current_tool_call_index!=null&&P(this,Ce,"m",Ul).call(this,L,z.current_tool_call_index));for(const W of V.delta.tool_calls??[])z.current_tool_call_index!==W.index&&(P(this,Ce,"m",Fl).call(this,L),z.current_tool_call_index!=null&&P(this,Ce,"m",Ul).call(this,L,z.current_tool_call_index)),z.current_tool_call_index=W.index;for(const W of V.delta.tool_calls??[]){const x=(S=L.message.tool_calls)==null?void 0:S[W.index];x!=null&&x.type&&((x==null?void 0:x.type)==="function"?this._emit("tool_calls.function.arguments.delta",{name:(U=x.function)==null?void 0:U.name,index:W.index,arguments:x.function.arguments,parsed_arguments:x.function.parsed_arguments,arguments_delta:((N=W.function)==null?void 0:N.arguments)??""}):(x==null||x.type,void 0))}}},Ul=function(t,r){var a,l,u;if(P(this,Ce,"m",qa).call(this,t).done_tool_calls.has(r))return;const i=(a=t.message.tool_calls)==null?void 0:a[r];if(!i)throw new Error("no tool call snapshot");if(!i.type)throw new Error("tool call snapshot missing `type`");if(i.type==="function"){const h=(u=(l=P(this,Zt,"f"))==null?void 0:l.tools)==null?void 0:u.find(f=>zo(f)&&f.function.name===i.function.name);this._emit("tool_calls.function.arguments.done",{name:i.function.name,index:r,arguments:i.function.arguments,parsed_arguments:ha(h)?h.$parseRaw(i.function.arguments):h!=null&&h.function.strict?JSON.parse(i.function.arguments):null})}else i.type},Fl=function(t){var s,i;const r=P(this,Ce,"m",qa).call(this,t);if(t.message.content&&!r.content_done){r.content_done=!0;const a=P(this,Ce,"m",$l).call(this);this._emit("content.done",{content:t.message.content,parsed:a?a.$parseRaw(t.message.content):null})}t.message.refusal&&!r.refusal_done&&(r.refusal_done=!0,this._emit("refusal.done",{refusal:t.message.refusal})),(s=t.logprobs)!=null&&s.content&&!r.logprobs_content_done&&(r.logprobs_content_done=!0,this._emit("logprobs.content.done",{content:t.logprobs.content})),(i=t.logprobs)!=null&&i.refusal&&!r.logprobs_refusal_done&&(r.logprobs_refusal_done=!0,this._emit("logprobs.refusal.done",{refusal:t.logprobs.refusal}))},Ha=function(){if(this.ended)throw new K("stream has ended, this shouldn't happen");const t=P(this,An,"f");if(!t)throw new K("request ended without sending any chunks");return Y(this,An,void 0),Y(this,jr,[]),C1(t,P(this,Zt,"f"))},$l=function(){var r;const t=(r=P(this,Zt,"f"))==null?void 0:r.response_format;return zh(t)?t:null},Np=function(t){var r,s,i,a;let l=P(this,An,"f");const{choices:u,...h}=t;l?Object.assign(l,h):l=Y(this,An,{...h,choices:[]});for(const{delta:f,finish_reason:p,index:g,logprobs:_=null,...T}of t.choices){let A=l.choices[g];if(A||(A=l.choices[g]={finish_reason:p,index:g,message:{},logprobs:_,...T}),_)if(!A.logprobs)A.logprobs=Object.assign({},_);else{const{content:W,refusal:x,...b}=_;Object.assign(A.logprobs,b),W&&((r=A.logprobs).content??(r.content=[]),A.logprobs.content.push(...W)),x&&((s=A.logprobs).refusal??(s.refusal=[]),A.logprobs.refusal.push(...x))}if(p&&(A.finish_reason=p,P(this,Zt,"f")&&mv(P(this,Zt,"f")))){if(p==="length")throw new Jb;if(p==="content_filter")throw new Xb}if(Object.assign(A,T),!f)continue;const{content:S,refusal:U,function_call:N,role:V,tool_calls:L,...z}=f;if(Object.assign(A.message,z),U&&(A.message.refusal=(A.message.refusal||"")+U),V&&(A.message.role=V),N&&(A.message.function_call?(N.name&&(A.message.function_call.name=N.name),N.arguments&&((i=A.message.function_call).arguments??(i.arguments=""),A.message.function_call.arguments+=N.arguments)):A.message.function_call=N),S&&(A.message.content=(A.message.content||"")+S,!A.message.refusal&&P(this,Ce,"m",$l).call(this)&&(A.message.parsed=kp(A.message.content))),L){A.message.tool_calls||(A.message.tool_calls=[]);for(const{index:W,id:x,type:b,function:v,...E}of L){const I=(a=A.message.tool_calls)[W]??(a[W]={});Object.assign(I,E),x&&(I.id=x),b&&(I.type=b),v&&(I.function??(I.function={name:v.name??"",arguments:""})),v!=null&&v.name&&(I.function.name=v.name),v!=null&&v.arguments&&(I.function.arguments+=v.arguments,v1(P(this,Zt,"f"),I)&&(I.function.parsed_arguments=kp(I.function.arguments)))}}}return l},Symbol.asyncIterator)](){const e=[],t=[];let r=!1;return this.on("chunk",s=>{const i=t.shift();i?i.resolve(s):e.push(s)}),this.on("end",()=>{r=!0;for(const s of t)s.resolve(void 0);t.length=0}),this.on("abort",s=>{r=!0;for(const i of t)i.reject(s);t.length=0}),this.on("error",s=>{r=!0;for(const i of t)i.reject(s);t.length=0}),{next:async()=>e.length?{value:e.shift(),done:!1}:r?{value:void 0,done:!0}:new Promise((i,a)=>t.push({resolve:i,reject:a})).then(i=>i?{value:i,done:!1}:{value:void 0,done:!0}),return:async()=>(this.abort(),{value:void 0,done:!0})}}toReadableStream(){return new jt(this[Symbol.asyncIterator].bind(this),this.controller).toReadableStream()}}function C1(n,e){const{id:t,choices:r,created:s,model:i,system_fingerprint:a,...l}=n,u={...l,id:t,choices:r.map(({message:h,finish_reason:f,index:p,logprobs:g,..._})=>{if(!f)throw new K(`missing finish_reason for choice ${p}`);const{content:T=null,function_call:A,tool_calls:S,...U}=h,N=h.role;if(!N)throw new K(`missing role for choice ${p}`);if(A){const{arguments:V,name:L}=A;if(V==null)throw new K(`missing function_call.arguments for choice ${p}`);if(!L)throw new K(`missing function_call.name for choice ${p}`);return{..._,message:{content:T,function_call:{arguments:V,name:L},role:N,refusal:h.refusal??null},finish_reason:f,index:p,logprobs:g}}return S?{..._,index:p,finish_reason:f,logprobs:g,message:{...U,role:N,content:T,refusal:h.refusal??null,tool_calls:S.map((V,L)=>{const{function:z,type:W,id:x,...b}=V,{arguments:v,name:E,...I}=z||{};if(x==null)throw new K(`missing choices[${p}].tool_calls[${L}].id
${Wa(n)}`);if(W==null)throw new K(`missing choices[${p}].tool_calls[${L}].type
${Wa(n)}`);if(E==null)throw new K(`missing choices[${p}].tool_calls[${L}].function.name
${Wa(n)}`);if(v==null)throw new K(`missing choices[${p}].tool_calls[${L}].function.arguments
${Wa(n)}`);return{...b,id:x,type:W,function:{...I,name:E,arguments:v}}})}}:{..._,message:{...U,content:T,role:N,refusal:h.refusal??null},finish_reason:f,index:p,logprobs:g}}),created:s,model:i,object:"chat.completion",...a?{system_fingerprint:a}:{}};return y1(u,e)}function Wa(n){return JSON.stringify(n)}class Xo extends $i{static fromReadableStream(e){const t=new Xo(null);return t._run(()=>t._fromReadableStream(e)),t}static runTools(e,t,r){const s=new Xo(t),i={...r,headers:{...r==null?void 0:r.headers,"X-Stainless-Helper-Method":"runTools"}};return s._run(()=>s._runTools(e,t,i)),s}}let Jh=class extends X{constructor(){super(...arguments),this.messages=new fv(this._client)}create(e,t){return this._client.post("/chat/completions",{body:e,...t,stream:e.stream??!1})}retrieve(e,t){return this._client.get(F`/chat/completions/${e}`,t)}update(e,t,r){return this._client.post(F`/chat/completions/${e}`,{body:t,...r})}list(e={},t){return this._client.getAPIList("/chat/completions",Re,{query:e,...t})}delete(e,t){return this._client.delete(F`/chat/completions/${e}`,t)}parse(e,t){return w1(e.tools),this._client.chat.completions.create(e,{...t,headers:{...t==null?void 0:t.headers,"X-Stainless-Helper-Method":"chat.completions.parse"}})._thenUnwrap(r=>Gh(r,e))}runTools(e,t){return e.stream?Xo.runTools(this._client,e,t):Qh.runTools(this._client,e,t)}stream(e,t){return $i.createChatCompletion(this._client,e,t)}};Jh.Messages=fv;class Xh extends X{constructor(){super(...arguments),this.completions=new Jh(this._client)}}Xh.Completions=Jh;const Ov=Symbol("brand.privateNullableHeaders");function*P1(n){if(!n)return;if(Ov in n){const{values:r,nulls:s}=n;yield*r.entries();for(const i of s)yield[i,null];return}let e=!1,t;n instanceof Headers?t=n.entries():yp(n)?t=n:(e=!0,t=Object.entries(n??{}));for(let r of t){const s=r[0];if(typeof s!="string")throw new TypeError("expected header name to be a string");const i=yp(r[1])?r[1]:[r[1]];let a=!1;for(const l of i)l!==void 0&&(e&&!a&&(a=!0,yield[s,null]),yield[s,l])}}const H=n=>{const e=new Headers,t=new Set;for(const r of n){const s=new Set;for(const[i,a]of P1(r)){const l=i.toLowerCase();s.has(l)||(e.delete(i),s.add(l)),a===null?(e.delete(i),t.add(l)):(e.append(i,a),t.delete(l))}}return{[Ov]:!0,values:e,nulls:t}};class Mv extends X{create(e,t){return this._client.post("/audio/speech",{body:e,...t,headers:H([{Accept:"application/octet-stream"},t==null?void 0:t.headers]),__binaryResponse:!0})}}class Lv extends X{create(e,t){return this._client.post("/audio/transcriptions",Tr({body:e,...t,stream:e.stream??!1,__metadata:{model:e.model}},this._client))}}class Vv extends X{create(e,t){return this._client.post("/audio/translations",Tr({body:e,...t,__metadata:{model:e.model}},this._client))}}class da extends X{constructor(){super(...arguments),this.transcriptions=new Lv(this._client),this.translations=new Vv(this._client),this.speech=new Mv(this._client)}}da.Transcriptions=Lv;da.Translations=Vv;da.Speech=Mv;class Uv extends X{create(e,t){return this._client.post("/batches",{body:e,...t})}retrieve(e,t){return this._client.get(F`/batches/${e}`,t)}list(e={},t){return this._client.getAPIList("/batches",Re,{query:e,...t})}cancel(e,t){return this._client.post(F`/batches/${e}/cancel`,t)}}class Fv extends X{create(e,t){return this._client.post("/assistants",{body:e,...t,headers:H([{"OpenAI-Beta":"assistants=v2"},t==null?void 0:t.headers])})}retrieve(e,t){return this._client.get(F`/assistants/${e}`,{...t,headers:H([{"OpenAI-Beta":"assistants=v2"},t==null?void 0:t.headers])})}update(e,t,r){return this._client.post(F`/assistants/${e}`,{body:t,...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}list(e={},t){return this._client.getAPIList("/assistants",Re,{query:e,...t,headers:H([{"OpenAI-Beta":"assistants=v2"},t==null?void 0:t.headers])})}delete(e,t){return this._client.delete(F`/assistants/${e}`,{...t,headers:H([{"OpenAI-Beta":"assistants=v2"},t==null?void 0:t.headers])})}}class $v extends X{create(e,t){return this._client.post("/realtime/sessions",{body:e,...t,headers:H([{"OpenAI-Beta":"assistants=v2"},t==null?void 0:t.headers])})}}class jv extends X{create(e,t){return this._client.post("/realtime/transcription_sessions",{body:e,...t,headers:H([{"OpenAI-Beta":"assistants=v2"},t==null?void 0:t.headers])})}}class Dc extends X{constructor(){super(...arguments),this.sessions=new $v(this._client),this.transcriptionSessions=new jv(this._client)}}Dc.Sessions=$v;Dc.TranscriptionSessions=jv;class Bv extends X{create(e,t,r){return this._client.post(F`/threads/${e}/messages`,{body:t,...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}retrieve(e,t,r){const{thread_id:s}=t;return this._client.get(F`/threads/${s}/messages/${e}`,{...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}update(e,t,r){const{thread_id:s,...i}=t;return this._client.post(F`/threads/${s}/messages/${e}`,{body:i,...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}list(e,t={},r){return this._client.getAPIList(F`/threads/${e}/messages`,Re,{query:t,...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}delete(e,t,r){const{thread_id:s}=t;return this._client.delete(F`/threads/${s}/messages/${e}`,{...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}}class qv extends X{retrieve(e,t,r){const{thread_id:s,run_id:i,...a}=t;return this._client.get(F`/threads/${s}/runs/${i}/steps/${e}`,{query:a,...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}list(e,t,r){const{thread_id:s,...i}=t;return this._client.getAPIList(F`/threads/${s}/runs/${e}/steps`,Re,{query:i,...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}}const k1=n=>{if(typeof Buffer<"u"){const e=Buffer.from(n,"base64");return Array.from(new Float32Array(e.buffer,e.byteOffset,e.length/Float32Array.BYTES_PER_ELEMENT))}else{const e=atob(n),t=e.length,r=new Uint8Array(t);for(let s=0;s<t;s++)r[s]=e.charCodeAt(s);return Array.from(new Float32Array(r.buffer))}};var jl={};const Br=n=>{var e,t,r,s;if(typeof globalThis.process<"u")return((e=jl==null?void 0:jl[n])==null?void 0:e.trim())??void 0;if(typeof globalThis.Deno<"u")return(s=(r=(t=globalThis.Deno.env)==null?void 0:t.get)==null?void 0:r.call(t,n))==null?void 0:s.trim()};var Fe,dr,ku,$t,yo,Et,fr,rs,cr,Yo,dt,_o,bo,Ii,fi,mi,Dp,Op,Mp,Lp,Vp,Up,Fp;class Ai extends Kh{constructor(){super(...arguments),Fe.add(this),ku.set(this,[]),$t.set(this,{}),yo.set(this,{}),Et.set(this,void 0),fr.set(this,void 0),rs.set(this,void 0),cr.set(this,void 0),Yo.set(this,void 0),dt.set(this,void 0),_o.set(this,void 0),bo.set(this,void 0),Ii.set(this,void 0)}[(ku=new WeakMap,$t=new WeakMap,yo=new WeakMap,Et=new WeakMap,fr=new WeakMap,rs=new WeakMap,cr=new WeakMap,Yo=new WeakMap,dt=new WeakMap,_o=new WeakMap,bo=new WeakMap,Ii=new WeakMap,Fe=new WeakSet,Symbol.asyncIterator)](){const e=[],t=[];let r=!1;return this.on("event",s=>{const i=t.shift();i?i.resolve(s):e.push(s)}),this.on("end",()=>{r=!0;for(const s of t)s.resolve(void 0);t.length=0}),this.on("abort",s=>{r=!0;for(const i of t)i.reject(s);t.length=0}),this.on("error",s=>{r=!0;for(const i of t)i.reject(s);t.length=0}),{next:async()=>e.length?{value:e.shift(),done:!1}:r?{value:void 0,done:!0}:new Promise((i,a)=>t.push({resolve:i,reject:a})).then(i=>i?{value:i,done:!1}:{value:void 0,done:!0}),return:async()=>(this.abort(),{value:void 0,done:!0})}}static fromReadableStream(e){const t=new dr;return t._run(()=>t._fromReadableStream(e)),t}async _fromReadableStream(e,t){var i;const r=t==null?void 0:t.signal;r&&(r.aborted&&this.controller.abort(),r.addEventListener("abort",()=>this.controller.abort())),this._connected();const s=jt.fromReadableStream(e,this.controller);for await(const a of s)P(this,Fe,"m",fi).call(this,a);if((i=s.controller.signal)!=null&&i.aborted)throw new bt;return this._addRun(P(this,Fe,"m",mi).call(this))}toReadableStream(){return new jt(this[Symbol.asyncIterator].bind(this),this.controller).toReadableStream()}static createToolAssistantStream(e,t,r,s){const i=new dr;return i._run(()=>i._runToolAssistantStream(e,t,r,{...s,headers:{...s==null?void 0:s.headers,"X-Stainless-Helper-Method":"stream"}})),i}async _createToolAssistantStream(e,t,r,s){var u;const i=s==null?void 0:s.signal;i&&(i.aborted&&this.controller.abort(),i.addEventListener("abort",()=>this.controller.abort()));const a={...r,stream:!0},l=await e.submitToolOutputs(t,a,{...s,signal:this.controller.signal});this._connected();for await(const h of l)P(this,Fe,"m",fi).call(this,h);if((u=l.controller.signal)!=null&&u.aborted)throw new bt;return this._addRun(P(this,Fe,"m",mi).call(this))}static createThreadAssistantStream(e,t,r){const s=new dr;return s._run(()=>s._threadAssistantStream(e,t,{...r,headers:{...r==null?void 0:r.headers,"X-Stainless-Helper-Method":"stream"}})),s}static createAssistantStream(e,t,r,s){const i=new dr;return i._run(()=>i._runAssistantStream(e,t,r,{...s,headers:{...s==null?void 0:s.headers,"X-Stainless-Helper-Method":"stream"}})),i}currentEvent(){return P(this,_o,"f")}currentRun(){return P(this,bo,"f")}currentMessageSnapshot(){return P(this,Et,"f")}currentRunStepSnapshot(){return P(this,Ii,"f")}async finalRunSteps(){return await this.done(),Object.values(P(this,$t,"f"))}async finalMessages(){return await this.done(),Object.values(P(this,yo,"f"))}async finalRun(){if(await this.done(),!P(this,fr,"f"))throw Error("Final run was not received.");return P(this,fr,"f")}async _createThreadAssistantStream(e,t,r){var l;const s=r==null?void 0:r.signal;s&&(s.aborted&&this.controller.abort(),s.addEventListener("abort",()=>this.controller.abort()));const i={...t,stream:!0},a=await e.createAndRun(i,{...r,signal:this.controller.signal});this._connected();for await(const u of a)P(this,Fe,"m",fi).call(this,u);if((l=a.controller.signal)!=null&&l.aborted)throw new bt;return this._addRun(P(this,Fe,"m",mi).call(this))}async _createAssistantStream(e,t,r,s){var u;const i=s==null?void 0:s.signal;i&&(i.aborted&&this.controller.abort(),i.addEventListener("abort",()=>this.controller.abort()));const a={...r,stream:!0},l=await e.create(t,a,{...s,signal:this.controller.signal});this._connected();for await(const h of l)P(this,Fe,"m",fi).call(this,h);if((u=l.controller.signal)!=null&&u.aborted)throw new bt;return this._addRun(P(this,Fe,"m",mi).call(this))}static accumulateDelta(e,t){for(const[r,s]of Object.entries(t)){if(!e.hasOwnProperty(r)){e[r]=s;continue}let i=e[r];if(i==null){e[r]=s;continue}if(r==="index"||r==="type"){e[r]=s;continue}if(typeof i=="string"&&typeof s=="string")i+=s;else if(typeof i=="number"&&typeof s=="number")i+=s;else if(Dl(i)&&Dl(s))i=this.accumulateDelta(i,s);else if(Array.isArray(i)&&Array.isArray(s)){if(i.every(a=>typeof a=="string"||typeof a=="number")){i.push(...s);continue}for(const a of s){if(!Dl(a))throw new Error(`Expected array delta entry to be an object but got: ${a}`);const l=a.index;if(l==null)throw console.error(a),new Error("Expected array delta entry to have an `index` property");if(typeof l!="number")throw new Error(`Expected array delta entry \`index\` property to be a number but got ${l}`);const u=i[l];u==null?i.push(a):i[l]=this.accumulateDelta(u,a)}continue}else throw Error(`Unhandled record type: ${r}, deltaValue: ${s}, accValue: ${i}`);e[r]=i}return e}_addRun(e){return e}async _threadAssistantStream(e,t,r){return await this._createThreadAssistantStream(t,e,r)}async _runAssistantStream(e,t,r,s){return await this._createAssistantStream(t,e,r,s)}async _runToolAssistantStream(e,t,r,s){return await this._createToolAssistantStream(t,e,r,s)}}dr=Ai,fi=function(e){if(!this.ended)switch(Y(this,_o,e),P(this,Fe,"m",Mp).call(this,e),e.event){case"thread.created":break;case"thread.run.created":case"thread.run.queued":case"thread.run.in_progress":case"thread.run.requires_action":case"thread.run.completed":case"thread.run.incomplete":case"thread.run.failed":case"thread.run.cancelling":case"thread.run.cancelled":case"thread.run.expired":P(this,Fe,"m",Fp).call(this,e);break;case"thread.run.step.created":case"thread.run.step.in_progress":case"thread.run.step.delta":case"thread.run.step.completed":case"thread.run.step.failed":case"thread.run.step.cancelled":case"thread.run.step.expired":P(this,Fe,"m",Op).call(this,e);break;case"thread.message.created":case"thread.message.in_progress":case"thread.message.delta":case"thread.message.completed":case"thread.message.incomplete":P(this,Fe,"m",Dp).call(this,e);break;case"error":throw new Error("Encountered an error event in event processing - errors should be processed earlier")}},mi=function(){if(this.ended)throw new K("stream has ended, this shouldn't happen");if(!P(this,fr,"f"))throw Error("Final run has not been received");return P(this,fr,"f")},Dp=function(e){const[t,r]=P(this,Fe,"m",Vp).call(this,e,P(this,Et,"f"));Y(this,Et,t),P(this,yo,"f")[t.id]=t;for(const s of r){const i=t.content[s.index];(i==null?void 0:i.type)=="text"&&this._emit("textCreated",i.text)}switch(e.event){case"thread.message.created":this._emit("messageCreated",e.data);break;case"thread.message.in_progress":break;case"thread.message.delta":if(this._emit("messageDelta",e.data.delta,t),e.data.delta.content)for(const s of e.data.delta.content){if(s.type=="text"&&s.text){let i=s.text,a=t.content[s.index];if(a&&a.type=="text")this._emit("textDelta",i,a.text);else throw Error("The snapshot associated with this text delta is not text or missing")}if(s.index!=P(this,rs,"f")){if(P(this,cr,"f"))switch(P(this,cr,"f").type){case"text":this._emit("textDone",P(this,cr,"f").text,P(this,Et,"f"));break;case"image_file":this._emit("imageFileDone",P(this,cr,"f").image_file,P(this,Et,"f"));break}Y(this,rs,s.index)}Y(this,cr,t.content[s.index])}break;case"thread.message.completed":case"thread.message.incomplete":if(P(this,rs,"f")!==void 0){const s=e.data.content[P(this,rs,"f")];if(s)switch(s.type){case"image_file":this._emit("imageFileDone",s.image_file,P(this,Et,"f"));break;case"text":this._emit("textDone",s.text,P(this,Et,"f"));break}}P(this,Et,"f")&&this._emit("messageDone",e.data),Y(this,Et,void 0)}},Op=function(e){const t=P(this,Fe,"m",Lp).call(this,e);switch(Y(this,Ii,t),e.event){case"thread.run.step.created":this._emit("runStepCreated",e.data);break;case"thread.run.step.delta":const r=e.data.delta;if(r.step_details&&r.step_details.type=="tool_calls"&&r.step_details.tool_calls&&t.step_details.type=="tool_calls")for(const i of r.step_details.tool_calls)i.index==P(this,Yo,"f")?this._emit("toolCallDelta",i,t.step_details.tool_calls[i.index]):(P(this,dt,"f")&&this._emit("toolCallDone",P(this,dt,"f")),Y(this,Yo,i.index),Y(this,dt,t.step_details.tool_calls[i.index]),P(this,dt,"f")&&this._emit("toolCallCreated",P(this,dt,"f")));this._emit("runStepDelta",e.data.delta,t);break;case"thread.run.step.completed":case"thread.run.step.failed":case"thread.run.step.cancelled":case"thread.run.step.expired":Y(this,Ii,void 0),e.data.step_details.type=="tool_calls"&&P(this,dt,"f")&&(this._emit("toolCallDone",P(this,dt,"f")),Y(this,dt,void 0)),this._emit("runStepDone",e.data,t);break}},Mp=function(e){P(this,ku,"f").push(e),this._emit("event",e)},Lp=function(e){switch(e.event){case"thread.run.step.created":return P(this,$t,"f")[e.data.id]=e.data,e.data;case"thread.run.step.delta":let t=P(this,$t,"f")[e.data.id];if(!t)throw Error("Received a RunStepDelta before creation of a snapshot");let r=e.data;if(r.delta){const s=dr.accumulateDelta(t,r.delta);P(this,$t,"f")[e.data.id]=s}return P(this,$t,"f")[e.data.id];case"thread.run.step.completed":case"thread.run.step.failed":case"thread.run.step.cancelled":case"thread.run.step.expired":case"thread.run.step.in_progress":P(this,$t,"f")[e.data.id]=e.data;break}if(P(this,$t,"f")[e.data.id])return P(this,$t,"f")[e.data.id];throw new Error("No snapshot available")},Vp=function(e,t){let r=[];switch(e.event){case"thread.message.created":return[e.data,r];case"thread.message.delta":if(!t)throw Error("Received a delta with no existing snapshot (there should be one from message creation)");let s=e.data;if(s.delta.content)for(const i of s.delta.content)if(i.index in t.content){let a=t.content[i.index];t.content[i.index]=P(this,Fe,"m",Up).call(this,i,a)}else t.content[i.index]=i,r.push(i);return[t,r];case"thread.message.in_progress":case"thread.message.completed":case"thread.message.incomplete":if(t)return[t,r];throw Error("Received thread message event with no existing snapshot")}throw Error("Tried to accumulate a non-message event")},Up=function(e,t){return dr.accumulateDelta(t,e)},Fp=function(e){switch(Y(this,bo,e.data),e.event){case"thread.run.created":break;case"thread.run.queued":break;case"thread.run.in_progress":break;case"thread.run.requires_action":case"thread.run.cancelled":case"thread.run.failed":case"thread.run.completed":case"thread.run.expired":case"thread.run.incomplete":Y(this,fr,e.data),P(this,dt,"f")&&(this._emit("toolCallDone",P(this,dt,"f")),Y(this,dt,void 0));break}};let Yh=class extends X{constructor(){super(...arguments),this.steps=new qv(this._client)}create(e,t,r){const{include:s,...i}=t;return this._client.post(F`/threads/${e}/runs`,{query:{include:s},body:i,...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers]),stream:t.stream??!1})}retrieve(e,t,r){const{thread_id:s}=t;return this._client.get(F`/threads/${s}/runs/${e}`,{...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}update(e,t,r){const{thread_id:s,...i}=t;return this._client.post(F`/threads/${s}/runs/${e}`,{body:i,...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}list(e,t={},r){return this._client.getAPIList(F`/threads/${e}/runs`,Re,{query:t,...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}cancel(e,t,r){const{thread_id:s}=t;return this._client.post(F`/threads/${s}/runs/${e}/cancel`,{...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}async createAndPoll(e,t,r){const s=await this.create(e,t,r);return await this.poll(s.id,{thread_id:e},r)}createAndStream(e,t,r){return Ai.createAssistantStream(e,this._client.beta.threads.runs,t,r)}async poll(e,t,r){var i;const s=H([r==null?void 0:r.headers,{"X-Stainless-Poll-Helper":"true","X-Stainless-Custom-Poll-Interval":((i=r==null?void 0:r.pollIntervalMs)==null?void 0:i.toString())??void 0}]);for(;;){const{data:a,response:l}=await this.retrieve(e,t,{...r,headers:{...r==null?void 0:r.headers,...s}}).withResponse();switch(a.status){case"queued":case"in_progress":case"cancelling":let u=5e3;if(r!=null&&r.pollIntervalMs)u=r.pollIntervalMs;else{const h=l.headers.get("openai-poll-after-ms");if(h){const f=parseInt(h);isNaN(f)||(u=f)}}await ua(u);break;case"requires_action":case"incomplete":case"cancelled":case"completed":case"failed":case"expired":return a}}}stream(e,t,r){return Ai.createAssistantStream(e,this._client.beta.threads.runs,t,r)}submitToolOutputs(e,t,r){const{thread_id:s,...i}=t;return this._client.post(F`/threads/${s}/runs/${e}/submit_tool_outputs`,{body:i,...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers]),stream:t.stream??!1})}async submitToolOutputsAndPoll(e,t,r){const s=await this.submitToolOutputs(e,t,r);return await this.poll(s.id,t,r)}submitToolOutputsStream(e,t,r){return Ai.createToolAssistantStream(e,this._client.beta.threads.runs,t,r)}};Yh.Steps=qv;class Oc extends X{constructor(){super(...arguments),this.runs=new Yh(this._client),this.messages=new Bv(this._client)}create(e={},t){return this._client.post("/threads",{body:e,...t,headers:H([{"OpenAI-Beta":"assistants=v2"},t==null?void 0:t.headers])})}retrieve(e,t){return this._client.get(F`/threads/${e}`,{...t,headers:H([{"OpenAI-Beta":"assistants=v2"},t==null?void 0:t.headers])})}update(e,t,r){return this._client.post(F`/threads/${e}`,{body:t,...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}delete(e,t){return this._client.delete(F`/threads/${e}`,{...t,headers:H([{"OpenAI-Beta":"assistants=v2"},t==null?void 0:t.headers])})}createAndRun(e,t){return this._client.post("/threads/runs",{body:e,...t,headers:H([{"OpenAI-Beta":"assistants=v2"},t==null?void 0:t.headers]),stream:e.stream??!1})}async createAndRunPoll(e,t){const r=await this.createAndRun(e,t);return await this.runs.poll(r.id,{thread_id:r.thread_id},t)}createAndRunStream(e,t){return Ai.createThreadAssistantStream(e,this._client.beta.threads,t)}}Oc.Runs=Yh;Oc.Messages=Bv;class fa extends X{constructor(){super(...arguments),this.realtime=new Dc(this._client),this.assistants=new Fv(this._client),this.threads=new Oc(this._client)}}fa.Realtime=Dc;fa.Assistants=Fv;fa.Threads=Oc;class Hv extends X{create(e,t){return this._client.post("/completions",{body:e,...t,stream:e.stream??!1})}}class Wv extends X{retrieve(e,t,r){const{container_id:s}=t;return this._client.get(F`/containers/${s}/files/${e}/content`,{...r,headers:H([{Accept:"application/binary"},r==null?void 0:r.headers]),__binaryResponse:!0})}}let Zh=class extends X{constructor(){super(...arguments),this.content=new Wv(this._client)}create(e,t,r){return this._client.post(F`/containers/${e}/files`,Tr({body:t,...r},this._client))}retrieve(e,t,r){const{container_id:s}=t;return this._client.get(F`/containers/${s}/files/${e}`,r)}list(e,t={},r){return this._client.getAPIList(F`/containers/${e}/files`,Re,{query:t,...r})}delete(e,t,r){const{container_id:s}=t;return this._client.delete(F`/containers/${s}/files/${e}`,{...r,headers:H([{Accept:"*/*"},r==null?void 0:r.headers])})}};Zh.Content=Wv;class ed extends X{constructor(){super(...arguments),this.files=new Zh(this._client)}create(e,t){return this._client.post("/containers",{body:e,...t})}retrieve(e,t){return this._client.get(F`/containers/${e}`,t)}list(e={},t){return this._client.getAPIList("/containers",Re,{query:e,...t})}delete(e,t){return this._client.delete(F`/containers/${e}`,{...t,headers:H([{Accept:"*/*"},t==null?void 0:t.headers])})}}ed.Files=Zh;class zv extends X{create(e,t,r){const{include:s,...i}=t;return this._client.post(F`/conversations/${e}/items`,{query:{include:s},body:i,...r})}retrieve(e,t,r){const{conversation_id:s,...i}=t;return this._client.get(F`/conversations/${s}/items/${e}`,{query:i,...r})}list(e,t={},r){return this._client.getAPIList(F`/conversations/${e}/items`,c1,{query:t,...r})}delete(e,t,r){const{conversation_id:s}=t;return this._client.delete(F`/conversations/${s}/items/${e}`,r)}}class td extends X{constructor(){super(...arguments),this.items=new zv(this._client)}create(e,t){return this._client.post("/conversations",{body:e,...t})}retrieve(e,t){return this._client.get(F`/conversations/${e}`,t)}update(e,t,r){return this._client.post(F`/conversations/${e}`,{body:t,...r})}delete(e,t){return this._client.delete(F`/conversations/${e}`,t)}}td.Items=zv;class Gv extends X{create(e,t){const r=!!e.encoding_format;let s=r?e.encoding_format:"base64";r&&Ue(this._client).debug("embeddings/user defined encoding_format:",e.encoding_format);const i=this._client.post("/embeddings",{body:{...e,encoding_format:s},...t});return r?i:(Ue(this._client).debug("embeddings/decoding base64 embeddings from base64"),i._thenUnwrap(a=>(a&&a.data&&a.data.forEach(l=>{const u=l.embedding;l.embedding=k1(u)}),a)))}}class Kv extends X{retrieve(e,t,r){const{eval_id:s,run_id:i}=t;return this._client.get(F`/evals/${s}/runs/${i}/output_items/${e}`,r)}list(e,t,r){const{eval_id:s,...i}=t;return this._client.getAPIList(F`/evals/${s}/runs/${e}/output_items`,Re,{query:i,...r})}}class nd extends X{constructor(){super(...arguments),this.outputItems=new Kv(this._client)}create(e,t,r){return this._client.post(F`/evals/${e}/runs`,{body:t,...r})}retrieve(e,t,r){const{eval_id:s}=t;return this._client.get(F`/evals/${s}/runs/${e}`,r)}list(e,t={},r){return this._client.getAPIList(F`/evals/${e}/runs`,Re,{query:t,...r})}delete(e,t,r){const{eval_id:s}=t;return this._client.delete(F`/evals/${s}/runs/${e}`,r)}cancel(e,t,r){const{eval_id:s}=t;return this._client.post(F`/evals/${s}/runs/${e}`,r)}}nd.OutputItems=Kv;class rd extends X{constructor(){super(...arguments),this.runs=new nd(this._client)}create(e,t){return this._client.post("/evals",{body:e,...t})}retrieve(e,t){return this._client.get(F`/evals/${e}`,t)}update(e,t,r){return this._client.post(F`/evals/${e}`,{body:t,...r})}list(e={},t){return this._client.getAPIList("/evals",Re,{query:e,...t})}delete(e,t){return this._client.delete(F`/evals/${e}`,t)}}rd.Runs=nd;let Qv=class extends X{create(e,t){return this._client.post("/files",Tr({body:e,...t},this._client))}retrieve(e,t){return this._client.get(F`/files/${e}`,t)}list(e={},t){return this._client.getAPIList("/files",Re,{query:e,...t})}delete(e,t){return this._client.delete(F`/files/${e}`,t)}content(e,t){return this._client.get(F`/files/${e}/content`,{...t,headers:H([{Accept:"application/binary"},t==null?void 0:t.headers]),__binaryResponse:!0})}async waitForProcessing(e,{pollInterval:t=5e3,maxWait:r=1800*1e3}={}){const s=new Set(["processed","error","deleted"]),i=Date.now();let a=await this.retrieve(e);for(;!a.status||!s.has(a.status);)if(await ua(t),a=await this.retrieve(e),Date.now()-i>r)throw new qh({message:`Giving up on waiting for file ${e} to finish processing after ${r} milliseconds.`});return a}};class Jv extends X{}let Xv=class extends X{run(e,t){return this._client.post("/fine_tuning/alpha/graders/run",{body:e,...t})}validate(e,t){return this._client.post("/fine_tuning/alpha/graders/validate",{body:e,...t})}};class sd extends X{constructor(){super(...arguments),this.graders=new Xv(this._client)}}sd.Graders=Xv;class Yv extends X{create(e,t,r){return this._client.getAPIList(F`/fine_tuning/checkpoints/${e}/permissions`,Nc,{body:t,method:"post",...r})}retrieve(e,t={},r){return this._client.get(F`/fine_tuning/checkpoints/${e}/permissions`,{query:t,...r})}delete(e,t,r){const{fine_tuned_model_checkpoint:s}=t;return this._client.delete(F`/fine_tuning/checkpoints/${s}/permissions/${e}`,r)}}let id=class extends X{constructor(){super(...arguments),this.permissions=new Yv(this._client)}};id.Permissions=Yv;class Zv extends X{list(e,t={},r){return this._client.getAPIList(F`/fine_tuning/jobs/${e}/checkpoints`,Re,{query:t,...r})}}class ad extends X{constructor(){super(...arguments),this.checkpoints=new Zv(this._client)}create(e,t){return this._client.post("/fine_tuning/jobs",{body:e,...t})}retrieve(e,t){return this._client.get(F`/fine_tuning/jobs/${e}`,t)}list(e={},t){return this._client.getAPIList("/fine_tuning/jobs",Re,{query:e,...t})}cancel(e,t){return this._client.post(F`/fine_tuning/jobs/${e}/cancel`,t)}listEvents(e,t={},r){return this._client.getAPIList(F`/fine_tuning/jobs/${e}/events`,Re,{query:t,...r})}pause(e,t){return this._client.post(F`/fine_tuning/jobs/${e}/pause`,t)}resume(e,t){return this._client.post(F`/fine_tuning/jobs/${e}/resume`,t)}}ad.Checkpoints=Zv;class Os extends X{constructor(){super(...arguments),this.methods=new Jv(this._client),this.jobs=new ad(this._client),this.checkpoints=new id(this._client),this.alpha=new sd(this._client)}}Os.Methods=Jv;Os.Jobs=ad;Os.Checkpoints=id;Os.Alpha=sd;class ew extends X{}class od extends X{constructor(){super(...arguments),this.graderModels=new ew(this._client)}}od.GraderModels=ew;class tw extends X{createVariation(e,t){return this._client.post("/images/variations",Tr({body:e,...t},this._client))}edit(e,t){return this._client.post("/images/edits",Tr({body:e,...t,stream:e.stream??!1},this._client))}generate(e,t){return this._client.post("/images/generations",{body:e,...t,stream:e.stream??!1})}}class nw extends X{retrieve(e,t){return this._client.get(F`/models/${e}`,t)}list(e){return this._client.getAPIList("/models",Nc,e)}delete(e,t){return this._client.delete(F`/models/${e}`,t)}}class rw extends X{create(e,t){return this._client.post("/moderations",{body:e,...t})}}function N1(n,e){return!e||!O1(e)?{...n,output_parsed:null,output:n.output.map(t=>t.type==="function_call"?{...t,parsed_arguments:null}:t.type==="message"?{...t,content:t.content.map(r=>({...r,parsed:null}))}:t)}:sw(n,e)}function sw(n,e){const t=n.output.map(s=>{if(s.type==="function_call")return{...s,parsed_arguments:V1(e,s)};if(s.type==="message"){const i=s.content.map(a=>a.type==="output_text"?{...a,parsed:D1(e,a.text)}:a);return{...s,content:i}}return s}),r=Object.assign({},n,{output:t});return Object.getOwnPropertyDescriptor(n,"output_text")||Nu(r),Object.defineProperty(r,"output_parsed",{enumerable:!0,get(){for(const s of r.output)if(s.type==="message"){for(const i of s.content)if(i.type==="output_text"&&i.parsed!==null)return i.parsed}return null}}),r}function D1(n,e){var t,r,s,i;return((r=(t=n.text)==null?void 0:t.format)==null?void 0:r.type)!=="json_schema"?null:"$parseRaw"in((s=n.text)==null?void 0:s.format)?((i=n.text)==null?void 0:i.format).$parseRaw(e):JSON.parse(e)}function O1(n){var e;return!!zh((e=n.text)==null?void 0:e.format)}function M1(n){return(n==null?void 0:n.$brand)==="auto-parseable-tool"}function L1(n,e){return n.find(t=>t.type==="function"&&t.name===e)}function V1(n,e){const t=L1(n.tools??[],e.name);return{...e,...e,parsed_arguments:M1(t)?t.$parseRaw(e.arguments):t!=null&&t.strict?JSON.parse(e.arguments):null}}function Nu(n){const e=[];for(const t of n.output)if(t.type==="message")for(const r of t.content)r.type==="output_text"&&e.push(r.text);n.output_text=e.join("")}var qr,za,Tn,Ga,$p,jp,Bp,qp;class cd extends Kh{constructor(e){super(),qr.add(this),za.set(this,void 0),Tn.set(this,void 0),Ga.set(this,void 0),Y(this,za,e)}static createResponse(e,t,r){const s=new cd(t);return s._run(()=>s._createOrRetrieveResponse(e,t,{...r,headers:{...r==null?void 0:r.headers,"X-Stainless-Helper-Method":"stream"}})),s}async _createOrRetrieveResponse(e,t,r){var l;const s=r==null?void 0:r.signal;s&&(s.aborted&&this.controller.abort(),s.addEventListener("abort",()=>this.controller.abort())),P(this,qr,"m",$p).call(this);let i,a=null;"response_id"in t?(i=await e.responses.retrieve(t.response_id,{stream:!0},{...r,signal:this.controller.signal,stream:!0}),a=t.starting_after??null):i=await e.responses.create({...t,stream:!0},{...r,signal:this.controller.signal}),this._connected();for await(const u of i)P(this,qr,"m",jp).call(this,u,a);if((l=i.controller.signal)!=null&&l.aborted)throw new bt;return P(this,qr,"m",Bp).call(this)}[(za=new WeakMap,Tn=new WeakMap,Ga=new WeakMap,qr=new WeakSet,$p=function(){this.ended||Y(this,Tn,void 0)},jp=function(t,r){if(this.ended)return;const s=(a,l)=>{(r==null||l.sequence_number>r)&&this._emit(a,l)},i=P(this,qr,"m",qp).call(this,t);switch(s("event",t),t.type){case"response.output_text.delta":{const a=i.output[t.output_index];if(!a)throw new K(`missing output at index ${t.output_index}`);if(a.type==="message"){const l=a.content[t.content_index];if(!l)throw new K(`missing content at index ${t.content_index}`);if(l.type!=="output_text")throw new K(`expected content to be 'output_text', got ${l.type}`);s("response.output_text.delta",{...t,snapshot:l.text})}break}case"response.function_call_arguments.delta":{const a=i.output[t.output_index];if(!a)throw new K(`missing output at index ${t.output_index}`);a.type==="function_call"&&s("response.function_call_arguments.delta",{...t,snapshot:a.arguments});break}default:s(t.type,t);break}},Bp=function(){if(this.ended)throw new K("stream has ended, this shouldn't happen");const t=P(this,Tn,"f");if(!t)throw new K("request ended without sending any events");Y(this,Tn,void 0);const r=U1(t,P(this,za,"f"));return Y(this,Ga,r),r},qp=function(t){let r=P(this,Tn,"f");if(!r){if(t.type!=="response.created")throw new K(`When snapshot hasn't been set yet, expected 'response.created' event, got ${t.type}`);return r=Y(this,Tn,t.response),r}switch(t.type){case"response.output_item.added":{r.output.push(t.item);break}case"response.content_part.added":{const s=r.output[t.output_index];if(!s)throw new K(`missing output at index ${t.output_index}`);s.type==="message"&&s.content.push(t.part);break}case"response.output_text.delta":{const s=r.output[t.output_index];if(!s)throw new K(`missing output at index ${t.output_index}`);if(s.type==="message"){const i=s.content[t.content_index];if(!i)throw new K(`missing content at index ${t.content_index}`);if(i.type!=="output_text")throw new K(`expected content to be 'output_text', got ${i.type}`);i.text+=t.delta}break}case"response.function_call_arguments.delta":{const s=r.output[t.output_index];if(!s)throw new K(`missing output at index ${t.output_index}`);s.type==="function_call"&&(s.arguments+=t.delta);break}case"response.completed":{Y(this,Tn,t.response);break}}return r},Symbol.asyncIterator)](){const e=[],t=[];let r=!1;return this.on("event",s=>{const i=t.shift();i?i.resolve(s):e.push(s)}),this.on("end",()=>{r=!0;for(const s of t)s.resolve(void 0);t.length=0}),this.on("abort",s=>{r=!0;for(const i of t)i.reject(s);t.length=0}),this.on("error",s=>{r=!0;for(const i of t)i.reject(s);t.length=0}),{next:async()=>e.length?{value:e.shift(),done:!1}:r?{value:void 0,done:!0}:new Promise((i,a)=>t.push({resolve:i,reject:a})).then(i=>i?{value:i,done:!1}:{value:void 0,done:!0}),return:async()=>(this.abort(),{value:void 0,done:!0})}}async finalResponse(){await this.done();const e=P(this,Ga,"f");if(!e)throw new K("stream ended without producing a ChatCompletion");return e}}function U1(n,e){return N1(n,e)}class iw extends X{list(e,t={},r){return this._client.getAPIList(F`/responses/${e}/input_items`,Re,{query:t,...r})}}class ld extends X{constructor(){super(...arguments),this.inputItems=new iw(this._client)}create(e,t){return this._client.post("/responses",{body:e,...t,stream:e.stream??!1})._thenUnwrap(r=>("object"in r&&r.object==="response"&&Nu(r),r))}retrieve(e,t={},r){return this._client.get(F`/responses/${e}`,{query:t,...r,stream:(t==null?void 0:t.stream)??!1})._thenUnwrap(s=>("object"in s&&s.object==="response"&&Nu(s),s))}delete(e,t){return this._client.delete(F`/responses/${e}`,{...t,headers:H([{Accept:"*/*"},t==null?void 0:t.headers])})}parse(e,t){return this._client.responses.create(e,t)._thenUnwrap(r=>sw(r,e))}stream(e,t){return cd.createResponse(this._client,e,t)}cancel(e,t){return this._client.post(F`/responses/${e}/cancel`,t)}}ld.InputItems=iw;class aw extends X{create(e,t,r){return this._client.post(F`/uploads/${e}/parts`,Tr({body:t,...r},this._client))}}class ud extends X{constructor(){super(...arguments),this.parts=new aw(this._client)}create(e,t){return this._client.post("/uploads",{body:e,...t})}cancel(e,t){return this._client.post(F`/uploads/${e}/cancel`,t)}complete(e,t,r){return this._client.post(F`/uploads/${e}/complete`,{body:t,...r})}}ud.Parts=aw;const F1=async n=>{const e=await Promise.allSettled(n),t=e.filter(s=>s.status==="rejected");if(t.length){for(const s of t)console.error(s.reason);throw new Error(`${t.length} promise(s) failed - see the above errors`)}const r=[];for(const s of e)s.status==="fulfilled"&&r.push(s.value);return r};class ow extends X{create(e,t,r){return this._client.post(F`/vector_stores/${e}/file_batches`,{body:t,...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}retrieve(e,t,r){const{vector_store_id:s}=t;return this._client.get(F`/vector_stores/${s}/file_batches/${e}`,{...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}cancel(e,t,r){const{vector_store_id:s}=t;return this._client.post(F`/vector_stores/${s}/file_batches/${e}/cancel`,{...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}async createAndPoll(e,t,r){const s=await this.create(e,t);return await this.poll(e,s.id,r)}listFiles(e,t,r){const{vector_store_id:s,...i}=t;return this._client.getAPIList(F`/vector_stores/${s}/file_batches/${e}/files`,Re,{query:i,...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}async poll(e,t,r){var i;const s=H([r==null?void 0:r.headers,{"X-Stainless-Poll-Helper":"true","X-Stainless-Custom-Poll-Interval":((i=r==null?void 0:r.pollIntervalMs)==null?void 0:i.toString())??void 0}]);for(;;){const{data:a,response:l}=await this.retrieve(t,{vector_store_id:e},{...r,headers:s}).withResponse();switch(a.status){case"in_progress":let u=5e3;if(r!=null&&r.pollIntervalMs)u=r.pollIntervalMs;else{const h=l.headers.get("openai-poll-after-ms");if(h){const f=parseInt(h);isNaN(f)||(u=f)}}await ua(u);break;case"failed":case"cancelled":case"completed":return a}}}async uploadAndPoll(e,{files:t,fileIds:r=[]},s){if(t==null||t.length==0)throw new Error("No `files` provided to process. If you've already uploaded files you should use `.createAndPoll()` instead");const i=(s==null?void 0:s.maxConcurrency)??5,a=Math.min(i,t.length),l=this._client,u=t.values(),h=[...r];async function f(g){for(let _ of g){const T=await l.files.create({file:_,purpose:"assistants"},s);h.push(T.id)}}const p=Array(a).fill(u).map(f);return await F1(p),await this.createAndPoll(e,{file_ids:h})}}class cw extends X{create(e,t,r){return this._client.post(F`/vector_stores/${e}/files`,{body:t,...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}retrieve(e,t,r){const{vector_store_id:s}=t;return this._client.get(F`/vector_stores/${s}/files/${e}`,{...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}update(e,t,r){const{vector_store_id:s,...i}=t;return this._client.post(F`/vector_stores/${s}/files/${e}`,{body:i,...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}list(e,t={},r){return this._client.getAPIList(F`/vector_stores/${e}/files`,Re,{query:t,...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}delete(e,t,r){const{vector_store_id:s}=t;return this._client.delete(F`/vector_stores/${s}/files/${e}`,{...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}async createAndPoll(e,t,r){const s=await this.create(e,t,r);return await this.poll(e,s.id,r)}async poll(e,t,r){var i;const s=H([r==null?void 0:r.headers,{"X-Stainless-Poll-Helper":"true","X-Stainless-Custom-Poll-Interval":((i=r==null?void 0:r.pollIntervalMs)==null?void 0:i.toString())??void 0}]);for(;;){const a=await this.retrieve(t,{vector_store_id:e},{...r,headers:s}).withResponse(),l=a.data;switch(l.status){case"in_progress":let u=5e3;if(r!=null&&r.pollIntervalMs)u=r.pollIntervalMs;else{const h=a.response.headers.get("openai-poll-after-ms");if(h){const f=parseInt(h);isNaN(f)||(u=f)}}await ua(u);break;case"failed":case"completed":return l}}}async upload(e,t,r){const s=await this._client.files.create({file:t,purpose:"assistants"},r);return this.create(e,{file_id:s.id},r)}async uploadAndPoll(e,t,r){const s=await this.upload(e,t,r);return await this.poll(e,s.id,r)}content(e,t,r){const{vector_store_id:s}=t;return this._client.getAPIList(F`/vector_stores/${s}/files/${e}/content`,Nc,{...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}}class Mc extends X{constructor(){super(...arguments),this.files=new cw(this._client),this.fileBatches=new ow(this._client)}create(e,t){return this._client.post("/vector_stores",{body:e,...t,headers:H([{"OpenAI-Beta":"assistants=v2"},t==null?void 0:t.headers])})}retrieve(e,t){return this._client.get(F`/vector_stores/${e}`,{...t,headers:H([{"OpenAI-Beta":"assistants=v2"},t==null?void 0:t.headers])})}update(e,t,r){return this._client.post(F`/vector_stores/${e}`,{body:t,...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}list(e={},t){return this._client.getAPIList("/vector_stores",Re,{query:e,...t,headers:H([{"OpenAI-Beta":"assistants=v2"},t==null?void 0:t.headers])})}delete(e,t){return this._client.delete(F`/vector_stores/${e}`,{...t,headers:H([{"OpenAI-Beta":"assistants=v2"},t==null?void 0:t.headers])})}search(e,t,r){return this._client.getAPIList(F`/vector_stores/${e}/search`,Nc,{body:t,method:"post",...r,headers:H([{"OpenAI-Beta":"assistants=v2"},r==null?void 0:r.headers])})}}Mc.Files=cw;Mc.FileBatches=ow;var Zr,lw,vo;class uw extends X{constructor(){super(...arguments),Zr.add(this)}async unwrap(e,t,r=this._client.webhookSecret,s=300){return await this.verifySignature(e,t,r,s),JSON.parse(e)}async verifySignature(e,t,r=this._client.webhookSecret,s=300){if(typeof crypto>"u"||typeof crypto.subtle.importKey!="function"||typeof crypto.subtle.verify!="function")throw new Error("Webhook signature verification is only supported when the `crypto` global is defined");P(this,Zr,"m",lw).call(this,r);const i=H([t]).values,a=P(this,Zr,"m",vo).call(this,i,"webhook-signature"),l=P(this,Zr,"m",vo).call(this,i,"webhook-timestamp"),u=P(this,Zr,"m",vo).call(this,i,"webhook-id"),h=parseInt(l,10);if(isNaN(h))throw new ai("Invalid webhook timestamp format");const f=Math.floor(Date.now()/1e3);if(f-h>s)throw new ai("Webhook timestamp is too old");if(h>f+s)throw new ai("Webhook timestamp is too new");const p=a.split(" ").map(A=>A.startsWith("v1,")?A.substring(3):A),g=r.startsWith("whsec_")?Buffer.from(r.replace("whsec_",""),"base64"):Buffer.from(r,"utf-8"),_=u?`${u}.${l}.${e}`:`${l}.${e}`,T=await crypto.subtle.importKey("raw",g,{name:"HMAC",hash:"SHA-256"},!1,["verify"]);for(const A of p)try{const S=Buffer.from(A,"base64");if(await crypto.subtle.verify("HMAC",T,S,new TextEncoder().encode(_)))return}catch{continue}throw new ai("The given webhook signature does not match the expected signature")}}Zr=new WeakSet,lw=function(e){if(typeof e!="string"||e.length===0)throw new Error("The webhook secret must either be set using the env var, OPENAI_WEBHOOK_SECRET, on the client class, OpenAI({ webhookSecret: '123' }), or passed to this function")},vo=function(e,t){if(!e)throw new Error("Headers are required");const r=e.get(t);if(r==null)throw new Error(`Missing required header: ${t}`);return r};var Du,hd,wo,hw;class re{constructor({baseURL:e=Br("OPENAI_BASE_URL"),apiKey:t=Br("OPENAI_API_KEY"),organization:r=Br("OPENAI_ORG_ID")??null,project:s=Br("OPENAI_PROJECT_ID")??null,webhookSecret:i=Br("OPENAI_WEBHOOK_SECRET")??null,...a}={}){if(Du.add(this),wo.set(this,void 0),this.completions=new Hv(this),this.chat=new Xh(this),this.embeddings=new Gv(this),this.files=new Qv(this),this.images=new tw(this),this.audio=new da(this),this.moderations=new rw(this),this.models=new nw(this),this.fineTuning=new Os(this),this.graders=new od(this),this.vectorStores=new Mc(this),this.webhooks=new uw(this),this.beta=new fa(this),this.batches=new Uv(this),this.uploads=new ud(this),this.responses=new ld(this),this.conversations=new td(this),this.evals=new rd(this),this.containers=new ed(this),t===void 0)throw new K("The OPENAI_API_KEY environment variable is missing or empty; either provide it, or instantiate the OpenAI client with an apiKey option, like new OpenAI({ apiKey: 'My API Key' }).");const l={apiKey:t,organization:r,project:s,webhookSecret:i,...a,baseURL:e||"https://api.openai.com/v1"};if(!l.dangerouslyAllowBrowser&&Fk())throw new K(`It looks like you're running in a browser-like environment.

This is disabled by default, as it risks exposing your secret API credentials to attackers.
If you understand the risks and have appropriate mitigations in place,
you can set the \`dangerouslyAllowBrowser\` option to \`true\`, e.g.,

new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety
`);this.baseURL=l.baseURL,this.timeout=l.timeout??hd.DEFAULT_TIMEOUT,this.logger=l.logger??console;const u="warn";this.logLevel=u,this.logLevel=Sp(l.logLevel,"ClientOptions.logLevel",this)??Sp(Br("OPENAI_LOG"),"process.env['OPENAI_LOG']",this)??u,this.fetchOptions=l.fetchOptions,this.maxRetries=l.maxRetries??2,this.fetch=l.fetch??Hk(),Y(this,wo,zk),this._options=l,this.apiKey=t,this.organization=r,this.project=s,this.webhookSecret=i}withOptions(e){return new this.constructor({...this._options,baseURL:this.baseURL,maxRetries:this.maxRetries,timeout:this.timeout,logger:this.logger,logLevel:this.logLevel,fetch:this.fetch,fetchOptions:this.fetchOptions,apiKey:this.apiKey,organization:this.organization,project:this.project,webhookSecret:this.webhookSecret,...e})}defaultQuery(){return this._options.defaultQuery}validateHeaders({values:e,nulls:t}){}async authHeaders(e){return H([{Authorization:`Bearer ${this.apiKey}`}])}stringifyQuery(e){return Yk(e,{arrayFormat:"brackets"})}getUserAgent(){return`${this.constructor.name}/JS ${Xr}`}defaultIdempotencyKey(){return`stainless-node-retry-${jb()}`}makeStatusError(e,t,r,s){return qe.generate(e,t,r,s)}buildURL(e,t,r){const s=!P(this,Du,"m",hw).call(this)&&r||this.baseURL,i=Ok(e)?new URL(e):new URL(s+(s.endsWith("/")&&e.startsWith("/")?e.slice(1):e)),a=this.defaultQuery();return Mk(a)||(t={...a,...t}),typeof t=="object"&&t&&!Array.isArray(t)&&(i.search=this.stringifyQuery(t)),i.toString()}async prepareOptions(e){}async prepareRequest(e,{url:t,options:r}){}get(e,t){return this.methodRequest("get",e,t)}post(e,t){return this.methodRequest("post",e,t)}patch(e,t){return this.methodRequest("patch",e,t)}put(e,t){return this.methodRequest("put",e,t)}delete(e,t){return this.methodRequest("delete",e,t)}methodRequest(e,t,r){return this.request(Promise.resolve(r).then(s=>({method:e,path:t,...s})))}request(e,t=null){return new kc(this,this.makeRequest(e,t,void 0))}async makeRequest(e,t,r){var U,N;const s=await e,i=s.maxRetries??this.maxRetries;t==null&&(t=i),await this.prepareOptions(s);const{req:a,url:l,timeout:u}=await this.buildRequest(s,{retryCount:i-t});await this.prepareRequest(a,{url:l,options:s});const h="log_"+(Math.random()*(1<<24)|0).toString(16).padStart(6,"0"),f=r===void 0?"":`, retryOf: ${r}`,p=Date.now();if(Ue(this).debug(`[${h}] sending request`,or({retryOfRequestLogID:r,method:s.method,url:l,options:s,headers:a.headers})),(U=s.signal)!=null&&U.aborted)throw new bt;const g=new AbortController,_=await this.fetchWithTimeout(l,a,u,g).catch(xu),T=Date.now();if(_ instanceof Error){const V=`retrying, ${t} attempts remaining`;if((N=s.signal)!=null&&N.aborted)throw new bt;const L=wu(_)||/timed? ?out/i.test(String(_)+("cause"in _?String(_.cause):""));if(t)return Ue(this).info(`[${h}] connection ${L?"timed out":"failed"} - ${V}`),Ue(this).debug(`[${h}] connection ${L?"timed out":"failed"} (${V})`,or({retryOfRequestLogID:r,url:l,durationMs:T-p,message:_.message})),this.retryRequest(s,t,r??h);throw Ue(this).info(`[${h}] connection ${L?"timed out":"failed"} - error; no more retries left`),Ue(this).debug(`[${h}] connection ${L?"timed out":"failed"} (error; no more retries left)`,or({retryOfRequestLogID:r,url:l,durationMs:T-p,message:_.message})),L?new qh:new Cc({cause:_})}const A=[..._.headers.entries()].filter(([V])=>V==="x-request-id").map(([V,L])=>", "+V+": "+JSON.stringify(L)).join(""),S=`[${h}${f}${A}] ${a.method} ${l} ${_.ok?"succeeded":"failed"} with status ${_.status} in ${T-p}ms`;if(!_.ok){const V=await this.shouldRetry(_);if(t&&V){const v=`retrying, ${t} attempts remaining`;return await Wk(_.body),Ue(this).info(`${S} - ${v}`),Ue(this).debug(`[${h}] response error (${v})`,or({retryOfRequestLogID:r,url:_.url,status:_.status,headers:_.headers,durationMs:T-p})),this.retryRequest(s,t,r??h,_.headers)}const L=V?"error; no more retries left":"error; not retryable";Ue(this).info(`${S} - ${L}`);const z=await _.text().catch(v=>xu(v).message),W=Uk(z),x=W?void 0:z;throw Ue(this).debug(`[${h}] response error (${L})`,or({retryOfRequestLogID:r,url:_.url,status:_.status,headers:_.headers,message:x,durationMs:Date.now()-p})),this.makeStatusError(_.status,W,x,_.headers)}return Ue(this).info(S),Ue(this).debug(`[${h}] response start`,or({retryOfRequestLogID:r,url:_.url,status:_.status,headers:_.headers,durationMs:T-p})),{response:_,options:s,controller:g,requestLogID:h,retryOfRequestLogID:r,startTime:p}}getAPIList(e,t,r){return this.requestAPIList(t,{method:"get",path:e,...r})}requestAPIList(e,t){const r=this.makeRequest(t,null,void 0);return new o1(this,r,e)}async fetchWithTimeout(e,t,r,s){const{signal:i,method:a,...l}=t||{};i&&i.addEventListener("abort",()=>s.abort());const u=setTimeout(()=>s.abort(),r),h=globalThis.ReadableStream&&l.body instanceof globalThis.ReadableStream||typeof l.body=="object"&&l.body!==null&&Symbol.asyncIterator in l.body,f={signal:s.signal,...h?{duplex:"half"}:{},method:"GET",...l};a&&(f.method=a.toUpperCase());try{return await this.fetch.call(void 0,e,f)}finally{clearTimeout(u)}}async shouldRetry(e){const t=e.headers.get("x-should-retry");return t==="true"?!0:t==="false"?!1:e.status===408||e.status===409||e.status===429||e.status>=500}async retryRequest(e,t,r,s){let i;const a=s==null?void 0:s.get("retry-after-ms");if(a){const u=parseFloat(a);Number.isNaN(u)||(i=u)}const l=s==null?void 0:s.get("retry-after");if(l&&!i){const u=parseFloat(l);Number.isNaN(u)?i=Date.parse(l)-Date.now():i=u*1e3}if(!(i&&0<=i&&i<60*1e3)){const u=e.maxRetries??this.maxRetries;i=this.calculateDefaultRetryTimeoutMillis(t,u)}return await ua(i),this.makeRequest(e,t-1,r)}calculateDefaultRetryTimeoutMillis(e,t){const i=t-e,a=Math.min(.5*Math.pow(2,i),8),l=1-Math.random()*.25;return a*l*1e3}async buildRequest(e,{retryCount:t=0}={}){const r={...e},{method:s,path:i,query:a,defaultBaseURL:l}=r,u=this.buildURL(i,a,l);"timeout"in r&&Vk("timeout",r.timeout),r.timeout=r.timeout??this.timeout;const{bodyHeaders:h,body:f}=this.buildBody({options:r}),p=await this.buildHeaders({options:e,method:s,bodyHeaders:h,retryCount:t});return{req:{method:s,headers:p,...r.signal&&{signal:r.signal},...globalThis.ReadableStream&&f instanceof globalThis.ReadableStream&&{duplex:"half"},...f&&{body:f},...this.fetchOptions??{},...r.fetchOptions??{}},url:u,timeout:r.timeout}}async buildHeaders({options:e,method:t,bodyHeaders:r,retryCount:s}){let i={};this.idempotencyHeader&&t!=="get"&&(e.idempotencyKey||(e.idempotencyKey=this.defaultIdempotencyKey()),i[this.idempotencyHeader]=e.idempotencyKey);const a=H([i,{Accept:"application/json","User-Agent":this.getUserAgent(),"X-Stainless-Retry-Count":String(s),...e.timeout?{"X-Stainless-Timeout":String(Math.trunc(e.timeout/1e3))}:{},...qk(),"OpenAI-Organization":this.organization,"OpenAI-Project":this.project},await this.authHeaders(e),this._options.defaultHeaders,r,e.headers]);return this.validateHeaders(a),a.values}buildBody({options:{body:e,headers:t}}){if(!e)return{bodyHeaders:void 0,body:void 0};const r=H([t]);return ArrayBuffer.isView(e)||e instanceof ArrayBuffer||e instanceof DataView||typeof e=="string"&&r.values.has("content-type")||e instanceof Blob||e instanceof FormData||e instanceof URLSearchParams||globalThis.ReadableStream&&e instanceof globalThis.ReadableStream?{bodyHeaders:void 0,body:e}:typeof e=="object"&&(Symbol.asyncIterator in e||Symbol.iterator in e&&"next"in e&&typeof e.next=="function")?{bodyHeaders:void 0,body:ev(e)}:P(this,wo,"f").call(this,{body:e,headers:r})}}hd=re,wo=new WeakMap,Du=new WeakSet,hw=function(){return this.baseURL!=="https://api.openai.com/v1"};re.OpenAI=hd;re.DEFAULT_TIMEOUT=6e5;re.OpenAIError=K;re.APIError=qe;re.APIConnectionError=Cc;re.APIConnectionTimeoutError=qh;re.APIUserAbortError=bt;re.NotFoundError=Wb;re.ConflictError=zb;re.RateLimitError=Kb;re.BadRequestError=Bb;re.AuthenticationError=qb;re.InternalServerError=Qb;re.PermissionDeniedError=Hb;re.UnprocessableEntityError=Gb;re.InvalidWebhookSignatureError=ai;re.toFile=m1;re.Completions=Hv;re.Chat=Xh;re.Embeddings=Gv;re.Files=Qv;re.Images=tw;re.Audio=da;re.Moderations=rw;re.Models=nw;re.FineTuning=Os;re.Graders=od;re.VectorStores=Mc;re.Webhooks=uw;re.Beta=fa;re.Batches=Uv;re.Uploads=ud;re.Responses=ld;re.Conversations=td;re.Evals=rd;re.Containers=ed;var dd={};function fd(n){return new re({apiKey:n})}const $1=`
あなたはbanaAI搭載の広告バナー分析エキスパートです。アップロードされたバナー画像を以下の5項目で詳細分析し、JSONフォーマットで結果を返してください。

## 分析項目
1. **瞬間伝達力 (impact)**: 3秒以内にメッセージが理解できるか (0-100点)
2. **視認性 (visibility)**: 文字の読みやすさ、色彩バランス (0-100点)  
3. **行動喚起 (cta)**: CTAの明確さ、効果的な配置 (0-100点)
4. **整合性 (consistency)**: 画像と文字の一致度、ブランド統一性 (0-100点)
5. **情報バランス (balance)**: 情報過多の回避、適切な情報量 (0-100点)

## 出力形式 (JSON)
{
  "totalScore": 82,
  "level": "優秀レベル",
  "scores": {
    "impact": { "score": 88, "label": "瞬間伝達力", "color": "#90EE90" },
    "visibility": { "score": 79, "label": "視認性", "color": "#87CEEB" },
    "cta": { "score": 85, "label": "行動喚起", "color": "#90EE90" },
    "consistency": { "score": 81, "label": "整合性", "color": "#87CEEB" },
    "balance": { "score": 76, "label": "情報バランス", "color": "#FFA500" }
  },
  "analysis": {
    "targetMatch": 91,
    "strengths": [
      "視覚階層: メインメッセージが3秒以内に理解可能",
      "色彩バランス: ブランドカラーと可読性の両立が秀逸",
      "CTA配置: 自然な視線誘導でアクション率向上が期待"
    ],
    "improvements": [
      "テキストコントラスト: 明度を15%向上で可読性UP",
      "余白調整: 左右マージンを1.2倍に拡張",
      "フォントサイズ: キャッチコピーを24px→28pxに"
    ],
    "performance": {
      "clickRate": { "current": 3.2, "improved": 4.1, "change": 28 },
      "conversionRate": { "current": 1.8, "improved": 2.3, "change": 27 },
      "brandAwareness": { "change": 34 }
    }
  }
}

## スコア基準
- 90-100点: 優秀レベル (色: #90EE90)
- 80-89点: 良好レベル (色: #87CEEB)  
- 70-79点: 標準レベル (色: #FFA500)
- 60-69点: 改善必要 (色: #FF6B6B)
- 0-59点: 要改善 (色: #FF4444)

必ず有効なJSONのみを返し、説明文は含めないでください。
`,j1=`
あなたはbanaAI搭載の広告バナーA/B比較分析エキスパートです。2つのバナー画像を高精度で比較分析し、どちらが効果的かをJSONフォーマットで返してください。

## 分析項目
1. **瞬間伝達力 (impact)**: 3秒以内にメッセージが理解できるか
2. **視認性 (visibility)**: 文字の読みやすさ、色彩バランス
3. **行動喚起 (cta)**: CTAの明確さ、効果的な配置
4. **整合性 (consistency)**: 画像と文字の一致度
5. **情報バランス (balance)**: 情報過多の回避

## 出力形式 (JSON)
{
  "winner": "A",
  "confidence": 92.4,
  "cvrImprovement": 24.3,
  "sampleSize": 1000,
  "patternA": {
    "score": 87,
    "scores": {
      "impact": { "score": 92, "label": "瞬間伝達力", "color": "#90EE90" },
      "visibility": { "score": 85, "label": "視認性", "color": "#90EE90" },
      "cta": { "score": 88, "label": "行動喚起", "color": "#90EE90" },
      "consistency": { "score": 84, "label": "整合性", "color": "#87CEEB" },
      "balance": { "score": 86, "label": "バランス", "color": "#90EE90" }
    }
  },
  "patternB": {
    "score": 75,
    "scores": {
      "impact": { "score": 71, "label": "瞬間伝達力", "color": "#FFA500" },
      "visibility": { "score": 78, "label": "視認性", "color": "#87CEEB" },
      "cta": { "score": 73, "label": "行動喚起", "color": "#FFA500" },
      "consistency": { "score": 77, "label": "整合性", "color": "#87CEEB" },
      "balance": { "score": 76, "label": "バランス", "color": "#87CEEB" }
    }
  },
  "analysis": {
    "advantages": [
      "瞬間伝達力 +21点: メインメッセージの視認性が圧倒的に高い",
      "行動喚起 +15点: CTAボタンの配色・配置が最適化されている"
    ],
    "improvements": [
      "文字階層の見直しが必要（情報の優先度が不明確）",
      "CTAの視認性向上（背景との対比不足）"
    ],
    "expectedResults": {
      "currentCvr": 2.1,
      "improvedCvr": 2.6,
      "additionalConversions": 12,
      "roiImprovement": 18.2,
      "cpaReduction": 19.5
    }
  }
}

必ず有効なJSONのみを返してください。
`,B1=`
banaAI搭載の広告コピー生成システムとして、アップロードされたバナー画像を詳細分析し、効果的な広告コピーを4種類生成してください。

## 生成するコピータイプ
1. **メインコピー**: 主要メッセージ (20-30文字)
2. **キャッチコピー**: 注目を引くフレーズ (15-25文字)  
3. **CTAコピー**: 行動喚起ボタン文言 (5-15文字)
4. **サブコピー**: 補足説明文 (30-50文字)

## 業界別考慮事項
- **美容**: 薬機法準拠・効果効能表現の適正化
- **飲食**: 食品表示法対応・魅力的な味覚表現
- **不動産**: 宅建業法準拠・立地/設備の訴求
- **子ども写真館**: 家族向け・記念日訴求

## 出力形式 (JSON)
{
  "copies": [
    {
      "id": 1,
      "type": "メインコピー",
      "text": "美肌への近道、ここにあり。今すぐ体験してください。",
      "effectiveness": 92,
      "reasoning": "緊急性と具体的なベネフィットを組み合わせた効果的なコピー"
    },
    {
      "id": 2,
      "type": "キャッチコピー", 
      "text": "3日で実感！輝く美肌を手に入れる秘密",
      "effectiveness": 89,
      "reasoning": "数字による具体性と期待感を高める表現が効果的"
    },
    {
      "id": 3,
      "type": "CTAコピー",
      "text": "限定価格で今すぐ始める",
      "effectiveness": 87,
      "reasoning": "限定性と行動喚起を組み合わせた強力なCTA"
    },
    {
      "id": 4,
      "type": "サブコピー",
      "text": "94%のユーザーが満足した美容メソッド",
      "effectiveness": 85,
      "reasoning": "社会的証明による信頼性向上"
    }
  ],
  "analysis": {
    "overallScore": 88,
    "industryMatch": 95,
    "targetAudience": "美容意識の高い20-40代女性",
    "recommendations": [
      "メインコピーを最も目立つ位置に配置",
      "CTAボタンに「限定価格で今すぐ始める」を使用",
      "サブコピーで信頼性を補完"
    ]
  }
}

必ず有効なJSONのみを返してください。
`;async function q1(n,e){var t,r;try{const a=(r=(t=(await fd(e||dd.OPENAI_API_KEY||"").chat.completions.create({model:"gpt-4o",messages:[{role:"user",content:[{type:"text",text:$1},{type:"image_url",image_url:{url:`data:image/jpeg;base64,${n}`}}]}],max_tokens:1500,temperature:.1})).choices[0])==null?void 0:t.message)==null?void 0:r.content;if(!a)throw new Error("banaAI API response is empty");try{return JSON.parse(a)}catch(l){throw console.error("JSON parse error:",l),console.log("Raw response:",a),new Error("banaAI API returned invalid JSON")}}catch(s){throw console.error("banaAI API error:",s),s}}async function H1(n,e,t){var r,s;try{const l=(s=(r=(await fd(t||dd.OPENAI_API_KEY||"").chat.completions.create({model:"gpt-4o",messages:[{role:"user",content:[{type:"text",text:j1},{type:"image_url",image_url:{url:`data:image/jpeg;base64,${n}`}},{type:"text",text:"上記がパターンA、下記がパターンBです。"},{type:"image_url",image_url:{url:`data:image/jpeg;base64,${e}`}}]}],max_tokens:2e3,temperature:.1})).choices[0])==null?void 0:r.message)==null?void 0:s.content;if(!l)throw new Error("banaAI API response is empty");try{return JSON.parse(l)}catch(u){throw console.error("JSON parse error:",u),console.log("Raw response:",l),new Error("banaAI API returned invalid JSON")}}catch(i){throw console.error("banaAI API error:",i),i}}async function W1(n,e){var t,r;try{const a=(r=(t=(await fd(e||dd.OPENAI_API_KEY||"").chat.completions.create({model:"gpt-4o",messages:[{role:"user",content:[{type:"text",text:B1},{type:"image_url",image_url:{url:`data:image/jpeg;base64,${n}`}}]}],max_tokens:1500,temperature:.3})).choices[0])==null?void 0:t.message)==null?void 0:r.content;if(!a)throw new Error("banaAI API response is empty");try{return JSON.parse(a)}catch(l){throw console.error("JSON parse error:",l),console.log("Raw response:",a),new Error("banaAI API returned invalid JSON")}}catch(s){throw console.error("banaAI API error:",s),s}}var z1={};const ce=new Sg;ce.use("/api/*",j0());ce.use("/static/*",X0({root:"./public"}));ce.use(Ix);ce.get("/",n=>n.render(o(Ax,{})));ce.get("/login",n=>n.render(o(Tx,{})));ce.get("/analysis",n=>n.render(o(Sx,{})));ce.get("/copy-generation",n=>n.render(o(Rx,{})));ce.get("/dashboard",n=>n.render(o(Px,{})));ce.get("/plans",n=>n.render(o(kx,{})));ce.get("/api/status",async n=>{const e=n.env.OPENAI_API_KEY,t=n.env.PING,r=Object.keys(n.env||{}).length;return n.json({success:!0,status:{openai_configured:!!e,key_prefix:e?e.slice(0,3)+"...":"undefined...",ping_seen:t==="ok",env_keys_count:r,environment:"pages",cloudflare_context:!0,timestamp:new Date().toISOString()}})});ce.use("*",Ck);ce.post("/api/auth/demo-login",$b);ce.post("/api/auth/login",async n=>{try{const e=await n.req.json();return e.username==="demo"&&e.password==="demo123"?$b(n):e.email&&e.password?Pk(n):n.json({success:!1,error:"メールアドレス・パスワードまたはデモアカウント情報を入力してください"},400)}catch(e){return console.error("Login error:",e),n.json({success:!1,error:"ログインに失敗しました"},500)}});ce.post("/api/auth/register",kk);ce.post("/api/auth/logout",Nk);ce.get("/api/auth/user",async n=>{const e=n.get("user");return e?n.json({success:!0,user:e}):n.json({success:!1,error:"ログインが必要です"},401)});ce.get("/api/user/profile",async n=>{const e=n.get("user");return e?n.json({success:!0,...e}):n.json({success:!1,error:"ログインが必要です"},401)});ce.get("/api/usage/check",async n=>{const e=n.get("user");if(!e)return n.json({success:!1,error:"ログインが必要です"},401);try{const t=await be.checkUsageLimit(e.uid);return n.json({success:!0,...t})}catch{return n.json({success:!1,error:"使用制限チェックに失敗しました"},500)}});ce.get("/api/usage/stats",async n=>{const e=n.get("user");if(!e)return n.json({success:!1,error:"ログインが必要です"},401);try{const t=await Ot.getMonthlyUsageStats(e.uid);return n.json({success:!0,stats:t})}catch{return n.json({success:!1,error:"使用統計取得に失敗しました"},500)}});ce.get("/api/usage/dashboard",async n=>{const e=n.get("user");if(!e)return n.json({success:!1,error:"ログインが必要です"},401);try{const t=await Ot.getDashboardStats(e.uid);return n.json({success:!0,data:t})}catch{return n.json({success:!1,error:"ダッシュボードデータ取得に失敗しました"},500)}});ce.get("/api/usage/check/:actionType",async n=>{const e=n.get("user");if(!e)return n.json({success:!1,error:"ログインが必要です"},401);const t=n.req.param("actionType");if(!["single_analysis","ab_comparison","copy_generation"].includes(t))return n.json({success:!1,error:"無効なアクションタイプです"},400);try{const r=await Ot.checkActionUsageLimit(e.uid,t),s=Ot.getUpgradeRecommendation(e.plan,t);return n.json({success:!0,...r,recommendation:r.canUse?null:s})}catch{return n.json({success:!1,error:"アクション制限チェックに失敗しました"},500)}});ce.post("/api/user/plan",async n=>{const e=n.get("user");if(!e)return n.json({success:!1,error:"ログインが必要です"},401);try{const{plan:t}=await n.req.json();return["free","basic","premium"].includes(t)?t!==e.plan?(await be.updateUserPlan(e.uid,t),n.json({success:!0,message:`プランが${t}に変更されました`,user:{...e,plan:t}})):n.json({success:!1,error:"既に同じプランです"},400):n.json({success:!1,error:"無効なプランです"},400)}catch{return n.json({success:!1,error:"プラン変更に失敗しました"},500)}});const bn=async(n,e)=>{const t=n.get("user");return t?t.uid==="demo-user-123"||await _n.checkAdminAccess(t.uid)?e():n.json({success:!1,error:"管理者権限が必要です"},403):n.json({success:!1,error:"管理者ログインが必要です"},401)};ce.get("/admin",bn,n=>n.render(o(Cx,{})));ce.get("/api/admin/stats",bn,async n=>{try{const e=await _n.getDashboardStats();return n.json({success:!0,data:e})}catch{return n.json({success:!1,error:"ダッシュボード統計取得に失敗しました"},500)}});ce.get("/api/admin/users",bn,async n=>{try{const e=parseInt(n.req.query("page")||"1"),t=parseInt(n.req.query("limit")||"10"),r=n.req.query("plan"),s=await _n.getUsersList(t,null,r);return n.json({success:!0,data:s})}catch{return n.json({success:!1,error:"ユーザー一覧取得に失敗しました"},500)}});ce.put("/api/admin/users/:uid",bn,async n=>{try{const e=n.req.param("uid"),t=await n.req.json();return await _n.updateUser(e,t),n.json({success:!0,message:"ユーザー情報を更新しました"})}catch{return n.json({success:!1,error:"ユーザー更新に失敗しました"},500)}});ce.delete("/api/admin/users/:uid",bn,async n=>{try{const e=n.req.param("uid");return await _n.deactivateUser(e),n.json({success:!0,message:"ユーザーを無効化しました"})}catch{return n.json({success:!1,error:"ユーザー削除に失敗しました"},500)}});ce.get("/api/admin/activity",bn,async n=>{try{const e=await _n.getRecentActivity();return n.json({success:!0,data:e})}catch{return n.json({success:!1,error:"アクティビティ取得に失敗しました"},500)}});ce.post("/api/admin/reset-usage",bn,async n=>{try{const e=await _n.resetAllUsageCounts();return n.json({success:!0,message:`使用回数をリセットしました (成功: ${e.success}, 失敗: ${e.failed})`})}catch{return n.json({success:!1,error:"使用回数リセットに失敗しました"},500)}});ce.get("/api/admin/export",bn,async n=>{try{const e=await _n.exportUserData();n.header("Content-Type","application/csv"),n.header("Content-Disposition","attachment; filename=users_export.csv");const t=`UID,ユーザー名,メールアドレス,プラン,使用回数,最大使用数,登録日,最終ログイン,アクティブ
`,r=e.users.map(s=>[s.uid,s.username,s.email,s.plan,s.usageCount,s.maxUsage,s.createdAt.toDate().toISOString(),s.lastLoginAt.toDate().toISOString(),s.isActive].join(","));return n.text(t+r.join(`
`))}catch{return n.json({success:!1,error:"データエクスポートに失敗しました"},500)}});ce.get("/api/admin/users/search",bn,async n=>{try{const e=n.req.query("q")||"";if(e.length<2)return n.json({success:!1,error:"検索語句は2文字以上入力してください"},400);const t=await _n.searchUsers(e);return n.json({success:!0,data:t})}catch{return n.json({success:!1,error:"ユーザー検索に失敗しました"},500)}});async function G1(n,e){return await H1(n,e)}async function K1(n){return await W1(n)}ce.post("/api/analysis/single",async n=>{var e,t;try{const r=n.get("user");if(!r)return n.json({success:!1,error:"ログインが必要です"},401);if(r.uid!=="demo-user-123"){const f=await Ot.checkActionUsageLimit(r.uid,"single_analysis");if(!f.canUse){const p=Ot.getUpgradeRecommendation(r.plan,"single_analysis");return n.json({success:!1,error:`AI広告診断の月間使用上限に達しました (${f.actionLimit}回)`,usageInfo:f,recommendation:p},429)}}console.log("Environment check:",{hasOpenAIKey_process:!!z1.OPENAI_API_KEY,hasOpenAIKey_context:!!n.env.OPENAI_API_KEY,keyLength_context:((e=n.env.OPENAI_API_KEY)==null?void 0:e.length)||0,keyPrefix_context:((t=n.env.OPENAI_API_KEY)==null?void 0:t.substring(0,15))+"...",keyType_context:typeof n.env.OPENAI_API_KEY,nodeEnv:"production"});const i=(await n.req.formData()).get("image");if(!i)return n.json({success:!1,message:"画像ファイルが選択されていません"},400);if(!n.env.OPENAI_API_KEY||n.env.OPENAI_API_KEY==="your_openai_api_key_here")throw console.log("banaAI API Key not configured, using fallback data"),new Error("banaAI API Key not configured");const a=await i.arrayBuffer(),l=new Uint8Array(a),u=btoa(String.fromCharCode.apply(null,Array.from(l))),h=await q1(u,n.env.OPENAI_API_KEY);return r.uid!=="demo-user-123"&&await be.incrementUsageCount(r.uid,"single_analysis"),n.json({success:!0,result:h,user:{plan:r.plan,usageCount:r.uid!=="demo-user-123"?r.usageCount+1:r.usageCount,maxUsage:r.maxUsage}})}catch(r){console.error("Analysis error:",r);const s=n.get("user");if(s&&s.uid!=="demo-user-123")try{await be.incrementUsageCount(s.uid,"single_analysis")}catch(i){console.error("Usage increment error:",i)}return n.json({success:!0,result:{totalScore:82,level:"優秀レベル",scores:{impact:{score:88,label:"瞬間伝達力",color:"#90EE90"},visibility:{score:79,label:"視認性",color:"#87CEEB"},cta:{score:85,label:"行動喚起",color:"#90EE90"},consistency:{score:81,label:"整合性",color:"#87CEEB"},balance:{score:76,label:"情報バランス",color:"#FFA500"}},analysis:{targetMatch:91,strengths:["視覚階層: メインメッセージが3秒以内に理解可能","色彩バランス: ブランドカラーと可読性の両立が秀逸","CTA配置: 自然な視線誘導でアクション率向上が期待"],improvements:["テキストコントラスト: 明度を15%向上で可読性UP","余白調整: 左右マージンを1.2倍に拡張","フォントサイズ: キャッチコピーを24px→28pxに"],performance:{clickRate:{current:3.2,improved:4.1,change:28},conversionRate:{current:1.8,improved:2.3,change:27},brandAwareness:{change:34}}},note:"banaAI APIデモモード：サンプル解析データを表示しています"}})}});ce.post("/api/analysis/compare",async n=>{try{const e=n.get("user");if(!e)return n.json({success:!1,error:"ログインが必要です"},401);if(e.uid!=="demo-user-123"){const g=await Ot.checkActionUsageLimit(e.uid,"ab_comparison");if(!g.canUse){const _=Ot.getUpgradeRecommendation(e.plan,"ab_comparison");return n.json({success:!1,error:`A/B比較分析の月間使用上限に達しました (${g.actionLimit}回)`,usageInfo:g,recommendation:_},429)}}const t=await n.req.formData(),r=t.get("imageA"),s=t.get("imageB");if(!r||!s)return n.json({success:!1,message:"2つの画像ファイルが必要です"},400);const i=await r.arrayBuffer(),a=new Uint8Array(i),l=btoa(String.fromCharCode.apply(null,Array.from(a))),u=await s.arrayBuffer(),h=new Uint8Array(u),f=btoa(String.fromCharCode.apply(null,Array.from(h))),p=await G1(l,f,n.env.OPENAI_API_KEY);return e.uid!=="demo-user-123"&&await be.incrementUsageCount(e.uid,"ab_comparison"),n.json({success:!0,result:p,user:{plan:e.plan,usageCount:e.uid!=="demo-user-123"?e.usageCount+1:e.usageCount,maxUsage:e.maxUsage}})}catch(e){console.error("AB comparison error:",e);const t=n.get("user");if(t&&t.uid!=="demo-user-123")try{await be.incrementUsageCount(t.uid,"ab_comparison")}catch(r){console.error("Usage increment error:",r)}return n.json({success:!0,result:{winner:"A",confidence:92.4,cvrImprovement:24.3,sampleSize:1e3,patternA:{score:87,scores:{impact:{score:92,label:"瞬間伝達力",color:"#90EE90"},visibility:{score:85,label:"視認性",color:"#90EE90"},cta:{score:88,label:"行動喚起",color:"#90EE90"},consistency:{score:84,label:"整合性",color:"#87CEEB"},balance:{score:86,label:"バランス",color:"#90EE90"}}},patternB:{score:75,scores:{impact:{score:71,label:"瞬間伝達力",color:"#FFA500"},visibility:{score:78,label:"視認性",color:"#87CEEB"},cta:{score:73,label:"行動喚起",color:"#FFA500"},consistency:{score:77,label:"整合性",color:"#87CEEB"},balance:{score:76,label:"バランス",color:"#87CEEB"}}},analysis:{advantages:["瞬間伝達力 +21点: メインメッセージの視認性が圧倒的に高い","行動喚起 +15点: CTAボタンの配色・配置が最適化されている","整合性 +7点: ブランド一貫性とユーザー期待値が合致"],improvements:["文字階層の見直しが必要（情報の優先度が不明確）","CTAの視認性向上（背景との対比不足）","全体的な情報密度の調整が推奨"],expectedResults:{currentCvr:2.1,improvedCvr:2.6,additionalConversions:12,roiImprovement:18.2,cpaReduction:19.5}},note:"banaAI APIデモモード：サンプル解析データを表示しています"}})}});ce.post("/api/copy-generation",async n=>{try{const e=n.get("user");if(!e)return n.json({success:!1,error:"ログインが必要です"},401);if(e.uid!=="demo-user-123"){const u=await Ot.checkActionUsageLimit(e.uid,"copy_generation");if(!u.canUse){const h=Ot.getUpgradeRecommendation(e.plan,"copy_generation");return n.json({success:!1,error:`AIコピー生成の月間使用上限に達しました (${u.actionLimit}回)`,usageInfo:u,recommendation:h},429)}}const r=(await n.req.formData()).get("image");if(!r)return n.json({success:!1,message:"画像ファイルが選択されていません"},400);const s=await r.arrayBuffer(),i=new Uint8Array(s),a=btoa(String.fromCharCode.apply(null,Array.from(i))),l=await K1(a,n.env.OPENAI_API_KEY);return e.uid!=="demo-user-123"&&await be.incrementUsageCount(e.uid,"copy_generation"),n.json({success:!0,result:l,user:{plan:e.plan,usageCount:e.uid!=="demo-user-123"?e.usageCount+1:e.usageCount,maxUsage:e.maxUsage}})}catch(e){console.error("Copy generation error:",e);const t=n.get("user");if(t&&t.uid!=="demo-user-123")try{await be.incrementUsageCount(t.uid,"copy_generation")}catch(r){console.error("Usage increment error:",r)}return n.json({success:!0,result:{copies:[{id:1,type:"メインコピー",text:"美肌への近道、ここにあり。今すぐ体験してください。",effectiveness:92,reasoning:"緊急性と具体的なベネフィットを組み合わせた効果的なコピー"},{id:2,type:"キャッチコピー",text:"3日で実感！輝く美肌を手に入れる秘密",effectiveness:89,reasoning:"数字による具体性と期待感を高める表現が効果的"},{id:3,type:"CTAコピー",text:"限定価格で今すぐ始める",effectiveness:87,reasoning:"限定性と行動喚起を組み合わせた強力なCTA"},{id:4,type:"サブコピー",text:"94%のユーザーが満足した美容メソッド",effectiveness:85,reasoning:"社会的証明による信頼性向上"}],analysis:{overallScore:88,industryMatch:95,targetAudience:"美容意識の高い20-40代女性",recommendations:["メインコピーを最も目立つ位置に配置","CTAボタンに「限定価格で今すぐ始める」を使用","サブコピーで信頼性を補完"]},note:"banaAI APIデモモード：サンプル解析データを表示しています"}})}});const Hp=new Sg,Q1=Object.assign({"/src/index.tsx":ce});let dw=!1;for(const[,n]of Object.entries(Q1))n&&(Hp.all("*",e=>{let t;try{t=e.executionCtx}catch{}return n.fetch(e.req.raw,e.env,t)}),Hp.notFound(e=>{let t;try{t=e.executionCtx}catch{}return n.fetch(e.req.raw,e.env,t)}),dw=!0);if(!dw)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{Hp as default};
