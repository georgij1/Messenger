package com.example.messanger.auth.forms.AuthForm;

import lombok.Data;

// ����� ��� ����������� ��� JSON Object
@Data
public class RegistrationForm {
    public String login;
    public String password;
    public String RepeatPassword;
}