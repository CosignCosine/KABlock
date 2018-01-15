// change this
var peopleIHate = ["nobody publicly"];

// don't change this
var peopleRegex = new RegExp(peopleIHate.join("|"), "gim");
$(".author-nickname").each(function() {
    if ($(this).text().match(peopleRegex)) {
        $(this).parent().parent().parent().remove();
    }
})
$("a").each(function(){
    if($(this).attr('class').match(/author/gim) && $(this).text().match(peopleRegex)){
        $(this).parent().parent().remove();
    }
})
