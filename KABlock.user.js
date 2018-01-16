// ==UserScript==
// @name         KABlock
// @namespace    http://cosigncosine.github.io/
// @version      1.0
// @description  This tampermonkey extension blocks a stored list of users on your profile visually on Khan Academy.
// @author       CosignCosine
// @match        https://*.khanacademy.org/*
// @grant        none
// @require      https://code.jquery.com/jquery-1.12.4.min.js
// ==/UserScript==

/**
Things I plan to implement (CosignCosine):
• question deletion
• anonymous block statistics (who are the most blocked users, etc)
• true, self-updating chrome extension (good luck)
• "unblock" page on ka
• block interface ('do you want to block?', 'why are you blocking this person', etc.)
• complete in-program deletion
*/
console.group('KABlock Info');
console.error(`
**    *     **     *****   **      *****   ***** **   *
** **      ** *    **   *  **     **    * **     ** **
***       ******   ******  **     **    * **     ***
** **    **     *  **    * **     **    * **     ** **
**    * **       * ******  ******  *****   ***** **   *`);
console.warn("KABlock loaded without errors.\nRedistribution of this script with edited credit is not only unfair but also steals from the original author. This script was written in its entirety by CosignCosine/Scott Schraeder. Please do not redistribute without credit.");
console.log("Thank you to Sequel Maker for fixing a jQuery-related glitch.");
console.log("Thanks to a user I'll keep anonymous for making me want to make this— YOU'RE FIRST, SUCKER!");
console.log("Thanks to Dmitri for being fat as always.");
console.groupEnd();

var pl = localStorage.getItem("cosigncosine-block") ? JSON.parse(localStorage.getItem("cosigncosine-block")) : [];
var sh = localStorage.getItem('cosigncosine-show');
if(sh === undefined || sh === null){
    localStorage.setItem('cosigncosine-show', false);
}
var pr = new RegExp(pl.join("|"), "gim");
function dt(el, dpt){
    if(pl.length !== 0){
        if ($(el) && $(el).text().replace(/\!|\||\\|\?|\!|\*|\+|\{|\}|\(|\)|\[|\]|\^|\$|\&/gim, "").match(pr)) {
            var cl = $(el);
            while(dpt > 0){
                cl = cl.parent();
                dpt--;
            }
            cl.remove();
        }
    }
}
$(document).ready(function(){
    $("<div>").css('background', 'black').css('color', 'white !important').css('position', 'fixed').css('top', '0').css('left', '0').css('width', '100%').css('height', '20px').html('<a href="javascript:void(0)" style="color: white">' + sh ? 'Hide' : 'Show' + ' blocked users</a>').css('padding-left', '5px').addClass('cosigncosineshowblocked').appendTo('body'); // hey ka it's NOT a good idea to have z-indices of 90 or above for extensibility reasons. even with z-index of 99 i can't get over your nav and a great deal of your content.
    $('body').delegate('.cosigncosine-block', 'click', function(){
        var ie = confirm('Are you sure that you want to block this user? This action is curently irrevocable as of January 15, 2018.');
        if(ie){
            console.log('lol noob');
            var u = $(this).parent().parent().parent().find('.discussion-meta-info').find('.author-nickname').text().replace("View profile for: ", "").trim().replace(/\!|\||\\|\?|\!|\*|\+|\{|\}|\(|\)|\[|\]|\^|\$|\&/gim, "");
            pl.push(u);
            pr = new RegExp(pl.join("|"), "gim");
            localStorage.setItem("cosigncosine-block", JSON.stringify(pl));
        }
    });
    $('body').delegate('.cosigncosineshowblock a', 'click', function(){
        localStorage.setItem('cosigncosine-show', !localStorage.getItem('cosigncosine-show'));
        location.reload();
    });
    setInterval(function(){
        $(".discussion-meta-controls").each(function(){
            if($(this).has('.cosigncosine-block').length === 0){
                $("<span>").html("•").addClass("discussion-meta-separator").appendTo(this);
                $("<span>").html("<a href='javascript:void(0);' class='cosigncosine-block' title='Block this user'>Block</a>").addClass("flag-tools").appendTo(this);
            }
        });
        if(sh){
            $(".author-nickname").each(function() {
                if($(this).parent().parent().parent().parent().hasClass('thread'))
                    dt(this, 4);
                else
                    dt(this, 3);
            });
            if(location.href.includes('computing')){
                $("a").each(function(){
                    if($(this).attr('class') && $(this).attr('class').match(/author/gim)){
                        dt(this, 2);
                    }
                });
            }
            if(location.href.includes('profile')){
                $(".nickname").each(function(){
                    dt(this, 11);
                });
            }
        }
    }, 500);
});
