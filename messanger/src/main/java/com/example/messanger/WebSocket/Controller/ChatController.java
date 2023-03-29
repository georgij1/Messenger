package com.example.messanger.WebSocket.Controller;

import com.example.messanger.WebSocket.model.ChatMessage;
import com.example.messanger.aop.JWT_AUTH.AuthorizedUser;
import com.example.messanger.auth.forms.chat_form.FormCreateChat;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.HttpRequestHandler;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Controller
@RequestMapping("/")
@AllArgsConstructor
public class ChatController {
    public JdbcTemplate jdbcTemplate;

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage (@Payload ChatMessage chatMessage) {
        System.out.println("public ChatMessage sendMessage - " + chatMessage.getContent());
        System.out.println(chatMessage.getChat_id());
        System.out.println(chatMessage.getSender());
        int sender_id = Integer.parseInt(chatMessage.getSender());
        int chat_id = Integer.parseInt(chatMessage.getChat_id());
        System.out.println(chatMessage.GetTimeStamp());
        jdbcTemplate.update("insert into public.message(text, sender_id, chat_id, time_stamp) values (?, ?, ?, ?)", chatMessage.getContent(), sender_id, chat_id, chatMessage.GetTimeStamp());
        return chatMessage;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        Objects.requireNonNull(headerAccessor.getSessionAttributes()).put("username", chatMessage.getSender());
        System.out.println(chatMessage.getContent());
        System.out.println(chatMessage.getSender());
        System.out.println(chatMessage.GetTimeStamp());
        System.out.println(headerAccessor);
        return chatMessage;
    }

    @MessageMapping("/chat.deleteUser/{id}")
    @SendTo("/topic/public")
    public ChatMessage deleteUser(@Payload ChatMessage chatMessage) {
         return null;
    }
}