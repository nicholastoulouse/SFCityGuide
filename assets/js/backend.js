var mapboxAPI, mapboxURL, youtubeAPI, youtubeURL;

// store current username to variable user in order to search from firebase
var guide;
var neighborhoods_SF = ["Alamo Square", "Anza Vista", "Ashbury Heights", "Balboa Park", "Balboa Terrace", "Bayview", "Belden Place", "Alamo Square", "Anza Vista", "Ashbury Heights", "Balboa Park", "Balboa Terrace", "Bayview", "Belden Place", "Bernal Heights", "Buena Vista", "Butchertown (Old and New)", "Castro", "Cathedral Hill", "Cayuga Terrace", "China Basin", "Chinatown", "Civic Center", "Clarendon Heights", "Cole Valley", "Corona Heights", "Cow Hollow", "Crocker-Amazon", "Design District", "Diamond Heights", "Dogpatch", "Dolores Heights", "Duboce Triangle", "Embarcadero", "Eureka Valley", "Excelsior", "Fillmore", "Financial District", "Financial District South", "Fisherman's Wharf", "Forest Hill", "Forest Knolls", "Glen Park", "Golden Gate Heights", "Haight-Ashbury", "Hayes Valley", "Hunters Point", "India Basin", "Ingleside", "Ingleside Terraces", "Inner Sunset", "Irish Hill", "Islais Creek", "Jackson Square", "Japantown", "Jordan Park", "Laguna Honda", "Lake Street", "Lakeside", "Lakeshore", "Laurel Heights", "Lincoln Manor", "Little Hollywood", "Little Russia", "Little Saigon", "Lone Mountain", "Lower Haight", "Lower Pacific Heights", "Lower Nob Hill", "Marina District", "Merced Heights", "Merced Manor", "Midtown Terrace", "Mid-Market", "Miraloma Park", "Mission Bay", "Mission District", "Mission Dolores", "Mission Terrace", "Monterey Heights", "Mount Davidson", "Nob Hill", "Noe Valley", "North Beach", "North of Panhandle", "Oceanview", "Outer Mission", "Outer Sunset", "Pacific Heights", "Parkmerced", "Parkside", "Parnassus", "Polk Gulch", "Portola", "Portola Place", "Potrero Hill", "Presidio", "Presidio Heights", "Richmond District", "Rincon Hill", "Russian Hill", "Saint Francis Wood", "Sea Cliff", "Sherwood Forest", "Silver Terrace", "South Beach", "South End", "South of Market", "South Park", "Sunnydale", "Sunnyside", "Sunset District", "Telegraph Hill", "Tenderloin", "Treasure Island", "Twin Peaks", "Union Square", "University Mound", "Upper Market", "Visitacion Valley", "Vista del Mar", "West Portal", "Western Addition", "Westwood Highlands", "Westwood Park", "Yerba Buena"];

// information of a searched song will be store in variable currentSong
// Later add city, date, time, registered people info etc
var walk = {
    tourName : "",
    tourGuide : "",
    description : "",
    meetingSpot: "",
    thumbnailPicURL : "",
    videoURL : ""
};

mapboxAPI = "pk.eyJ1Ijoibmljb3RvMTY5IiwiYSI6ImNqcm53Y3JiYTBiNzc0OGs1ZXR0bmY5ajAifQ.DhLyPa9px0-AdhbsuOFObQ";
youtubeAPI = "key=AIzaSyAkAY0BtGDAhFm0c8vx-0rMGH1-TMoFzkk";

var getTourPreview = function(){
    var src = $(this).data("video");
    // EMBED YOUTUBE VIDEO
    $("#youtube").attr("src", src);
}

function loadStills(neighborhood, city){
    
    $('.thumbnails').empty();
    youtubeURL="https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q="+neighborhood+"+"+city+",%20CA"+"+sightseeing+walk&type=video&videoDimension=2d&"+youtubeAPI;
    $.ajax({
        url: youtubeURL,
        method: "GET"
    })
    .then(function(response){
        var result = response.items;
        console.log("RESULT ", result);
        for(var i=0; i < 5; i++){
            if(result[i].snippet.title.substring(neighborhood)){
                var url = "https://www.youtube.com/embed/" + result[i].id.videoId;
                if(i === 0){ $("#youtube").attr("src", url); }
                var still = $('<img>').click(getTourPreview).attr({
                    src: result[i].snippet.thumbnails.medium.url,
                    alt: "intro video still",
                    height: "100px",
                    width: "220px",
                    'data-video': url,
                    onclick: getTourPreview()
                })
                // empty target container for video stills
                $('.thumbnails').prepend(still);
                walk.videoURL = url;
                walk.thumbnailPicURL = result[i].snippet.thumbnails.medium.url;
            } else {
                continue;
            }
        }
    }, 
    function(){
        $("#youtube").text("No previews for this particular neighborhood tour.");
    }
    );
}


