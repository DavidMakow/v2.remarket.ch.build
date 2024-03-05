/*##
##
## jQuery Hauptschleife
##
####*/

onjQueryReady.push(
function()
{
  /*##
  ##
  ## Google Captcha für Bots
  ##
  ####*/

  $.getScript('//www.google.com/recaptcha/api.js',
  function()
  {
  
  });


  /*##
  ##
  ## 
  ##
  ####*/

  $('#aboutus-companyname-helper').on('change',
  function()
  {
    if($(this).prop('checked') === true)
    {
      $('#aboutus-companyname').show();
    }
    else
    {
      $('#aboutus-companyname').hide();
    }
  });
  
  
  
  $('#aboutus-form').on('submit',
  function ()
  {
    $.post($(this).attr('action'), 
           $(this).serialize(),
           function(data)
           {
              $('#aboutus-form').trigger('submitted');
  
              if(parseInt(data.status) === 1)
              {
                $([{
                     'name': 'google-analytics',
                     'fn': function()
                     {
                       ga('send', 'event', { 'eventCategory': 'Webseite', 'eventAction': 'Basel-Anfrage-Allgemein' });
                     }
                   },
                   {
                     'name': 'facebook-tracking',
                     'fn': function()
                     {
                       fbq('track', 'Lead');
                     }
                   }]).analytics();

                $('#aboutus-form').slideUp('slow');
                $('#aboutus-form-success').slideDown('slow');
              }
              else
              {
                if($.inArray('csrf', data.error) !== -1)
                {
                  alert('Es ist ein Fehler auf der Webseite aufgetreten. Wir laden die Seite nun neu, und bitten vielmals um Entschuldigung für die Umstände. ');
                  window.location.reload(true); /* Forciere den Reload vom Server */
                }

                $('#aboutus-form').find('input').removeClass('error');
                $('#aboutus-form').find('select').removeClass('error');
                $('#aboutus-form').find('textarea').removeClass('error');
                $('#aboutus-form').find('div').removeClass('error');
  
                grecaptcha.reset();
  
                $.each(data.error,
                       function( key, value )
                       {
                         $('#'+ value).addClass('error');
                       });
              }

           }, 'json');

    return false;
  });
 
});