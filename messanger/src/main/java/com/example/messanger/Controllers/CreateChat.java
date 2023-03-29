package com.example.messanger.Controllers;

import com.example.messanger.aop.JWT_AUTH.AuthorizedUser;
import com.example.messanger.auth.forms.chat_form.FormCreateChat;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping
@AllArgsConstructor
public class CreateChat {
    public JdbcTemplate jdbcTemplate;

    @AuthorizedUser
    @GetMapping("websocket_chat")
    public String chat(HttpServletRequest request, Model model) {
        return "chat_websocket/index";
    }

    @PostMapping("/create_chat")
    @CrossOrigin("*")
    public String CreateChat_1(@RequestBody FormCreateChat formCreateChat, HttpServletRequest request, Model model) {
        jdbcTemplate.update("insert into public.chat(name, desc_chat) values (?, ?)", formCreateChat.getName_chat(), formCreateChat.getDesc_chat());
        System.out.println(formCreateChat.getUser_chat());
        String getUserChat = String.join(" ", formCreateChat.getUser_chat());
        System.out.println(getUserChat);
        jdbcTemplate.update("insert into public.role(name) values (?)", getUserChat);
        return "chat_websocket/index";
    }
}