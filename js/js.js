/*##
##
## Verstecke console.X vor älteren Browsern
##
####*/

(function(){var e;var t=function(){};var n=['assert','clear','count','debug','dir','dirxml','error','exception','group','groupCollapsed','groupEnd','info','log','markTimeline','profile','profileEnd','table','time','timeEnd','timeline','timelineEnd','timeStamp','trace','warn'];var r=n.length;var i=window.console=window.console||{};while(r--){e=n[r];if(!i[e]){i[e]=t}}})()


/*##
##
## Lade externe Script am Ende aka "defered"
##
####*/

/*
jQuery(window).on('load',
function()
{
  $('<div />').appendTo('body').load('./_external-scripts.html');
});
*/

/*##
##
## jQuery Hauptschleife
##
####*/

jQuery(document).ready(
function($)
{
  /*##
  ##
  ## analytics tagging defered loading
  ##
  ####*/

  if('[crm-email]' === '')
  {
    $.ajaxPrefilter(
    function(options)
    {
      var crm_filter = ['[domain]/save-tags.txt',
                        'agilecrm.com/addstats']

      $.each(crm_filter,
      function(i, val)
      {
        if(options.url.indexOf(val) != -1)
        {
          options.url = '//[domain]/save-cache.txt?csrf=[crm-csrf]&url=' + encodeURIComponent(options.url);
          options.crossDomain = false;
        }
      });
    });
  }


  $.fn.extend(
  {
    'analytics': function()
    {
      return $(this).each(
      function(i, temp)
      {
        if(temp.name === 'crm')
        {
          temp.fn();
        }
        else if(temp.name === 'google-analytics')
        {
          if(typeof(ga) === 'undefined') onExternalLoaded['google-analytics'].push(temp.fn);
          else temp.fn();
        }
        else if(temp.name === 'facebook-tracking')
        {
          if(typeof(_fbq) === 'undefined') onExternalLoaded['facebook-tracking'].push(temp.fn);
          else temp.fn();
        }
      });
    }
  });


  /*##
  ##
  ## Erweiterung von jQuery ("Plugins")
  ##
  ####*/

  $.fn.extend(
  {
    scrollToWithHeader:
    function()
    {
      return this.each(
      function()
      {
        var temp_headerfix = 0;

        if($('#header-real').hasClass('header-scrolling') !== false)
        {
          temp_headerfix = $('#header-real').height();
        }

        $('html, body').animate({ scrollTop: ($(this).offset().top - temp_headerfix) }, 1000);
      });
    },
  });


  /*##
  ##
  ##  GLOBAL: Erkenne das Absenden eines Formulars und zeige Ladeanzeige
  ##
  ####*/

  $('form').on('submit',
  function()
  {
    $('#spinner-box').fadeIn('slow');

    $this = $(this);
    setTimeout(function(){ $this.trigger('submitted'); }, 10*1000);
  }).on('submitted',
  function()
  {
    $('#spinner-box').fadeOut('slow');
  })


  /*##
  ##
  ##  GLOBAL: Erkenne Scrollen und passe <HEADER>-Menü darauf an
  ##
  ####*/


  /* Automatischer Aufruf beim Start */


  /*##
  ##
  ##  GLOBAL: Ersetze Email-Adressen durch die ROT13
  ##
  ####*/

  $('.email-encrypted').each(
  function()
  {
    $(this).html($(this).html().replace(/[a-z]/gi,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);})).show();
  });


  /*##
  ##
  ## Lade Funktionen die geladen wurden, bevor jQuery aktiv war
  ##
  ####*/

  $.each(onjQueryReady,
  function(index, fn)
  {
    fn();
  });
});

/*##
##
##  GLOBAL: Open Loginbox
##
####*/

var LoginModalController = {
    tabsElementName: ".login-box-tabs li",
    tabElementName: ".login-box-tab",
    inputElementsName: ".login-box-form .input",
    hidePasswordName: ".hide-password",

    inputElements: null,
    tabsElement: null,
    tabElement: null,
    hidePassword: null,

    activeTab: null,
    tabSelection: 0, // 0 - first, 1 - second

    findElements: function () {
        var base = this;

        base.tabsElement = $(base.tabsElementName);
        base.tabElement = $(base.tabElementName);
        base.inputElements = $(base.inputElementsName);
        base.hidePassword = $(base.hidePasswordName);

        return base;
    },

    setState: function (state) {
    	var base = this,
            elem = null;

        if (!state) {
            state = 0;
        }

        if (base.tabsElement) {
        	elem = $(base.tabsElement[state]);
            elem.addClass("current");
            $("." + elem.attr("data-tabtar")).addClass("show");
        }

        return base;
    },

    getActiveTab: function () {
        var base = this;

        base.tabsElement.each(function (i, el) {
           if ($(el).hasClass("current")) {
               base.activeTab = $(el);
           }
        });

        return base;
    },

    addClickEvents: function () {
    	var base = this;

        base.hidePassword.on("click", function (e) {
            var $this = $(this),
                $pwInput = $this.prev("span").find("input");

            if ($pwInput.attr("type") == "password") {
                $pwInput.attr("type", "text");
                $this.text("Verstecken");
            } else {
                $pwInput.attr("type", "password");
                $this.text("Anzeigen");
            }
        });

        base.tabsElement.on("click", function (e) {
            var targetTab = $(this).attr("data-tabtar");

            e.preventDefault();
            base.activeTab.removeClass("current");
            base.activeTab = $(this);
            base.activeTab.addClass("current");

            base.tabElement.each(function (i, el) {
                el = $(el);
                el.removeClass("show");
                if (el.hasClass(targetTab)) {
                    el.addClass("show");
                }
            });
        });

        base.inputElements.find("label").on("click", function (e) {
           var $this = $(this),
               $input = $this.next("input");

            $input.focus();
        });

        return base;
    },

    initialize: function () {
        var base = this;

        base.findElements().setState().getActiveTab().addClickEvents();
    }
};
/* Erkenne ob Benutzer gescrollt hat und minimiere das Menü auf eine kleinere Variante */
//$('header').attr('id', 'header-real').after('<header id="header-fake" class="header-scrolling" style="width:1px;"></header>');
var headerController = {
    initialize: function () {
        var $header_real_height = $('.scrolling-header').height();
        var $header_fake_height = $('.fake-header').height();
        $('#header-fake').removeClass('header-scrolling');
        $(window).on('scroll',
            function()
            {
                if(!window.isMobile){
                    if($(document).scrollTop() >= $header_real_height-$header_fake_height +30)
                    {
                        $('.fake-header').height($header_real_height);
                        $('.scrolling-header').addClass('scroll');


                    }
                    else
                    {
                        $('.fake-header').height($header_fake_height);
                        $('.scrolling-header').removeClass('scroll')
                    }
                }

            }).trigger('scroll');
    }
}

$(document).ready(function() {
    LoginModalController.initialize();
});