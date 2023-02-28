package com.example.messanger.auth.forms;

import lombok.Data;

@Data
public class RegistrationForm {
    private String login;
    private String password;
    private String RepeatPassword;
    private String NumberPhone;
    private String email;
    private String avatar;
}