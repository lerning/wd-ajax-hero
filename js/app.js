(function() {
  'use strict';

  let movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE
  $('button').click(function(e){
     e.preventDefault();
     movies = []
     let userSearch = $('input').val()
     if (userSearch !== ''){
        $.ajax({
          //method for the HTTP request e.g. GET, POST, ..
          method: 'GET',
          //url is the place where the data lives
          url: `http://omdbapi.com/?s=${userSearch}`,
          //the format of data you want to get back
          dataType: 'json',
          //stuff that happens if I get the data I want back
          success: function(data){
             let ds = data.Search
             console.log(ds);
             for (let m of ds){
                let id = m.imdbID
                let poster = m.Poster
                let title = m.Title
                let year = m.Year
                let movie = { id, poster, title, year }
                movies.push(movie)
             } renderMovies()
          },
          //what to do if I don't get what I want
          error: function(){
             console.log('ruh roh');
          }
         })
   }
 })

})();
