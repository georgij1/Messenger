// Контроллер отображения контактов

package com.example.messanger.Controllers;

import com.example.messanger.aop.JWT_AUTH.AuthorizedUser;
import com.example.messanger.auth.forms.contacts.FormContacts;
import com.example.messanger.auth.forms.contacts.FormStartMessage;
import com.example.messanger.auth.forms.contacts.UsernameYourForm;
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

        if (Objects.equals(jdbcTemplate.queryForList("select name from chat where name=?", formContacts.getUsername()).toString(), formContacts.getUsername())) {
            System.out.println("chat is exists");
        }

        else if (Objects.equals(formContacts.getUsername(), formContacts.getUsername())) {
            System.out.println("same objects");
        }

        else {
            jdbcTemplate.update("insert into public.mycontacts(username, image) values (?, ?)", formContacts.getUsername(), formContacts.getImage());
        }

        return jdbcTemplate.queryForList("select * from mycontacts where username!=?", formContacts.getYour_username());
    }

    @PostMapping("/AllMyChats")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> ContactsAllChats(@RequestBody UsernameYourForm usernameYourForm) {
        return jdbcTemplate.queryForList("select * from mycontacts join chat u on mycontacts.username = u.name where username!=?", usernameYourForm.getUsernameYour());
    }

    @PostMapping("/contacts/start/message/username")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> start_chat_contact(@RequestBody FormStartMessage formStartMessage) {
        System.out.println("this user is here" + formStartMessage.getUsername());

        if (Objects.equals(jdbcTemplate.queryForList("select name from chat where name=?", formStartMessage.getUsername()).toString(), formStartMessage.getUsername())) {
            System.out.println("chat is exists");
        }

        else if (Objects.equals(formStartMessage.getUsername(), formStartMessage.getUsername())) {
            System.out.println("same objects");
        }

        else {
            String DescChat = "Личный чат";
            String Type = "maximum 2 people chat";
            String Owner = "Это чат между двумя людьми поэтому нет главы чата";
            jdbcTemplate.update("insert into public.chat(name, desc_chat, type, image_chat, owner) values (?, ?, ?, ?, ?)", formStartMessage.getUsername(), DescChat, Type, formStartMessage.getImageChat(), Owner);
            System.out.println("creating user" + formStartMessage.getUsername());
        }

        return jdbcTemplate.queryForList("select * from chat where name=?", formStartMessage.getUsername());
    }

    @PostMapping("/AllUsersContacts")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> AllUsers (@RequestBody UsernameYourForm usernameYourForm) {
        return jdbcTemplate.queryForList("select * from mycontacts where username !=?", usernameYourForm.getUsernameYour());
    }
}