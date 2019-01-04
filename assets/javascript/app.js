// create an array of celebs
topics = ["Elvis Presley", "Marilyn Monroe", "Sylvester Stallone"];



function createButtons() {

    // Delete the celeb buttons prior to adding new celeb buttons
    // to avoid repetition of buttons
    $("#buttons-view").empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each celeb in the array.
        var a = $("<button>");
        // Adding a class
        a.addClass("celeb");
        // Adding a data-attribute with a value of the celeb at index i
        a.attr("data-name", topics[i]);
        // Providing the button's text with a value of the celeb at index i
        a.text(topics[i]);
        // Adding the button to the HTML
        $("#buttons-view").append(a);
    }

    $("button").on("click", function () {
        var rand = Math.floor(Math.random() * 100) + 1;
        $(".gif-tainer").empty();
        var celeb = $(this).attr("data-name");
        console.log(celeb);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            celeb + "&offset=" + rand + "&limit=10&api_key=p1XhbNzWjNxNR2SeaRfB9v3Ri8evAWdv";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
                for (let j = 0; j < results.length; j++) {
                    var celebDiv = $("<div>");
                    var p = $("<p>").text("Rating: " + results[j].rating);
                    celebImage = $("<img>");
                    celebImage.attr("src", results[j].images.fixed_height_still.url);
                    celebDiv.append(celebImage);
                    celebDiv.append(p);
                    celebDiv.attr("class", "c" + [j]);
                    celebDiv.attr("id", "gifs");
                    $(".gif-tainer").prepend(celebDiv);
                }
            });
    });
}
createButtons();

$("#add-celeb").on("click", function () {
    event.preventDefault();
    var newCeleb = $("#celeb-input").val().trim();
    topics.push(newCeleb);
    createButtons();
    $("#celeb-input").val("");


});
