json.content    @message.content
json.id         @message.id
json.date       @message.created_at.strftime('%Y/%m/%d %H:%M')
json.user_name  @message.user.name
json.image      @message.image.url