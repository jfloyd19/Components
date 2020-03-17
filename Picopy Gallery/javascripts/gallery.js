$(document).ready( function()
{
    $("p").each( function (i)
    {
        $(this).append("<img src ='gallery/" + (++i) + ".jpg' width='200'' height='200' />");
    });
});






















// function loadImages(size)
// {
//     var img = document.createElement('img');
//     img.style = "width:2.5in; height:2.5in;";
//     size = 20;

//   for (let i=1;i <= size;i++)
//   {
    
      
//       //img.src = 'gallery/'+ i + '.jpg';
//       document.write("<img src= \"./gallery/", i + ".jpg\"+ style=\"width:2.5in;height:2.5in;\">");
      
//     }
// }




// var dir = "gallery/";
// var fileextension = ".jpg";
// $.ajax({
//     //This will retrieve the contents of the folder if the folder is configured as 'browsable'
//     url: dir,
//     success: function (data) {
//         //List all .png file names in the page
//         $(data).find("a:contains(" + fileextension + ")").each(function () {
//             var filename = this.href.replace(window.location.host, "").replace("http://", "");
//             $("body").append("<img src='" + dir + filename + "'>");
//         });
//     }
// });