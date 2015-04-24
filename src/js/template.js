/**
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
    (function(left, num, ref, src, top, width) {
        buf.push("<a" + jade.attr("style", "width:" + width + ";left:" + left + ";top:" + top + "", true, false) + jade.attr("data-ref", "" + ref + "", true, false) + ' class="thumb"><span class="pageNum">' + jade.escape((jade_interp = num) == null ? "" : jade_interp) + "</span><img" + jade.attr("src", "" + src + "", true, false) + "/></a>");
    }).call(this, "left" in locals_for_with ? locals_for_with.left : typeof left !== "undefined" ? left : undefined, "num" in locals_for_with ? locals_for_with.num : typeof num !== "undefined" ? num : undefined, "ref" in locals_for_with ? locals_for_with.ref : typeof ref !== "undefined" ? ref : undefined, "src" in locals_for_with ? locals_for_with.src : typeof src !== "undefined" ? src : undefined, "top" in locals_for_with ? locals_for_with.top : typeof top !== "undefined" ? top : undefined, "width" in locals_for_with ? locals_for_with.width : typeof width !== "undefined" ? width : undefined);
    return buf.join("");
}

function thumbTpl2(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;
    var locals_for_with = locals || {};
    (function(left, num, ref, src, top, width) {
        buf.push("<a" + jade.attr("style", "width:" + width + ";left:" + left + ";top:" + top + "", true, false) + jade.attr("data-ref", "" + ref + "", true, false) + ' class="thumb"><img' + jade.attr("src", "" + src + "", true, false) + '/><span class="pageNum">' + jade.escape((jade_interp = num) == null ? "" : jade_interp) + "</span></a>");
    }).call(this, "left" in locals_for_with ? locals_for_with.left : typeof left !== "undefined" ? left : undefined, "num" in locals_for_with ? locals_for_with.num : typeof num !== "undefined" ? num : undefined, "ref" in locals_for_with ? locals_for_with.ref : typeof ref !== "undefined" ? ref : undefined, "src" in locals_for_with ? locals_for_with.src : typeof src !== "undefined" ? src : undefined, "top" in locals_for_with ? locals_for_with.top : typeof top !== "undefined" ? top : undefined, "width" in locals_for_with ? locals_for_with.width : typeof width !== "undefined" ? width : undefined);
    return buf.join("");
}