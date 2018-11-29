var topics = ['Freddy Krueger', 'Chucky', 'Pinhead', 'Michael Myers', 'Jason Voorhees', 'Pennywise', 'Ghostface', 'Deadites', 'Aliens', 'Leatherface'];

function makeButtons() {

    $("#buttonList").empty();

    for (var i = 0; i < topics.length; i++){
        var a = $("<button style='padding: 5px; margin: 5px;'>");
        a.addClass("character");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttonList").append(a);
    }
}

$("#add-character").on("click", function(event){
    event.preventDefault();

    var character = $("#character-input").val().trim();

    topics.push(character);

    makeButtons();

});

makeButtons();

$("button").on("click", function(){
    $("#gifshere").empty();
    var slasher = $(this).attr("data-name");

    var key = "OhZvd5m3Bz8gbjnHIf8IBQOvBI9szvQy";

    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+slasher+"&api_key="+key+"&limit=10";

$.ajax({
    url: queryURL,
    method: "GET"
})
    .then(function(response){
        console.log(queryURL);
        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var characterDiv = $("<div>");

            var p = $("<p>").text("Rating: "+results[i].rating);

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