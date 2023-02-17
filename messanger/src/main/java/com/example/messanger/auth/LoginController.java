package com.example.messanger.auth;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@RequestMapping("/")
public class LoginController {
    @GetMapping("login")
    public String login_redirect() {
        return "login";
    }

    @GetMapping("registration")
    public String registration_redirect() {
        return "registration";
    }
}