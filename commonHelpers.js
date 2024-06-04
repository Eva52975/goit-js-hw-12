import{a as h,i as y,S as L}from"./assets/vendor-ee72e1a4.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function l(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=l(r);fetch(r.href,s)}})();async function f(t,e=1){const l="https://pixabay.com",n="/api/",r=new URLSearchParams({key:"44054875-23597af336816bebd19227040",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e});try{const{data:s}=await h(`${l}${n}?${r}`);if(s.hits.length===0)y.error({message:"Sorry, there are no images matching your search query. Please try again!"});else return s.hits}catch(s){console.error(s.message)}}function m(t){return t.map(e=>`<li class="element-gallery">
      <a class="gallery-link" href="${e.largeImageURL}">
    <img class="img-gallery" src="${e.webformatURL}" alt="${e.tags}">
    <ul class="list-info">
    <li class="item-info"><h3 class="title-text">Likes</h3>
    <p class="text">${e.likes}</p></li>
    <li class="item-info"><h3 class="title-text">Views</h3>
    <p class="text">${e.views}</p></li>
    <li class="item-info"><h3 class="title-text">Comments</h3>
    <p class="text">${e.comments}</p></li>
    <li class="item-info"><h3 class="title-text">Downloads</h3>
    <p class="text">${e.downloads}</p></li>
   </ul>
  </li>`).join("")}function g(){new L(".gallery a",{captionDelay:250,captionsData:"alt"}).refresh()}function b(){const t=document.querySelector(".loader");t.style.display="block"}function d(){const t=document.querySelector(".loader");t.style.display="none"}const x=document.querySelector(".form"),p=document.querySelector('input[name = "value"]'),c=document.querySelector(".gallery"),o=document.querySelector(".btn-load-more");o.style.display="none";d();let a="",u=1;x.addEventListener("submit",async t=>{if(t.preventDefault(),c.innerHTML="",a=p.value.trim(),a!==""){p.value="",b();try{const e=await f(a,u);if(!e||e.length===0){o.style.display="none";return}const l=m(e);c.insertAdjacentHTML("beforeend",l),g(),e.length>=15?o.style.display="block":o.style.display="none"}catch(e){console.log(e)}finally{d()}}});o.addEventListener("click",async()=>{u+=1;try{const t=await f(a,u);if(!t||t.length===0){d(),y.error({position:"topRight",message:"We're sorry, there are no more posts to load"}),o.style.display="none";return}c.insertAdjacentHTML("beforeend",m(t)),g()}catch(t){console.log(t)}});
//# sourceMappingURL=commonHelpers.js.map
