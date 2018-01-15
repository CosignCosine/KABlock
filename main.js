// change this
var peopleIHate = ["nobody publicly"];

// don't change this
var peopleRegex = new RegExp(peopleIHate.join("|"), "gim");
$(".author-nickname").each(function(el) {
    if ($(this).text().match(peopleRegex)) {
        $(this).parent().parent().parent().remove();
    }
})
