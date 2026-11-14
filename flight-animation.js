/* US Cellular Import — controla la animación logística: arranca desde cero al verse
   y se pausa fuera de pantalla o con la pestaña oculta (ahorra batería en celulares). */
(function(){
 'use strict';
 var scene=document.getElementById('usciFlight');
 if(!scene)return;
 var inView=false;
 function sync(){scene.classList.toggle('is-paused',!(inView&&!document.hidden))}
 if(!('IntersectionObserver' in window)){return}
 scene.classList.add('is-paused');
 new IntersectionObserver(function(es){inView=es[es.length-1].isIntersecting;sync()},{threshold:.25}).observe(scene);
 document.addEventListener('visibilitychange',sync);
})();
