/* Premium motion — scroll, parallax, tilt and product reveal. */
(function(){
 'use strict';
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const finePointer=window.matchMedia('(hover: hover) and (pointer: fine)');
 if(reduced.matches)return;
 let observer=null,queued=false;
 const targets=new WeakSet(),tiltBound=new WeakSet(),q=s=>document.querySelector(s);
 function tag(el,delay,direction){
  if(!el||targets.has(el))return;targets.add(el);el.classList.add('usci-reveal');
  if(direction)el.setAttribute('data-motion',direction);
  el.style.setProperty('--reveal-delay',String(delay||0)+'ms');
  if(observer)observer.observe(el);else el.classList.add('usci-visible');
 }
 function bindTilt(card){
  if(!finePointer.matches||tiltBound.has(card))return;tiltBound.add(card);card.classList.add('usci-tilt-card');
  card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/Math.max(1,r.width),y=(e.clientY-r.top)/Math.max(1,r.height);card.style.setProperty('--usci-tilt-x',((x-.5)*7).toFixed(2)+'deg');card.style.setProperty('--usci-tilt-y',((.5-y)*6).toFixed(2)+'deg')});
  card.addEventListener('pointerleave',()=>{card.style.setProperty('--usci-tilt-x','0deg');card.style.setProperty('--usci-tilt-y','0deg')});
 }
 function scan(){const main=q('#storeMain');if(!main||main.hidden)return;
  main.querySelectorAll('.category-chooser .section-top,#sellados .section-top,#seminuevos .section-top,#contacto .section-top,.coverage,.footer-main').forEach(el=>tag(el,0));
  main.querySelectorAll('.quick-strip .strip-items>div').forEach((el,i)=>tag(el,Math.min(i*90,270)));
  main.querySelectorAll('.category-chooser .collection').forEach((el,i)=>tag(el,i*140,i%2?'right':'left'));
  main.querySelectorAll('#catalogGrid .product-card,#usedGrid .product-card').forEach((el,i)=>{tag(el,Math.min((i%4)*95,285));bindTilt(el)});
 }
 function update(){queued=false;const y=scrollY,header=q('.header');if(header)header.classList.toggle('usci-header-compact',y>24);
  const art=q('#heroArt'),hero=q('#inicio');if(art&&hero&&finePointer.matches){const r=hero.getBoundingClientRect(),p=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height)));art.style.setProperty('--usci-parallax-y',((p-.5)*-34).toFixed(1)+'px')}
  const bar=q('.usci-scroll-progress');if(bar){const d=document.documentElement;bar.style.transform='scaleX('+Math.min(1,Math.max(0,y/Math.max(1,d.scrollHeight-d.clientHeight)))+')'}
 }
 function requestUpdate(){if(!queued){queued=true;requestAnimationFrame(update)}}
 function init(){if(!('IntersectionObserver'in window))return;
  observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('usci-visible');observer.unobserve(e.target)}}),{rootMargin:'0px 0px 28px 0px',threshold:.08});
  document.documentElement.classList.add('usci-motion-ready');scan();
  const store=q('#storeMain');if(store&&'MutationObserver'in window)new MutationObserver(list=>{if(list.some(x=>x.type==='childList'||(x.type==='attributes'&&x.attributeName==='hidden')))scan()}).observe(store,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
  const bar=document.createElement('div');bar.className='usci-scroll-progress';bar.setAttribute('aria-hidden','true');document.body.appendChild(bar);
  window.addEventListener('scroll',requestUpdate,{passive:true});window.addEventListener('resize',requestUpdate,{passive:true});update();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
