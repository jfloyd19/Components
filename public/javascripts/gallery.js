var prePhotos;
var un;
var publicPhotos = [];
var privatePhotos = [];
var viewingPrivate = false;

//Options for sorting the photos
var current = ["0","sort-new"];

//Called to populate the gallery with photos according to options
var display = function(){
    var option1 = current[0];
    var timeOption = current[1];
    //Used to store all the photo elements before displaying them
    var gallery = '';
    var photos = [];
    //Select the list to sort and view depending on if the user is viewing private photos
    var listToView = viewingPrivate ? privatePhotos : publicPhotos;

    //Means it is a filter query
    if(option1[0] == 1){
        //Get just the filter from the string
        var lookingFor = option1.substring(1);
        //All photos
        if(lookingFor == "none"){
            photos = listToView;

        //Photos with an empty fitler string
        }else if(lookingFor == "No filter"){
            if(listToView[x].filters == ""){
                photos.push(listToView[x]);
            }

        //Find photos with a filter string that includes filter you want
        }else{
            for(var x = 0; x < listToView.length; x++){
                if(listToView[x].filters.includes(lookingFor)){
                    photos.push(listToView[x]);
                }
            }
        }
    }

    //Means it is a user query
    else if(option1[0] == 2){
        //Get just the user from the string
        var lookingFor = option1.substring(1);
        //Boolean for seeing if user is found.
        var found = false;
        //Sort through all the photos to see if one with the username is found
        for(var x = 0; x < listToView.length; x++){
            //Push photos to list if username matches
            if(listToView[x].username.toLowerCase() == lookingFor.toLowerCase()){
                photos.push(listToView[x]);
                found = true;
            }
        }
        //If it's not found, return so it doesn't glitch
        if(!found){
            alert("User not found.");
            photos = listToView;
            return;
        }

    //If no sort was selected/"All photos"
    }else if(option1 == 0){//Otherwise leave the array unfiltered
        photos = listToView;
    }

    //Now that the array is filtered, sort by time added
    //Defaults to sort by new
    if(timeOption == "sort-old"){
        photos.sort((a, b) => (Date.parse(a.date_created) > Date.parse(b.date_created)) ? 1 : -1);
    }else{
        photos.sort((a, b) => (Date.parse(a.date_created) < Date.parse(b.date_created)) ? 1 : -1);
    }

    //Add all photos from sorted and filtered array to the gallery-photos div
    for(var i = 0; i < photos.length; i++)
    {
      var path = photos[i].filename;
      var path_ext = path.split("/");
      var path_ext_parse = path_ext[path_ext.length-1];
      gallery += '<a class="containera" href =' + photos[i].filename + ' download>';
      gallery += '<div class = "filterText">';
      gallery += '<img src="';gallery += path;
      gallery += '" class="rounded mx-auto d-block"/>';
      gallery += '<div class = "fadedbox">';
      gallery += '<button class="btn" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fpicopyimg.s3.us-east-2.amazonaws.com%2F'+path_ext_parse+'&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></button>';
      gallery += '<div class ="title">' +photos[i].filters +'</div>';
      gallery += '</div>'
      gallery += '</div>'
      gallery += '</a>';
    }
    document.getElementById("gallery-photos").innerHTML = gallery;
}

$(document).ready(function(){
    //Raw photo data from the server
    var prePhotos = JSON.parse(document.getElementById("photo-obj").innerHTML);
    //Username of logged in user
    var un = document.getElementById("username-obj").innerHTML;

    //Seperate the public and private photos
    for(var i = 0; i < prePhotos.length; i++){
        if(prePhotos[i].private == true){
            privatePhotos.push(prePhotos[i]);
        }else{
            publicPhotos.push(prePhotos[i]);
        }
    }

    //Bottom popup that indicates new photos may not show up right away
    $("#delay-notif").hide();
    $("#delay-notif").fadeIn().delay(4000).fadeOut();

    //Display with default options on load
    display();

    //Detects a change of the select menu on the left
    $('#view-photos-by').change(function() {
        //Value of the select
        var opval = $(this).val();
        //Open select user modal
        if(opval=="photos-by-user"){
            $('#getUserModal').modal("show");
        //Open select filter modal
        }else if(opval =='photos-by-filter'){
            $('#getFilterModal').modal("show");
        //Default filtering option
        }else if(opval =='all-photos'){
            current[0] = "0";
            display();
        //Set user to currently logged in user
        }else if(opval =='my-photos'){
            $(current[0] = "2" + un);
            display();
        }
    });
    //Time sort select menu
    $('#sort-photos-by').change(function() {
        var opval = $(this).val();
        current[1] = opval;
        display();
    });
});

//Called by the filter modal
var sortByFilter = function(){
    var f = $("#filter-select").val();
    current[0] = "1" + f;
    display();
}
//Called by the user modal
var sortByUser = function(){
    var u = $("#usernameForm").val();
    current[0] = "2" + u.toLowerCase();
    display();
}
//Called by clicking "view private"
//Toggle options that don't make any sense
//    if you are viewing private, don't show options to view photos by user or public photos
var viewPrivate = function(){
    viewingPrivate = !viewingPrivate;
    document.getElementById("viewPrivateToggle").innerHTML = !viewingPrivate ? "My Private Photos" : "Click to view public photos";
    $("#my-photos-select").css("display", !viewingPrivate ? "block" : "none");
    $("#photos-by-user-select").css("display", !viewingPrivate ? "block" : "none");
    display();
}
