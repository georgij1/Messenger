package com.example.messanger.auth.forms.contacts;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class FormStartMessage {
    @JsonProperty("username")
    public String username;
}