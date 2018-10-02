function signup() {
  
  var username = document.getElementById("username2");
  var email = document.getElementById("email");
  var password = document.getElementById("password2");
  var xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {
    
  	if (this.readyState == 4 && this.status == 200) {
      var resp = JSON.parse(this.responseText);
      sendAuth(resp.jwt, resp.refresh_token);  
     }
  };
  
  xhttp.open("POST", "http://localhost:6060/users", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("email="+email.value+"&name="+username2.value+"&password="+password2.value);
}


function login() {
  
	var login_email = document.getElementById("login_email");
  var password = document.getElementById("password1");
  var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
      
    	if (this.readyState == 4 && this.status == 200) {
    		  var resp = JSON.parse(this.responseText);
          sendAuth(resp.jwt, resp.refresh_token);
   		} else {
         	document.getElementById("demo").innerHTML = "Something not working in function login()" //this.status 
      }
    }
    
    xhttp.open("POST", "http://localhost:6060/access-tokens", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("email="+login_email.value+"&password="+password.value);
}

function sendAuth(jwt, refresh_token) {
    
    var xhttp = new XMLHttpRequest();
    
    xhttp.open("GET", "http://localhost:6060/me", true);
    xhttp.setRequestHeader("x-access-token", jwt);    	
	  xhttp.send();
    
    xhttp.onreadystatechange = function() {
      
    	if (this.readyState == 4 && this.status == 200) {
    		var resp = JSON.parse(this.responseText);
        welcome(resp.name, resp.email, resp.avatar_url);
    	} else {
        document.getElementById("demo").innerHTML = this.status; //"Something not working in function sendAuth()"
        }
    }
}

function welcome(name, email, avatar) {

//  window.location.replace(url);
  document.getElementById("form").style.display = "none";
  document.getElementById("welcome").style.display = "block";
	document.getElementById("name").innerHTML = name;
  document.getElementById("email").innerHTML = email; 
  document.getElementById("avatar").innerHTML = avatar;

  



}