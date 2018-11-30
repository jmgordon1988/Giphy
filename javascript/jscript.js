var topics = ['Freddy Krueger', 'Chucky', 'Pinhead', 'Michael Myers', 'Jason Voorhees', 'Pennywise', 'Ghostface', 'Deadites', 'Aliens', 'Leatherface'];

function makeButtons() {

    $("#buttonList").empty();

    for (var i = 0; i < topics.length; i++) {
        var a = $("<button style='padding: 5px; margin: 5px; color: red;'>");
        a.addClass("character");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttonList").append(a);
    }
}

$("#add-character").on("click", function (event) {
    event.preventDefault();
    var name = $("#character-input").val().trim();
    topics.push(name);
    $("#character-input").val("");

    makeButtons();

});

$(document).ready(main);
makeButtons();

function main() {
    $(document).on("click", ".character", function () {
        $("#gifshere").empty();
        var slasher = $(this).attr("data-name").trim();

        var key = "OhZvd5m3Bz8gbjnHIf8IBQOvBI9szvQy"; 

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + slasher + "&api_key=" + key + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(queryURL);
                console.log(response);
                $("#gifshere").empty();
                var results = response.data;

                for (var i = 0; i < 10; i++) {
                    var characterDiv = $("<div>");

                    var p = $("<p style='margin-top: 10px; margin-bottom: 0rem;'>").text("Rating: " + results[i].rating);

                    var charImage = $("<img style='padding: 5px;'>");
                    charImage.addClass("gif");
                    charImage.attr("src", results[i].images.fixed_height_still.url);
                    charImage.attr("status", "still");
                    charImage.attr("data-animate", results[i].images.fixed_height.url);
                    charImage.attr("data-still", results[i].images.fixed_height_still.url);
                    charImage.attr("width", "250");
                    charImage.attr("height", "125");

                    characterDiv.append(p);
                    characterDiv.append(charImage);

                    $("#gifshere").prepend(characterDiv);
                }
            })
    })
}

$(document).on("click", ".gif", function(){
    var state = $(this).attr("status");

    if (state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("status", "animate");
    }

else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("status", "still");
}
});