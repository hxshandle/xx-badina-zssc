$(function(){
  var imageList = [],preloadImageList=[];
  function init(){
    // init books
    _.each(BOOK_DETAILS,function(obj,idx,arr){
      imageList.push(obj.chapter);
      imageList = imageList.concat(obj.thumbs);
      imageList = imageList.concat(obj.pages);
    });
    _.each(imageList,function(val,index,arr){
      preloadImageList.push({
        id:"book_"+index,
        src:BASE_PATH+"/"+val
      });
    });
    preloadimg({
      list:preloadImageList,
      progress:_progress,
      end:_end
    });
  }
  function _progress(data){}
  function _end(data){}

  init();
  console.log('done');
});