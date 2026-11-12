/* US Cellular Import — native premium scroll/micro-interactions. */
(()=>{
  'use strict';
  const doc=document,root=doc.documentElement,body=doc.body;
  const header=doc.querySelector('.header');
  const hero=doc.querySelector('.hero-typographic .hero-stage');
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supported='IntersectionObserver' in window;
  let progress;

  if(header){
    progress=doc.createElement('div');
    progress.className='premium-scroll-progress';
    progress.setAttribute('aria-hidden','true');
    header.appendChild(progress);
  }
  let ticking=false;
  function updateScroll(){
    ticking=false;
    const y=window.scrollY||root.scrollTop||0;
    const max=Math.max(1,root.scrollHeight-window.innerHeight);
    if(header)header.classList.toggle('is-scrolled',y>24);
    if(progress)progress.style.transform='scaleX('+Math.max(0,Math.min(1,y/max))+')';
    if(hero&&!reduce&&window.innerWidth>820){
      hero.style.setProperty('--hero-parallax',Math.min(24,y*.07).toFixed(1)+'px');
    }else if(hero){
      hero.style.removeProperty('--hero-parallax');
    }
  }
  function scheduleScroll(){
    if(ticking)return;
    ticking=true;
    requestAnimationFrame(updateScroll);
  }
  window.addEventListener('scroll',scheduleScroll,{passive:true});
  window.addEventListener('resize',scheduleScroll,{passive:true});
  updateScroll();

  if(!supported||reduce)return;

  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries){
      if(!entry.isIntersecting)continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  },{threshold:.08,rootMargin:'0px 0px -35px 0px'});

  function register(elements,kind='up',stagger=0){
    Array.from(elements).forEach((el,index)=>{
      if(!el||el.classList.contains('motion-reveal'))return;
      el.classList.add('motion-reveal');
      el.dataset.motion=kind;
      el.style.setProperty('--motion-delay',Math.min(index*stagger,280)+'ms');
      observer.observe(el);
    });
  }

  // First-screen choreography: independent stages with restrained timing.
  register(doc.querySelectorAll('.hero-copy > .eyebrow'),'up',0);
  register(doc.querySelectorAll('.hero-copy > h1'),'up',0);
  register(doc.querySelectorAll('.hero-copy > .desc'),'up',0);
  register(doc.querySelectorAll('.hero-copy > .button-row'),'up',0);
  [110,190,275,370].forEach((delay,i)=>{
    const el=doc.querySelectorAll('.hero-copy > .eyebrow, .hero-copy > h1, .hero-copy > .desc, .hero-copy > .button-row')[i];
    if(el)el.style.setProperty('--motion-delay',delay+'ms');
  });
  register(doc.querySelectorAll('.hero-art'),'right',0);
  const heroArt=doc.querySelector('.hero-art');
  if(heroArt)heroArt.style.setProperty('--motion-delay','200ms');

  // Section headings, commercial highlights, and alternating collection tiles.
  register(doc.querySelectorAll('.quick-strip .strip-items > div'),'up',85);
  register(doc.querySelectorAll('.section-top > .mini, .section-top > h2, .section-top > p'),'up',0);
  register(doc.querySelectorAll('.category-chooser .collection'),'scale',110);
  register(doc.querySelectorAll('.catalog-search-tools'),'up',0);
  register(doc.querySelectorAll('.coverage > div, .coverage > select'),'up',100);
  register(doc.querySelectorAll('.footer-main > div, .foot-bottom > span'),'up',85);

  // Dynamic cards are rebuilt while searching; watch the two live product grids.
  function registerCards(grid){
    if(!grid)return;
    register(grid.querySelectorAll('.product-card'),'up',75);
  }
  ['catalogGrid','usedGrid'].forEach(id=>{
    const grid=doc.getElementById(id);
    if(!grid)return;
    registerCards(grid);
    const watch=new MutationObserver(mutations=>{
      if(mutations.some(m=>m.addedNodes.length))registerCards(grid);
    });
    watch.observe(grid,{childList:true});
  });

  // Only activate opacity transitions once all existing targets are observed.
  body.classList.add('has-motion');
})();
