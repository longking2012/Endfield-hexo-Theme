(function(){
  'use strict';
  var toggle = document.getElementById('theme-toggle');
  var body = document.body;
  var KEY = 'ink-theme';
  function apply(mode) {
    body.setAttribute('data-theme', mode);
    if (toggle) toggle.textContent = (mode === 'dark') ? '\u25d1' : '\u25d0';
  }
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved === 'dark' || saved === 'light') {
    apply(saved);
  } else {
    var pref = body.getAttribute('data-theme') || 'auto';
    apply(pref);
  }
  if (toggle) {
    toggle.addEventListener('click', function(){
      var cur = body.getAttribute('data-theme');
      var next = (cur === 'dark') ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
    });
  }
  document.querySelectorAll('.post-content pre').forEach(function(pre){
    if (pre.querySelector('.copy-btn')) return;
    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = '\u590d\u5236';
    btn.addEventListener('click', function(){
      var code = pre.querySelector('code') || pre;
      var text = code.innerText;
      var done = function(){
        btn.textContent = '\u5df2\u590d\u5236';
        setTimeout(function(){ btn.textContent = '\u590d\u5236'; }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else { fallback(); }
      function fallback(){
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
    pre.appendChild(btn);
  });
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    if (!id) return;
    var el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({behavior:'smooth', block:'start'});
    history.replaceState(null, '', '#' + id);
  });
})();

/* ===== 终末地: 滚动淡入动画 ===== */
(function(){
  var els=document.querySelectorAll('.post, .post-page');
  els.forEach(function(el){el.classList.add('ef-fade')});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
    },{threshold:.08});
    els.forEach(function(el){ io.observe(el); });
  }else{ els.forEach(function(el){ el.classList.add('visible'); }); }
})();

/* ===== 终末地: 右下角音乐播放器 ===== */
(function(){
  var m=document.querySelector('.ef-music'); if(!m) return;
  var btn=m.querySelector('button'), au=m.querySelector('audio');
  if(!au||!au.getAttribute('src')) return;
  m.classList.add('show');
  au.addEventListener('error',function(){ m.classList.remove('show'); });
  btn.addEventListener('click',function(){
    if(au.paused){ au.play().catch(function(){ m.classList.remove('show'); }); m.classList.add('playing'); }
    else{ au.pause(); m.classList.remove('playing'); }
  });
})();

/* ===== 终末地: 背景光晕脉冲 ===== */
(function(){
  var g=document.createElement('div'); g.className='ef-glow'; document.body.appendChild(g);
})();
