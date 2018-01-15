// change this
var peopleIHate = ["nobody currently"];

// don't change this
var peopleRegex = new RegExp(peopleIHate.join("|"), "gim");
function deletionTest(el, depth){
    if ($(el) && $(el).text().match(peopleRegex)) {
        var cl = $(el);
        while(depth > 0){
            cl = cl.parent();
            depth--;
        }
        cl.remove();
    }
}
$(".author-nickname").each(function() {
        deletionTest($(this), 3);
})
if(location.href.includes('computing')){
    $("a").each(function(){
        if($(this).attr('class').match(/author/gim)){
            deletionTest(this, 2);
        }
    })
}
if(location.href.includes('profile')){
    $(".nickname").each(function(){
        deletionTest(this, 11);
    })
}
