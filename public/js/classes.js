function PaperManage(cf) {
  var t = this,
    defaults = {
      doms: null,
      onPageEnd: function() {},
      allowClickToPage: false
    };
  t.pages = [];
  t.currpage = 0;
  t.totalpage;
  t.zindex = 1000;
  t.canpage = true;
  t.nmx, t.smx, t.tlen;
  t.maxsize = 10;
  t.iszoom = false;
  t.isClosed = true;
  t.apply(t, cf, defaults);
  t.init();
}
PaperManage.prototype = {
  init: function() {
    var t = this;
    t.totalpage = Math.ceil(t.doms.length / 2);
    for (var i = 0; i < t.doms.length; i += 2) {
      //console.log("page %s - [%s,%s]> ",i/2,i,i+1);
      t.pages.push(new Paper({
        pages: [t.doms[i],
          t.doms[i + 1]
        ],
        onclick: function(e) {
          if (t.isClosed) {
            t.clickPage(e);
          }
        }
      }));
    }
    document.addEventListener(mousedown, function(e) {
      return t.ondown(e);
    });
    document.addEventListener(mousemove, function(e) {
      return t.onmove(e);
    });
    document.addEventListener(mouseup, function() {
      t.onup();
    });
  },
  ondown: function(e) {
    if (!isread) return;
    var t = this;
    if (!t.isClosed) return;
    t.smx = t.nmx = isPC ? e.pageX : e.touches[0].pageX;
    t.tlen = 0;
  },
  onmove: function(e) {
    var t = this;
    if (!t.isClosed) return;
    if (!isread || t.iszoom) return;
    e.preventDefault();
    t.nmx = isPC ? e.pageX : e.touches[0].pageX;
    t.tlen = t.nmx - t.smx;
    return false;
  },
  onup: function() {
    if (!isread) return;
    var t = this;
    if (!t.isClosed) return;
    if (t.tlen > t.maxsize) {
      t.prevpage();
    } else if (t.tlen < -t.maxsize) {
      if (t.currpage < t.totalpage - 1) {
        t.nextpage();
      }
    }
  },
  clickPage: function(e) {
    var t = this;
    if (isMob) {
      if (t.iszoom) {
        t.iszoom = false;
        zoomDom($(".box_box"), 1, "left top");
        //$("#book").scrollTop(offsetTopAsSafari).scrollLeft(0);
        if (!isPC && isSafari && navigator.userAgent.indexOf("iPhone OS") > -1 && tsw == 980 && (tsh == 654 || tsh == 552)) {
          $("#book").removeClass("ofxy").addClass("ofh").scrollTop(0).scrollLeft(0);
        } else {
          //$(".box_box").css({top:0,left:0});
          $("#book").removeClass("ofxy").addClass("ofh").scrollTop(0).scrollLeft(0);
        }
      } else {
        t.iszoom = true;
        var tleft = (sw - 1334 * ss) * 0.5 * 2.5;
        var ttop = offsetTopAsSafari * 1.5;
        zoomDom($(".box_box"), 3.5, "left top");
        if (!isPC && isSafari && navigator.userAgent.indexOf("iPhone OS") > -1 && tsw == 980 && (tsh == 654 || tsh == 552)) {
          if (e.index == 0) {
            $("#book").removeClass("ofh").addClass("ofxy").scrollTop(ttop).scrollLeft(sw * 2.5 - tleft - sw);
          } else {
            $("#book").removeClass("ofh").addClass("ofxy").scrollTop(ttop).scrollLeft(tleft);
          }
        } else {
          //$(".box_box").css({top:(sh-1000*ss*2.5)*0.5,left:(sw-1334*ss*2.5)*0.5});
          if (e.index == 0) {
            $("#book").removeClass("ofh").addClass("ofxy").scrollTop(0).scrollLeft(sw * 2.5 - tleft - sw);
          } else {
            $("#book").removeClass("ofh").addClass("ofxy").scrollTop(0).scrollLeft(tleft);
          }
        }
      }
      return;
    }
    if (t.allowClickToPage) {
      if (e.index == 0) {
        if (t.currpage < t.totalpage - 1) t.nextpage();
      } else {
        t.prevpage();
      }
    }
  },
  closeBook: function() {
    var t = this;
    t.isClosed = false;
    var idx = 0;
    var tnum = 5;
    var arr = new Array();
    for (var i = t.currpage - 1; i >= 0; i--) {
      arr.push(i);
      if (arr.length >= tnum) {
        i = -1;
      }
    }
    if (!(arr.indexOf(0) > -1)) arr.push(0);
    if (arr.length > 0 && t.currpage > 0) {
      autoclose();
    } else {
      for (var j = 0; j < t.totalpage; j++) {
        t.pages[j].hidepage();
      }
      t.isClosed = true;
    }

    function autoclose() {
      t.pages[arr[idx] + 1].setIndex(t.zindex - 10);
      if (idx + 1 >= arr.length) {
        t.pages[arr[idx]].setIndex(t.zindex).L2R(function() {
          for (var j = 0; j < t.totalpage; j++) {
            t.pages[j].hidepage();
          }
          t.isClosed = true;
        });
        return;
      } else {
        t.pages[arr[idx]].setIndex(t.zindex).L2R();
      }
      idx++;
      setTimeout(autoclose, 100);
    }
  },
  autoShowPage: function(n) {
    var t = this;
    var n = n / 2;
    var tn = Math.ceil(n);
    var arr = new Array();
    var tnum = 5;
    var idx = 0;
    if (tn > 0) {
      for (var i = 1; i <= tnum; i++) {
        if (t.pages[tn - i]) {
          arr.unshift(tn - i);
        }
      }
      if (arr[0] != 0) arr.unshift(0);
      if (t.pages[tn]) {
        t.pages[tn].showpage(0).setIndex(t.zindex);
        t.currpage = tn;
      } else {
        t.currpage = tn;
      }
      autoplay();
    } else {
      t.pages[tn].showpage(0).setIndex(t.zindex);
      t.currpage = 0;
      t.onPageEnd(t.currpage);
    }

    function autoplay() {
      if (idx >= arr.length) {
        t.onPageEnd(t.currpage);
        return;
      }
      console.log('autoplay - > %s index - > %s',arr[idx],t.zindex - arr.length + idx + 1);
      t.pages[arr[idx]].showpage(0);
      t.pages[arr[idx]].setIndex(t.zindex - arr.length + idx + 1).R2L();
      idx++;
      setTimeout(autoplay, 100);
    }
  },
  autoShowPage2: function(n) {
    var t = this;
    var n = n / 2;
    var tn = Math.ceil(n);
    var ttn = Math.floor(n);
    var leftArr = new Array(),
      rightArr = new Array();
    var tnum = 5;
    var lidx = 0;
    ridx = 0;
    if (tn >= 0 && tn <= t.totalpage) {
      t.currpage = tn;
      var tpage = (ttn < n) ? tn - 1 : tn;
      for (var i = 1; i <= tnum; i++) {
        if (t.pages[tpage - 1 - i]) {
          leftArr.unshift(tpage - 1 - i);
        }
        if (t.pages[tpage + i]) {
          rightArr.unshift(tpage + i);
        }
      }
      if (ttn < n) {
        leftArr.push(tpage);
      } else {
        rightArr.push(tpage);
        if (tpage > 0) leftArr.push(tpage - 1);
      }
      //trace(ttn,n,tpage,leftArr,rightArr)
      autoplayLeft();
      autoplayRight();
    }

    function autoplayLeft() {
      if (lidx >= leftArr.length) return;
      t.pages[leftArr[lidx]].setIndex(t.zindex - leftArr.length + lidx + 1).C2L();
      lidx++;
      setTimeout(autoplayLeft, 100);
    }

    function autoplayRight() {
      if (ridx >= rightArr.length) return;
      t.pages[rightArr[ridx]].setIndex(t.zindex - rightArr.length + ridx + 1).C2R();
      ridx++;
      setTimeout(autoplayRight, 100);
    }
  },
  nextpage: function() {
    var t = this;
    if (!t.canpage) return;
    var n = t.currpage + 1;
    var tprevprevpage = t.currpage - 2;
    if (n < t.totalpage) {
      t.canpage = false;
      if (tprevprevpage >= 0) t.pages[tprevprevpage].hidepage();
      if (t.currpage - 1 >= 0) t.pages[t.currpage - 1].setIndex(t.zindex - 1);
      t.pages[n].setIndex(1).showpage(0);
      t.pages[t.currpage].R2L(function() {
        t.pages[t.currpage].setIndex(t.zindex - 1);
        t.currpage = n;
        t.pages[t.currpage].setIndex(t.zindex);
        t.canpage = true;
        t.onPageEnd(t.currpage);
      });
    } else if (n == t.totalpage) {
      t.canpage = false;
      if (tprevprevpage >= 0) t.pages[tprevprevpage].hidepage();
      t.pages[t.currpage].R2L(function() {
        t.currpage = n;
        t.canpage = true;
        t.onPageEnd(t.currpage);
      });
    }
    playMusic("flip_vol");
  },
  prevpage: function() {
    var t = this;
    if (!t.canpage) return;
    var n = t.currpage - 1;
    var tnextpage = t.currpage + 1;
    if (n > 0) {
      t.canpage = false;
      if (tnextpage < t.totalpage) t.pages[tnextpage].hidepage();
      if (t.pages[t.currpage]) t.pages[t.currpage].setIndex(t.zindex - 1);
      t.pages[n - 1].showpage(1).setIndex(t.zindex - 1);
      t.pages[t.currpage - 1].setIndex(t.zindex).L2R(function() {
        t.currpage = n;
        t.canpage = true;
        t.onPageEnd(t.currpage);
      });
    } else if (n == 0) {
      t.canpage = false;
      if (tnextpage < t.totalpage) t.pages[tnextpage].hidepage();
      t.pages[t.currpage].setIndex(t.zindex - 1);
      t.currpage = n;
      t.pages[t.currpage].setIndex(t.zindex).L2R(function() {
        t.canpage = true;
        t.onPageEnd(t.currpage);
      });
    }
    playMusic("flip_vol");
  },
  apply: function(o, c, defaults) {
    if (defaults) {
      this.apply(o, defaults);
    }
    if (o && c && typeof c == 'object') {
      for (var p in c) {
        o[p] = c[p];
      }
    }
    return o;
  },
  constructor: PaperManage
}

function Paper(cf) {
  var t = this,
    defaults = {
      pages: null,
      onclick: function() {},
      ondblclick: function() {}
    };
  t.zindex = 0;
  t.apply(t, cf, defaults);
  t.init();
}
Paper.prototype = {
  init: function() {
    var t = this;
    $(t.pages).each(function(index, element) {
      $($(t.pages)[index]).click(function(e) {
        e.preventDefault();
        t.onclick({
          target: $(t.pages)[index],
          index: index
        });
      });
      /*$($(t.pages)[index]).mousedown(function(e) {
				e.preventDefault();
            });*/
    });
  },
  showpage: function(n) {
    var t = this;
    if (n > -1 && n <= 1) {
      var now = 0;
      t.page = n;
      $(t.pages[t.page]).children().css({
        opacity: 1
      });
      $(t.pages[t.page]).css({
        "transform": "rotateY(" + now + "deg)",
        //"-webkit-transform": "rotateY(" + now + "deg)",
        "-moz-transform": "rotateY(" + now + "deg)",
        "-ms-transform": "rotateY(" + now + "deg)",
        "-o-transform": "rotateY(" + now + "deg)"
      }).show();
    }
    return this;
  },
  hidepage: function() {
    var t = this;
    var now = 0;
    try{
      $(t.pages).fadeOut().removeAttr('style');
    }catch(e){
      //console.log("error - > ",e);
    }
    
    //$(t.pages).fadeOut().removeAttr("style");
    //.css({"z-index":1,"transform":"rotateY("+now+"deg)","-webkit-transform":"rotateY("+now+"deg)","-moz-transform":"rotateY("+now+"deg)","-ms-transform":"rotateY("+now+"deg)","-o-transform":"rotateY("+now+"deg)"});
    return this;
  },
  setIndex: function(n) {
    this.zindex = n;
    $(this.pages).css("z-index", n);
    return this;
  },
  C2R: function(onend) {
    var t = this;
    t.page = 0;
    t.showpage(t.page).animate($(t.pages[t.page]), -90, 0, 0.5, 1, function() {
      if (onend) onend();
    });
  },
  C2L: function(onend) {
    var t = this;
    t.page = 1;
    t.showpage(t.page).animate($(t.pages[t.page]), 0, 90, 0.5, 1, function() {
      if (onend) onend();
    });
  },
  R2L: function(onend) {
    var t = this;
    t.animate($(t.pages[t.page]), 0, -90, 1, 0.5, function() {
      $(t.pages[t.page]).hide();
      t.page = 1;
      t.animate($(t.pages[t.page]), 90, 0, 0.5, 1, function() {
        if (onend) onend();
      });
    });
  },
  L2R: function(onend) {
    var t = this;
    t.animate($(t.pages[t.page]), 0, 90, 1, 0.5, function() {
      $(t.pages[t.page]).hide();
      t.page = 0;
      t.animate($(t.pages[t.page]), -90, 0, 0.5, 1, function() {
        if (onend) onend();
      });
    });
  },
  animate: function autoPlay(dom, sry, ery, so, eo, onend, duration) {
    var t = this;
    if (!duration) duration = 300;
    dom.children().css({
      opacity: so
    }).animate({
      opacity: eo
    }, duration, "linear");
    /*if(ery<0){
			dom.css({left:0}).animate({left:-667},duration,onend).show();
		}else{
			dom.css({right:-667}).animate({right:0},duration,onend).show();
		}
		return;*/
    /*if(ery<0){
			dom.css({width:667}).animate({width:0},duration,onend).show();
		}else{
			dom.css({width:0}).animate({width:667},duration,onend).show();
		}
		return;*/
    dom.animate({
      ery: ery
    }, {
      step: function(now, fx) {
        if (fx.prop == "ery") {
          fx.start = sry;
          dom.css({
            "transform": "rotateY(" + now + "deg)",
            //"-webkit-transform": "rotateY(" + now + "deg)",
            "-moz-transform": "rotateY(" + now + "deg)",
            "-ms-transform": "rotateY(" + now + "deg)",
            "-o-transform": "rotateY(" + now + "deg)"
          });
        }
      },
      duration: duration,
      complete: onend
    }, 'linear').show();
  },
  apply: function(o, c, defaults) {
    if (defaults) {
      this.apply(o, defaults);
    }
    if (o && c && typeof c == 'object') {
      for (var p in c) {
        o[p] = c[p];
      }
    }
    return o;
  },
  constructor: Paper
}

function Chapters(cf) {
  var t = this,
    defaults = {
      dom: null,
      onclick: null
    };
  t.slider, t.btns;
  t.apply(t, cf, defaults);
  t.init();
}
Chapters.prototype = {
  init: function() {
    var t = this;
    t.slider = t.dom.find(".slider");
    t.btns = t.dom.find(".btns div");
    t.btns.each(function(index, e) {
      $(this).click(function(e) {
        t.moveslider(index);
        t.onclick(index);
      });
    });
  },
  moveslider: function(n) {
    var t = this;
    var left = ($(t.btns[n]).offset().left - t.dom.offset().left) + $(t.btns[n]).width() * 0.5;
    t.slider.animate({
      left: left
    }, 500, "swing");
  },
  apply: function(o, c, defaults) {
    if (defaults) {
      this.apply(o, defaults);
    }
    if (o && c && typeof c == 'object') {
      for (var p in c) {
        o[p] = c[p];
      }
    }
    return o;
  },
  constructor: Chapters
}
/*
队列预加载图片
obj:{list:arr,progress:function,end:function}*/
function preloadimg(obj) {
  var arr = obj.list;
  var onprogress = obj.progress;
  var onend = obj.end;
  var idx = 0,
    len = arr.length;
  var data = new Array();
  loadimg();

  function loadimg() {
    var img = new Image();
    img.onload = function() {
      data.push({
        img: img,
        path: arr[idx]
      });
      idx++;
      if (onprogress) onprogress({
        total: len,
        idx: idx,
        img: img
      });
      if (idx >= len) {
        if (onend) onend(data);
      } else {
        loadimg();
      }
    };
    img.onerror = function() {
      data.push({
        img: null,
        path: arr[idx]
      });
      idx++;
      if (onprogress) onprogress({
        total: len,
        idx: idx,
        img: img
      });
      if (idx >= len) {
        if (onend) onend(data);
      } else {
        loadimg();
      }
    };
    img.src = arr[idx].src;
  }
}

function strReplaceObj(templete, obj) {
  var item = templete.replace(/%([a-zA-Z]+)%/g, function(m1, m2) {
    return obj[m2];
  });
  return item;
}

function is_ipad() {
  var userAgentInfo = navigator.userAgent;
  return userAgentInfo.indexOf("iPad") > 0;
}

function is_mobile() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod"];
  var flag = false;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = true;
      break;
    }
  }
  return flag;
}

function is_weixin() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}

function is_android() {
  var ua = navigator.userAgent;
  return ua.indexOf("Android") > -1;
}

function is_pc() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

function trace() {
  if (window.console && console.log) {
    console.log(arguments);
  }
}

function traceObj(obj) {
  if (window.console && console.log) {
    console.log(JSON.stringify(obj));
  }
}

function formatNumToLen(n, len) {
  var str = String(n);
  var tlen = len - str.length;
  for (var i = 0; i < tlen; i++) {
    str = "0" + str;
  }
  return str;
}