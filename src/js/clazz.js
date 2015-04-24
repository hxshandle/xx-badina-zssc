function Book(opt){
  this.chapters = [];
  this.init();
}

Book.prototype = {
  init:function(){},
  /**
   * 
   * @param {Object} chapter {
   *                           left:100,
   *                           pageNo:2
   *                           }
   */
  addChapter:function(chapter){
    this.chapters.push(chapter);
  },
  moveChapter:function(index){
    var _left = -this.chapters[index].left+15;
    var t = this;
    $('.thumbList').animate({
      left: _left+'px'},
      400, function() {
      t.moveChapterSlider(index,true);
    });
  },
  moveChapterSlider:function(idx,animated){
    var chapter = $('#chapters a').eq(idx);
    var offset = chapter.offset();
    var width = chapter.width();
    var sliderLeft = Math.floor((width-5)/2) + offset.left;
    if(!animated){
      $('#chapterSlider').css({left:sliderLeft});
    }else{
      $('#chapterSlider').animate({
        left: sliderLeft},
        500, function() {
        /* stuff to do after animation is complete */
      });
    }
  },
  constructor: Book
}