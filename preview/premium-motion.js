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



/* AIRLIFT V2 — GSAP choreography with native fallback and accessible motion preferences. */
(function(){
 'use strict';
 const panel=document.getElementById('usciAirLift'), replay=document.getElementById('airliftReplay');
 if(!panel||!replay)return;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const step=panel.querySelector('#airliftStep'),number=step.querySelector('.airlift-step-number'),name=step.querySelector('.airlift-step-name');
 const legend=Array.from(panel.querySelectorAll('.airlift-legend span'));
 let played=false, timeline=null, fallbackTimers=[];
 const plane=panel.querySelector('.airlift-aircraft'), box=panel.querySelector('.airlift-parcel'),door=panel.querySelector('.airlift-cargo-door');
 const loader=panel.querySelector('.airlift-loader'),dust=panel.querySelector('.airlift-dust'),gear=panel.querySelector('.airlift-wheels');
 const trails=panel.querySelector('.airlift-contrails'),shadow=panel.querySelector('.airlift-plane-shadow');
 const progress=panel.querySelector('#airliftProgress'),clouds=panel.querySelector('.airlift-clouds');
 function setStep(n){
  number.textContent='0'+n;
  name.textContent=['Preparando la carga','Ingreso a la bodega','Despegue en curso'][n-1];
  legend.forEach((el,i)=>el.classList.toggle('is-active',i===n-1));
 }
 function clearTimers(){fallbackTimers.forEach(clearTimeout);fallbackTimers=[];}
 function createGSAP(){
  const g=window.gsap;
  g.set([plane,box,loader,dust,gear,trails,shadow,clouds],{clearProps:'all'});
  g.set(door,{y:-50}); // Maintain the initially open cargo door until the package enters.
  g.set([dust,trails],{opacity:0});
  g.set(progress,{scaleX:0,transformOrigin:'left center'});
  const tl=g.timeline({paused:true,defaults:{overwrite:'auto'},onComplete:()=>setStep(3)});
  tl.to(box,{x:145,y:-28,duration:1.5,ease:'sine.inOut'},0.4)
    .to(box,{x:327,y:-62,duration:1.5,ease:'power2.inOut'},1.9)
    .call(()=>setStep(2),null,2.3)
    .to(box,{x:430,y:-78,duration:0.7,ease:'power2.in'},3.4)
    .to(box,{x:470,y:-82,scale:0.55,opacity:0,duration:0.65,ease:'power2.in'},4.1)
    .to(door,{y:0,duration:0.75,ease:'power2.inOut'},4.65)
    .to(loader,{x:-100,opacity:0,duration:0.9,ease:'power2.inOut'},5.3)
    .to(plane,{x:55,duration:.7,ease:'sine.inOut'},5.65)
    .to(dust,{opacity:.48,duration:.55,ease:'power1.out'},5.9)
    .call(()=>setStep(3),null,6.1)
    .to(plane,{x:165,y:-10,rotation:-1.5,duration:1.1,ease:'power2.in'},6.32)
    .to(trails,{opacity:.65,duration:.5,ease:'power1.in'},6.55)
    .to(plane,{x:445,y:-148,rotation:-6.5,duration:1.8,ease:'power2.in'},7.4)
    .to(gear,{y:-15,opacity:0,duration:.6,ease:'power1.in'},8.0)
    .to(shadow,{opacity:.1,scaleX:.65,duration:1.5,ease:'power1.out'},7.7)
    .to(dust,{opacity:0,duration:.7,ease:'power1.in'},7.9)
    .to(plane,{x:1000,y:-445,rotation:-10.5,scale:.85,opacity:0,duration:2.2,ease:'power3.in'},9.2)
    .to(clouds,{x:-65,duration:11.4,ease:'none'},0)
    .fromTo(progress,{scaleX:0},{scaleX:1,duration:11.4,ease:'none'},0);
  return tl;
 }
 function start(){
  if(reduced.matches)return;
  played=true;setStep(1);clearTimers();
  if(window.gsap){
   panel.classList.remove('is-fallback');
   if(timeline){timeline.pause(0);timeline.kill()}
   timeline=createGSAP();timeline.restart();
  }else{
   panel.classList.remove('is-fallback');
   void panel.offsetWidth;panel.classList.add('is-fallback');
   fallbackTimers.push(setTimeout(()=>setStep(2),2600));
   fallbackTimers.push(setTimeout(()=>setStep(3),6800));
  }
 }
 if(reduced.matches){replay.hidden=true;setStep(1);return;}
 replay.addEventListener('click',start);
 if(window.gsap&&window.ScrollTrigger){
  window.gsap.registerPlugin(window.ScrollTrigger);
  window.ScrollTrigger.create({trigger:panel,start:'top 76%',once:true,onEnter:()=>{if(!played)start()}});
 }else if('IntersectionObserver'in window){
  const io=new IntersectionObserver(entries=>{
   if(entries.some(e=>e.isIntersecting)){io.disconnect();if(!played)start()}
  },{threshold:.17});
  io.observe(panel);
 }else start();
})();
