package com.example.messanger.auth.forms;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class FormEditMessage {
    @JsonProperty("message")
    public String message;
}