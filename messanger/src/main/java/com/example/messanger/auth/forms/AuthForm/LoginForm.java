package com.example.messanger.auth.forms.AuthForm;

import lombok.Data;

// Форма для входа в систему без JSON Object
@Data
public class LoginForm {
    public String login;
    public String password;
}