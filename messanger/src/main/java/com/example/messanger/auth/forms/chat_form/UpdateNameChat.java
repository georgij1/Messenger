package com.example.messanger.auth.forms.chat_form;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

// ���������� ����� ����  � JSON Object
@Data
public class UpdateNameChat {
    @JsonProperty("NewNameChat")
    public String NewNameChat;
}