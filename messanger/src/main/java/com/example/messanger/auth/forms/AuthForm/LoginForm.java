package com.example.messanger.auth.forms.AuthForm;

import lombok.Data;

// ����� ��� ����� � ������� ��� JSON Object
@Data
public class LoginForm {
    public String login;
    public String password;
}