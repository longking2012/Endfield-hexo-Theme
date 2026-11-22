/* 终末地地形背景: <img> + object-fit:cover 强制铺满 + 地名卡跳 Bing */
(function(){
  var MAN = window.__EF_MANIFEST;
  if(!MAN) return;
  var KEYS = Object.keys(MAN);
  var pick;
  try{
    var s = sessionStorage.getItem("__ef_bg");
    pick = (s && MAN[s]) ? s : KEYS[Math.floor(Math.random()*KEYS.length)];
  }catch(e){ pick = KEYS[Math.floor(Math.random()*KEYS.length)]; }
  var cur = MAN[pick];
  var body = document.body;
  body.classList.add("ef-theme");

  // <img> 背景层: object-fit:cover 保证铺满整个视口, 绝无黑边
  var img = document.createElement("img");
  img.className = "ef-bg";
  img.alt = "";
  img.setAttribute("aria-hidden", "true");
  img.draggable = false;
  body.insertBefore(img, body.firstChild);
  function setBg(k){
    img.src = "/images/contour-" + k + ".svg";
  }
  setBg(pick);

  function bing(lon, lat, lvl){
    return "https://www.bing.com/maps?q=" + lat.toFixed(4) + "," + lon.toFixed(4)
         + "&lvl=" + (lvl || 12);
  }
  function render(){
    var d = cur.dlon/2, h = cur.dlat/2;
    var c = document.createElement("div");
    c.className = "ef-index";
    c.innerHTML =
      "<div class=\"ef-index-h\">SOUTHLAND \u00b7 " + pick.toUpperCase() + "</div>"
      + "<a class=\"ef-index-t\" href=\"" + bing(cur.lon0,cur.lat0,12) + "\" target=\"_blank\" rel=\"noopener\">"
        + cur.title + " <span class=\"ef-geo\">N" + cur.lat0.toFixed(2) + "\u00b0 E" + cur.lon0.toFixed(2) + "\u00b0</span></a>"
      + "<div class=\"ef-index-c\">" + Math.round(cur["min"]) + "\u2013" + Math.round(cur["max"]) + "m"
        + " &nbsp;\u00b7&nbsp; " + cur.marks.length + " \u5904\u5730\u6807</div>"
      + "<div class=\"ef-index-r\"><a class=\"ef-map\" href=\"" + bing(cur.lon0,cur.lat0,10) + "\" "
        + "target=\"_blank\" rel=\"noopener\">\u2197 \u6253\u5f00\u5730\u56fe</a>"
      + "<button class=\"ef-next\" type=\"button\">\u25b6 \u4e0b\u4e00\u5f20</button></div>";
    c.querySelector(".ef-next").addEventListener("click", function(ev){
      ev.stopPropagation();
      var i = KEYS.indexOf(pick);
      pick = KEYS[(i+1) % KEYS.length];
      cur = MAN[pick];
      setBg(pick);
      try{ sessionStorage.setItem("__ef_bg", pick); }catch(e){}
      c.outerHTML = "";
      render();
    });
    document.body.appendChild(c);
  }
  render();
})();
