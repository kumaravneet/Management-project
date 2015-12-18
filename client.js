$(document).ready(function(){
   
    $("#btn-signup").click(function(){

             var myData = new Object();
             myData.email = $("#email").val();
             myData.firstname = $("#firstname").val();
             myData.lastname = $("#lastname").val();
             myData.passwd = $("#passwd").val();

          //  console.log(object);
             $.ajax({
				   type: "POST",
				   dataType: "json",
				   contentType: "application/json",
				   url: "http://localhost:8081/registerUser",
				   data: JSON.stringify(myData),
				   success: function(msg){
				       //alert('wow'+msg);
				       alert(msg.data[0].status)
                       //console.log("received data"+JSON.stringify(msg));

				   },
				   error: function(){
				   	    alert('in error');
				   }
           });

    })


  $("#btn-login").click(function(){
              
             var myData = new Object(); 
             myData.email = $("#inputEmail").val();
             myData.passwd = $("#inputPassword").val();
             $.ajax({
				   type: "POST",
				   dataType: "json",
				   contentType: "application/json",
				   url: "http://localhost:8081/login",
				   data: JSON.stringify(myData),
				   success: function(msg){
				       //console.log("received data"+JSON.stringify(msg.data[1].userInfo[0].name));
                       
                       if(msg.data[0].status==1){

                       $("#loginSingnUpContainer").css("display","none");
                       $("#wrapper").css("display","block");
                       $("#UserName").html(msg.data[1].userInfo[0].name)


                       }else{
  
                           alert("No user found realted to email:"+$("#inputEmail").val());
                       }




                      /*if(msg.data[0].status=)*/

                       

				   },
				   error: function(){
				   	    alert('in error');
				   }
           });

    })




      $("#SaveButton").click(function(){
              
             var myData = new Object(); 
             myData.email = $("#inputEmail").val();
             myData.htmlData = $("#pdfData").html();

             $.ajax({
				   type: "POST",
				   dataType: "json",
				   contentType: "application/json",
				   url: "http://localhost:8081/savePdf",
				   data: JSON.stringify(myData),
				   success: function(msg){
				      // console.log(msg.data[0].url);
				       window.open(msg.data[0].url, '_blank');
            	   },
				   error: function(){
				   	    alert('in error');
				   }
           });

    })






  $("#forgotPassSubmit").click(function(){

        var email = $("#forgotEmail").val()

         if(isEmail(email)){

            var myData = new Object(); 
             myData.email = email;
            
             $.ajax({
				   type: "POST",
				   dataType: "json",
				   contentType: "application/json",
				   url: "http://localhost:8081/forgotPassword",
				   data: JSON.stringify(myData),
				   success: function(msg){
				      alert(msg.data[1].respnse);
            	   },
				   error: function(){
				   	    alert('in error');
				   }
           });

         }else{

          alert("Email is not correct, please check and try again");             

         }

  });













})


function logout(){

	window.location = "index.html";
}


function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}