package com.example.messanger.auth.forms.chat_form;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class DeleteUserChat {
    @JsonProperty("username")
    public String username;
    @JsonProperty("chat_name")
    public String chat_name;
}