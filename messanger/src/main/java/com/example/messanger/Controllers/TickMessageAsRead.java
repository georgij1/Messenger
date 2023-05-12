package com.example.messanger.Controllers;

import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@Controller
@AllArgsConstructor
public class TickMessageAsRead {
    JdbcTemplate jdbcTemplate;

    @ResponseBody
    @CrossOrigin("*")
    @PostMapping("chat/read/{id_message}")
    public List<Map<String, Object>> TickMessageAsReadList(@PathVariable int id_message) {
        jdbcTemplate.update("update message set read=? where id_message=?", true, id_message);
        return jdbcTemplate.queryForList("select * from message");
    }
}