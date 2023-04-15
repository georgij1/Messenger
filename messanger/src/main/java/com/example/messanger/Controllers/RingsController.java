package com.example.messanger.Controllers;

import com.example.messanger.aop.JWT_AUTH.AuthorizedUser;
import com.example.messanger.auth.Rings.AllRequestAccessChatForm;
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
}