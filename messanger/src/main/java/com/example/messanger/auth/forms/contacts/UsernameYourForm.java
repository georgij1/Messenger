package com.example.messanger.auth.forms.contacts;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UsernameYourForm {
    @JsonProperty("UsernameYour")
    public String UsernameYour;
}