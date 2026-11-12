/* Checkout motion — entrance reveals and cart/form feedback. */
(function(){
 'use strict';
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const header=document.querySelector('.header');
 const reveal=document.querySelectorAll('.checkout-head,.checkout-grid>.panel');
 if('IntersectionObserver'in window){
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target)}
  }),{threshold:.08,rootMargin:'0px 0px 24px 0px'});
  reveal.forEach(el=>io.observe(el));
 }else reveal.forEach(el=>el.classList.add('is-visible'));
 let last=0,queued=false;
 function scrollUpdate(){
  queued=false;const y=window.scrollY;
  if(header)header.classList.toggle('usci-checkout-compact',y>20);
  last=y;
 }
 window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(scrollUpdate)}},{passive:true});
 const items=document.getElementById('items');
 if(items&&'MutationObserver'in window){
  const mo=new MutationObserver(()=>items.querySelectorAll('.summary-item').forEach((el,i)=>{el.style.animationDelay=Math.min(i*55,220)+'ms'}));
  mo.observe(items,{childList:true});
 }
 const copy=document.getElementById('copy');
 if(copy)copy.addEventListener('click',()=>{copy.classList.add('usci-copy-done');setTimeout(()=>copy.classList.remove('usci-copy-done'),850)});
 const form=document.getElementById('checkoutForm');
 if(form)form.addEventListener('submit',()=>{const submit=form.querySelector('[type="submit"]');if(submit){submit.classList.add('usci-submit-pending');setTimeout(()=>submit.classList.remove('usci-submit-pending'),500)}});
})();
