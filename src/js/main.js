//$(function() {
  var imageList = [],
    preloadImageList = [],
    totalPages = 0,
    pageIndex = 0,
    thumbWidth = 290,
    totalThumberWidth = 0,
    chapterWidth = 300,
    minChapterWidth=55,
    normalPage = 0,
    gutter = 15,
    normalPageGutter = 10,
    curLeft = 0,
    curTop = 100,
    normalPageHeight = 250,
    listCurrLeft = 0,
    winWidth = _W = $(window).width(),
    winHeight = _H = $(window).height(),
    isread = false,
    chatperWidth = 50,
    isPC = is_pc(),
    isPad = is_ipad(),
    isMob = is_mobile(),
    book;
  var mousedown = "touchstart";
  var mouseup = "touchend";
  var mousemove = "touchmove";

  function init() {
    // init books
    book = new Book();
    _.each(BOOK_DETAILS, function(obj, idx, arr) {
      imageList.push(obj.chapter);
      imageList = imageList.concat(obj.thumbs);
      imageList = imageList.concat(obj.pages);
      totalPages += obj.pages.length;
    });
    _.each(imageList, function(val, index, arr) {
      preloadImageList.push({
        id: "book_" + index,
        src: BASE_PATH + "/" + val
      });
    });
    preloadimg({
      list: preloadImageList,
      progress: _progress,
      end: _end
    });
    if ((document.ontouchstart == null && isPC) || (!('ontouchstart' in window) && !isPC)) {
      mousedown = "mousedown";
      mouseup = "mouseup";
      mousemove = "mousemove";
    }

    document.addEventListener(mousedown, ondown);
    document.addEventListener(mousemove, onmove);
    document.addEventListener(mouseup, onup);
  }
  var isdown = false;
  var smx, nmx, tlen, stime, tlistleft;

  function ondown(e) {
    //e.preventDefault();
    isdown = true;
    listCurrLeft = $('#list .thumbList').position().left;
    smx = nmx = isPC ? e.pageX : e.touches[0].pageX;
    stime = new Date().getTime();
  }
  var ssmin = 0.4;
  function onmove(e) {
    if (!isdown || isread) return;
    e.preventDefault();
    nmx = isPC ? e.pageX : e.touches[0].pageX;
    tlen = nmx - smx;
    if (tlen > 0) {
      islistmove = true;
    }
    tlistleft = Math.max(Math.min(0, tlen*ssmin+listCurrLeft),-(totalThumberWidth));
    //tlistleft = tlen;
    //console.log('move %s', tlistleft);
    $("#list .thumbList").css({
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
    var left = Math.max(-(totalThumberWidth), Math.min(0, (tlen / (new Date().getTime() - stime) * 1000) * ssmin + tlistleft));
    $("#list .thumbList").animate({
      left: left
    }, 500, "swing", function() {
      listCurrLeft = left;
      var listChapters = book.chapters;
      for (var i = listChapters.length - 1; i >= 0; i--) {
        if (listCurrLeft <= -(listChapters[i].left- chapterWidth -gutter) ) {
          book.moveChapterSlider(i,true);
          break;
        }
      }
    });
  }

  function _progress(data) {
    addChapter(data);
    addThumb(data);
    addPage(data);
  }

  function _getImageName(path) {
    var ps = path.split('/');
    return ps[ps.length - 1];
  }

  function _addThumb(opt) {
    pageIndex++;
    var _top = curTop;
    if (!opt.isNewChapter) {
      _top = normalPage * normalPageHeight + curTop+16;
      normalPage = normalPage == 0 ? 1 : 0;
    } else {
      normalPage = 0;
    }
    curLeft = opt.isNewChapter ? curLeft + gutter : curLeft;
    var pageNo = opt.isNewChapter ? (pageIndex*2 -1) : ((pageIndex-1)*2) +"/"+((pageIndex-1)*2 +1);
    var locals = {
      src: opt.src,
      num: pageNo,
      left: curLeft + "px",
      top: _top + "px",
      width: (opt.isNewChapter ? chapterWidth : thumbWidth) + "px",
      ref: "page_" + pageIndex,
      pageNo:pageIndex,
      clazz: opt.isNewChapter ? "chapter" : ""
    }

    // add chapter
    if(opt.isNewChapter){
      book.addChapter({
        left:curLeft,
        pageNo:pageIndex
      });
    }
    
    if (normalPage == 0 && !opt.isNewChapter) {
      $(thumbTpl2(locals)).appendTo("#list .thumbList");
    } else {
      $(thumbTpl(locals)).appendTo("#list .thumbList");
    }
    if (normalPage == 0 || opt.isNewChapter) {
      var _w = opt.isNewChapter ? chapterWidth : thumbWidth;
      curLeft += _w + normalPageGutter;
      
    }
    if(opt.isNewChapter){
      totalThumberWidth = curLeft - chapterWidth - gutter*2;
    }
  }

  function _addChapter(data){
    data.width = minChapterWidth+"px";
    $(chapterTpl(data)).appendTo($('#chapters'));

  }

  function addChapter(data) {
    var imgName = _getImageName(data.img.src);
    if (/^c/.test(imgName)) {
      //console.log('add chapter %s', imgName);
      _addThumb({
        src: data.img.src,
        isNewChapter: true
      });
      _addChapter({
        src: data.img.src
      });
    }
  }

  function addThumb(data) {
    var imgName = _getImageName(data.img.src);
    if (/^t/.test(imgName)) {
      //console.log('add thumb %s', imgName);
      _addThumb({
        src: data.img.src,
        isNewChapter: false
      });
    }
  }

  function addPage(data) {
    var imgName = _getImageName(data.img.src);
    if (/^\d/.test(imgName)) {
      
    }
  }

  function bindEvent(){
    // bind chapter nav event
    $('#chapters a').click(function(){
      book.moveChapter($(this).index());
    });
  }

  function _end(data) {
    bindEvent();
    book.moveChapterSlider(0);
  }
  init();
  console.log('done');
//});