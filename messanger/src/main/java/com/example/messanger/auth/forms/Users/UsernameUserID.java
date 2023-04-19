package com.example.messanger.auth.forms.Users;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

// Форма для получения данных из таблицы users без JSON Object
@Data
public class UsernameUserID {
    @JsonProperty("username")
    public String username;
}