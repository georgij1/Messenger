package com.example.messanger.WebSocket.Controller;

import com.example.messanger.WebSocket.model.ChatMessage;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@CrossOrigin("*")
@RequestMapping
@AllArgsConstructor
public class StatusChat {
    JdbcTemplate jdbcTemplate;

    @GetMapping("/status/online/{NameUser}")
    @ResponseBody
    public List<Map<String, Object>> OnlineUser (@PathVariable String NameUser) {
        jdbcTemplate.update("update users set status='В сети' where username=?", NameUser);
        System.out.println("Online - " + NameUser);
        return jdbcTemplate.queryForList("select * from users");
    }

    @GetMapping("/status/offline/{NameUser}")
    @ResponseBody
    public List<Map<String, Object>> OfflineUser (@PathVariable String NameUser) {
        jdbcTemplate.update("update users set status='Не в сети' where username=?", NameUser);
        System.out.println("Offline - " + NameUser);
        return jdbcTemplate.queryForList("select * from users");
    }

    @GetMapping("/status/online/{ChatName}/{NameUser}")
    @ResponseBody
    public List<Map<String, Object>> OnlineUsersChat (@PathVariable String ChatName, @PathVariable String NameUser) {
        System.out.println(ChatName);
        System.out.println(NameUser);
        jdbcTemplate.update("update users_chat set status='В сети' where name=? and chat_nane=?", NameUser, ChatName);
        return jdbcTemplate.queryForList("select * from users_chat");
    }

    @GetMapping("/status/offline/{ChatName}/{NameUser}")
    @ResponseBody
    public List<Map<String, Object>> OfflineUserChat (@PathVariable String ChatName, @PathVariable String NameUser) {
        jdbcTemplate.update("update users_chat set status='Не в сети' where name=? and chat_nane=?", NameUser, ChatName);
        return jdbcTemplate.queryForList("select * from users_chat");
    }
}