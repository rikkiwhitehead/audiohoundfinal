// find template and compile it
var templateSource = document.getElementById('results-template').innerHTML,
    template = Handlebars.compile(templateSource),
    resultsPlaceholder = document.getElementById('results'),
    playingCssClass = 'playing',
    audioObject = null;



function showSearches(){
     if(localStorage){
        if(localStorage.getItem("PrevSearches")){      
            var array = localStorage.getItem("PrevSearches").split(",");
            var stringOutput = ""
            for(var i = 0;i<array.length;i++){
                stringOutput += array[i] + ",";

            }
            stringOutput = stringOutput.substr(0,stringOutput.length-1);
            console.log(stringOutput)
            document.getElementsByClassName("savedsearch")[0].innerHTML = "<p>Recent searches:</p><span>" + stringOutput + "</span>";
        }
    }
}

function saveSearch(_query){
    if(localStorage){
        if(localStorage.getItem("PrevSearches")){      
            var array = localStorage.getItem("PrevSearches").split(",");
            array.unshift(_query);
            array = array = array.slice(0,10);

            localStorage.setItem("PrevSearches", array);  
        }else{
            var terms = new Array(_query);
            localStorage.setItem("PrevSearches", terms+",");  
        }                
    }
}

var fetchTracks = function (albumId, callback) {
    $.ajax({
        url: 'https://api.spotify.com/v1/albums/' + albumId,
        success: function (response) {
            callback(response);
        }
    });
};





var searchAlbums = function (query) {
    saveSearch(query);
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: query,
            type: 'album'
        },
        success: function (response) {
            resultsPlaceholder.innerHTML = template(response);
        }
    });
};

results.addEventListener('click', function (e) {
    var target = e.target;
    if (target !== null && target.classList.contains('cover')) {
        if (target.classList.contains(playingCssClass)) {
            audioObject.pause();
        } else {
            if (audioObject) {
                audioObject.pause();
            }
            fetchTracks(target.getAttribute('data-album-id'), function (data) {
                audioObject = new Audio(data.tracks.items[0].preview_url);
                audioObject.play();
                target.classList.add(playingCssClass);
                audioObject.addEventListener('ended', function () {
                    target.classList.remove(playingCssClass);
                });
                audioObject.addEventListener('pause', function () {
                    target.classList.remove(playingCssClass);
                });
            });
        }
    }
});

document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    searchAlbums(document.getElementById('query').value);
}, false);