package com.example.messanger.auth.forms.chat_form;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UpdateDescChat {
    @JsonProperty("NewNameDescChat")
    public String NewNameDescChat;
}