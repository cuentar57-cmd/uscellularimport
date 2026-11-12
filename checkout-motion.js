(function(){
 'use strict';if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const header=document.querySelector('.header'),reveal=document.querySelectorAll('.checkout-head,.checkout-grid>.panel');
 if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px 24px 0px'});reveal.forEach(el=>io.observe(el))}
 else reveal.forEach(el=>el.classList.add('is-visible'));
 let queued=false;window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;if(header)header.classList.toggle('usci-checkout-compact',scrollY>20)})}},{passive:true});
 const items=document.getElementById('items');if(items&&'MutationObserver'in window)new MutationObserver(()=>items.querySelectorAll('.summary-item').forEach((el,i)=>el.style.animationDelay=Math.min(i*55,220)+'ms')).observe(items,{childList:true});
 const copy=document.getElementById('copy');if(copy)copy.addEventListener('click',()=>{copy.classList.add('usci-copy-done');setTimeout(()=>copy.classList.remove('usci-copy-done'),850)});
})();
