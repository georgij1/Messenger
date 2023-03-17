package com.example.messanger.WebSocket.Controller;

import com.example.messanger.WebSocket.model.ChatMessage;
import com.example.messanger.aop.JWT_AUTH.AuthorizedUser;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.Objects;

@Controller
@RequestMapping("/")
@AllArgsConstructor
@CrossOrigin("*")
public class ChatController {
    public JdbcTemplate jdbcTemplate;

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage (@Payload ChatMessage chatMessage) {
        System.out.println("public ChatMessage sendMessage - " + chatMessage.getContent());
        jdbcTemplate.update("insert into message(message, author) values (?, ?)", chatMessage.getContent(), chatMessage.getSender());
        return chatMessage;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        Objects.requireNonNull(headerAccessor.getSessionAttributes()).put("username", chatMessage.getSender());
        System.out.println(chatMessage.getContent());
        System.out.println(chatMessage.getSender());
        return chatMessage;
    }


    @AuthorizedUser
    @GetMapping("websocket_chat")
    public String example_chat(HttpServletRequest request, Model model) {
        return "chat_websocket/index";
    }
}