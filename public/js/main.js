$(function() {
  var imageList = [],
    preloadImageList = [],
    totalPages = 0,
    pageIndex = 0,
    thumbWidth = 200,
    gutter = 20,
    curLeft = 0,
    curTop = 100,
    chatperWidth = 50;

  function init() {
    // init books
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
  }

  function _progress(data) {
    //console.log(data.img.src);
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
    var locals = {
      src: opt.src,
      num: pageIndex,
      left: curLeft + "px",
      top: curTop + "px",
      width: thumbWidth + "px",
      ref: "page_" + pageIndex
    }
    $(thumbTpl(locals)).appendTo("#list .thumbList");
    curLeft += thumbWidth + gutter;
  }

  function addChapter(data) {
    var imgName = _getImageName(data.img.src);
    if (/^c/.test(imgName)) {
      console.log('add chapter %s', imgName);
      _addThumb({
        src: data.img.src,
        isNewChapter: true
      });
    }
  }

  function addThumb(data) {
    var imgName = _getImageName(data.img.src);
    if (/^t/.test(imgName)) {
      console.log('add thumb %s', imgName);
    }
  }

  function addPage(data) {
    var imgName = _getImageName(data.img.src);
    if (/^\d/.test(imgName)) {
      console.log('add page %s', imgName);
    }
  }

  function _end(data) {}
  init();
  console.log('done');
});