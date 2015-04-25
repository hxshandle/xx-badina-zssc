/**
 *
a.thumb(style="width:#{width};left:#{left};top:#{top}" data-ref="#{ref}" data-pageno="#{pageNo}" class="#{clazz}")
  .pageNum Page
    span #{num}
  img(src="#{src}")


  {
    src: "aaa",
    num: 1,
    left: "10px",
    top: "10px",
    width: "200px",
    ref: "aaa"
  }
 */


function thumbTpl(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;
    var locals_for_with = locals || {};
    (function(clazz, left, num, pageNo, ref, src, top, width) {
        buf.push("<a" + jade.attr("style", "width:" + width + ";left:" + left + ";top:" + top + "", true, false) + jade.attr("data-ref", "" + ref + "", true, false) + jade.attr("data-pageno", "" + pageNo + "", true, false) + jade.cls([ "thumb", "" + clazz + "" ], [ null, true ]) + '><div class="pageNum">Page<span>' + jade.escape((jade_interp = num) == null ? "" : jade_interp) + "</span></div><img" + jade.attr("src", "" + src + "", true, false) + "/></a>");
    }).call(this, "clazz" in locals_for_with ? locals_for_with.clazz : typeof clazz !== "undefined" ? clazz : undefined, "left" in locals_for_with ? locals_for_with.left : typeof left !== "undefined" ? left : undefined, "num" in locals_for_with ? locals_for_with.num : typeof num !== "undefined" ? num : undefined, "pageNo" in locals_for_with ? locals_for_with.pageNo : typeof pageNo !== "undefined" ? pageNo : undefined, "ref" in locals_for_with ? locals_for_with.ref : typeof ref !== "undefined" ? ref : undefined, "src" in locals_for_with ? locals_for_with.src : typeof src !== "undefined" ? src : undefined, "top" in locals_for_with ? locals_for_with.top : typeof top !== "undefined" ? top : undefined, "width" in locals_for_with ? locals_for_with.width : typeof width !== "undefined" ? width : undefined);
    return buf.join("");
}

function thumbTpl2(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;
    var locals_for_with = locals || {};
    (function(clazz, left, num, pageNo, ref, src, top, width) {
        buf.push("<a" + jade.attr("style", "width:" + width + ";left:" + left + ";top:" + top + "", true, false) + jade.attr("data-ref", "" + ref + "", true, false) + jade.attr("data-pageno", "" + pageNo + "", true, false) + jade.cls([ "thumb", "" + clazz + "" ], [ null, true ]) + "><img" + jade.attr("src", "" + src + "", true, false) + '/><div class="pageNum">Page<span>' + jade.escape((jade_interp = num) == null ? "" : jade_interp) + "</span></div></a>");
    }).call(this, "clazz" in locals_for_with ? locals_for_with.clazz : typeof clazz !== "undefined" ? clazz : undefined, "left" in locals_for_with ? locals_for_with.left : typeof left !== "undefined" ? left : undefined, "num" in locals_for_with ? locals_for_with.num : typeof num !== "undefined" ? num : undefined, "pageNo" in locals_for_with ? locals_for_with.pageNo : typeof pageNo !== "undefined" ? pageNo : undefined, "ref" in locals_for_with ? locals_for_with.ref : typeof ref !== "undefined" ? ref : undefined, "src" in locals_for_with ? locals_for_with.src : typeof src !== "undefined" ? src : undefined, "top" in locals_for_with ? locals_for_with.top : typeof top !== "undefined" ? top : undefined, "width" in locals_for_with ? locals_for_with.width : typeof width !== "undefined" ? width : undefined);
    return buf.join("");
}


/**
 * 
a.chapter(style="width:#{width}")
  img(src="#{src}")

  {
    width:"900px",
    src:"aaa"
  }
 */
function chapterTpl(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;
    var locals_for_with = locals || {};
    (function(src, width) {
        buf.push("<a" + jade.attr("style", "width:" + width + "", true, false) + ' class="chapter"><img' + jade.attr("src", "" + src + "", true, false) + "/></a>");
    }).call(this, "src" in locals_for_with ? locals_for_with.src : typeof src !== "undefined" ? src : undefined, "width" in locals_for_with ? locals_for_with.width : typeof width !== "undefined" ? width : undefined);
    return buf.join("");
}


/**
 * 
.paper
  img.image(src="#{src}")

{
  src:"aaa"
}

* 
 */
function paperTpl(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;
    var locals_for_with = locals || {};
    (function(src) {
        buf.push('<div class="paper"><img' + jade.attr("src", "" + src + "", true, false) + ' class="image"/></div>');
    }).call(this, "src" in locals_for_with ? locals_for_with.src : typeof src !== "undefined" ? src : undefined);
    return buf.join("");
}