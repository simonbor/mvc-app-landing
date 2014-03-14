// JavaScript Document for Reydeo

$(window).load(function () {
    //Image Slider
    $('.image-slider').flexslider({
        animation: "slide",
        slideshowSpeed: 4000,
        animationDuration: 600,
        controlNav: false,
        keyboardNav: true,
        directionNav: true,
        pauseOnHover: true,
        pauseOnAction: true,
    });
});


$(document).ready(function () {

    //prettyPhoto
    $('a[data-rel]').each(function () {
        $(this).attr('rel', $(this).data('rel'));
    });
    $("a[rel^='prettyPhoto[gallery1]']").prettyPhoto({
        animation_speed: 'fast',
        slideshow: 5000,
        autoplay_slideshow: false,
        opacity: 0.80,
        show_title: false,
        theme: 'pp_default',
        /* light_rounded / dark_rounded / light_square / dark_square / facebook */
        overlay_gallery: false,
        social_tools: false,
        changepicturecallback: function () {
            var $pp = $('.pp_default');
            if (parseInt($pp.css('left')) < 0) {
                $pp.css('left', 0);
            }
        }
    });
	
	 //Subscribe form		
    $(function () {
        var v = $("#subform").validate({
            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    target: "#subresult",
                    clearForm: true
                });
            }
        });
    });

});



// Below scripts do not require modification
/*! 
 * FitVids 1.0
 *
 * Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 * Date: Thu Sept 01 18:00:00 2011 -0500
 */

(function ($) {

    $.fn.fitVids = function (options) {
        var settings = {
            customSelector: null
        }

        var div = document.createElement('div'),
            ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0];

        div.className = 'fit-vids-style';
        div.innerHTML = '&shy;<style>         \
      .fluid-width-video-wrapper {        \
         width: 100%;                     \
         position: relative;              \
         padding: 0;                      \
      }                                   \
                                          \
      .fluid-width-video-wrapper iframe,  \
      .fluid-width-video-wrapper object,  \
      .fluid-width-video-wrapper embed {  \
         position: absolute;              \
         top: 0;                          \
         left: 0;                         \
         width: 100%;                     \
         height: 100%;                    \
      }                                   \
    </style>';

        ref.parentNode.insertBefore(div, ref);

        if (options) {
            $.extend(settings, options);
        }

        return this.each(function () {
            var selectors = [
                "iframe[src*='player.vimeo.com']",
                "iframe[src*='www.youtube.com']",
                "iframe[src*='www.kickstarter.com']",
                "object",
                "embed"];

            if (settings.customSelector) {
                selectors.push(settings.customSelector);
            }

            var $allVideos = $(this).find(selectors.join(','));

            $allVideos.each(function () {
                var $this = $(this);
                if (this.tagName.toLowerCase() == 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) {
                    return;
                }
                var height = this.tagName.toLowerCase() == 'object' ? $this.attr('height') : $this.height(),
                    aspectRatio = height / $this.width();
                if (!$this.attr('id')) {
                    var videoID = 'fitvid' + Math.floor(Math.random() * 999999);
                    $this.attr('id', videoID);
                }
                $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100) + "%");
                $this.removeAttr('height').removeAttr('width');
            });
        });

    }
})(jQuery);

// Basic FitVids Test
$(".container, .row").fitVids();
// Custom selector and No-Double-Wrapping Prevention Test
$(".container, .row").fitVids({
    customSelector: "iframe[src^='http://socialcam.com']"
});


//video z-index
$("iframe").each(function () {
    var ifr_source = $(this).attr('src');
    var wmode = "wmode=transparent";
    if (ifr_source.indexOf('?') != -1) {
        var getQString = ifr_source.split('?');
        var oldString = getQString[1];
        var newString = getQString[0];
        $(this).attr('src', newString + '?' + wmode + '&' + oldString);
    } else $(this).attr('src', ifr_source + '?' + wmode);
});




/* IE Image Resizing - by Ethan Marcotte - http://unstoppablerobotninja.com/entry/fluid-images/ */
var imgSizer = {
    Config: {
        imgCache: [],
        spacer: "../images/spacer.gif"
    }

    ,
    collate: function (aScope) {
        var isOldIE = (document.all && !window.opera && !window.XDomainRequest) ? 1 : 0;
        if (isOldIE && document.getElementsByTagName) {
            var c = imgSizer;
            var imgCache = c.Config.imgCache;

            var images = (aScope && aScope.length) ? aScope : document.getElementsByTagName("img");
            for (var i = 0; i < images.length; i++) {
                images[i].origWidth = images[i].offsetWidth;
                images[i].origHeight = images[i].offsetHeight;

                imgCache.push(images[i]);
                c.ieAlpha(images[i]);
                images[i].style.width = "100%";
            }

            if (imgCache.length) {
                c.resize(function () {
                    for (var i = 0; i < imgCache.length; i++) {
                        var ratio = (imgCache[i].offsetWidth / imgCache[i].origWidth);
                        imgCache[i].style.height = (imgCache[i].origHeight * ratio) + "px";
                    }
                });
            }
        }
    }

    ,
    ieAlpha: function (img) {
        var c = imgSizer;
        if (img.oldSrc) {
            img.src = img.oldSrc;
        }
        var src = img.src;
        img.style.width = img.offsetWidth + "px";
        img.style.height = img.offsetHeight + "px";
        img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "', sizingMethod='scale')"
        img.oldSrc = src;
        img.src = c.Config.spacer;
    }

    // Ghettomodified version of Simon Willison's addLoadEvent() -- http://simonwillison.net/2004/May/26/addLoadEvent/
    ,
    resize: function (func) {
        var oldonresize = window.onresize;
        if (typeof window.onresize != 'function') {
            window.onresize = func;
        } else {
            window.onresize = function () {
                if (oldonresize) {
                    oldonresize();
                }
                func();
            }
        }
    }
}

// For placeholder in IE
/*! http://mths.be/placeholder v2.0.7 by @mathias */
;(function(window, document, $) {

	var isInputSupported = 'placeholder' in document.createElement('input'),
	    isTextareaSupported = 'placeholder' in document.createElement('textarea'),
	    prototype = $.fn,
	    valHooks = $.valHooks,
	    hooks,
	    placeholder;

	if (isInputSupported && isTextareaSupported) {

		placeholder = prototype.placeholder = function() {
			return this;
		};

		placeholder.input = placeholder.textarea = true;

	} else {

		placeholder = prototype.placeholder = function() {
			var $this = this;
			$this
				.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
				.not('.placeholder')
				.bind({
					'focus.placeholder': clearPlaceholder,
					'blur.placeholder': setPlaceholder
				})
				.data('placeholder-enabled', true)
				.trigger('blur.placeholder');
			return $this;
		};

		placeholder.input = isInputSupported;
		placeholder.textarea = isTextareaSupported;

		hooks = {
			'get': function(element) {
				var $element = $(element);
				return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
			},
			'set': function(element, value) {
				var $element = $(element);
				if (!$element.data('placeholder-enabled')) {
					return element.value = value;
				}
				if (value == '') {
					element.value = value;
					// Issue #56: Setting the placeholder causes problems if the element continues to have focus.
					if (element != document.activeElement) {
						// We can't use `triggerHandler` here because of dummy text/password inputs :(
						setPlaceholder.call(element);
					}
				} else if ($element.hasClass('placeholder')) {
					clearPlaceholder.call(element, true, value) || (element.value = value);
				} else {
					element.value = value;
				}
				// `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
				return $element;
			}
		};

		isInputSupported || (valHooks.input = hooks);
		isTextareaSupported || (valHooks.textarea = hooks);

		$(function() {
			// Look for forms
			$(document).delegate('form', 'submit.placeholder', function() {
				// Clear the placeholder values so they don't get submitted
				var $inputs = $('.placeholder', this).each(clearPlaceholder);
				setTimeout(function() {
					$inputs.each(setPlaceholder);
				}, 10);
			});
		});

		// Clear placeholder values upon page reload
		$(window).bind('beforeunload.placeholder', function() {
			$('.placeholder').each(function() {
				this.value = '';
			});
		});

	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {},
		    rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder(event, value) {
		var input = this,
		    $input = $(input);
		if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
			if ($input.data('placeholder-password')) {
				$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
				// If `clearPlaceholder` was called from `$.valHooks.input.set`
				if (event === true) {
					return $input[0].value = value;
				}
				$input.focus();
			} else {
				input.value = '';
				$input.removeClass('placeholder');
				input == document.activeElement && input.select();
			}
		}
	}

	function setPlaceholder() {
		var $replacement,
		    input = this,
		    $input = $(input),
		    $origInput = $input,
		    id = this.id;
		if (input.value == '') {
			if (input.type == 'password') {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().attr({ 'type': 'text' });
					} catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
					}
					$replacement
						.removeAttr('name')
						.data({
							'placeholder-password': true,
							'placeholder-id': id
						})
						.bind('focus.placeholder', clearPlaceholder);
					$input
						.data({
							'placeholder-textinput': $replacement,
							'placeholder-id': id
						})
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
				// Note: `$input[0] != input` now!
			}
			$input.addClass('placeholder');
			$input[0].value = $input.attr('placeholder');
		} else {
			$input.removeClass('placeholder');
		}
	}

}(this, document, jQuery));
// function to get placeholder in IE
$(function() {
 $('input, textarea').placeholder();
});




