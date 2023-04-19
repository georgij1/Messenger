package com.example.messanger.auth.forms.Rings;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

// Форма для получения отправителя с JSON Object
@Data
public class RequestAccessChatNotCheckedForm {
    @JsonProperty("username_from_sent")
    public String username;
}