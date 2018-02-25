(function($) {

  var Mirum = {
    // All pages
    'common': {
      init: function() {

          var global_obj;

          $(document).ready(function () {

              getJson();
              getMovies();

          });
          {
              var getMovies = function(){

                  $('.submit-search').on('click', function() {
                      var searchVal = $('#movie-title').val();
                      $('.loader').show();
                      console.log(searchVal);
                      $.ajax({
                          url: 'https://itunes.apple.com/search?term='+searchVal+'&entity=movie&limit=3',
                          type: "POST",
                          dataType: "json"
                      }).done(function (data) {
                          showMovies(data.results);
                          $('.loader').hide();
                      }).fail(function (event) {
                          //console.log(event);
                      });
                  });

                  $('.submit-search').trigger('click');

              }
          }
          {
              var showMovies = function(obj){

                  // Variables
                  var html = '';

                  console.log(obj);

                  if(obj.length > 0){
                      // Check Articles
                      $(obj).each(function(index, element){
                          if(element.trackName !== undefined){
                            html += '<div class="movie-item col-6">';
                                html += '<div class="image" style="background-image: url('+element.artworkUrl100+')"></div>';
                                html += '<h3>'+element.trackName+'</h3>';
                                html += '<a href="'+element.trackViewUrl+'" target="_blank">View Now</a>';
                            html += '</div>';
                          }
                      });
                  } else {
                      // Not Found
                      html += '<span class="alert">Movies not found!</span>';
                  }

                  // Output Articles
                  $('.load-movies').html(html);

              }
          }
          {
              var enableSort = function(obj,type){

                  obj.sort( function(a, b){
                      switch(type){
                          case 'id':
                              return sortData(a.id, b.id);
                              break;
                          case 'title':
                              return sortData(a.title, b.title);
                              break;
                      }
                  });

                  newsData(obj);

              }
          }
          {
              var sortData = function(a, b){

                  return (a < b) ? -1 : (a > b) ? 1 : 0;

              }
          }
          {
              var getJson = function(){

                  var json = $.getJSON( "assets/json/news.json", function(data) {

                      global_obj = data;

                      newsData(global_obj.articles);

                      $('#sort-articles').off().on('change', function(){
                          var type = $(this).children('option:selected').val();
                          enableSort(global_obj.articles, type);
                      });


                  });

              }
          }
          {
              var newsData = function(obj){

                  // Variables
                  var html = '';
                  var counter = 1; // This is to clear the last item in the list

                  // Check Articles
                  $(obj).each(function(index, element){
                      var clear = '';
                      if(counter === 3){
                        clear = 'clear-item';
                        counter = 0;
                      }
                      html += '<div class="news-item '+ clear +'">';
                        html += '<div class="image" style="background-image: url('+element.img+')">';
                          html += '<h2>'+element.title+'</h2>';
                          html += '<span>'+element.id+'</span>';
                        html += '</div>';
                        html += '<p>';
                          html += element.content;
                        html += '</p>';
                      html += '</div>';
                      counter ++;
                  });

                  // Output Articles
                  $('#load-articles').html(html);

              }
          }
      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    // About us page, note the change from about-us to about_us.
    'about_us': {
      init: function() {
        // JavaScript to be fired on the about us page
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Mirum;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
