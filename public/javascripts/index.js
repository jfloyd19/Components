$(document).ready(function(){
    $("#side-bar").css("height", window.innerHeight);
  });


    var imageSource = ""
    var filter_string = ""
    var extra_filters = ""
    const input = document.getElementById('image_uploads');
    const preview = document.querySelector('.preview');

    input.style.opacity = 0;
    document.getElementById('myCanvas').style.display = 'none';
    document.getElementById('final_img').style.display = 'none';


    input.addEventListener('change', updateImageDisplay);
    function updateImageDisplay() {

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
        $("#curr-pic")
        .on('load', function() {
          var bigger = $("#curr-pic").prop("width") > $("#curr-pic").prop("height") ? "width" : "height";
          $("#curr-pic").prop(bigger, bigger == "width" ? $("#prev").width() : $("#prev").height());
          console.log(bigger);
          switchToCanvas($("#curr-pic"));
        });
      }
    }
  }
  var c;
  var ct;
  function switchToCanvas(x){
    console.log($("#curr-pic").width())
      $(".preview").append("<canvas id='image-canvas'></canvas>");
      $("#image-canvas").prop("width", x.width());
      $("#image-canvas").prop("height", x.height());
      c = document.getElementById('image-canvas');
      ct = c.getContext("2d");

      //Load the image and set the canvas dimensions to be the same as the image
      var preview_image = document.getElementById('curr-pic');
      //Apply the filters and the image to the canvas

      ct.drawImage(preview_image, 0, 0, x.prop("width"),x.prop("height"));

      $("#curr-pic").hide();
      if(document.getElementById("binarize").checked == true){
        binarize(1.5);
        if(extra_filters.indexOf(" binarize") < 0){
          extra_filters+=" binarize"
        }
      }else{
        extra_filters = extra_filters.replace(" binarize","");
      }
      if(document.getElementById("edge").checked == true){
        edge();
        if(extra_filters.indexOf(" edge") < 0){extra_filters += " edge"}
      }else{
        extra_filters = extra_filters.replace(" edge","");
      }
      if(document.getElementById("emboss").checked==true){
        emboss();
        if(extra_filters.indexOf(" emboss") < 0){extra_filters += " emboss"}
      }else{
        extra_filters = extra_filters.replace(" emboss","");
      }
      if(document.getElementById("flip").checked == true){
        flip();
        if(extra_filters.indexOf(" flip") < 0){extra_filters += " flip"}
      }else{
        extra_filters = extra_filters.replace(" flip","");
      }
      if(document.getElementById("gamma").checked == true){
        gamma(2);
        if(extra_filters.indexOf(" gamma") < 0){extra_filters += " gamma"}
      }else{
        extra_filters = extra_filters.replace(" gamma","");
      }
      if(document.getElementById("mosaic").checked == true){
        mosaic(10);
        if(extra_filters.indexOf(" mosaic") < 0){extra_filters += " mosaic"}
      }else{
        extra_filters = extra_filters.replace(" mosaic","");
      }
      if(document.getElementById("posterize").checked == true){
        posterize(3.5);
        if(extra_filters.indexOf(" posterize") < 0){extra_filters += " posterize"}
      }else{
        extra_filters = extra_filters.replace(" posterize","");
      }
      if(document.getElementById("sharpen").checked == true){
        sharpen(15);
        if(extra_filters.indexOf(" sharpen") < 0){extra_filters += " sharpen"}
      }else{
        extra_filters = extra_filters.replace(" sharpen","");
      }
      if(document.getElementById("solarize").checked == true){
        solarize();
        if(extra_filters.indexOf(" solarize") < 0){extra_filters += " solarize"}
      }else{
        extra_filters = extra_filters.replace(" solarize","");
      }
      console.log(extra_filters);
      ct.filter = filter_string;
  }

  function binarize(l){
    var imageData = ct.getImageData(0,0,c.width,c.height);
    var filtered = ImageFilters.Binarize(imageData, l);
    ct.putImageData(filtered, 0,0)
  }
  function edge(){
    var imageData = ct.getImageData(0,0,c.width,c.height);
    var filtered = ImageFilters.Edge(imageData);
    ct.putImageData(filtered, 0,0)
  }
  function emboss(){
    var imageData = ct.getImageData(0,0,c.width,c.height);
    var filtered = ImageFilters.Emboss(imageData);
    ct.putImageData(filtered, 0,0)
  }
  function flip(){
    var imageData = ct.getImageData(0,0,c.width,c.height);
    var filtered = ImageFilters.Flip(imageData);
    ct.putImageData(filtered, 0,0)
  }
  function gamma(level){
    var imageData = ct.getImageData(0,0,c.width,c.height);
    var filtered = ImageFilters.Gamma(imageData, level);
    ct.putImageData(filtered, 0,0)
  }
  function mosaic(size){
    var imageData = ct.getImageData(0,0,c.width,c.height);
    var filtered = ImageFilters.Mosaic(imageData, size);
    ct.putImageData(filtered, 0,0)
  }
  function posterize(l){
    var imageData = ct.getImageData(0,0,c.width,c.height);
    var filtered = ImageFilters.Posterize(imageData, l);
    ct.putImageData(filtered, 0,0)
  }
  function sharpen(f){
    var imageData = ct.getImageData(0,0,c.width,c.height);
    var filtered = ImageFilters.Sharpen(imageData, f);
    ct.putImageData(filtered, 0,0)
  }
  function solarize(){
    var imageData = ct.getImageData(0,0,c.width,c.height);
    var filtered = ImageFilters.Solarize(imageData);
    ct.putImageData(filtered, 0,0)
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
    console.log(filter_string, extra_filters)
  }

  function grayfun() {toggleFilter(" grayscale(100%)", "grayscale");}
  function invertfun() {toggleFilter(" invert(100%)", "invert");}
  function lightblurfun() {toggleFilter(" blur(2px)", "lightblur");}
  function heavyblurfun() {toggleFilter(" blur(4px)", "heavyblur");}
  function darkerfun1()  {toggleFilter(" brightness(50%)", "darker1");}
  function darkerfun2()  {toggleFilter(" brightness(75%)", "darker2");}
  function lighterfun1() {toggleFilter(" brightness(125%)", "lighter1");}
  function lighterfun2() {toggleFilter(" brightness(150%)", "lighter2");}
  function c1() {toggleFilter(" contrast(0.6)","c1");}
  function c2() {toggleFilter(" contrast(0.8)","c2");}
  function c3() {toggleFilter(" contrast(1.2)","c3");}
  function c4() {toggleFilter(" contrast(1.4)","c4");}
  function dropshadowfun() {toggleFilter( " drop-shadow(8px 8px 10px gray)","dropshadow");}
  function huerotate45fun() {toggleFilter(" hue-rotate(45deg)", "huerotate45");}
  function huerotate90fun() {toggleFilter(" hue-rotate(90deg)", "huerotate90");}
  function huerotate135fun() {toggleFilter(" hue-rotate(135deg)", "huerotate135");}
  function huerotate180fun() {toggleFilter(" hue-rotate(180deg)", "huerotate180");}
  function huerotate225fun() {toggleFilter(" hue-rotate(225deg)", "huerotate225");}
  function huerotate270fun() {toggleFilter(" hue-rotate(270deg)", "huerotate270");}
  function huerotate315fun() {toggleFilter(" hue-rotate(315deg)", "huerotate315");}
  function transparentfun() {toggleFilter(" opacity(30%)", "transparent");}
  function saturate1fun() {toggleFilter(" saturate(2)", "saturate1");}
  function saturate2fun() {toggleFilter(" saturate(5)", "saturate2");}
  function saturate3fun() {toggleFilter(" saturate(7)", "saturate3");}
  function saturate4fun() {toggleFilter(" saturate(10)", "saturate4");}
  function sepiafun1() {toggleFilter(" sepia(33%)", "sepia1");}
  function sepiafun2() {toggleFilter(" sepia(66%)", "sepia2");}
  function sepiafun3() {toggleFilter(" sepia(100%)", "sepia3");}
  function binarizefun(){ updateImageDisplay()}

  //Used to store the images with the filters into the DB
  var dataURL;
  function convertToCanvasThenImg(){
    //Set up the canvas element
    var canvas = document.getElementById('image-canvas');
    var ctx = canvas.getContext("2d");
    //Load the image and set the canvas dimensions to be the same as the image
    var preview_image = document.getElementById('curr-pic')
    canvas.width = preview_image.Width();
    canvas.height = preview_image.Height();
    //Apply the filters and the image to the canvas
    ctx.filter = filter_string;
    ctx.drawImage(preview_image, 0, 0);
    //Convert the canvas to an easily transferable "string" of data
    dataURL = canvas.toDataURL();
  }

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

let Private1 = "";
let imageStringss = "";
let UserId = 1;
  function submit_canvas(){

    console.log("submit_canvas called");
    dataURL = c.toDataURL();
    const file = dataURLtoFile(dataURL, 'out.png');
    if(file == null){
      return alert('No file selected.');
    }
    console.log("Calling getSignedRequest");
    Private1 = $("#Private").is(":checked");
    imageStringss = filter_string + extra_filters;
    UserId = document.getElementById("userIdNum").value;
    console.log(file);
    console.log(UserId);
    getSignedRequest(file);


  }

  function getSignedRequest(file){
  const xhr = new XMLHttpRequest();
  console.log("Calling /single maybe");

  xhr.open('GET', `/single?UserId=${UserId}&file-type=${file.type}&Private=${Private1}&filter_s=${imageStringss}`);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        const response = JSON.parse(xhr.responseText);
        uploadFile(file, response.signedRequest, response.url);
      }
      else{
        alert('Could not get signed URL.');
      }
    }
  };
  xhr.send();
}

function uploadFile(file, signedRequest, url){
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        console.log("File upload Success")
        $.ajax({
          type: "POST",
          url: "/saveToDb",
          data: {
             url: url,
             Private: Private1,
             filter_s: imageStringss,
             user_id: UserId
          }
        });
        window.location.href = "/gallery";
      }
      else{
        alert('Could not upload file.');
      }
    }
  };
  xhr.send(file);
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
