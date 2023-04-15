package com.example.messanger.auth.forms.chat_form;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AccessChat {
    @JsonProperty("NameChat")
    public String NameChat;

    @JsonProperty("username")
    public String username;
}