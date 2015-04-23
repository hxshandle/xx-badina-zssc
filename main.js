var serverURL = "http://digitalzine.offthewall.com.cn/"; //"http://digitalzine_staging.offthewall.com.cn/";
var sw, sh, tsw, tsh, ssmin;
var mousedown = "touchstart";
var mouseup = "touchend";
var mousemove = "touchmove";
var imgs = [],
  bookimgs = [];
var pc, pm, cm;
var listOffsetL = [0, 694, 4078, 6856, 9953, 13350, 14280];
var listLeft = [0, -340, -694, -4078, -6856, -9953, -13350, -14280];
var listBtnDatas = [
  [{
    id: -1,
    pos: [0, 0],
    size: [304, 400],
    gapL: 0
  }, {
    id: 1,
    pos: [0, 1],
    size: [338, 186],
    gapL: 36
  }],
  [{
    id: 3,
    pos: [0, 0],
    size: [306, 400],
    gapL: 16
  }, {
    id: 4,
    pos: [0, 1]
  }, {
    id: 6,
    pos: [1, 1]
  }, {
    id: 8,
    pos: [0, 1]
  }, {
    id: 10,
    pos: [1, 1]
  }, {
    id: 12,
    pos: [0, 1]
  }, {
    id: 14,
    pos: [1, 1]
  }, {
    id: 16,
    pos: [0, 1]
  }, {
    id: 18,
    pos: [1, 1]
  }, {
    id: 20,
    pos: [0, 1]
  }, {
    id: 22,
    pos: [1, 1]
  }, {
    id: 24,
    pos: [0, 1]
  }, {
    id: 26,
    pos: [1, 1]
  }, {
    id: 28,
    pos: [0, 1]
  }, {
    id: 30,
    pos: [1, 1]
  }, {
    id: 32,
    pos: [0, 1]
  }, {
    id: 34,
    pos: [1, 1]
  }, {
    id: 36,
    pos: [0, 1]
  }, {
    id: 38,
    pos: [1, 1]
  }, {
    id: 40,
    pos: [0, 1]
  }, {
    id: 42,
    pos: [1, 1]
  }],
  [{
    id: 44,
    pos: [0, 0],
    size: [306, 400],
    gapL: 18
  }, {
    id: 46,
    pos: [0, 1]
  }, {
    id: 48,
    pos: [1, 1]
  }, {
    id: 50,
    pos: [0, 1]
  }, {
    id: 52,
    pos: [1, 1]
  }, {
    id: 54,
    pos: [0, 1]
  }, {
    id: 56,
    pos: [1, 1]
  }, {
    id: 58,
    pos: [0, 1]
  }, {
    id: 60,
    pos: [1, 1]
  }, {
    id: 62,
    pos: [0, 1]
  }, {
    id: 64,
    pos: [1, 1]
  }, {
    id: 66,
    pos: [0, 1]
  }, {
    id: 68,
    pos: [1, 1]
  }, {
    id: 70,
    pos: [0, 1]
  }, {
    id: 72,
    pos: [1, 1]
  }, {
    id: 74,
    pos: [0, 1]
  }, {
    id: 76,
    pos: [1, 1]
  }],
  [{
    id: 78,
    pos: [0, 0],
    size: [306, 400],
    gapL: 23
  }, {
    id: 80,
    pos: [0, 1]
  }, {
    id: 82,
    pos: [1, 1]
  }, {
    id: 84,
    pos: [0, 1]
  }, {
    id: 86,
    pos: [1, 1]
  }, {
    id: 88,
    pos: [0, 1]
  }, {
    id: 90,
    pos: [1, 1]
  }, {
    id: 92,
    pos: [0, 1]
  }, {
    id: 94,
    pos: [1, 1]
  }, {
    id: 96,
    pos: [0, 1]
  }, {
    id: 98,
    pos: [1, 1]
  }, {
    id: 100,
    pos: [0, 1]
  }, {
    id: 102,
    pos: [1, 1]
  }, {
    id: 104,
    pos: [0, 1]
  }, {
    id: 106,
    pos: [1, 1]
  }, {
    id: 108,
    pos: [0, 1]
  }, {
    id: 110,
    pos: [1, 1]
  }, {
    id: 112,
    pos: [0, 1]
  }],
  [{
    id: 114,
    pos: [0, 0],
    size: [306, 400],
    gapL: 24
  }, {
    id: 116,
    pos: [0, 1]
  }, {
    id: 118,
    pos: [1, 1]
  }, {
    id: 120,
    pos: [0, 1]
  }, {
    id: 122,
    pos: [1, 1]
  }, {
    id: 124,
    pos: [0, 1]
  }, {
    id: 126,
    pos: [1, 1]
  }, {
    id: 128,
    pos: [0, 1]
  }, {
    id: 130,
    pos: [1, 1]
  }, {
    id: 132,
    pos: [0, 1]
  }, {
    id: 134,
    pos: [1, 1]
  }, {
    id: 136,
    pos: [0, 1]
  }, {
    id: 138,
    pos: [1, 1]
  }, {
    id: 140,
    pos: [0, 1]
  }, {
    id: 142,
    pos: [1, 1]
  }, {
    id: 144,
    pos: [0, 1]
  }, {
    id: 146,
    pos: [1, 1]
  }, {
    id: 148,
    pos: [0, 1]
  }, {
    id: 150,
    pos: [1, 1]
  }, {
    id: 152,
    pos: [0, 1]
  }, {
    id: 154,
    pos: [1, 1]
  }],
  [{
    id: 156,
    pos: [0, 1],
    gapL: 28
  }, {
    id: 158,
    pos: [0, 1],
    size: [250, 186]
  }, {
    id: 160,
    pos: [1, 1],
    size: [250, 186]
  }, {
    id: 162,
    pos: [0, 0],
    size: [306, 400],
    gapL: 8
  }],
  [{
    id: 163,
    pos: [0, 0],
    size: [254, 400],
    gapL: 37
  }, {
    id: 164,
    pos: [0, 1],
    size: [241, 186]
  }, {
    id: 166,
    pos: [1, 1],
    size: [241, 186]
  }, {
    id: 168,
    pos: [0, 1],
    size: [241, 186]
  }, {
    id: 170,
    pos: [1, 1],
    size: [241, 186]
  }, {
    id: 172,
    pos: [0, 1],
    size: [241, 186]
  }, {
    id: 174,
    pos: [1, 1],
    size: [241, 186]
  }, {
    id: 176,
    pos: [0, 1],
    size: [241, 186],
    gapL: 10
  }]
];
var btntemplete = '<div id="btn_%id%" style="top:%top%px;left:%left%px;width:%width%px;height:%height%px;"></div>';
var isread = false;
var listCurrLeft = 0,
  islistmove = false;
var isPC = is_pc(),
  isPad = is_ipad(),
  isMob = is_mobile();
var isSafari = navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") < 1;
var playTip, backTip, zoomTip;
var loadbooksidx = 0;
var bookIsShow = false;
$(function() {
  dataForWeixin.img = serverURL + "images/share.jpg";
  dataForWeixin.link = serverURL + "?utm_source=ShareWeixin&utm_medium=none&utm_campaign=201502";
  dataForWeixin.title = "House of Vans Asia 2014纪念别册数字版在线发布！一同体验创意表达的别样旅程！";
  dataForWeixin.desc = dataForWeixin.title;
  dataForWeixin.callback.ok = function() {
    tracker("weixin_share_from", "share_from");
  }
  dataForWeixin.update();
  if ((document.ontouchstart == null && isPC) || (!('ontouchstart' in window) && !isPC)) {
    mousedown = "mousedown";
    mouseup = "mouseup";
    mousemove = "mousemove";
  }
  onresize();
  if (is_android()) {
    if (is_weixin()) {
      $(".r_a_wx").show();
    } else {
      $(".r_a").show();
    }
  } else if (!isPC) {
    $(".r_a").show();
  }
  //var booksPath="images/books/p";
  //if(isPad)	
  var booksPath = "images/books_pad/p";
  for (var j = 1; j <= 7; j++) {
    imgs.push({
      id: "img_" + j,
      src: "images/c" + j + ".jpg"
    });
  }
  imgs.push({
    id: "img_zj",
    src: "images/zj.png"
  });
  for (var i = 0; i < 165; i++) {
    bookimgs.push({
      id: "book_" + i,
      src: booksPath + formatNumToLen(i + 1, 3) + ".jpg"
    });
  }
  for (i = 165; i < 177; i++) {
    bookimgs.push({
      id: "book_" + i,
      src: booksPath + formatNumToLen(i + 1, 3) + ".gif"
    });
  }
  bookimgs.push({
    id: "book_" + i++,
    src: booksPath + "178.jpg"
  });
  bookimgs.push({
    id: "book_" + i++,
    src: booksPath + "179.jpg"
  });
  bookimgs.push({
    id: "book_" + i++,
    src: booksPath + "180.jpg"
  });
  bookimgs.push({
    id: "book_" + i++,
    src: booksPath + "181.jpg"
  });
  bookimgs.push({
    id: "book_" + i++,
    src: "images/books/empty.jpg"
  });
  //if(isPad)	imgs.push({id:"tip",src:"images/pad_tip_h_look.jpg"});
  //else if(isMob)	imgs.push({id:"tip",src:"images/m_tip_h_look.jpg"});
  var timgs = imgs.concat(bookimgs);
  preloadimg({
    list: timgs,
    progress: function(obj) {
      /*var precent=Math.ceil(obj.idx/obj.total*100);
			$(".load").css("width",(100-precent)+"%");
			$(".load_txt").html(precent+"%");
			return;*/
      if (obj.idx < 2) {
        var precent = Math.ceil(obj.idx / 2 * 100);
        $(".load").css("width", (100 - precent) + "%");
        $(".load_txt").html(precent + "%");
      } else if (obj.idx == 2) {
        $(".load").css("width", "0%");
        $(".load_txt").html("100%");
        addML();
        addML();
        setTimeout(function() {
          $("#loading .pop").fadeOut(function() {
            $("#loading").fadeOut();
            $("#list").fadeIn();
            $("#c_tip").fadeIn();
            $("#c_tip").click(function(e) {
              $("#c_tip").fadeOut();
            });
          });
        }, 3000);
        init();
      } else if (obj.idx < imgs.length) {
        addML();
      } else if (obj.idx == imgs.length) {
        var templete = '<div class="paper"><img class="paper_load" src="images/load.png" /><img class="img" src="" /></div>';
        for (var i = 0; i < bookimgs.length; i++) {
          $(".book").append(templete);
        }
        pm = new PaperManage({
          doms: $(".paper"),
          allowClickToPage: true,
          onPageEnd: onPageEnd
        });
        onPageEnd(0);
        $(".paper:eq(23),.paper:eq(24)").each(function(index, e) {
          $(this).find("img").click(function(e) {
            return showVideo(0, 5, e, index + 10);
          });
        });
        $(".paper:eq(5),.paper:eq(6),.paper:eq(33),.paper:eq(34),.paper:eq(35),.paper:eq(36),.paper:eq(37),.paper:eq(38),.paper:eq(43),.paper:eq(44)").each(function(index, e) {
          if (index > 1 && index < 8) {
            $(this).append('<div class="vbtn"></div>');
            $(this).find(".vbtn").click(function(e) {
              return showVideo(0, parseInt(index / 2), e, index);
            });
          } else {
            $(this).find("img").click(function(e) {
              return showVideo(0, parseInt(index / 2), e, index);
            });
          }
        });
        $(".paper:eq(47),.paper:eq(48),.paper:eq(65),.paper:eq(66),.paper:eq(67),.paper:eq(68),.paper:eq(69),.paper:eq(70),.paper:eq(77),.paper:eq(78)").each(function(index, e) {
          if (index > 1 && index < 8) {
            $(this).append('<div class="vbtn"></div>');
            $(this).find(".vbtn").click(function(e) {
              return showVideo(1, parseInt(index / 2), e, index);
            });
          } else {
            $(this).find("img").click(function(e) {
              return showVideo(1, parseInt(index / 2), e, index);
            });
          }
        });
        $(".paper:eq(81),.paper:eq(82),.paper:eq(99),.paper:eq(100),.paper:eq(101),.paper:eq(102),.paper:eq(103),.paper:eq(104),.paper:eq(113),.paper:eq(114)").each(function(index, e) {
          if (index > 1 && index < 8) {
            $(this).append('<div class="vbtn"></div>');
            $(this).find(".vbtn").click(function(e) {
              return showVideo(2, parseInt(index / 2), e, index);
            });
          } else {
            $(this).find("img").click(function(e) {
              return showVideo(2, parseInt(index / 2), e, index);
            });
          }
        });
        $(".paper:eq(117),.paper:eq(118),.paper:eq(137),.paper:eq(138),.paper:eq(139),.paper:eq(140),.paper:eq(141),.paper:eq(142),.paper:eq(155),.paper:eq(156)").each(function(index, e) {
          if (index > 1 && index < 8) {
            $(this).append('<div class="vbtn"></div>');
            $(this).find(".vbtn").click(function(e) {
              return showVideo(3, parseInt(index / 2), e, index);
            });
          } else {
            $(this).find("img").click(function(e) {
              return showVideo(3, parseInt(index / 2), e, index);
            });
          }
        });
        $(".paper:eq(159),.paper:eq(161)").each(function(index, e) {
          for (var i = 0; i < 4; i++) {
            $(this).append('<div class="lvbtn" style="top:' + (i * 25) + '%"></div>');
          }
          $(this).find(".lvbtn").each(function(index2, element) {
            $(this).click(function(e) {
              return showVideo(index2, index * 4, e, 5);
            });
          });
        });
        if (isPC) {
          $("#book .paper").each(function(index, element) {
            $(this).mouseover(function(e) {
              if (bookIsShow && index < 180) {
                if (index % 2 == 0) {
                  $(".pc_arrow_r").show();
                } else {
                  $(".pc_arrow_l").show();
                }
              }
            });
            $(this).mouseout(function(e) {
              if (index % 2 == 0) {
                $(".pc_arrow_r").hide();
              } else {
                $(".pc_arrow_l").hide();
              }
            });
          });
        }
      } else {
        var dom = $(".book .paper").eq(loadbooksidx);
        dom.find(".img").attr("src", bookimgs[loadbooksidx].src);
        dom.find(".paper_load").remove();
        loadbooksidx++;
      }
    },
    end: function(data) {}
  });
  if (isPad || isMob) {
    orientationChange();
    window.onorientationchange = orientationChange;
  }
});
var listLen = 0;
var templete2 = '<img style="left:%left%px;" src="%src%" />';

function addML() {
  var j = listLen;
  var obj = imgs[j];
  obj.left = listOffsetL[j];
  $("#list .imgs").append(strReplaceObj(templete2, obj));
  if (listBtnDatas[j]) {
    var tarr = listBtnDatas[j];
    var btnsdom = $("#list .btns");
    for (var k = 0; k < tarr.length; k++) {
      var tobj = tarr[k];
      tobj.top = 51;
      if (tobj.pos[0] == 1) tobj.top = 253;
      tobj.left = 0;
      if (!tobj.hasOwnProperty("gapL")) tobj.gapL = 14;
      if (k > 0) {
        if (tobj.pos[0] == 1) {
          tobj.left += tarr[k - 2].left + tarr[k - 2].size[0] + tobj.gapL;
        } else {
          tobj.left += tarr[k - 1].left + tarr[k - 1].size[0] + tobj.gapL;
        }
      } else {
        tobj.left = listOffsetL[j] + tobj.gapL;
      }
      if (!tobj.hasOwnProperty("size")) tobj.size = [290, 186];
      tobj.width = tobj.size[0];
      tobj.height = tobj.size[1];
      btnsdom.append(strReplaceObj(btntemplete, tobj));
      $(btnsdom.find("div")).eq(btnsdom.find("div").length - 1).click(function(e) {
        if (islistmove || !pm.isClosed) return;
        if (playTip) playTip.fadeIn();
        $("#list,#chapters,.address").fadeOut();
        $("#book").show();
        $("#book .book").animate({
          es: 1
        }, {
          step: function(now, fx) {
            if (fx.prop == "es") {
              fx.start = 0.3;
              $(this).css({
                "transform": "scale(" + now + ")",
                "-webkit-transform": "scale(" + now + ")",
                "-moz-transform": "scale(" + now + ")",
                "-ms-transform": "scale(" + now + ")",
                "-o-transform": "scale(" + now + ")"
              });
            }
          },
          duration: 1000,
          complete: function() {
            isread = true;
          }
        }, 'swing');
        pm.autoShowPage(Number($(this).attr("id").split("_")[1]) + 1);
        bookIsShow = true;
        $(".btn_catalog,.pagenum").fadeIn();
        playMusic("flipflip_vol");
      });
    }
  }
  listLen++;
}

function orientationChange() {
  switch (window.orientation) {　　
    case 0:
      　　
    case 180:
      $(".no_show").show();　　
      break;
    default:
      $(".no_show").hide();
      onresize();　　
      break;
  }
}

function init() {
  playTip = $("#play_tip");
  backTip = $("#back_tip");
  zoomTip = $("#zoom_tip");
  //pm=new PaperManage({doms:$(".paper"),allowClickToPage:true,onPageEnd:onPageEnd});
  $("#list").mousedown(function(e) {
    e.preventDefault();
  });
  $(".btn_catalog").click(function(e) {
    $("#book .book").animate({
      es: 0.3
    }, {
      step: function(now, fx) {
        if (fx.prop == "es") {
          fx.start = 1;
          $(this).css({
            "transform": "scale(" + now + ")",
            "-webkit-transform": "scale(" + now + ")",
            "-moz-transform": "scale(" + now + ")",
            "-ms-transform": "scale(" + now + ")",
            "-o-transform": "scale(" + now + ")"
          });
        }
      },
      duration: 1000,
      complete: function() {
        isread = false;
        $(".paper").hide().css({
          "z-index": 0
        });
      }
    }, 'swing');
    if (pm) pm.closeBook();
    bookIsShow = false;
    $(".pc_arrow").fadeOut();
    $("#list,#chapters,.address").fadeIn(1000);
    $("#book").fadeOut(1000);
    $(".btn_catalog,.pagenum").fadeOut();
  });
  $(".pc_share img").each(function(index, element) {
    $(this).click(function(e) {
      switch (index) {
        case 0:
          tracker("weixin", "share");
          $("#share_qr").fadeIn();
          break;
        case 1:
          tracker("weibo", "share");
          shareMedia("sina");
          break;
        case 2:
          tracker("fackbook", "share");
          shareMedia("fb");
          break;
      }
    });
  });
  $(".mob_share").click(function(e) {
    $("#sns_pop").fadeIn();
  });
  $("#sns_pop img").each(function(index, element) {
    $(this).click(function(e) {
      switch (index) {
        case 0:
          tracker("weixin", "share");
          if (is_weixin()) {
            $("#share_weixin").fadeIn();
          } else {
            $("#share_qr").fadeIn();
          }
          break;
        case 1:
          tracker("weibo", "share");
          shareMedia("sina");
          break;
        case 2:
          tracker("fackbook", "share");
          shareMedia("fb");
          break;
      }
    });
  });
  $("#sns_pop .b_close2").click(function(e) {
    $("#sns_pop").fadeOut();
  });
  if (isPC) {
    $(".pc_share").fadeIn();
  } else {
    $(".mob_share").fadeIn();
  }
  cm = new Chapters({
    dom: $("#chapters"),
    onclick: onChangeChapter
  });
  $("#copy_url .btn_close,#copy_url .b_close").click(function(e) {
    $("#copy_url").fadeOut();
  });
  $("#share_weixin").click(function(e) {
    $("#share_weixin").fadeOut();
  });
  $("#share_qr .btn_close,#share_qr .b_close").click(function(e) {
    $("#share_qr").fadeOut();
  });
  document.addEventListener(mousedown, ondown);
  document.addEventListener(mousemove, onmove);
  document.addEventListener(mouseup, onup);
  $("#vbox .b_close").click(function(e) {
    $("#vbox").fadeOut(function() {
      $("#vbox .con").html("");
    });
  });
  playTip.on(mousedown, function(e) {
    e.preventDefault();
    playTip.fadeOut(function() {
      playTip.remove();
      playTip = null;
    });
    backTip.fadeIn();
  });
  backTip.on(mousedown, function(e) {
    e.preventDefault();
    backTip.fadeOut(function() {
      backTip.remove();
      backTip = null;
    });
    if (isMob) zoomTip.fadeIn();
  });
  zoomTip.on(mousedown, function(e) {
    e.preventDefault();
    zoomTip.fadeOut(function() {
      zoomTip.remove();
      zoomTip = null;
    });
  });
  $("#play_tip,#back_tip,#zoom_tip").on(mousemove, function(e) {
    return false;
  });
  onresize();
  $(window).resize(onresize);
}
var vids = [
  ["u0146qi3sgh", "s0147xl6dnc", "i0147wda2zk", "f0147a5k3qv", "q01493g915o", "a014886yw29"],
  ["e014688rpwp", "f01476ilose", "c0147zzpm1o", "j01474cntxd", "j0149keo10n"],
  ["x0146cd452k", "o0147ud68fx", "g0147gt5u55", "f01477hm5dj", "h0149uikg9v"],
  ["c0149e59dit", "z01474sc76u", "s01474ntqu7", "k0147wngwdx", "i0149h4tj52"]
]
var vidTrackers = [
  ["videoSH1", "videoSHst1", "videoSHst2", "videoSHst3", "videoSHst4", "videoSHstAdd1"],
  ["videoSE1", "videoSEst1", "videoSEst2", "videoSEst3", "videoSEst4"],
  ["videoHK1", "videoHKst1", "videoHKst2", "videoHKst3", "videoHKst4"],
  ["videoGZ1", "videoGZst1", "videoGZst2", "videoGZst3", "videoGZst4"]
]

  function showVideo(m, n, e, index) {
    var id = vids[m][n];
    if (pm && !pm.isClosed) return;
    if (index > 1 && index < 8) {
      e.preventDefault();
      showV();
      return false;
    } else if (isPC) {
      var tw = 1334 * ss;
      var gap = (sw - tw) / 2;
      if (e.pageX > tw / 5 + gap && e.pageX < tw / 5 * 4 + gap) {
        e.preventDefault();
        showV();
        return false;
      }
    } else {
      e.preventDefault();
      showV();
      return false;
    }
    return true;

    function showV() {
      tracker(vidTrackers[m][n], 'videoON');
      $("#vbox .con").html('<iframe width="100%" height="100%" frameborder=0 src="http://v.qq.com/iframe/player.html?vid=' + id + '&tiny=0&auto=1" allowfullscreen></iframe>');
      $("#vbox").fadeIn();
    }
  }
var isdown = false;
var smx, nmx, tlen, stime, tlistleft;

function ondown(e) {
  //e.preventDefault();
  isdown = true;
  smx = nmx = isPC ? e.pageX : e.touches[0].pageX;
  stime = new Date().getTime();
}

function onmove(e) {
  if (!isdown || isread) return;
  e.preventDefault();
  nmx = isPC ? e.pageX : e.touches[0].pageX;
  tlen = nmx - smx;
  if (tlen > 0) {
    islistmove = true;
  }
  tlistleft = Math.max(listLeft[7] * ssmin, Math.min(0, tlen * ssmin + listCurrLeft));
  $(".list .imgs,.list .btns").css({
    left: tlistleft
  });
}

function onup() {
  if (!isdown) return;
  isdown = false;
  setTimeout(function() {
    islistmove = false;
  }, 100);
  if (isread || nmx == smx) return;
  var left = Math.max(listLeft[7] * ssmin, Math.min(0, (tlen / (new Date().getTime() - stime) * 1000) * ssmin + tlistleft));
  $(".list .imgs,.list .btns").animate({
    left: left
  }, 500, "swing", function() {
    listCurrLeft = left;
    for (var i = listLeft.length - 1; i >= 0; i--) {
      if (listCurrLeft <= listLeft[i] * ssmin) {
        cm.moveslider(i);
        break;
      }
    }
  });
}

function shareMedia(media) {
  var pic = serverURL + "images/share.jpg";
  var pic1 = serverURL + "images/share_sh.jpg";
  var pic2 = serverURL + "images/share_sl.jpg";
  var pic3 = serverURL + "images/share_hk.jpg";
  var pic4 = serverURL + "images/share_gz.jpg";
  var pic11 = serverURL + "images/share_sh2.jpg";
  var pic22 = serverURL + "images/share_sl2.jpg";
  var pic33 = serverURL + "images/share_hk2.jpg";
  var pic44 = serverURL + "images/share_gz2.jpg";
  var url = "http://digitalzine.houseofvansasia.com/?utm_source=ShareFacebook&utm_medium=none&utm_campaign=201502";
  if (media == "sina") {
    //Share.sina(url+"?utm_source=ShareWeibo&utm_medium=none&utm_campaign=201502",content,[pic,pic1,pic2,pic3,pic4]);
    Share.sina("http://t.cn/RwmlZnn", "#House of Vans# 2014亚洲系列活动纪念别册 数字版 在线发布!和@Vanschina 一起体验中国内地，香港和韩国年轻人表达创意的别样旅程！点击前往：", [pic, pic1, pic11, pic2, pic22, pic3, pic33, pic4, pic44]);
  } else if (media == "fb") {
    //Share.fb("http://digitalzine.houseofvansasia.com/?utm_source=ShareFacebook&utm_medium=none&utm_campaign=201502");
    Share.fb(serverURL);
    //Share.fb2("http://digitalzine_staging.offthewall.com.cn/","Check the digital version of the House of Vans Asia 2014 Zine !  See how creative people capture their environment and publish their own independent zines.",pic,"Check the digital version of the House of Vans Asia 2014 Zine !  See how creative people capture their environment and publish their own independent zines.");
    //Share.fb("http://digitalzine_staging.offthewall.com.cn/?utm_source=ShareFacebook&utm_medium=none&utm_campaign=201502&ver=3");
  } else if (media == "instagram") {}
}
Share = {
  sina: function(purl, ptitle, pimgs) {
    url = 'http://v.t.sina.com.cn/share/share.php?searchPic=false&';
    url += 'url=' + encodeURIComponent(purl);
    url += '&title=' + encodeURIComponent(ptitle);
    url += '&pic=' + encodeURIComponent(pimgs.join("||"));
    Share.popup(url);
  },
  fb: function(purl) {
    url = 'http://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(purl);
    Share.popup(url);
  },
  fb2: function(purl, ptitle, pimg, text) {
    url = 'http://www.facebook.com/sharer/sharer.php?s=100';
    url += '&p[title]=' + encodeURIComponent(ptitle);
    url += '&p[summary]=' + encodeURIComponent(text);
    url += '&p[url]=' + encodeURIComponent(purl);
    url += '&p[images][0]=' + encodeURIComponent(pimg);
    Share.popup(url);
  },
  vk: function(purl, ptitle, pimg, text) {
    url = 'http://vk.com/share.php?';
    url += 'url=' + encodeURIComponent(purl);
    url += '&title=' + encodeURIComponent(ptitle);
    url += '&description=' + encodeURIComponent(text);
    url += '&image=' + encodeURIComponent(pimg);
    url += '&noparse=true';
    Share.popup(url);
  },
  tw: function(purl, ptitle) {
    url = 'http://twitter.com/share?';
    url += 'text=' + encodeURIComponent(ptitle);
    url += '&url=' + encodeURIComponent(purl);
    url += '&counturl=' + encodeURIComponent(purl);
    Share.popup(url);
  },
  popup: function(url) {
    window.open(url, '', 'toolbar=0,status=0,width=650,height=450');
  }
};
var offsetTopAsSafari = 127;
var offsetBottomAsSafari = 87;

function onresize() {
  tsw = sw = $(window).width();
  tsh = sh = $(window).height();
  if (navigator.userAgent.indexOf("OS 8") > -1 || navigator.userAgent.indexOf("OS 9") > -1 || navigator.userAgent.indexOf("OS 10") > -1) {
    //if(sw==1136){
    offsetTopAsSafari = 73;
    offsetBottomAsSafari = 77;
  }
  if (!isPC && isSafari && navigator.userAgent.indexOf("iPhone OS") > -1 && tsw == 980 && (tsh == 654 || tsh == 552)) {
    sh = sh - offsetTopAsSafari - offsetBottomAsSafari;
    $(".pop,.body").css({
      height: sh,
      top: offsetTopAsSafari
    });
  }
  var tth = 800;
  ss = Math.min(sw / 1334, sh / 1000);
  ssmin = Math.min(sw / 1334, sh / tth);
  if (!isPC && isSafari && navigator.userAgent.indexOf("iPhone OS") > -1 && tsw == 980 && (tsh == 654 || tsh == 552)) {
    $(".book_box").css({
      top: (sh - 1000 * ss) * 0.5,
      left: (sw - 1334 * ss) * 0.5
    });
    $(".list .imgs,.list .btns").css({
      top: (sh - ssmin * 465 - 30) * 0.5
    });
    zoomDom($(".share_qr"), Math.min(1, sh / 481 - 0.1), "center center");
    zoomDom($(".book_box"), ss, "left top");
    //$("body").scrollTop(0);
  } else {
    $(".book_box").css({
      top: (sh - 1000 * ss) * 0.5,
      left: (sw - 1334 * ss) * 0.5
    });
    $(".list .imgs,.list .btns").css({
      top: (sh - ssmin * 465 - 30) * 0.5
    });
    zoomDom($(".share_qr"), Math.min(1, sh / 481), "center center");
    zoomDom($(".book_box"), ss, "left top");
  }
  zoomDom($(".list .imgs,.list .btns"), ssmin, "left top");
  if (isPad) {
    $(".paper").find("div:odd").css({
      "left": "-1px"
    });
  } else {
    $(".paper").find("div:odd").css({
      "left": 0
    });
  }
}
var isOnce = true;

function onPageEnd(currpage) {
  if (!isOnce) {
    if (currpage == 0) trackerPV("/step1.html");
    else trackerPV("/step" + (currpage * 2) + "_" + (currpage * 2 + 1) + ".html");
  }
  isOnce = false;
  currpage = Math.max(1, (currpage * 2));
  var curr = (currpage < 10) ? "0" + currpage : currpage;
  $(".pagenum").html(curr + " / " + (pm.totalpage * 2 - 1));
  if (currpage == 164 || currpage == 165) {
    tracker('TipsPage', 'view');
  }
}

function onChangeChapter(index) {
  listCurrLeft = listLeft[index] * ssmin; //,-15004*ssmin+sw);
  $(".list .imgs,.list .btns").animate({
    left: listCurrLeft
  }, 500, "swing");
}

function zoomDom(dom, s, origin) {
  if (!origin) origin = "top center";
  dom.css({
    "-webkit-transform": "scale(" + s + ")",
    "-moz-transform": "scale(" + s + ")",
    "-ms-transform": "scale(" + s + ")",
    "-0-transform": "scale(" + s + ")",
    "-transform": "scale(" + s + ")",
    "-webkit-transform-origin": origin,
    "-moz-transform-origin": origin,
    "-ms-transform-origin": origin,
    "-o-transform-origin": origin,
    "-transform-origin": origin
  });
}o

function getUrlRequest() {
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    if (str.indexOf("&") != -1) {
      strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
      }
    } else {
      var key = str.substring(0, str.indexOf("="));
      var value = str.substr(str.indexOf("=") + 1);
      theRequest[key] = decodeURI(value);
    }
  }
  return theRequest;
}

function playMusic(id) {
  document.getElementById(id).play();
}
var trackid = "UA-59733850-1";
if (isMob) trackid = "UA-59733850-3";
(function(i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
  a = s.createElement(o),
  m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
ga('create', trackid, 'auto');
ga('send', 'pageview');

function tracker(action, type) {
  //trace(action);
  ga('send', 'event', action, type);
}

function trackerPV(type) {
  //trace(type);
  ga('send', 'pageview', type);
}