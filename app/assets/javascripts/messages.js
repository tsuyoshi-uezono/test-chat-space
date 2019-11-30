$(document).on('turbolinks:load',function() {
  function buildHTML(message) {
    const img = message.image? `<img src = "${message.image}">`: "" ;
    const html = `<div class="message" data-message-id = "${message.id}">
                    <div class="message__upper-info">
                      <div class="message__upper-info__talker">${message.user_name}</div>
                      <div class="message__upper-info__date">${message.date}</div>
                    </div>
                    <div class="message__text">
                      <p class="lower-message__content">${message.content}</p>
                      ${img}
                    </div>
                  </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(data){
      alert('メッセージが入力されていません');
    })
    .always(function(data){
      $('.submit-btn').prop("disabled", false);
    })
  })

  var reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $(".message:last").data('message-id');
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        // ↓↓idはparamsとしてコントローラーに持っていく
        data: {id: last_message_id}
      })
      .done(function(messages){
        if (messages.length != 0){
          var insertHTML = ''
          messages.forEach(function(message){
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          })
        }
      })
      .fail(function(){
        alert("自動更新に失敗しました")
      })
    }
  }
  setInterval(reloadMessages, 500);
})