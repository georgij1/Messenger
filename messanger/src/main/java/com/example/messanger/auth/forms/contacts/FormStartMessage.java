package com.example.messanger.auth.forms.contacts;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

// Форма для начала общения из контактов с JSON Object
@Data
public class FormStartMessage {
    @JsonProperty("username")
    public String username;
}