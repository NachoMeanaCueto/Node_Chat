var params =  new URLSearchParams(window.location.search);

function renderUserList(userList){

   $("#RoomName").text(params.get("room")); 

   var  html= "";
   for(var i = 0; i< userList.length; i++ ){

    
    html += '<li>'
    html += '    <a data-id='+ userList[i].id +' href="javascript:void(0)"><img src="assets/images/users/'+ Math.floor(Math.random() * 14)+'.jpg" alt="user-img" class="img-circle"> <span> '+ userList[i].name +' <small class="text-success">online</small></span></a>'
    html += '</li>'

   }

   $("#UserListDiv").html(html);

}

$("#UserListDiv").on('click', 'a', function(){
    console.log($(this).data('id'));
});
