function Book(opt) {
  this.chapters = [];
  this.init();
}
Book.prototype = {
  init: function() {},
  /**
   *
   * @param {Object} chapter {
   *                           left:100,
   *                           pageNo:2
   *                           }
   */
  addChapter: function(chapter) {
    this.chapters.push(chapter);
  },
  close:function(){
    $('#book').fadeOut();
  },
  show: function(el) {
    $('#book').show();
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
  },
  moveChapter: function(index) {
    var _left = -this.chapters[index].left + 15;
    var t = this;
    $('.thumbList').animate({
      left: _left + 'px'
    }, 400, function() {
      t.moveChapterSlider(index, true);
    });
  },
  moveChapterSlider: function(idx, animated) {
    var chapter = $('#chapters a').eq(idx);
    var offset = chapter.offset();
    var width = chapter.width();
    var sliderLeft = Math.floor((width - 5) / 2) + offset.left;
    if (!animated) {
      $('#chapterSlider').css({
        left: sliderLeft
      });
    } else {
      $('#chapterSlider').animate({
        left: sliderLeft
      }, 500, function() {
        /* stuff to do after animation is complete */
      });
    }
  },
  constructor: Book
}