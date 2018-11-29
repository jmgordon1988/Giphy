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

$(document).on("click", ".character", main);
makeButtons();

function main() {
    $("button").on("click", function () {
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
                    charImage.attr("src", results[i].images.fixed_height.url);
                    charImage.attr("width", "250");
                    charImage.attr("height", "125");

                    characterDiv.append(p);
                    characterDiv.append(charImage);

                    $("#gifshere").prepend(characterDiv);
                }
            })
    })
}