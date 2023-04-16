package com.example.messanger.Controllers;

import com.example.messanger.aop.JWT_AUTH.AuthorizedUser;
import com.example.messanger.auth.forms.chat_form.AccessChat;
import com.example.messanger.auth.forms.chat_form.FormCreateChat;
import com.example.messanger.auth.forms.chat_form.UpdateNameChat;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Objects;

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
        jdbcTemplate.update("insert into public.chat(name, desc_chat, type, owner) values (?, ?, ?, ?)", formCreateChat.getName_chat(), formCreateChat.getDesc_chat(), formCreateChat.getType(), formCreateChat.getOwner());

        String getUserChat = String.join(" ", formCreateChat.getUser_chat());

        for (String users_chat:formCreateChat.getUser_chat()) {
            System.out.println("Users_chat - " + users_chat);
            for (String ImageUser:formCreateChat.getImageUser()) {
                jdbcTemplate.update("insert into public.users_chat(name, chat_nane, image_user) values (?, ?, ?)", users_chat, formCreateChat.getName_chat(), ImageUser);
            }
        }

        System.out.println(formCreateChat.getUser_chat());
        System.out.println("formCreateChat.getUser_chat().toArray().length - "+ formCreateChat.getUser_chat().toArray().length);
        System.out.println("getUserChat - " + getUserChat);

        return "chat_websocket/index";
    }

    @PostMapping("/users/{chat_id}")
    @CrossOrigin("*")
    public List<Map<String, Object>> getUsersChat(@PathVariable String chat_id) {
        return jdbcTemplate.queryForList("select * from users_chat where name=?", chat_id);
    }

    @PostMapping("/chats/{ChatId}")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> OpenChat(@PathVariable int ChatId) {
        System.out.println(jdbcTemplate.queryForList("SELECT * FROM message join users u on message.sender_id = u.id where chat_id=?", ChatId));
        return jdbcTemplate.queryForList("SELECT * FROM message join users u on message.sender_id = u.id where chat_id=?", ChatId);
    }

    @PostMapping("/MyChats/{owner_chat}")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> MyChats(@PathVariable String owner_chat) {
        return jdbcTemplate.queryForList("select * from chat where owner=?", owner_chat);
    }

    @PostMapping("/ChatName/{IdChat}")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> ChatName(@PathVariable int IdChat) {
        return jdbcTemplate.queryForList("select * from chat where id=?", IdChat);
    }

    @PostMapping("/EditNameChat/{id}")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> EditNameChat1(@PathVariable int id, @RequestBody UpdateNameChat updateNameChat) {
        jdbcTemplate.update("update chat set name=? where id=?", updateNameChat.getNewNameChat(), id);
        return jdbcTemplate.queryForList("select * from chat");
    }

    @DeleteMapping("/delete_chat/{id}")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> DeleteChat_1(@PathVariable int id) {
        jdbcTemplate.update("delete from public.message where chat_id=?", id);
        jdbcTemplate.update("delete from public.chat where id=?", id);
        return jdbcTemplate.queryForList("select * from chat");
    }
}