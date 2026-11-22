/* 终末地进站加载界面: logo + 进度条 + 完成淡出 */
(function(){
  var loader = document.getElementById('efLoader');
  if(!loader) return;
  var bar = document.getElementById('efBar');
  var pct = document.getElementById('efPct');
  var p = 0, done = false, timer = null;

  function set(v){
    v = Math.max(0, Math.min(100, Math.round(v)));
    if(bar) bar.style.width = v + '%';
    if(pct) pct.textContent = v + '%';
  }
  function finish(){
    if(done) return;
    done = true;
    set(100);
    setTimeout(function(){ loader.classList.add('done'); }, 350);
  }

  // 加载期间渐近 90%(表示忙碌), 真正完成要等 window.load(所有资源加载完)
  timer = setInterval(function(){
    p += (90 - p) * 0.06 + 0.3;
    set(p);
  }, 100);

  // 所有资源(img/脚本/CSS/SVG)加载完毕后才到 100% 并淡出
  window.addEventListener('load', function(){
    clearInterval(timer);
    var fin = setInterval(function(){
      p += 10; set(p);
      if(p >= 100){ clearInterval(fin); finish(); }
    }, 45);
  });

  // 兜底(防个别资源卡死), 但尽量让真实 load 触发完成
  setTimeout(function(){
    if(!done){ clearInterval(timer); finish(); }
  }, 9000);
})();
