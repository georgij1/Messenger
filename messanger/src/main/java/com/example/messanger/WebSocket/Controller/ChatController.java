package com.example.messanger.WebSocket.Controller;

import com.example.messanger.ChatImage.FileStorageService;
import com.example.messanger.ChatImage.model.FileDB;
import com.example.messanger.WebSocket.model.ChatMessage;
import com.example.messanger.aop.JWT_AUTH.AuthorizedUser;
import com.example.messanger.auth.forms.FormEditMessage;
import com.example.messanger.auth.forms.chat_form.AccessChat;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

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
        System.out.println(chatMessage.GetTimeStampShort());
        System.out.println(chatMessage.GetTimeStampLong());
        jdbcTemplate.update("insert into public.message(text, sender_id, chat_id, time_stamp_short, time_stamp_long) values (?, ?, ?, ?, ?)", chatMessage.getContent(), sender_id, chat_id, chatMessage.GetTimeStampShort(), chatMessage.GetTimeStampLong());
        return chatMessage;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        Objects.requireNonNull(headerAccessor.getSessionAttributes()).put("username", chatMessage.getSender());
        System.out.println(chatMessage.getContent());
        System.out.println(chatMessage.getSender());
        System.out.println(chatMessage.GetTimeStampShort());
        System.out.println(chatMessage.GetTimeStampLong());
        System.out.println(headerAccessor);
        return chatMessage;
    }

    @PostMapping("/edit_message/{id}")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> EditMessage(@PathVariable int id, @RequestBody FormEditMessage formEditMessage) {
        jdbcTemplate.update("update message set text=? where id=?", formEditMessage.getMessage(), id);
        return jdbcTemplate.queryForList("select * from message where id=?", id);
    }

    private FileStorageService storageService;

    @GetMapping("/chat/{id}")
    @AuthorizedUser
    public String OpenChat(@PathVariable String id, Model model, HttpServletRequest request) {
        model.addAttribute("IdChat", id);
//        FileDB fileDB = storageService.getFile("3e8eff83-4674-4123-9309-2bc1e047669b");
        List<Map<String, Object>> IdImage = jdbcTemplate.queryForList("select id from image_message");
        for (Map<String, Object> IdImageItter : IdImage) {
            System.out.println(IdImageItter.get("id"));
            model.addAttribute("ImageChat", "/files/"+IdImageItter.get("id"));
        }
        return "chat_websocket/OpeningChat";
    }

    @PostMapping("/ImageChat")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> GetImageChat() {
        return jdbcTemplate.queryForList("select id from image_message");
    }

    @PostMapping("/Find/{UserNameChat}")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> FindUsersByChatName(@PathVariable String UserNameChat) {
        System.out.println("UserNameChat - " + UserNameChat);
        System.out.println(jdbcTemplate.queryForList("select * from public.users_chat where chat_nane=?", UserNameChat));
        return jdbcTemplate.queryForList("select * from public.users_chat where chat_nane=?", UserNameChat);
    }

    @PostMapping("/Access")
    @CrossOrigin("*")
    @ResponseBody
    public String Access(@RequestBody AccessChat accessChat) {
        var is_available = jdbcTemplate.queryForObject("select exists(select * from users_chat where name=? and chat_nane=?)", Boolean.class, accessChat.getUsername(), accessChat.getNameChat());
        var is_available1 = jdbcTemplate.queryForObject("select exists(select * from chat where owner=? and name=?)",  Boolean.class, accessChat.getUsername(), accessChat.getNameChat());

        System.out.println(is_available);
        System.out.println(is_available1);

        if (Boolean.TRUE.equals(is_available)) {
            System.out.println("success with user");
            return "[{\"status\":\"success\"}]";
        }

        else if (Boolean.TRUE.equals(is_available1)) {
            return "[{\"status\":\"success\"}]";
        }

        else {
            System.out.println("permission denied");
            return "[{\"status\":\"permission denied\"}]";
        }
    }
}