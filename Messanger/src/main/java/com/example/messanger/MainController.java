package com.example.messanger;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class MainController {
    @RequestMapping("/login")
    public String login_redirect() {
        return "login";
    }

    @RequestMapping("/registration")
    public String registration_redirect() {
        return "registration";
    }
}