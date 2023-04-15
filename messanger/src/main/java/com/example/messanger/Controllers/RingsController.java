package com.example.messanger.Controllers;

import com.example.messanger.aop.JWT_AUTH.AuthorizedUser;
import com.example.messanger.auth.Rings.AllRequestAccessChatForm;
import com.example.messanger.auth.Rings.RequestAccessChatNotCheckedForm;
import com.example.messanger.auth.Rings.SetRequestAccessChatStatusForm;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping
@AllArgsConstructor
public class RingsController {
    private JdbcTemplate jdbcTemplate;

    @AuthorizedUser
    @GetMapping("/rings")
    public String Rings(HttpServletRequest request, Model model) {
        return "user/rings";
    }

    @PostMapping("/rings/AllRequestAccessChat")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> AllRequestAccessChat(@RequestBody AllRequestAccessChatForm allRequestAccessChatForm) {
        System.out.println(allRequestAccessChatForm.getUsername_from_sent());
        return jdbcTemplate.queryForList("select * from public.send_access_to_chat_post where usernamefromsent=?", allRequestAccessChatForm.getUsername_from_sent());
    }

    @PostMapping("/rings/SentRequestAccessChat")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> SentRequestAccessChat(@RequestBody AllRequestAccessChatForm allRequestAccessChatForm) {
        System.out.println(allRequestAccessChatForm.getUsername_from_sent());
        return jdbcTemplate.queryForList("select * from public.send_access_to_chat_post where usernamefromsent=? and access=false", allRequestAccessChatForm.getUsername_from_sent());
    }

    @PostMapping("/rings/CheckRequestAccessChat")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> CheckRequestAccessChat(@RequestBody AllRequestAccessChatForm allRequestAccessChatForm) {
        System.out.println(allRequestAccessChatForm.getUsername_from_sent());
        return jdbcTemplate.queryForList("select * from public.send_access_to_chat_post where usernametosent=? and access=true", allRequestAccessChatForm.getUsername_from_sent());
    }

    @PostMapping("/rings/UpdateRequestAccessChatStatus")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> SetRequestAccessChatStatus(@RequestBody SetRequestAccessChatStatusForm setRequestAccessChatStatusForm) {
        System.out.println(setRequestAccessChatStatusForm.getAccess());
        System.out.println(setRequestAccessChatStatusForm.getId());
        jdbcTemplate.update("update send_access_to_chat_post set access=true where id=?");
        return jdbcTemplate.queryForList("select * from send_access_to_chat_post");
    }

    @PostMapping("/rings/RequestAccessChatNotChecked")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> RequestAccessChatNotChecked(@RequestBody RequestAccessChatNotCheckedForm requestAccessChatNotCheckedForm) {
        return jdbcTemplate.queryForList("select * from send_access_to_chat_post where usernamefromsent!=?", requestAccessChatNotCheckedForm.getUsername());
    }
}