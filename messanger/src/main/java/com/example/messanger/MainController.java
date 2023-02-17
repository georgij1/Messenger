package com.example.messanger;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class MainController {
    @GetMapping
    public String success_server() {
        return "success";
    }

    @GetMapping("main_page")
    public String main_page() {
        return "main_page";
    }
}