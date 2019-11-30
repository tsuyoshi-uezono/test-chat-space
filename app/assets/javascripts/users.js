$(document).on('turbolinks:load',function(){
  function appendUser(user){
    var html =` <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    $('#user-search-result').append(html)
  }

  function appendErrMsgToHtml(msg){
    var html = `<div class="chat-group-user clearfix">${msg}</div>`
    $('#user-search-result').append(html)
  }

  function appendAddUser(user_name, user_id){
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $('#chat-group-users').append(html)
  }

  $('#user-search-field').on("keyup", function(e){
    e.preventDefault();
    // ここで中身を空にする
    $("#user-search-result").empty();
    var input = $("#user-search-field").val();

    if (input.length == 0){

    } else {
      $.ajax({
        type: 'GET',
        url:  '/users',
        data: {keyword: input},
        dataType: 'json'
      })

      .done(function(users){
        if(users.length !== 0){
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendErrMsgToHtml('一致するユーザーはいません')
        }
      })
      .fail(function(){
        alert('ユーザー検索に失敗しました')
      })
    }
  })
  $('#user-search-result').on("click", '.user-search-add', function(){
    // appendUserのカスタムデータ属性を使う(ここめっちゃ大事)
    $(this).parent().remove();
    var user_name = $(this).data("user-name")
    var user_id   = $(this).data("user-id")
    appendAddUser(user_name, user_id)
  })
  $('#chat-group-users').on("click", '.js-remove-btn', function(){
    $(this).parent().remove();
  })
})