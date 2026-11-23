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

/* ===== 终末地: 右侧边栏音乐播放器 ===== */
(function(){
  var p=document.getElementById('efPlayer'); if(!p) return;
  var au=document.getElementById('efAudio'); if(!au) return;
  /* 歌单: 换成你自己的音乐,把 src 改成 /music/xxx.mp3 并把文件放到 source/music/ 即可 */
  var PLAYLIST=[
    {title:'My Love (Shorter)',artist:'Raphlesia & BilliumMoto',src:'/music/my-love-shorter.mp3'}
  ];
  var idx=0, mode='list'; /* list | one | random */
  var $=function(id){ return document.getElementById(id); };
  var playBtn=$('efPlay'), trackEl=$('efTrack'), artistEl=$('efArtist'), curEl=$('efCur'), durEl=$('efDur');
  var fill=$('efPFill'), buf=$('efPBuf'), bar=$('efPBar'), vol=$('efVol'), pBody=$('efPBody'), toggle=$('efToggle');

  function fmt(s){ if(!isFinite(s)) return '0:00'; s=Math.round(s); var m=Math.floor(s/60), r=s%60; return m+':'+(r<10?'0':'')+r; }
  function load(i){
    idx=(i+PLAYLIST.length)%PLAYLIST.length;
    var t=PLAYLIST[idx];
    au.src=t.src; trackEl.textContent=t.title; artistEl.textContent=t.artist;
    fill.style.width='0%'; buf.style.width='0%'; curEl.textContent='0:00'; durEl.textContent='0:00';
  }
  function play(){ au.play().then(function(){ p.classList.add('playing'); }).catch(function(){}); }
  function pause(){ au.pause(); p.classList.remove('playing'); }
  function next(){
    if(mode==='one'){ load(idx); play(); return; }
    if(mode==='random'){ var r; do{ r=Math.floor(Math.random()*PLAYLIST.length); }while(PLAYLIST.length>1 && r===idx); load(r); play(); return; }
    load(idx+1); play();
  }
  function prev(){ if(mode==='random'){ next(); return; } load(idx-1); play(); }

  playBtn.addEventListener('click',function(){ if(au.paused){ if(!au.src) load(0); play(); } else pause(); });
  $('efNext').addEventListener('click',next);
  $('efPrev').addEventListener('click',prev);
  $('efMode').addEventListener('click',function(){
    mode = mode==='list' ? 'one' : mode==='one' ? 'random' : 'list';
    this.style.color = mode==='one' ? '#fffa00' : mode==='random' ? '#00ffa2' : '';
  });
  $('efMute').addEventListener('click',function(){ au.muted=!au.muted; this.style.color=au.muted?'#fffa00':''; });
  vol.addEventListener('input',function(){ au.volume=this.value/100; au.muted=false; });
  au.volume=vol.value/100;

  au.addEventListener('timeupdate',function(){
    curEl.textContent=fmt(au.currentTime);
    if(au.duration) fill.style.width=(au.currentTime/au.duration*100)+'%';
  });
  au.addEventListener('durationchange',function(){ durEl.textContent=fmt(au.duration); });
  au.addEventListener('progress',function(){
    if(au.buffered.length && au.duration) buf.style.width=(au.buffered.end(au.buffered.length-1)/au.duration*100)+'%';
  });
  au.addEventListener('ended',function(){ next(); });
  au.addEventListener('error',function(){ trackEl.textContent='无法加载音频'; artistEl.textContent=''; });
  bar.addEventListener('click',function(e){
    var rect=bar.getBoundingClientRect();
    if(au.duration) au.currentTime=(e.clientX-rect.left)/rect.width*au.duration;
  });
  toggle.addEventListener('click',function(){ p.classList.toggle('collapsed'); });

  load(0);
  p.classList.add('show');
  /* 手机端: 3秒后收缩成图标吸附边栏(点击展开) */
  setTimeout(function(){
    if(window.innerWidth<=768){ p.classList.add('mini'); }
  },3000);
  p.addEventListener('click',function(e){
    if(p.classList.contains('mini')){ p.classList.remove('mini'); e.stopPropagation(); }
  });
})();

/* 手机端: 地名卡 3秒后收缩成图标吸附(点击展开) */
setTimeout(function(){
  if(window.innerWidth<=768){
    var idx=document.querySelector('.ef-index');
    if(idx){
      idx.classList.add('mini');
      idx.addEventListener('click',function(e){ if(idx.classList.contains('mini')){ idx.classList.remove('mini'); e.stopPropagation(); } });
    }
  }
},3000);
