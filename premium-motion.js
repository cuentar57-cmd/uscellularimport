/* Premium motion — progressive enhancement, no external runtime. */
(function(){
 'use strict';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
 if(reduced.matches)return;
 let observer=null;
 const targets=new WeakSet();
 function tag(el, delay=0, direction=''){
  if(!el||targets.has(el))return;
  targets.add(el);
  el.classList.add('usci-reveal');
  if(direction)el.setAttribute('data-motion',direction);
  el.style.setProperty('--reveal-delay',String(delay)+'ms');
  if(observer)observer.observe(el);else el.classList.add('usci-visible');
 }
 function scan(){
  const main=document.getElementById('storeMain');
  if(main&&!main.hidden) {
   main.querySelectorAll('.category-chooser .section-top, #sellados .section-top, #seminuevos .section-top, #contacto .section-top, .coverage, .footer-main').forEach(el=>tag(el,0));
   main.querySelectorAll('.quick-strip .strip-items > div').forEach((el,i)=>tag(el,Math.min(i*90,270)));
   main.querySelectorAll('.category-chooser .collection').forEach((el,i)=>tag(el,i*140,i%2?'right':'left'));
   main.querySelectorAll('#catalogGrid .product-card, #usedGrid .product-card').forEach((el,i)=>tag(el,Math.min((i%4)*95,285)));
  }
 }
 function init(){
  if(!('IntersectionObserver' in window))return;
  observer=new IntersectionObserver((entries)=>{
   for(const entry of entries){
    if(!entry.isIntersecting)continue;
    entry.target.classList.add('usci-visible');
    observer.unobserve(entry.target);
   }
  },{rootMargin:'0px 0px 28px 0px',threshold:.08});
  document.documentElement.classList.add('usci-motion-ready');
  scan();
  const store=document.getElementById('storeMain');
  if(store&&'MutationObserver' in window) {
   const mutation=new MutationObserver((list)=>{
    if(list.some(x=>x.type==='childList'||(x.type==='attributes'&&x.attributeName==='hidden')))scan();
   });
   mutation.observe(store,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
  }
  const progress=document.createElement('div');
  progress.className='usci-scroll-progress';
  progress.setAttribute('aria-hidden','true');
  document.body.appendChild(progress);
  let queued=false;
  function update(){
   queued=false;
   if(reduced.matches)return;
   const d=document.documentElement;
   const total=Math.max(1,d.scrollHeight-d.clientHeight);
   progress.style.transform='scaleX('+Math.min(1,Math.max(0,scrollY/total))+')';
  }
  window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update)}},{passive:true});
  window.addEventListener('resize',()=>{if(!queued){queued=true;requestAnimationFrame(update)}},{passive:true});
  update();
  // Only use hover transforms on devices with a real pointer.
  if(!finePointer.matches)document.documentElement.classList.add('usci-touch');
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
