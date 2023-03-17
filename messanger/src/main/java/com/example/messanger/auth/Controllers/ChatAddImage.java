package com.example.messanger.auth.Controllers;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@AllArgsConstructor
@RequestMapping("/")
public class ChatAddImage {
    @GetMapping("image_upload_chat")
    public String chatImage() {
        return "image_upload";
    }
}