package com.example.messanger.auth;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping
public class LoginConroller {
    @GetMapping("login")
    public String login() {
        System.out.println("login");
        return "login";
    }
}
