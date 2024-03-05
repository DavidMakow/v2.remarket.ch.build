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

  $('#company-form').on('submit',
  function ()
  {
    $.post($(this).attr('action'), 
           $(this).serialize(),
           function(data)
           {
              $('#company-form').trigger('submitted');
    
              if(parseInt(data.status) === 1)
              {
                $([{
                     'name': 'google-analytics',
                     'fn': function()
                     {
                       ga('send', 'event', { 'eventCategory': 'Webseite', 'eventAction': 'Basel-Anfrage-Firma' });
                     }
                   },
                   {
                     'name': 'facebook-tracking',
                     'fn': function()
                     {
                       fbq('track', 'Lead');
                     }
                   }]).analytics();

                $('#company-form').slideUp('slow');
                $('#company-form-success').slideDown('slow');
              }
              else
              {
                $('#company-form').find('input').removeClass('error');
                $('#company-form').find('select').removeClass('error');
                
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