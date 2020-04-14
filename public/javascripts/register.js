function validateForm() {
    var isValid = true;
    $('.form-control').each(function() {
      if ( $(this).val() === '' )
          isValid = false;
    });
    return isValid;
}

function pwdMatch(){
    return $("#pwd").val() == $("#repwd").val();
}

function validate(){
    if(validateForm() & pwdMatch()){
        $("#repwd").removeClass("is-invalid");
        $('#submitbtn').prop( "disabled", false );
    }else{
        if(!pwdMatch()){
            $("#repwd").addClass("is-invalid");
        }
        $('#submitbtn').prop( "disabled", true );
    }
}

$(document).keyup(function(event){
   validate();
});

$(document).click(function(event){
    validate();
 });

