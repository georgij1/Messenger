package com.example.messanger.auth.User;

import lombok.Data;

@Data
public class User {
    public String id;
    public String login;
    public String password;
    public String RepeatPassword;
    public String avatar;
}