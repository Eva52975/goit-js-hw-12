import{a as L,S as b,i as p}from"./assets/vendor-ee72e1a4.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}})();async function f(t,e){const s="https://pixabay.com",a="/api/",o=new URLSearchParams({key:"44054875-23597af336816bebd19227040",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e});try{const{data:r}=await L(`${s}${a}?${o}`);return r.hits}catch(r){console.error(r.message)}}function m(t){return t.map(e=>`<li class="element-gallery">
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
  </li>`).join("")}function g(){new b(".gallery a",{captionDelay:250,captionsData:"alt"}).refresh()}function h(){const t=document.querySelector(".loader");t.style.display="block"}function c(){const t=document.querySelector(".loader");t.style.display="none"}const w=document.querySelector(".form"),y=document.querySelector('input[name = "value"]'),d=document.querySelector(".gallery"),l=document.querySelector(".btn-load-more");l.style.display="none";c();let i="";w.addEventListener("submit",async t=>{if(t.preventDefault(),d.innerHTML="",i=y.value.trim(),i!==""){y.value="",h();try{const e=await f(i,n=1);if(console.log(n),!e||e.length===0){p.error({message:"Sorry, there are no images matching your search query. Please try again!"}),l.style.display="none";return}const s=m(e);d.insertAdjacentHTML("beforeend",s),g(),e.length>=15?l.style.display="block":l.style.display="none"}catch(e){console.log(e)}finally{c()}}});let n=1;l.addEventListener("click",async()=>{n+=1,h();try{const t=await f(i,n);if(console.log(n),!t||t.length===0){c(),p.error({position:"topRight",message:"We're sorry, there are no more posts to load"}),l.style.display="none";return}d.insertAdjacentHTML("beforeend",m(t)),g();const s=d.lastElementChild.getBoundingClientRect().height;window.scrollBy({left:0,top:s*2,behavior:"smooth"})}catch(t){console.log(t)}finally{c()}});
//# sourceMappingURL=commonHelpers.js.map
