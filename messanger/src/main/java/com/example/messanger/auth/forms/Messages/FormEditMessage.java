package com.example.messanger.auth.forms.Messages;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

// Форма для редактирования сообщения с JSON Object
@Data
public class FormEditMessage {
    @JsonProperty("message")
    public String message;
}