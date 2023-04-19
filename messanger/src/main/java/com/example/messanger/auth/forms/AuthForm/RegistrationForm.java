package com.example.messanger.auth.forms.AuthForm;

import lombok.Data;

// Форма для регистрации без JSON Object
@Data
public class RegistrationForm {
    public String login;
    public String password;
    public String RepeatPassword;
}