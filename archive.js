/* Only table view selection; the knowledge-card click/lightbox contract stays in base.html. */
document.querySelectorAll('.archive-controls').forEach(function (controls) {
  var wrap=controls.nextElementSibling;
  if(!wrap || !wrap.classList.contains('tbl'))return;
  controls.hidden=false;
  controls.querySelectorAll('button[data-col]').forEach(function(button){
    button.addEventListener('click',function(){
      controls.querySelectorAll('button').forEach(function(b){b.setAttribute('aria-pressed',String(b===button));});
      wrap.querySelectorAll('[data-col]').forEach(function(cell){
        cell.classList.toggle('archive-unselected',button.dataset.col!=='all' && cell.dataset.col!=='0' && cell.dataset.col!==button.dataset.col);
      });
    });
  });
});
