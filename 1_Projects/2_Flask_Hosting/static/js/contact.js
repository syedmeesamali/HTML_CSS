$(document).ready(function() {
    $('#myForm').on('submit', function(event){
        console.log("Contact js is loaded!")
        $.ajax({
            data: {
                name : $('#name').val(),
                email : $('#email').val(),
                title : $('#title').val(),
                Message : $('#message').val()
            }, 
            type : 'POST',
            url : '/save_form'
        })
        .done(function(data) {
            if (data.error) {
                document.getElementById('errorAlert').style.display = '';
                document.getElementById('errorAlert').innerHTML = data.error;
                document.getElementById('successAlert').style.display = 'none';
                //$('#errorAlert').text(data.error).show();
                //$('#successAlert').hide();
            } else {
                document.getElementById('successAlert').style.display = '';
                document.getElementById('successAlert').innerHTML = data.Message;
                document.getElementById('errorAlert').style.display = 'none';
                //$('#successAlert').text(data.Message).show();
                //$('#errorAlert').hide();
            }

        });
        event.preventDefault();
    });
});