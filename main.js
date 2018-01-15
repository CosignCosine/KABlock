// change this
var peopleIHate = localStorage.getItem("cosigncosine-block") ? JSON.parse(localStorage.getItem("cosigncosine-block")) : [];

// don't change this
var peopleRegex = new RegExp(peopleIHate.join("|"), "gim");
function deletionTest(el, depth){
    if(peopleIHate.length !== 0){
        if ($(el) && $(el).text().replace(/\!|\||\\|\?|\!|\*|\+|\{|\}|\(|\)|\[|\]|\^|\$|\&/gim, "").match(peopleRegex)) {
            var cl = $(el);
            while(depth > 0){
                cl = cl.parent();
                depth--;
            }
            cl.remove();
        }
    }
}

setInterval(function(){
    $(".discussion-meta-controls").each(function(){
        if(!$(this).find('cosigncosine-block')){
            $("<span>").html("•").addClass("discussion-meta-separator").appendTo(this);
            $("<span>").html("<a href='javascript:void(0);' class='cosigncosine-block' title='Block this user'>Block</a>").addClass("flag-tools").appendTo(this);
        }
    })
    $(".author-nickname").each(function() {
            deletionTest(this, 3);
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
}, 2000);

//handlers
$('.cosigncosine-block').on('click', function(){
    var user = $(this).parent().parent().parent().find('.discussion-meta-info').find('.author-nickname').text().replace("View profile for: ", "").trim().replace(/\!|\||\\|\?|\!|\*|\+|\{|\}|\(|\)|\[|\]|\^|\$|\&/gim, "");
    console.log(user);
    peopleIHate.push(user);
    peopleRegex = new RegExp(peopleIHate.join("|"), "gim");
    localStorage.setItem("cosigncosine-block", JSON.stringify(peopleIHate))
    console.log(localStorage.getItem('cosigncosine-block'));
})
