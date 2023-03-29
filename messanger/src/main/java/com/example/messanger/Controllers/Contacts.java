package com.example.messanger.Controllers;

import com.example.messanger.aop.JWT_AUTH.AuthorizedUser;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping
public class Contacts {
    @GetMapping("/contacts")
    @AuthorizedUser
    public String contacts(HttpServletRequest request, Model model) {
        return "user/contacts";
    }
}