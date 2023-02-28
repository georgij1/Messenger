package com.example.messanger.auth.User;

import lombok.Data;

@Data
public class User {
    private String id;
    private String login;
    private String password;
    private String RepeatPassword;
    private String NumberPhone;
    private String email;
    private String avatar;
}