// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
// Allow users to click the images to see a larger version with more information.
$(document).on('ready', function(){
    // Place your code here, inside the document ready handler.

    // Create a function called `searchImages()`. This function will handle the
    // process of taking a user's search terms and sending them to Flickr for a
    // response
       // Inside the `searchImages()` function, the following things should happen:

        // 1.   Accept a string value called `tags` as an argument.
        var searchPhotos = function(tags){
            // 2.   Define the location of the Flickr API like this:
            var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
            // 3.   Construct a `$.getJSON()` call where you send a request object
            //      including the tags the user submitted, and a `done()` handler
            //      that displays and refreshes the content appropriately.
            $.getJSON( flickerAPI, {
              tags: tags,
              tagmode: "any",
              format: "json"
            })
              .done(function( data ) {
                $('#images').empty();
                $.each( data.items, function( i, item ) { 
                  //  Adds new list item for photo 
                  var newListItem = $('<li>');                                                                      
                  //  List item content 
                  $('<img class="img-thumbnail" class="img-responsive"><br>').attr("src" , item.media.m ).appendTo(newListItem);   //  Adds the image element
                  var newDate = $('<p class="image-date" class="text-muted">').text(item.date_taken).appendTo(newListItem);        //  Adds date of image
                  var newLink = $('<a>').attr('href', item.link).text('View on Flickr.').appendTo(newListItem);                    //  Adds flickr link
                  var newButton = $("<button class='btn btn-sm btn-primary'>More</button>").attr({                                 //  Adds the modal button 
                    //  Adds image information inside of the modal display
                    'data-title': item.title,                                                                                      //  Adds image title
                    'data-toggle': "modal",
                    'data-target': "#infoModal",
                    'data-imgsrc': item.media.m,
                    'data-description': item.description,
                    'type': "button"
                  }).appendTo(newListItem);
                  newListItem.appendTo( "#images" );    // 4.   Update the display to add the images to the list with the id `#images`.
                  if ( i === 20 ) {
                    return false;
                  }
                });
              });
};
        
    // Attach an event to the search button (`button.search`) to execute the
    // search when clicked.
    $ ('button.search').on('click', function(event) {
      // When the Search button is clicked, the following should happen:
        //
        // 1.   Prevent the default event execution so the browser doesn't
        event.preventDefault();
        //
        // 2.   Get the value of the 'input[name="searchText"]' and use that
        //      as the `tags` value you send to `searchImages()`.
        var tags = $ ('input[name="searchText"]').val();
        //
        // 3.   Execute the `searchImages()` function to fetch images for the
        //      user.
        searchPhotos(tags);
    });
  
  // STRETCH GOAL: Add a "more info" popup using the technique shown on the
  // Bootstrap Modal documentation: http://getbootstrap.com/javascript/#modals-related-target

  $('#infoModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var title = button.data('title'); // Extract info from data-* attributes
    var imgSrc = button.data('imgsrc');
    var imageDescription = button.data('description');
    // Update the modal's content. We'll use jQuery here.
    var modal = $(this);
    modal.find('.modal-title').html(title);
    var modalBody = modal.find('.modal-body');
    modalBody.empty();
    var modalDescription = $("<p class='image-description'>").html(imageDescription).appendTo(modalBody);
  });
});