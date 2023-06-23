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
@RequestMapping
@AllArgsConstructor
public class AccountPage {
    JdbcTemplate jdbcTemplate;
    @GetMapping("AccountPage/{UserName}")
    @AuthorizedUser
    public String AccountPage_str(HttpServletRequest request, Model model, @PathVariable String UserName) {
        var isExistAccount = jdbcTemplate.queryForObject("select exists(select * from users where username=?)", Boolean.class, UserName);

        if (Boolean.TRUE.equals(isExistAccount)) {
            model.addAttribute("UserNameAccount", UserName);
            return "UserAccount/index";
        }

        else {
            return "UserAccountChat/NotValidAccount";
        }
    }
}