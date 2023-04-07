package com.example.messanger.Controllers;

import com.auth0.jwt.JWT;
import com.example.messanger.aop.JWT_AUTH.AuthorizedUser;
import com.example.messanger.auth.forms.contacts.FormContacts;
import com.example.messanger.auth.forms.contacts.FormStartMessage;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Controller
@RequestMapping
@AllArgsConstructor
public class Contacts {
    public JdbcTemplate jdbcTemplate;

    @GetMapping("/contacts")
    @AuthorizedUser
    public String contacts(HttpServletRequest request, Model model) {
        return "user/contacts";
    }

    @PostMapping("/ContactUsername")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> contactsPost(@RequestBody FormContacts formContacts) {
        System.out.println("getUsername from PostMapping - " + formContacts.getUsername());

        if (Objects.equals(jdbcTemplate.queryForList("select name from chat where name=?", String.class, formContacts.getUsername()).toString(), formContacts.getUsername())) {
            System.out.println("chat is exists");
        }

        else {
            jdbcTemplate.update("insert into public.mycontacts(username, image) values (?, ?)", formContacts.getUsername(), formContacts.getImage());
        }

        return jdbcTemplate.queryForList("select * from mycontacts");
    }

    @GetMapping("/AllMyChats")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> ContactsAllChats(HttpServletRequest request) {
        return jdbcTemplate.queryForList("select * from mycontacts");
    }

    @PostMapping("/contacts/start/message/username")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> start_chat_contact(@RequestBody FormStartMessage formStartMessage) {
        System.out.println("this user is here" + formStartMessage.getUsername());

        if (Objects.equals(jdbcTemplate.queryForList("select name from chat where name=?", String.class, formStartMessage.getUsername()), formStartMessage.getUsername())) {
            System.out.println("chat is exists");
        }

        else {
            jdbcTemplate.update("insert into public.chat(name) values (?)", formStartMessage.getUsername());
            System.out.println("creating user" + formStartMessage.getUsername());
        }

        return jdbcTemplate.queryForList("select * from chat where name=?", formStartMessage.getUsername());
    }
}