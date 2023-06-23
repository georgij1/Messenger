package com.example.messanger.Controllers;

import com.example.messanger.aop.JWT_AUTH.AuthorizedUser;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.apache.catalina.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Objects;

@Controller
@RequestMapping("chat")
@AllArgsConstructor
public class AccountPageChat {
    JdbcTemplate jdbcTemplate;
    @GetMapping("AccountPage/{UserName}")
    @AuthorizedUser
    public String calendar(HttpServletRequest request, Model model, @PathVariable String UserName) {
        var isExistAccount = jdbcTemplate.queryForObject("select exists(select username from users where username=?)", Boolean.class, UserName);
        
        System.out.println(isExistAccount);
        
        if (Boolean.TRUE.equals(isExistAccount)) {
            model.addAttribute("UserNameAccount", UserName);
            return "UserAccountChat/index";
        }

        else {
            return "UserAccountChat/NotValidAccount";
        }
    }
}