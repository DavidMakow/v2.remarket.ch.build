/*##
 ##
 ## <iframe> defered loading
 ##
 ####*/

$('iframe').each(
    function()
    {
        $(this).attr('src', $(this).data('src'));
    });

/*##
 ##
 ## Google Analytics Handling
 ## https://developers.google.com/analytics/devguides/collection/analyticsjs/events
 ##
 ####*/

if('x' !== '0')
{
    window.GoogleAnalyticsObject = 'ga';
    $.getScript('//www.google-analytics.com/analytics.js',
        function()
        {
            ga('create', 'x', 'auto', { 'clientId': 'ct6kfvp5qvo9g0r65c5rer1686' });
            ga('send', 'pageview');

            /* TODO: https://developers.google.com/analytics/devguides/collection/analyticsjs/cross-domain#iframes */

            $.each(onExternalLoaded['google-analytics'],
                function(index, fn)
                {
                    fn();
                });
        });
}


/*##
 ##
 ## Google Remarketing Handling
 ## https://support.google.com/adwords/answer/2476688?&hl=de&authuser=4
 ##
 ####*/

if('0' !== '0')
{
    $.getScript('//www.googleadservices.com/pagead/conversion_async.js',
        function()
        {
            window.google_trackConversion(
                {
                    google_conversion_id: '0',
                    google_custom_params: { },
                    google_remarketing_only: true
                });
        });
}


/*##
 ##
 ## Facebook Pixel Code Handling
 ## https://www.facebook.com/business/help/402791146561655
 ##
 ####*/

if('0' !== '0')
{
    ! function(f, b, e, v, n, t, s)
    {
        if(f.fbq) return;
        n = f.fbq = function()
        {
            n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window, document, 'script', '//connect.facebook.net/de_DE/fbevents.js');

    fbq('init', '0');
    fbq('track', 'PageView');

    $.each(onExternalLoaded['facebook-tracking'],
        function(index, fn)
        {
            fn();
        });
}


/*##
 ##
 ## SOCIAL > Facebook Handling
 ##
 ####*/

$.getScript('//connect.facebook.net/de_DE/sdk.js',
    function()
    {
        FB.init({
            'appId':   '0',
            'version': 'v2.7',
            'xfbml':   false,
            'cookie':  true
        });

        FB.getLoginStatus(
            function(response)
            {
                if(response.status === 'connected' || response.status === 'not_authorized')
                {
                    $([{
                        'name': 'crm',
                        'fn': function()
                        {
                            $.getJSON('//v2.remarket.ch/save-tags.txt', {'csrf': '[crm-csr]', 'tags': ['Social-Facebook']});
                        }
                    },
                        {
                            'name': 'google-analytics',
                            'fn': function()
                            {
                                ga('send', 'social',
                                    {
                                        'socialNetwork': 'Facebook',
                                        'socialAction': 'Registered',
                                        'socialTarget': 'https://v2.remarket.ch/'
                                    })
                            }
                        }]).analytics();
                }
            }, true /* NO CACHE! */);
    });


/* Verschiede Facebook Like Button auf entsprechende icons */
$(window).bind('mousemove',
    function(e)
    {
        if($(e.target).hasClass('fb_iframe_widget') || $(e.target).hasClass('fb-like-link'))
        {
            $('#fb-like').css({ 'top': (e.clientY + $(document).scrollTop() - 2), 'left': (e.clientX + $(document).scrollLeft() - 2)}).show();
        }
        else
        {
            $('#fb-like').hide();
        }
    });


/*##
 ##
 ## AgileCRM Webseite Tracking
 ##
 ####*/

$([{
    'name': 'crm',
    'fn': function()
    {
        $.getScript('https://ireparatur.agilecrm.com/stats/min/agile-min.js',
            function()
            {
                agile_json = function(url,cb)
                {
                    $.getScript(url); /* cb = callback, after success, not in use */
                }

                _agile.set_account('740l79tmvt09cc6b6hjl1us1rh', 'ireparatur');
                _agile.set_email('');
                _agile.track_page_view();

                if('' !== '')
                {
                    var crm_cache = $.parseJSON('["http:\/\/v2.remarket.ch\/save-tags.txt","https:\/\/stats2.agilecrm.com\/addstats?callback=?&guid=433e8ffe-d136-bbc3-e889-0ab78d1449e2&sid=314e92aa-ec63-fd1e-d279-e79976671768&url=http%3A%2F%2Fv2.remarket.ch%2F&agile=740l79tmvt09cc6b6hjl1us1rh&new=1&ref=&domain=ireparatur"]');

                    $.each(crm_cache,
                        function(i, url)
                        {
                            $.getScript(url,
                                function()
                                {
                                    $.getJSON('//v2.remarket.ch/del-cache.txt', {'csrf': '31061c3e50c403274be00407e4709f97', 'url': encodeURIComponent(url) });
                                });
                        });
                }
            });
    }
}]).analytics();


/*##
 ##
 ## Erkenne Soziale Medien
 ##
 ####*/

socialcheck_urls = [{
    'name': 'Twitter',
    'img':  '//twitter.com/login?redirect_after_login=%2Ffavicon.ico'
},
    {
        'name': 'Google Plus',
        'img':  '//plus.google.com/up/?continue=https://www.google.com/intl/en/images/logos/accounts_logo.png'
    },
    {
        'name': 'Google',
        'img':  '//accounts.google.com/CheckCookie?continue=https://www.google.com/intl/en/images/logos/accounts_logo.png'
    },
    {
        'name': 'Instagram',
        'img':  '//www.instagram.com/accounts/login/?next=%2Ffavicon.ico'
    }];

$(socialcheck_urls).each(function(i, temp)
{
    var $img = $('<img/>');
    $img.on('load', function()
    {
        $([{
            'name': 'crm',
            'fn': function()
            {
                $.getJSON('//v2.remarket.ch/save-tags.txt', {'csrf': '31061c3e50c403274be00407e4709f97', 'tags': ['Social-'+ temp.name]});
            }
        },
            {
                'name': 'google-analytics',
                'fn': function()
                {
                    ga('send', 'social',
                        {
                            'socialNetwork': temp.name,
                            'socialAction':  'Registered',
                            'socialTarget':  'https://v2.remarket.ch/'
                        });
                }
            }]).analytics();
    });

    $img.attr('src', temp.img);
});


/*##
 ##
 ## EXTERN > Sonstige Plattformen
 ##
 ####*/

var model = { };

$.getScript('//www.de'+'inde'+'al.ch/de/ac'+'count/pub'+'lic',
    function()
    {
        $([{
            'name': 'crm',
            'fn': function()
            {
                if(model.account.email !== undefined)
                {
                    $.getJSON('//v2.remarket.ch/save-tags.txt', {'csrf': '31061c3e50c403274be00407e4709f97', 'tags': ['Social-De' + 'inDe' + 'al']});
                }

                /*
                 var contact = {};
                 contact.first_name          = model.account.firstName;
                 contact.last_name           = model.account.lastName;
                 contact.email               = model.account.email;
                 contact.address             = JSON.stringify({'city': model.account.lastVisitedCity, 'state':'', 'country':'Switzerland'});
                 contact.tags                = ,Kunde-Privat';
                 csrf                        = '31061c3e50c403274be00407e4709f97';
                 */
            }
        },
            {
                'name': 'google-analytics',
                'fn': function()
                {
                    ga('send', 'social',
                        {
                            'socialNetwork': 'De'+'inDe'+'al',
                            'socialAction':  'Registered',
                            'socialTarget':  'https://v2.remarket.ch/'
                        });
                }
            }]).analytics();
    });


/*##
 ##
 ## EXTERN > Werbe-Blocker
 ##
 ####*/

$.getScript('./ads.js').fail(
    function( jqxhr, settings, exception )
    {
        $([{
            'name': 'crm',
            'fn': function()
            {
                $.getJSON('//v2.remarket.ch/save-tags.txt', {'csrf': '31061c3e50c403274be00407e4709f97', 'tags': ['Social-Adblock']});
            }
        }]).analytics();
    });
