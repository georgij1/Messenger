package com.example.messanger.auth.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping
public class ChatsController {
    @GetMapping("chats")
    public String chats() {
        return "user/chats";
    }
}