package com.example.messanger.auth.forms.AccountsSettings;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class EditPerson {
    @JsonProperty("NewUsername")
    public String NewUsername;
}