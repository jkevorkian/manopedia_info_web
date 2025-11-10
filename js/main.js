// Interacciones principales: menú, accesibilidad, focus trap básico
(function(){
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');
  navToggle.addEventListener('click', ()=>{
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    if(!expanded){ navList.style.display='flex'} else { navList.style.display='none'}
  });

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); }
    });
  });
  // Demo video: lazy load poster if available
  const demoVideo = document.getElementById('demo-video');
  if(demoVideo){
    demoVideo.addEventListener('loadedmetadata', ()=>{
      // show controls only after metadata loaded for better UX
      demoVideo.controls = true;
    });
  }

  // Tiny accessibility helper: add skip to content link focus
  const skip = document.createElement('a');
  skip.href = '#main'; skip.className='skip-link'; skip.textContent='Saltar al contenido';
  skip.style.position='absolute'; skip.style.left='-999px'; skip.style.top='auto'; skip.style.width='1px';
  skip.style.height='1px'; skip.style.overflow='hidden';
  skip.addEventListener('focus', ()=>{ skip.style.left='12px'; skip.style.width='auto'; skip.style.height='auto'; skip.style.background='#fff'; skip.style.color='#000'; skip.style.padding='8px'; skip.style.zIndex=9999});
  skip.addEventListener('blur', ()=>{ skip.style.left='-999px'; skip.style.width='1px'; skip.style.height='1px'});
  document.body.insertBefore(skip, document.body.firstChild);
})();