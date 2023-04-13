package com.example.messanger.Controllers;

import com.example.messanger.aop.JWT_AUTH.AuthorizedUser;
import com.example.messanger.auth.forms.ComandDev.AddCommandDev;
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
public class CommandDev {
    JdbcTemplate jdbcTemplate;

    @GetMapping("CommandDev")
    @AuthorizedUser
    public String CommandDevGet(HttpServletRequest request, Model model) {
        return "user/CommandDev/CommandDev";
    }

    @PostMapping("CommandDev/listPost")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> CommandDevPost(@RequestBody AddCommandDev  addCommandDev) {
        jdbcTemplate.update("insert into comand_dev(name, about_me, link_portfolio) values (?, ?, ?)", addCommandDev.getName(), addCommandDev.getAbout_me(), addCommandDev.getLink_portfolio());
        return jdbcTemplate.queryForList("select * from comand_dev");
    }

    @GetMapping("CommandDev/listGet")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> CommandDevGet() {
        return jdbcTemplate.queryForList("select * from comand_dev");
    }
}