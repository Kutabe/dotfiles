// ==UserScript==
// @name        Multi-Page Viewer Plus
// @namespace   Multi-Page Viewer Plus
// @description This script provides a slideshow option for e-hentai.org galleries in MPV (Multi-Page Viewer) and minor improvements.
// @author      ku7ab3@gmail.com
// @include     https://e*hentai.org/mpv/*
// @version     1.1
// @grant       none
// @require     https://code.jquery.com/jquery-3.2.1.min.js
// @updateURL   https://raw.githubusercontent.com/Kutabe/dotfiles/master/exhentai/mpvp.user.js
// @downloadURL https://raw.githubusercontent.com/Kutabe/dotfiles/master/exhentai/mpvp.user.js
// ==/UserScript==
/*
About:
mpvp (multi page viewer plus) is a dumb user script to add slideshow
option to your MPV so now you can use both of your hands.

License:
This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>
*/
// hide old panel
$("#bar3").hide();

// remove thumbnail scrollbar
$("#pane_thumbs").css("overflow", "hidden");
$("#pane_outer").css("background-color", "#34353B");

// add new panel
$("#bar1").append(`
<div id="mpvp" style="
   position: absolute;
   top: 0px;
   left: 50px;
   right: 50px;
   height: 64px;
   z-index: 3;
   background: rgba(0,0,0,0.75);
   border-bottom-left-radius: 20px;
   border-bottom-right-radius: 20px
   ">
    <div id="fsbtn" style="
      position: absolute;
      top: 16px;
      left: 16px;
      ">
        <svg style="color: white" id="fsreq" width="32" height="32" viewBox="0 0 32 32">
            <path style="fill:currentColor;fill-opacity:1;stroke:none" d="M 4,4 4,9 5,9 5,5 9,5 9,4 Z m 12,0 -3,3 6,0 z m 7,0 0,1 4,0 0,4 1,0 0,-5 z m -16,9 -3,3 3,3 z m 18,0 0,6 3,-3 z m -21,10 0,5 5,0 0,-1 -4,0 0,-4 z m 23,0 0,4 -4,0 0,1 5,0 0,-5 z m -14,2 3,3 3,-3 z"/>
        </svg>
        <svg style="color: white" id="fsexit" width="32" height="32" viewBox="0 0 32 32">
            <path style="fill:currentColor;fill-opacity:1;stroke:none" d="M 4 4 L 4 5 L 4 16 L 5 16 L 5 5 L 27 5 L 27 27 L 16 27 L 16 28 L 27 28 L 28 28 L 28 5 L 28 4 L 4 4 z M 23.837891 7.453125 L 16 15.292969 L 16 9.9296875 L 15 9.9296875 L 15 15.585938 L 15 17 L 22.070312 17 L 22.070312 16 L 16.707031 16 L 24.546875 8.1621094 L 23.837891 7.453125 z M 4 18 L 4 22 L 5 22 L 5 19 L 8 19 L 8 18 L 5 18 L 4 18 z M 10 18 L 10 19 L 13 19 L 13 22 L 14 22 L 14 19 L 14 18 L 13 18 L 10 18 z M 4 24 L 4 27 L 4 28 L 8 28 L 8 27 L 5 27 L 5 24 L 4 24 z M 13 24 L 13 27 L 10 27 L 10 28 L 14 28 L 14 24 L 13 24 z"/>
        </svg>
    </div>
    <div title="Content alignment" style="
      position: absolute;
      top: 16px;
      left: 68px;
      ">
        <svg id="acsd" viewBox="0 0 32 32" width="32" height="32" onclick="action_set('ms_c')" style="
         position: absolute;
         left: 0px;
         color: white;
         ">
            <path style="fill:currentColor;fill-opacity:1;stroke:none" d="m15 4v2h-4v8h4v4h-8v8h8v2h2v-2h8v-8h-8v-4h4v-8h-4v-2zm-3 3h8v6h-8zm-4 12h16v6h-16z" />
        </svg>
        <svg id="acsf" viewBox="0 0 32 32" width="32" height="32" onclick="action_set('ms_y')" style="
         position: absolute;
         left: 32px;
         color: white;
         ">
            <path style="color:#ffffff;fill:currentColor;fill-opacity:1;stroke:none" d="M 15,4 V 6 H 7 v 8 h 8 v 4 H 7 v 8 h 8 v 2 h 2 v -2 h 8 v -8 h -8 v -4 h 8 V 6 H 17 V 4 Z M 8,7 h 16 v 6 H 8 Z m 0,12 h 16 v 6 H 8 Z" />
        </svg>
        <svg id="alsd" viewBox="0 0 32 32" width="32" height="32" onclick="action_set('ms_n')" style="
         position: absolute;
         left: 64px;
         color: white;
         ">
            <path style="fill:currentColor;fill-opacity:1;stroke:none" d="M 4 4 L 4 28 L 6 28 L 6 4 L 4 4 z M 8 4 L 8 14 L 28 14 L 28 4 L 8 4 z M 9 5 L 27 5 L 27 13 L 9 13 L 9 5 z M 8 18 L 8 28 L 18 28 L 18 18 L 8 18 z M 9 19 L 17 19 L 17 27 L 9 27 L 9 19 z" />
        </svg>
    </div>
    <div id="thumbbtn" style="
      position: absolute;
      top: 16px;
      left: 184px;
      ">
        <svg id="thumbshow" viewBox="0 0 32 32" width="32" height="32" onclick="action_set('mt_n')" style="
         position: absolute;
         left: 0px;
         opacity: 0.5;
         color: white;
         ">
            <path style="fill:currentColor;fill-opacity:1;stroke:none" d="m4 4v24h24v-24zm1 1h22v22h-22zm6 2a4 4 0 0 0 -4 4 4 4 0 0 0 4 4 4 4 0 0 0 4 -4 4 4 0 0 0 -4 -4m0 1a3 3 0 0 1 3 3 3 3 0 0 1 -3 3 3 3 0 0 1 -3 -3 3 3 0 0 1 3 -3m9.5 6.793l-5 5-2-2-6.5 6.5.707.707 5.793-5.793 2 2 5-5 3.793 3.793.707-.707z" />
        </svg>
        <svg id="thumbhide" viewBox="0 0 32 32" width="32" height="32" onclick="action_set('mt_y')" style="
         position: absolute;
         left: 0px;
         color: white;
         ">
            <path style="fill:currentColor;fill-opacity:1;stroke:none" d="m4 4v24h24v-24zm1 1h22v22h-22zm6 2a4 4 0 0 0 -4 4 4 4 0 0 0 4 4 4 4 0 0 0 4 -4 4 4 0 0 0 -4 -4m0 1a3 3 0 0 1 3 3 3 3 0 0 1 -3 3 3 3 0 0 1 -3 -3 3 3 0 0 1 3 -3m9.5 6.793l-5 5-2-2-6.5 6.5.707.707 5.793-5.793 2 2 5-5 3.793 3.793.707-.707z" />
        </svg>
    </div>
    <div title="Previous image" style="
      display: inline-block;
      ">
        <svg id="prevbtn" viewBox="0 0 32 32" width="48" height="48" onclick="" style="
         margin-bottom: 8px;
         color: white;
         ">
            <path style="fill:currentColor;fill-opacity:1;stroke:none" d="m 16.001953,3.998047 a 12,12 0 0 1 12,12 12,12 0 0 1 -12,12 12,12 0 0 1 -11.9999999,-12 12,12 0 0 1 11.9999999,-12 z m 0,1 a 11,11 0 0 0 -10.9999999,11 11,11 0 0 0 10.9999999,11 11,11 0 0 0 11,-11 11,11 0 0 0 -11,-11 z M 22.003906,12 l 0,8 -7,-4 7,-4 z m -7,4 0,4 -6.9999999,-4 6.9999999,-4 0,4 z" />
        </svg>
    </div>
    <div id="playpausebox" title="Start slideshow" style="
      display: inline-block;
      ">
        <svg style="color: white" id="playbtn" viewBox="0 0 32 32" width="64" height="64">
            <path style="fill:currentColor;fill-opacity:1;stroke:none" d="M 16.001953 3.9980469 A 12 12 0 0 0 4.0019531 15.998047 A 12 12 0 0 0 16.001953 27.998047 A 12 12 0 0 0 28.001953 15.998047 A 12 12 0 0 0 16.001953 3.9980469 z M 16.001953 4.9980469 A 11 11 0 0 1 27.001953 15.998047 A 11 11 0 0 1 16.001953 26.998047 A 11 11 0 0 1 5.0019531 15.998047 A 11 11 0 0 1 16.001953 4.9980469 z M 13 12 L 13 20 L 20 16 L 13 12 z" />
        </svg>
        <svg id="pausebtn" viewBox="0 0 32 32" width="64" height="64" style="display: none; color: white">
            <path style="fill:currentColor;fill-opacity:1;stroke:none" d="M 16.001953 3.9980469 A 12 12 0 0 0 4.0019531 15.998047 A 12 12 0 0 0 16.001953 27.998047 A 12 12 0 0 0 28.001953 15.998047 A 12 12 0 0 0 16.001953 3.9980469 z M 16.001953 4.9980469 A 11 11 0 0 1 27.001953 15.998047 A 11 11 0 0 1 16.001953 26.998047 A 11 11 0 0 1 5.0019531 15.998047 A 11 11 0 0 1 16.001953 4.9980469 z M 12 12 L 12 20 L 14 20 L 14 12 L 12 12 z M 18 12 L 18 20 L 20 20 L 20 12 L 18 12 z" />
        </svg>
    </div>
    <div title="Next image" style="
      display: inline-block;
      ">
        <svg id="nextbtn" viewBox="0 0 32 32" width="48" height="48" onclick="" style="
         margin-bottom: 8px;
         color: white;
         ">
            <path style="fill:currentColor;fill-opacity:1;stroke:none" d="M 16.001953 3.9980469 A 12 12 0 0 0 4.0019531 15.998047 A 12 12 0 0 0 16.001953 27.998047 A 12 12 0 0 0 28.001953 15.998047 A 12 12 0 0 0 16.001953 3.9980469 z M 16.001953 4.9980469 A 11 11 0 0 1 27.001953 15.998047 A 11 11 0 0 1 16.001953 26.998047 A 11 11 0 0 1 5.0019531 15.998047 A 11 11 0 0 1 16.001953 4.9980469 z M 10 12 L 10 20 L 17 16 L 10 12 z M 17 16 L 17 20 L 24 16 L 17 12 L 17 16 z" />
        </svg>
    </div>
    <div style="
      position: absolute;
      top: 16px;
      left: 16px;
      ">
    </div>
    <div title="Delta time" id="deltatimebox" style="
      position: absolute;
      height: 32px;
      top: 12px;
      right: 58px;
      height: 36px;
      width: 80px;
      border: 1px solid white;
      border-radius: 5px;
      ">
        <div id="deltaplus" style="
         position: absolute;
         top: 4px;
         right: 62px;
         width: 16px;
         height: 16px;
         ">
            <svg style="color: white" viewBox="0 0 16 16" width="16" height="16">
                <path style="fill:currentColor;fill-opacity:1;stroke:none" d="M 7 3.0058594 L 7 8 L 2 8 L 2 8.9980469 L 7 8.9980469 L 7 14.007812 L 8 14.007812 L 8 8.9980469 L 13 8.9980469 L 13 8 L 8 8 L 8 3.0058594 L 7 3.0058594 z"/>
            </svg>
        </div>
        <div id="deltaminus" style="
         position: absolute;
         top: 20px;
         right: 62px;
         width: 16px;
         height: 16px;
         ">
            <svg style="color: white" viewBox="0 0 16 16" width="16" height="16">
                <path style="fill:currentColor;fill-opacity:1;stroke:none" d="M 3 8 L 3 9 L 13 9 L 13 8 L 3 8 z" />
            </svg>
        </div>
        <input id="deltatime" disabled="disabled" type="number" min="2" max="30" step="1" value="5" style="
         position: absolute;
         -webkit-appearance: none;
         -moz-appearance: textfield;
         -ms-appearance: none;
         -o-appearance: none;
         appearance: none;
         background: transparent;
         border: none;
         font-size: 22px;
         font-weight: 300;
         text-align: center;
         color: white;
         top: 0px;
         right: 24px;
         width: 38px;
         height: 32px;
         " />
        <svg viewBox="0 0 22 22" width="32" height="32" style="
         position: absolute;
         right: 0px;
         top: 2px;
         color: white;
         ">
            <path style="fill:currentColor;fill-opacity:1;stroke:none" d="m11 3c-4.431998 0-8 3.568002-8 8 0 4.431998 3.568002 8 8 8 4.431998 0 8-3.568002 8-8 0-4.431998-3.568002-8-8-8m0 1c3.877999 0 7 3.122001 7 7 0 3.877999-3.122001 7-7 7-3.877999 0-7-3.122001-7-7 0-3.877999 3.122001-7 7-7m-1 1v7h1 5v-1h-5v-6h-1" />
        </svg>
    </div>
    <div title="Exit MPV">
        <svg viewBox="0 0 32 32" width="32" height="32" onclick="action_gallery()" style="
         position: absolute;
         top: 16px;
         right: 16px;
         color: white;
         ">
            <g transform="translate(-384.57-515.8)">
                <circle fill="#fff" cx="400.57" cy="531.8" r="11" />
                <path fill="#da4453" d="M16 4A12 12 0 0 0 4 16 12 12 0 0 0 16 28 12 12 0 0 0 28 16 12 12 0 0 0 16 4M10.707 10L16 15.293 21.293 10C21.293 10 22.02 10.716 22 10.707L16.707 16 22 21.293C22 21.293 21.299 21.999 21.293 22L16 16.707 10.707 22C10.708 21.995 10 21.293 10 21.293L15.293 16 10 10.707C10.02 10.708 10.707 10 10.707 10" transform="translate(384.57 515.8)" />
            </g>
        </svg>
    </div>
</div>`);

// variables
var playtimer = null;
var fadetimer = null;
var page = currentPage();
var pages = $('.mimg').length;

// INITIAL STATES:
// fullscreen button
if (isFullScreen()) {
    $("#fsbtn").prop("title", "Exit fullscreen");
    $("#fsreq").hide();
    $("#fsexit").show();
} else {
    $("#fsbtn").prop("title", "Go fullscreen");
    $("#fsexit").hide();
    $("#fsreq").show();
}

// thumbnail button
if ($("#bar3 img:nth-child(6)").css("opacity") == 1) {
    $("#thumbbtn").prop("title", "Hide thumbnails")
    $("#thumbshow").hide();
    $("#thumbhide").show();
} else {
    $("#thumbbtn").prop("title", "Show thumbnails")
    $("#thumbhide").hide();
    $("#thumbshow").show();
}
// image alignment
if ($("#bar3 img:nth-child(3)").css("opacity") == 1) {
    $("#alsd").prop("onclick", null);
    $("#acsd").css("opacity", "0.5");
    $("#acsf").css("opacity", "0.5");
} else if ($("#bar3 img:nth-child(4)").css("opacity") == 1) {
    $("#acsd").prop("onclick", null);
    $("#acsf").css("opacity", "0.5");
    $("#alsd").css("opacity", "0.5");
} else if ($("#bar3 img:nth-child(5)").css("opacity") == 1) {
    $("#acsf").prop("onclick", null);
    $("#acsd").css("opacity", "0.5");
    $("#alsd").css("opacity", "0.5");
}

// prev/next image
if (page < 2) {
    $("#prevbtn").css("opacity", "0.5");
} else {
    $("#prevbtn").css("opacity", "1");
}
if (page >= pages) {
    $("#nextbtn").css("opacity", "0.5");
} else {
    $("#nextbtn").css("opacity", "1");
}

// is fullscreen enabled?
function isFullScreen() {
    return document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msIsFullScreen;
}

// reset timer on hashchange
$(window).bind("hashchange", function() {
    if (playtimer) {
        clearTimeout(playtimer);
        playtimer = null;
        play();
    }
});

// hide bar on timeout
$("body").mousemove(function() {
    clearTimeout(fadetimer);
    $("#mpvp").fadeIn(200);
    fadetimer = setTimeout(function() {
        if (!$('#mpvp:hover').length != 0) {
            $("#mpvp").fadeOut(200);
        }
    }, 1000);
});

// take actions on fullscreen change
$(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange', function(e) {
    if (isFullScreen()) {
        $("#fsbtn").prop("title", "Exit fullscreen");
        $("#fsreq").hide();
        $("#fsexit").show();
    } else {
        $("#fsbtn").prop("title", "Go fullscreen");
        $("#fsexit").hide();
        $("#fsreq").show();
    }
});

// fullscreen request
$("#fsreq").on("click", function() {
    $("#fsreq").hide();
    $("#fsexit").show();
    var a = document.body.requestFullScreen || document.body.webkitRequestFullScreen || document.body.mozRequestFullScreen || document.body.msRequestFullScreen
    if (a) {
        a.call(document.body);
    }
});

// exit fullscreen
$("#fsexit").on("click", function() {
    $("#fsexit").hide();
    $("#fsreq").show();
    var a = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen
    if (a) {
        a.call(document);
    }
});

// play/pause
function currentPage() {
    page = parseInt(window.location.hash.substring(5))
    if (isNaN(page)) {
        page = 1
    }
    return page
}

function play() {
    $("#playpausebox").prop("title", "Pause slideshow");
    $("#playbtn").hide();
    $("#pausebtn").show();
    playtimer = setTimeout(function() {
        if (page >= pages) {
            pause();
            if (confirm("End of archive.\nStart over?")) {
                window.location.hash = "#page1";
                page = 1;
                play();
            }
        } else {
            goNextSlide();
            play();
        }
    }, 1000 * parseInt($("#deltatime").val()));
}

function pause() {
    $("#playpausebox").prop("title", "Start slideshow");
    $("#pausebtn").hide();
    $("#playbtn").show();
    if (playtimer) {
        clearTimeout(playtimer);
        playtimer = null;
    }
}

function goNextSlide() {
    var nextPage = currentPage();
    nextPage++;
    page = nextPage;
    window.location.hash = "#page" + page;
    if (page < 2) {
        $("#prevbtn").css("opacity", "0.5");
    } else {
        $("#prevbtn").css("opacity", "1");
    }
    if (page >= pages) {
        $("#nextbtn").css("opacity", "0.5");
    } else {
        $("#nextbtn").css("opacity", "1");
    }
}

function goPrevSlide() {
    var prevPage = currentPage();
    prevPage--;
    page = prevPage;
    window.location.hash = "#page" + page;
    if (page < 2) {
        $("#prevbtn").css("opacity", "0.5");
    } else {
        $("#prevbtn").css("opacity", "1");
    }
    if (page >= pages) {
        $("#nextbtn").css("opacity", "0.5");
    } else {
        $("#nextbtn").css("opacity", "1");
    }
}

$("#playbtn").on("click", function() {
    play();
});

$("#pausebtn").on("click", function() {
    pause();
});

$("#prevbtn").on("click", function() {
    if ($("#prevbtn").css("opacity") == "0.5") return;
    goPrevSlide();
});

$("#nextbtn").on("click", function() {
    if ($("#nextbtn").css("opacity") == "0.5") return;
    goNextSlide();
});

// mousewheel events to set delta time
$('#deltatimebox').on('DOMMouseScroll mousewheel', function(event) {
    if (event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
        // mouse wheel down
        var a = parseInt($("#deltatime").val());
        if (a > 2) {
            a--;
            $("#deltatime").val(a);
            if (playtimer) {
                clearTimeout(playtimer);
                playtimer = null;
                play();
            }
        }
    } else {
        // mouse wheel up
        var a = parseInt($("#deltatime").val());
        if (a < 30) {
            a++;
            $("#deltatime").val(a);
            if (playtimer) {
                clearTimeout(playtimer);
                playtimer = null;
                play();
            }
        }
    }
    // prevent page fom scrolling
    return false;
});

// decrease delta time
$("#deltaminus").on("click", function() {
    var a = parseInt($("#deltatime").val());
    if (a > 2) {
        a--;
        $("#deltatime").val(a);
        if (playtimer) {
            clearTimeout(playtimer);
            playtimer = null;
            play();
        }
    }
});

// increase delta time
$("#deltaplus").on("click", function() {
    var a = parseInt($("#deltatime").val());
    if (a < 30) {
        a++;
        $("#deltatime").val(a);
        if (playtimer) {
            clearTimeout(playtimer);
            playtimer = null;
            play();
        }
    }
});
