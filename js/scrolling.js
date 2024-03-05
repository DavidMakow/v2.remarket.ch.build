/*##
##
## jQuery
##
####*/

onjQueryReady.push(
function()
{

  /*##
  ##
  ## Variablen im globalen Kontext / Start-Bedingungen
  ##
  ####*/

  $root = 'kaufen';

  $slideframe_now = window.location.pathname.substr(1, (window.location.pathname.length)).replace(/\//g, '_');

  if($slideframe_now === '') $slideframe_now = $root;

  /* Erkenne Hauptkategorien */
  $slideframe_categories = [];
  //update_slideframe_categories();

  var t0 = performance.now();
  /* TEST STARTS HERE */

  /* Markiere richtigen Punkt im Hauptmenü */
  header_menu_activate($slideframe_now);


  /* TESTAREA ENDS */
  //var t1 = performance.now();
  //// console.log('code took ', (t1 - t0).toFixed(4), ' ms');


  /* Bestimme die korrekte Breite des Inhalts */
  set_content_frame_width();


  /*##
  ##
  ## Erkenne AJAX Laden und Fortschrittsanzeige
  ##
  ####*/

  $('header').before('<div id="nav-loading" />');

  $.ajaxSetup(
  {
    'timeout': 10000,
    'cache': false,
    'beforeSend':
    function(xhr, xhrsettings)
    {
      $('#nav-loading').removeClass('success error animate');
    },

    'statusCode':
    {
      200:
      function()
      {
        $('#nav-loading').addClass('success animate');
      },

      404:
      function()
      {
        $('#nav-loading').addClass('error animate');
      }
    }
  });


  /*##
  ##
  ## Behandle das Klicken von Links im Anzeigefenster
  ##
  ####*/

  /* Erkenne einen Klick des Benutzers auf Links */
  $('body').on('click touchstart', 'a',
  function(e)
  {
    return true; // DEBUG

    if(this.href.match(/^mailto\:/) ||
       this.href.match(/^tel\:/) ||
       this.target === '_blank' || this.hostname != location.hostname ||
       this.href.indexOf('?') !== -1 ||
       this.href.indexOf('#') !== -1
      )
    {
      /* Der Link ist ein Mail- / Telefon- / externer Link oder Einstellungs-Link / oder Ankerlink */
      return true;
    }
    else
    {
      var $this = $(this);
      var $model_chooser = $this.parents('.model');

      scroll_to_path(this.pathname.substr(1),
      function()
      {
        if($model_chooser.length === 1)
        {
          $model_chooser.find('a').removeClass('active');
          $this.addClass('active');
        }
      });

      e.preventDefault();
      return false;
    }
  });


  /*##
  ##
  ## Behandle VOR / ZURÜCK im Anzeigefenster
  ##
  ####*/

  History.Adapter.bind(window,'statechange',
  function()
  {
    var temp_state = History.getState();
    temp_state = temp_state.hash.replace(/\/+$/, '').replace(/^\/+/, '').replace(/\//g, '_');

    if(temp_state !== $slideframe_now)
    {
      scroll_to_path(temp_state);
    }
  });

  function addressbar_activate($slideframe_target)
  {
    if($slideframe_target !== $root)
    {
      History.pushState(null, null, '/'+ $slideframe_target +'/');
    }
    else
    {
      History.pushState(null, null, '/');
    }
  }

  /*##
  ##
  ## Markiere jeweils gültiges Hauptmenü
  ##
  ####*/

  function header_menu_activate($slideframe_target)
  {
    /* Erkenne ausgewählten Dateipfad und zerlege in Einzelteile */
    var temp_parts = $slideframe_target.split('_');

    $slideframe_target = temp_parts[0];

    /* Markiere das Hauptmenü, passend zum ausgewählten Dateipfad */
    $('#header-menu').find('li').removeClass('active').find('a').each(
    function()
    {
      /* Hole aus gesamter URL im Link lediglich den Pfad, ohne abschliessendes "/" */
      var temp_path = $(this).attr('href').replace('/','').replace(/\/+$/, '');

      if(temp_path === '') temp_path = $root;

      if(temp_path === $slideframe_target)
      {
        $(this).parent('li').addClass('active');
      }
    });
  }

  /*##
  ##
  ## Fülle die Menü Struktur
  ##
  ####*/

  function update_slideframe_categories()
  {
    var temp_base;

    if($slideframe_categories.length > 0)
    {
      var temp_base;

      $.each($slideframe_now.split('_'),
      function(i, $slideframe_url)
      {
        if(i === 0)
        {
          $.each($slideframe_categories,
          function(j, temp)
          {
            if($slideframe_url === temp[0])
            {
              temp_base = $slideframe_categories[j][1];
            }
          });
        }

        // console.log(temp_base);
        // console.log(i + $slideframe_url);
        if(typeof(temp_base[i]) === 'undefined')
        {
          if($('#content-frame-column_'+ $slideframe_now.split('_').slice(0,(i+1)).join('_')).length >= 1)
          {
            temp_base.push($slideframe_url);
          }
          else
          {
            temp_base.push(false);
          }
        }
        else if(temp_base[i] === false)
        {
          if($('#content-frame-column_'+ $slideframe_now.split('_').slice(0,(i+1)).join('_')).length >= 1)
          {
            temp_base[i] = $slideframe_url;
          }
        }

      });
    }
    else
    {
      $('#header-menu').find('a').each(
      function()
      {
        var temp = $(this).attr('href').replace('//[domain]/','').replace(/\/+$/, '');
        temp = (temp !== '') ? temp : $root;

        $slideframe_categories.push(new Array(temp, new Array()));
      });

      update_slideframe_categories();
    }
  }

  /*##
  ##
  ## Bestimme die korrekte Breite des Inhalts
  ##
  ####*/

  function set_content_frame_width()
  {
    $('#content-frame').width($('main').width() * $('.content-frame-column').length);
    $('.content-frame-column').width($('main').width());
  }

  $(window).resize(
  function()
  {
    set_content_frame_width();

    $('#content-frame-outer').scrollLeft($('main').width() * $('.content-frame-column[data-url="'+ $slideframe_now +'"]').index());
  });


  /*##
  ##
  ## Lade Inhalte im Anzeigefenster
  ##
  ####*/

  function scroll_to_path($slideframe_target, cb)
  {
    if($slideframe_target === '') $slideframe_target = $root;
    else $slideframe_target = $slideframe_target.replace(/\/+$/, '');

    $slideframe_target = $slideframe_target.replace(/\//g, '_');

    if($('#content-frame-column_'+ $slideframe_target).length >= 1)
    {
      /* Markiere richtigen Punkt im Hauptmenü */
      header_menu_activate($slideframe_target);

      /* Bestimme die korrekte Breite des Inhalts */
       set_content_frame_width();

       /* Scrolle an die obere Kante der Webseite */
       $(window).scrollTop(0);

      $('#content-frame-outer').animate(
      {
        'scrollLeft':  ($('main').width() * $('.content-frame-column[data-url="'+ $slideframe_target +'"]').index()) +'px',
        'height':       $('.content-frame-column[data-url="'+ $slideframe_target +'"]').height() +'px'
      },
      {
        'duration': 800,
        'queue': false, /* false = Animation kann unterbrochen werden, bei schnellen Klicks */
        'complete':
        function()
        {
          $slideframe_now = $slideframe_target;

          addressbar_activate($slideframe_now.replace(/_/g, '/'));

          if(typeof(cb) === 'function') cb();
        }
      });
    }
    else
    {
      /* Menüpunkt existiert noch nicht und muss nachgeladen wernde */
      var temp_base;
      var temp_frame = '<div class="content-frame-column" id="content-frame-column_'+ $slideframe_target +'" data-url="'+ $slideframe_target +'" />';
      var $slideframe_now_split = $slideframe_now.split('_');
      var $slideframe_target_split = $slideframe_target.split('_');


  // console.log($slideframe_now);
  // console.log($slideframe_target);
  // console.log($slideframe_now_split);
  // console.log($slideframe_target_split);

      if($slideframe_target_split[0] === $slideframe_now_split[0])
      {
        /* Scroll innerhalb der selben Hauptmenü-Ebene */
  // console.log('Scroll innerhalb der selben Menüebene');

        $.each($slideframe_categories,
        function(i, temp)
        {
          if($slideframe_target_split[0] === temp[0])
          {
            temp_base = $slideframe_categories[i][1];
          }
        });


  // console.log('aha')
  // console.log(temp_base);

        // console.log($slideframe_now_split.length +"<"+ $slideframe_target_split.length);
        if($slideframe_now_split.length < $slideframe_target_split.length)
        {
          /* Scrolle nach rechts */
  // console.log('Scrolle nach rechts');
          $('#content-frame').append(temp_frame);
        }
        else
        {
          /* Scrolle nach links */
  // console.log('Scrolle nach links');


          $('#content-frame').prepend(temp_frame);

        }
      }
      else
      {
        /* Scroll zu anderer Hauptmenü-Ebene */
  // console.log('Scroll zu anderer Hauptmenü-Ebene');

  // muss rechts / links die hauptkategorien finden, dann innerhalb der Unterkategorie nach obiger Logik */
      }

      $.get('//[domain]/'+ $slideframe_target +'.html',
      function(response, status, xhr)
      {
        /* Inhalt für diesen Frame erfolgreich geladen */
        $('#content-frame-column_'+ $slideframe_target).html(response);

        $slideframe_now = $slideframe_target;

        update_slideframe_categories();

        /* Manuelles Auslösen des <body onload=""> bzw. jQuery "document ready"-Events, sodass in den dynamischen Inhalten auch Skripte geladen werden */
        $(window).trigger('load');
        $(document).trigger('ready');

        /* Scrolle nun manuell zum Ziel */
        scroll_to_path($slideframe_target, cb);
      }).fail(
      function()
      {
        /* Fehler beim Laden des Inhalts für diesen Frame - Vernichte das DOM-Element für das äussere <div> */
        $('#content-frame-column_'+ $slideframe_target).remove();
  //alert('>> meldung an analytics: fehler bei pfad '+ $slideframe_target);
      });
    }
  }

});
