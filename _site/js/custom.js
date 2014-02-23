var nedtConfig = {
    navbarlink: null,
    subPrefix: '#sub',
    activeClass: 'subCurrent',
    headerH: 0
};

function getElemtHeight(el) {
    var padding = 50;
    var h = Number($(el).height() + padding);
    return h;
}

function setMinHeight(el) {
    var minH = Number(getElemtHeight(window));
    $(el).css('min-height', minH + 'px');
}
function hideElement(targetElement, classToRemove) {
    $(targetElement).removeClass(classToRemove);
}

$(function () {
    nedtConfig.navbarlink = $('#navbar li a');
    nedtConfig.headerH = getElemtHeight('.main-header');

    //setMinHeight('#content6');


    //scroll to id
    $('#navbar').on('click', 'li a', function (e) {
        e.preventDefault();
        nedtConfig.navbarlink.removeClass('subCurrent');
        $(this).addClass('subCurrent');

        if (typeof $(this).attr('id') !== 'undefined') {
            var lkId = $(this).attr('id').replace(/[A-Za-z$-]/g, "");;
        } else {

            return false;
        }
        // console.log(lkId);
        scrollToTheTop('content' + lkId);
    });




    $('body').click(function (e) {

        var target = e.target.nodeName;
        if (($(target).hasClass('mobile-menu') || $(target).parent().hasClass('mobile-menu')) && !$('#navbar').hasClass('show-on-mobile')) {
            e.preventDefault();
            console.log('in if statement')
            $('#navbar').addClass('show-on-mobile');
            $(this).addClass('current-selection');
            return false;
        }
        if (!$(target).hasClass('navbar') && $('#navbar').hasClass('show-on-mobile')) {
            var targetToHide = '.navbar';
            hideElement(targetToHide, 'show-on-mobile');
        }
    });
});

jQuery(window).on('resize', function (e) {
    nedtConfig.headerH = getElemtHeight('.main-header');
    setMinHeight('#content6');
});
jQuery(window).on('scroll', function (e) {

    $(".pannel").each(function (el) {
        //$(this).attr("id", "link" + n);
        var offset = $(this).position();
        var pageTop = GetScrollPositions();
        if ((offset.top - pageTop) < nedtConfig.headerH && (offset.top - pageTop) > -nedtConfig.headerH + 120) {


            var thisId = $(this).attr('id');
            var docid = thisId.substr(7);
            nedtConfig.navbarlink.removeClass(nedtConfig.activeClass);

            $(nedtConfig.subPrefix + docid).addClass(nedtConfig.activeClass);

        }

    });
});

function scrollToTheTop(theRel) {
    timeToScrollSubs = 600;
    console.log(theRel);

    if (theRel != 'content') {

        var from = $('#' + theRel).offset();
        if (from) {
            $('body, html').stop().animate({ scrollTop: from.top - nedtConfig.headerH }, timeToScrollSubs, 'linear', function () {

            });

        }
    }

}

// credits: http://help.dottoro.com/ljnvjiow.php
function GetZoomFactor() {
    var factor = 1;
    if (document.body.getBoundingClientRect) {
        // rect is only in physical pixel size in IE before version 8
        var rect = document.body.getBoundingClientRect();
        var physicalW = rect.right - rect.left;
        var logicalW = document.body.offsetWidth;

        // the zoom level is always an integer percent value
        factor = Math.round((physicalW / logicalW) * 100) / 100;
    }
    return factor;
}

function GetScrollPositions() {
    if ('pageXOffset' in window) {  // all browsers, except IE before version 9
        var scrollLeft = window.pageXOffset;
        var scrollTop = window.pageYOffset;
    }
    else {      // Internet Explorer before version 9
        var zoomFactor = GetZoomFactor();
        var scrollLeft = Math.round(document.documentElement.scrollLeft / zoomFactor);
        var scrollTop = Math.round(document.documentElement.scrollTop / zoomFactor);
    }

    return scrollTop;
    //alert ("The current horizontal scroll amount: " + scrollLeft + "px");
    // alert ("The current vertical scroll amount: " + scrollTop + "px");
}

/* When PayPal Button is clicked modal window with multiple choices of donation is popping up */

$('.frontButton').on('click', function(e) {
    e.preventDefault();
    $('.modal-window').addClass('showModal');
});

/* When Close Button is clicked modal window is closed */

$('.closeBtn').on('click', function(e) {
    $('.modal-window').removeClass('showModal');
});