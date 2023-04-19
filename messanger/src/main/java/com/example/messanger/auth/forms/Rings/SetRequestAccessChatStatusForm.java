package com.example.messanger.auth.forms.Rings;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

// Форма для получения статуса доступа
@Data
public class SetRequestAccessChatStatusForm {
    @JsonProperty("id")
    public int id;
    @JsonProperty("access")
    public String access;
    @JsonProperty("username")
    public String username;
    @JsonProperty("chat_nane")
    public String chat_nane;
    @JsonProperty("image_user")
    public String image_user;
}