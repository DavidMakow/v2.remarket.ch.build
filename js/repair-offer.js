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
  ## DEBUG: Bei Doppelklick wird die X-Y Koordinate auf der Gerät-Vorschau ausgegeben
  ##
  ####*/

/*
  $('#model-options-left').on('dblclick',
  function(e)
  {
    $pos = $(this).position();

    alert('x: '+ (e.pageX - $pos.left) +' / y: '+ (e.pageY - $pos.top - 78));
  });
*/

  /*##
  ##
  ## Verhalten für links Seite / Gerät-Vorschau
  ##
  ####*/

  $('#model-options-left-toggle').on('click',
  function(e)
  {
    $('#model-options-left').toggleClass('flipped');

    e.preventDefault();
  });


  var $repair_sum_price = parseFloat(0);
  var $repair_sum_time  = parseFloat(0);
  var $row_dot = $('#row-dot').html();

  $checkboxes = $('#model-options-right').find('input:checkbox');
  
  $checkboxes.each(
  function()
  {
    if(typeof($(this).data('model-side')) !== 'undefined' &&
       ($(this).data('model-side') === 'front' || 
        $(this).data('model-side') === 'back') &&
       (typeof($(this).data('model-x')) !== 'undefined' &&
        typeof($(this).data('model-y')) !== 'undefined'))
    {
      $('#model-options-left-'+ $(this).data('model-side')).append($row_dot.replace(/\[id\]/g, $(this).attr('id'))
                                                                         .replace(/\[x\]/g, $(this).data('model-x'))
                                                                         .replace(/\[y\]/g, $(this).data('model-y')));
    }

    if(this.checked === true)
    {
      $repair_dot_now = $('#model-options-left').find('label[for="'+ $(this).attr('id') +'"]');
      $repair_box_nox = $('#model-options-right').find('label[for="'+ $(this).attr('id') +'"]');
    
      $repair_dot_now.addClass('repair-dot-active');
      $repair_box_nox.addClass('active');
    }
  });

  /* INIT */
  repair_get_sum();

  $checkboxes.on('change',
  function(e)
  {
    $repair_dot_now = $('#model-options-left').find('label[for="'+ $(this).attr('id') +'"]');
    $repair_box_nox = $('#model-options-right').find('label[for="'+ $(this).attr('id') +'"]');

// TODO if($(this).data('repair-include-id') !== '') console.log($(this).data('repair-include-id'));

    if(this.checked === true)
    {
      if(typeof($(this).data('model-side')) !== 'undefined' &&
       ($(this).data('model-side') === 'front' || 
        $(this).data('model-side') === 'back'))
      {
        if($(this).data('model-side') === 'back') $('#model-options-left').addClass('flipped');
        else                                      $('#model-options-left').removeClass('flipped');
      }

      $repair_dot_now.addClass('repair-dot-active');
      $repair_dot_now.addClass('repair-dot-animation');
      $repair_box_nox.addClass('active');
    }
    else
    {
      $repair_dot_now.removeClass('repair-dot-active');
      $repair_dot_now.removeClass('repair-dot-animation');
      $repair_box_nox.removeClass('active');
    }

    repair_get_sum();
  });


  function repair_get_sum()
  {
    repair_price       = {'max': 0, 'shortcode': ''};
    repair_time        = {'max': 0, 'shortcode': ''};
    repair_include_id  = [];

    /* Schritt 1: Erkenne den jeweils höchsten Preis */
    $checkboxes.filter(':checked').each(
    function()
    {
      /* Cache jQuery Ergebnisse */
      temp_shortcode  = $(this).val().toString();
      temp_price_max  = parseFloat($(this).data('repair-price-max'));
      temp_time_max   = parseFloat($(this).data('repair-time-max'));
      temp_include_id = $(this).data('repair-include-id');


      /* Ermittle den jeweils höchsten Preis aus allen angehakten Reparaturen */
      if(temp_price_max > repair_price.max)
      {
        repair_price.max       = temp_price_max;
        repair_price.shortcode = temp_shortcode;
      }


      /* Ermittle die jeweils höchsten Zeit aus allen angehakten Reparaturen */
      if(temp_time_max > repair_time.max)
      {
        repair_time.max       = temp_time_max;
        repair_time.shortcode = temp_shortcode;
      }


      /* Ermittle die jeweils höchste Preis / Zeit in einer Gruppe */
      if(temp_include_id !== '')
      {
        if(repair_include_id[temp_include_id] === undefined)
        {
          /* Wenn noch kein Eintrag in dieser `include-id` vorhanden */
          repair_include_id[temp_include_id]            = {'max': 0, 'shortcode': ''};
          repair_include_id[temp_include_id].price_max  = temp_price_max;
          repair_include_id[temp_include_id].shortcode  = temp_shortcode;
        }
        else if(temp_price_max > repair_include_id[temp_include_id].price_max)
        {
          /* Wenn noch der aktuelle Eintrag der `include-id` niedriger ist */
          repair_include_id[temp_include_id].price_max  = temp_price_max;
          repair_include_id[temp_include_id].shortcode  = temp_shortcode;
        }
      }
    });


    /* Schritt 2: Setze den/die korrekten Preis/Zeit (mit allen Regeln) für jedes einzelne Feld */
    $checkboxes.each(
    function()
    {
      /* Cache jQuery Ergebnisse */
      temp_shortcode  = $(this).val().toString();
      temp_price_min  = parseFloat($(this).data('repair-price-min'));
      temp_price_max  = parseFloat($(this).data('repair-price-max'));
      temp_time_min   = parseFloat($(this).data('repair-time-min'));
      temp_time_max   = parseFloat($(this).data('repair-time-max'));
      temp_include_id = $(this).data('repair-include-id').toString();


      /* Bearbeite Preise */
      if(temp_price_max <= repair_price.max && temp_shortcode !== repair_price.shortcode)
      {
        $(this).data('repair-price-now', parseFloat($(this).data('repair-price-min')).toFixed(2));
      }
      else
      {
        $(this).data('repair-price-now', parseFloat($(this).data('repair-price-max')).toFixed(2));
      }


      /* Bearbeite Zeit */
      if(temp_time_max <= repair_time.max && temp_shortcode !== repair_time.shortcode)
      {
        $(this).data('repair-time-now', parseFloat($(this).data('repair-time-min')).toFixed(2));
      }
      else
      {
        $(this).data('repair-time-now', parseFloat($(this).data('repair-time-max')).toFixed(2));
      }


      if(temp_include_id !== '' && repair_include_id[temp_include_id] !== undefined )
      {
        if(repair_include_id[temp_include_id].price_max >= temp_price_max && 
           repair_include_id[temp_include_id].shortcode !== temp_shortcode)
        {
          $(this).data('repair-price-now', 0);
          $(this).data('repair-time-now', 0);
        }
        else if(temp_price_max - repair_include_id[temp_include_id].price_max)
        {
          $(this).data('repair-price-now', (temp_price_max - repair_include_id[temp_include_id].price_max));
        }
      }
    });


    temp_price = 0;
    temp_time = 0;
    temp_repairstring = '';
    temp_notice = [];

    /* Schritt 3: Graphische Ausgabe zu den Feldern und ins Total-Feld */
    $checkboxes.each(
    function()
    {
      temp_customer_notice = $(this).data('repair-customer-notice');

      if(this.checked)
      {
        temp_price += parseFloat($(this).data('repair-price-now'));
        temp_time  += parseInt(  $(this).data('repair-time-now'));
        temp_repairstring += $(this).parent().parent().find('.description').text() +' & ';

        if(temp_customer_notice !== '')
        {
          temp_notice.push(temp_customer_notice);
        }
      }

      $(this).parent().siblings('span[class="price"]').text(parseFloat($(this).data('repair-price-now')).toFixed(2) +' CHF');
    });


    if($checkboxes.filter(':checked').length >= 1)
    {
      temp_price_replacement = Math.round(parseFloat($('#repair-replacement').data('price')) * 1e2) / 1e2;
      temp_price_buyinshop = Math.round(parseFloat($('#repair-buyinshop').data('price')) * 1e2) / 1e2;
      temp_price = Math.round(parseFloat(temp_price) * 1e2) / 1e2;
      temp_time = Math.round(parseInt(temp_time) / 3600 * 1e1) / 1e1;


      /* Es gibt Hinweise für deb Benutzer bei der regulären Reparatur */
      if(temp_notice.length >= 1)
      {
        $('#repair-regular-notice-detail').html(temp_notice);
        $('#repair-regular-notice').slideDown('slow');
      }
      else
      {
        $('#repair-regular-notice').slideUp('slow');
        $('#repair-regular-notice-detail').html('');
      }


      /* Komplettaustausch möglich bei dieser Reparatur */
      if(temp_price_replacement >= 0.01 && parseInt(temp_price) >= parseInt(temp_price_replacement))
      {
        $('#repair-replacement').slideDown('slow');
      }
      else
      {
        $('#repair-replacement').slideUp('slow');
      }


      /* Komplettaustausch möglich bei dieser Reparatur */
      if(temp_price_buyinshop >= 0.01 && parseInt(temp_price) >= parseInt(temp_price_buyinshop))
      {
        $('#repair-buyinshop').slideDown('slow');
      }
      else
      {
        $('#repair-buyinshop').slideUp('slow');
      }


      $('.repair-sum-price').html(temp_price);
      $('.repair-sum-time').html(temp_time);


      $('#tab-visit-repairtime').val(temp_time);
      $('#tab-visit-repairstring').val(temp_repairstring.replace(/[ \&]*$/, ''));

      $('#tab-ship-by-bicycle-repairtime').val(temp_time);
      $('#tab-ship-by-bicycle-repairstring').val(temp_repairstring.replace(/[ \&]*$/, ''));


      $('#repair-info').slideUp('slow');
      $('#repair-solutions').slideDown('slow');
      $('#box-repair-fulfillment').slideDown('options');
    }
    else
    {
      $('#repair-solutions').slideUp('slow');
      $('#box-repair-fulfillment').slideUp('options');
      $('#repair-info').slideDown('slow');
    }
  }



  $('#repair-solutions a').on('click',
  function(e)
  {
    if($(this).attr('href').indexOf('#') !== -1)
    {
      e.preventDefault();

      $($(this).attr('href')).scrollToWithHeader();
    }
  });



  var load_tab_loaded = false;
  
  function load_tab(cb)
  {
    load_tab_loaded = true;

    $('#spinner-box').fadeIn('slow');

    /* Datepicker für Terminvereinbarung vor Ort */
    $.getScript('//[domain]/jquery-datetimepicker.js',
    function()
    {
      $.datetimepicker.setLocale('de');

      recaptcha_load =
      function()
      {
        recaptcha = Array();
        
        $('.recaptcha').each(
        function(i, el)
        {
          var param =
          {
            'sitekey' : '6Lc--R8TAAAAAOEyJ3gsNcXiRADRNHKre9_xUtaK',
            'size'    : 'normal',
            'type'    : 'image',
            'theme'   : 'light',
          };

          recaptcha[$(el).attr('id')] = grecaptcha.render($(el).attr('id'), param);
        });
      }

      /* Googel Captcha für Bots*/
      $.getScript('//www.google.com/recaptcha/api.js?onload=recaptcha_load&render=explicit&',
      function()
      {
        $('#spinner-box').fadeOut('slow');

        cb();
      });
    });
  }



  var load_tab_visit_loaded = false;
  
  function load_tab_visit()
  {
    load_tab_visit_loaded = true;
    
    var datetime_times_allowed = [ '10:00', '10:30', '11:00', '11:30', '13:00', '13:30',
                                  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30' ]
    
    $('#tab-visit-datetime').datetimepicker({
      'inline': true,
      'lang': 'de',
      'format': 'd.m.Y H:i',
      'allowTimes': datetime_times_allowed,
       minDate:'-1970/01/01',
       maxDate:'+1970/01/14',
       onChangeDateTime: function(a, b)
                     {
                       if($.inArray($(b).val().substr(-5), datetime_times_allowed) === -1)
                       {
                         $(this).find('.xdsoft_time_box').css('animation', 'pulse 2s 0s ease-out');
                       }
                       else
                       {
                         $(this).find('.xdsoft_time_box').css('animation', '');
                       }
                     },
        onGenerate:function(a)
        {
          $(this).find('.xdsoft_date.xdsoft_day_of_week0').addClass('xdsoft_disabled');
        }
    });
  }


  var load_tab_ship_by_bicycle_loaded = false;
  
  function load_tab_ship_by_bicycle()
  {
    load_tab_ship_by_bicycle_loaded = true;

    var datetime_times_allowed = [ '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00',
                                   '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30' ]

    $('#tab-ship-by-bicycle-datetime').datetimepicker({
      'inline': true,
      'lang': 'de',
      'format': 'd.m.Y H:i',
      'allowTimes': datetime_times_allowed,
       startDate:'+1970/01/02',
       maxDate:'+1970/01/14',
       onChangeDateTime: function(a, b)
                     {
                       if($.inArray($(b).val().substr(-5), datetime_times_allowed) === -1)
                       {
                         $(this).find('.xdsoft_time_box').css('animation', 'pulse 2s 0s ease-out');
                       }
                       else
                       {
                         $(this).find('.xdsoft_time_box').css('animation', '');
                       }
                     },
        onGenerate:function(a)
        {
          $(this).find('.xdsoft_date.xdsoft_day_of_week0').addClass('xdsoft_disabled');
        }
    });
  }



  $('.box-repair-fulfillment-options').on('click',
  function(e)
  {
    e.preventDefault();

    var $this = $(this);


    if($this.attr('href') === '#tab-visit')
    {
      if(load_tab_loaded === false)
      {
        load_tab(load_tab_visit);
      }
      else
      {
        load_tab_visit();
      }
    }
    else if($this.attr('href') === '#tab-ship-by-bicycle')
    {
      if(load_tab_loaded === false)
      {
        load_tab(load_tab_ship_by_bicycle);
      }
      else
      {
        load_tab_ship_by_bicycle();
      }
    }


    $('.box-repair-fulfillment-options').removeClass('active');
    $this.addClass('active');

    $('.tab').not($this.attr('href')).fadeOut();

    $($this.attr('href')).fadeIn('slow', 
    function()
    {
      if($this.attr('href').indexOf('#') !== -1)
      {
        $($this.attr('href')).scrollToWithHeader();
      }
    });
  });



  $('#tab-visit-form').on('submit',
  function ()
  {
    $.post($(this).attr('action'), 
           $(this).serialize(),
           function(data)
           {
             $('#tab-visit-form').trigger('submitted');
            
             if(parseInt(data.status) === 1)
             {
               $([{
                    'name': 'google-analytics',
                    'fn': function()
                    {
                      ga('send', 'event', { 'eventCategory': 'Webseite', 'eventAction': 'Basel-Termin' });
                    }
                  },
                  {
                    'name': 'facebook-tracking',
                    'fn': function()
                    {
                      fbq('track', 'Lead');
                    }
                  }]).analytics();

               $('#tab-visit-form').slideUp('slow');
               $('#tab-visit-form-success').slideDown('slow');
             }
             else
             {
               $('#tab-visit-datetime-box').removeClass('error');
               $('#tab-visit-captcha-box').removeClass('error');
               $('#tab-visit-form').find('input').removeClass('error');
               $('#tab-visit-form').find('select').removeClass('error');

               grecaptcha.reset(recaptcha['tab-visit-captcha-box']);

               $.each(data.error,
                      function( key, value )
                      {
                        $('#'+ value).addClass('error');
                      });
             }

           }, 'json');

    return false;
  });


  $('#ship-by-bicycle-zip').on('change keyup', 
  function(e)
  {
    if(typeof(ship_by_bicycle_prices) !== 'undefined' &&
       ($(this).val().length === 4 || $(this).val().length === 5))
    {
      if(ship_by_bicycle_prices[$(this).val()])
      {
        $temp_row = $('#ship-by-bicycle-zip-result-row').html();
        $temp_row = $temp_row.replace('[city]', ship_by_bicycle_prices[$(this).val()]['city']);
        $temp_row = $temp_row.replace('[cost]', ship_by_bicycle_prices[$(this).val()]['cost']);

        $('#ship-by-bicycle-zip-result').html($temp_row).slideDown('slow');
      }
      else
      {
        $('#ship-by-bicycle-zip-result').html($('#ship-by-bicycle-zip-result-error').html()).slideDown('slow');
      }
    }
    else
    {
      $('#ship-by-bicycle-zip-result').slideUp('slow');
    }
  });



  $('#tab-ship-by-bicycle-form').on('submit',
  function ()
  {
    $.post($(this).attr('action'), 
           $(this).serialize(),
           function(data)
           {
             $('#tab-ship-by-bicycle-form').trigger('submitted');
            
             if(parseInt(data.status) === 1)
             {
               $([{
                    'name': 'google-analytics',
                    'fn': function()
                    {
                      ga('send', 'event', { 'eventCategory': 'Webseite', 'eventAction': 'Basel-Velokurier' });
                    }
                  },
                  {
                    'name': 'facebook-tracking',
                    'fn': function()
                    {
                      fbq('track', 'Lead');
                    }
                  }]).analytics();

               var $temp = $('#tab-ship-by-bicycle-form-success').html();
               $temp = $temp.replace('[]');
               
               $temp = $temp.replace(/\[repair-success-date\]/g, $('#tab-ship-by-bicycle-datetime').val());
               $('#tab-ship-by-bicycle-form-success').html($temp);
               
               $('#tab-ship-by-bicycle-form').slideUp('slow');
               $('#tab-ship-by-bicycle-form-success').slideDown('slow');
             }
             else
             {
               $('#tab-ship-by-bicycle-datetime-box').removeClass('error');
               $('#tab-ship-by-bicycle-captcha-box').removeClass('error');
               $('#tab-ship-by-bicycle-form').find('input').removeClass('error');
               $('#tab-ship-by-bicycle-form').find('select').removeClass('error');

               grecaptcha.reset(recaptcha['tab-ship-by-bicycle-captcha-box']);

               $.each(data.error,
                      function( key, value )
                      {
                        $('#'+ value).addClass('error');
                      });
             }

           }, 'json');

    return false;
  });



  if(('ontouchstart' in window) !== true && (window.DocumentTouch && document instanceof DocumentTouch) !== true)
  {
    $('#model-options-left-front,#model-options-left-back').find('.repair-dot').on('mousemove',
    function(e)
    {
      $description = $('#model-options-right').find('label[for="'+ $(this).attr('for') +'"]').find('span.description').first().text();
    
      if($('#tooltip-'+ $(this).attr('for')).length === 0)
      {
        var $div = $('<div>', { id: 'tooltip-'+ $(this).attr('for'), class: 'tooltip'});
        $('body').append($div);
      }
    
      $('#tooltip-'+ $(this).attr('for')).css({'top': e.pageY +'px', 'left': e.pageX +'px'}).text($description);
    }).on('mouseleave touchstart touchend',
    function(e)
    {
      $('#tooltip-'+ $(this).attr('for')).remove();
    });
  }

  

  $(window).bind('mousemove',
  function(e)
  {
    if($(e.target).hasClass('fb_iframe_widget') || $(e.target).hasClass('fb-send-link'))
    {
      $('#fb-recommend').css({ 'top': (e.clientY + $(document).scrollTop() - 2), 'left': (e.clientX + $(document).scrollLeft() - 2) }).show();
    }
    else
    {
      $('#fb-recommend').hide();
    }
  });


  $('.app-open').on('click',
  function()
  {
    var app_scheme = {
                      'mail':     'mailto:?&subject=Empfehlung Reparatur&body=',
                      'sms':      'sms://?&body=',
                      'whatsapp': 'whatsapp://send?text=',
                      'telegram': 'tg://msg?&text=',
                      'threema':  'threema://compose?text='
                     };
  
    var recommend_text = $('#recommend-text').val();  
    recommend_text = encodeURI(recommend_text);

    window.location = app_scheme[$(this).attr('href').substring(1)] + recommend_text;
    window.focus();

    return false;
  });
});