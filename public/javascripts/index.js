$(document).ready(function(){
    $("#side-bar").css("height", window.innerHeight);
  });


    var imageSource = ""
    var filter_string = ""
    const input = document.getElementById('image_uploads');
    const preview = document.querySelector('.preview');

    input.style.opacity = 0;
    document.getElementById('myCanvas').style.display = 'none';
    document.getElementById('final_img').style.display = 'none';


    input.addEventListener('change', updateImageDisplay);
    console.log("script");
    function updateImageDisplay() {
    console.log("called update image display");

    while(preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }

    const curFiles = input.files;
    if(curFiles.length === 0) {
      const para = document.createElement('p');
      para.textContent = 'No files currently selected for upload';
      preview.appendChild(para);
    } else {
      const list = document.createElement('ol');
      preview.appendChild(list);

      for(const file of curFiles) {
        const listItem = document.createElement('li');
        const para = document.createElement('p');

        if(validFileType(file)) {
          para.textContent = `File Name: ${file.name}, File Size: ${returnFileSize(file.size)}.`;
          const image = document.createElement('img');
          image.setAttribute("id", "curr-pic");
          image.src = URL.createObjectURL(file);
      imageSource = image.src;
          listItem.appendChild(image);
        } else {
          para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
          listItem.appendChild(para);
        }

        list.appendChild(listItem);
        list.style.textAlign="center";
        list.style.listStyleType = "none";
        var bigger = $("#curr-pic").prop("width") > $("#curr-pic").prop("height") ? "width" : "height";
        $("#curr-pic").prop(bigger, bigger == "width" ? $("#prev").width() : $("#prev").height());
        //para.classList.add("display-4");
      }
    }
  }

  function toggleFilter(filter_name, id){
    if(document.getElementById(id).checked == false){
      filter_string = filter_string.replace(filter_name,"");
      preview.style.filter = filter_string;
      convertToCanvasThenImg();
      document.getElementById("imgString").value = filter_string;
    }else{
      filter_string += filter_name;
      preview.style.filter=filter_string;
      convertToCanvasThenImg();
      document.getElementById("imgString").value = filter_string;
    }
  }

  function grayfun() {toggleFilter(" grayscale(100%)", "grayscale");}
  function invertfun() {toggleFilter(" invert(100%)", "invert");}
  function lightblurfun() {toggleFilter(" blur(2px)", "lightblur");}
  function heavyblurfun() {toggleFilter(" blur(4px)", "heavyblur");}
  function darkerfun()  {toggleFilter(" brightness(50%)", "darker");}
  function lighterfun() {toggleFilter(" brightness(150%)", "lighter");}
  function lowcontrastfun() {toggleFilter(" contrast(75%)","lowcontrast");}
  function highcontrastfun() {toggleFilter(" contrast(125%)");}
  function dropshadowfun() {toggleFilter( " drop-shadow(8px 8px 10px gray)","dropshadow");}
  function huerotate90fun() {toggleFilter(" hue-rotate(90deg)", "huerotate90");}
  function huerotate180fun() {toggleFilter(" hue-rotate(180deg)", "huerotate180");}
  function huerotate270fun() {toggleFilter(" hue-rotate(270deg)", "huerotate270");}
  function transparentfun() {toggleFilter(" opacity(30%)", "transparent");}
  function saturatefun() {toggleFilter(" saturate(8)", "saturate");}
  function sepiafun() {toggleFilter(" sepia(50%)", "sepia");}

  //Used to store the images with the filters into the DB
  function convertToCanvasThenImg(){
    //Set up the canvas element
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext("2d");
    //Load the image and set the canvas dimensions to be the same as the image
    var preview_image = document.getElementById('curr-pic')
    canvas.width = preview_image.naturalWidth;
    canvas.height = preview_image.naturalHeight;
    //Apply the filters and the image to the canvas
    ctx.filter = filter_string;
    ctx.drawImage(preview_image, 0, 0);
    //Convert the canvas to an easily transferable "string" of data
    var dataURL = canvas.toDataURL();
    document.getElementById('final_img').src = dataURL;
    document.getElementById('image_canvas').value = dataURL;
  }
    const fileTypes = [
        'image/jpeg',
        'image/pjpeg',
        'image/png'
    ];

    let fileType = '';

    function validFileType(file) {
        if(fileTypes.includes(file.type)){
            var res = file.type.split("/")
            fileType = res[res.length -1];
            return true;
        }else{
            return false;
        }
    }

    function returnFileType(){
        return fileType;
    }

    function returnFileSrc(){
        return imageSource;
    }

  function returnFileSize(number) {
    if(number < 1024) {
      return number + 'bytes';
    } else if(number > 1024 && number < 1048576) {
      return (number/1024).toFixed(1) + 'KB';
    } else if(number > 1048576) {
      return (number/1048576).toFixed(1) + 'MB';
    }
  }