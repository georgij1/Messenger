package com.example.messanger.auth.forms.contacts;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

// ‘орма дл€ добавлени€ пользовател€ в контакты с JSON Object
@Data
public class FormContacts {
    @JsonProperty("username")
    public String username;
    @JsonProperty("image")
    public String image;
}