document.addEventListener('DOMContentLoaded', function(){
  // Marca como activo el enlace de navegación cuya href coincide con la ruta actual
  try{
    const links = Array.from(document.querySelectorAll('.nav-button'));
    const current = window.location.pathname.split('/').pop();
    links.forEach(a=>{
      const href = a.getAttribute('href');
      if(!href) return;
      const hrefName = href.split('/').pop();
      if(hrefName === current || (hrefName === '' && current === 'index.html')){
        a.classList.add('active');
      }
    });
  }catch(e){console.error(e)}
});