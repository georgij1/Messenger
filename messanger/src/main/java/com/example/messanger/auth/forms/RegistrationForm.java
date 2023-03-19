package com.example.messanger.auth.forms;

import lombok.Data;

@Data
public class RegistrationForm {
    public String login;
    public String password;
    public String RepeatPassword;
}