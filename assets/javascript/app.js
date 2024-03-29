$(document).ready(function() {
    var movies = ["Clueless", "Mean Girls", "Silver Linings Playbook", "Cinderella", "Aladdin"];

    // Add buttons for original movies array
    function renderButtons() {
        $("#movie-buttons").empty();
        for (i = 0; i < movies.length; i++) {
            $("#movie-buttons").append("<button class='btn btn-success' data-movie='" + movies[i] + "'>" + movies[i] + "</button>");
        }

        // Getting gifs from api... onto html
        $("button").on("click", function() {
            console.log('hit')
            var movie = $(this).attr("data-movie");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                movie + "&api_key=V3EKwI54Gd0s6V1Y6IVBsAUGf9APX5Q3&limit=10"

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                var results = response.data;
                $("#movies").empty();
                for (var i = 0; i < results.length; i++) {
                    var movieDiv = $("<div>");
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var movieImg = $("<img>");

                    movieImg.attr("src", results[i].images.fixed_height_still.url);
                    movieImg.attr("data-still", results[i].images.fixed_height_still.url);
                    movieImg.attr("data-animate", results[i].images.fixed_height.url);
                    movieImg.attr("data-state", "still");
                    movieImg.attr("class", "gif");
                    movieDiv.append(p);
                    movieDiv.append(movieImg);
                    $("#movies").append(movieDiv);
                }
            });
        });
    }

    renderButtons();

    // Adding a button for movie entered
    $("#add-movie").on("click", function() {
        event.preventDefault();
        var movie = $("#movie-input").val().trim();
        movies.push(movie);
        renderButtons();
    });


    function changeState() {
        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        } else if (state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    }

    // $("img").on("click", function() {
    // 	console.log("click worked!");
    // 	var src = movieImg.attr(src);
    // 	src = src.substring(0, src.length - 10);
    // 	src += ".url";
    // 	console.log(src);
    // 	movieImg.attr("src", src);
    // });

    // $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", changeState);

});