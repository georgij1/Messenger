package com.example.messanger.Controllers;

import com.example.messanger.aop.JWT_AUTH.AuthorizedUser;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("chat")
@AllArgsConstructor
public class AccountPageChat {
    JdbcTemplate jdbcTemplate;
    @GetMapping("AccountPage/{UserName}")
    @AuthorizedUser
    public String calendar(HttpServletRequest request, Model model, @PathVariable String UserName) {
        model.addAttribute("UserNameAccount", UserName);
        return "UserAccountChat/index";
    }
}