package com.example.messanger.Controllers;

import com.example.messanger.auth.forms.AccountsSettings.EditPerson;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@Controller
@AllArgsConstructor
public class Persons {
    // Редактирование пользователя по имени
    JdbcTemplate jdbcTemplate;
    @ResponseBody
    @CrossOrigin("*")
    @PostMapping("EditPersonsById/{IdPerson}")
    public List<Map<String, Object>> EditPersonsById (@PathVariable int IdPerson, @RequestBody EditPerson editPerson) {
        jdbcTemplate.update("update users set username=? where id=?", editPerson.getNewUsername(), IdPerson);
        jdbcTemplate.update("update chat set owner=? where owner=?", editPerson.getNewUsername(), editPerson.getOldUserName());
        return jdbcTemplate.queryForList("select * from users");
    }

    // Получения пользователя по username
    @ResponseBody
    @CrossOrigin("*")
    @GetMapping("GetIdPerson/{UserName}")
    public List<Map<String, Object>> getUserId(@PathVariable String UserName) {
        return jdbcTemplate.queryForList("select * from users where username=?", UserName);
    }

    // Получение колл-во username
    @ResponseBody
    @CrossOrigin("*")
    @GetMapping("count/username")
    public List<Map<String, Object>> getCountUserName(HttpServletRequest request) {
        return jdbcTemplate.queryForList("select count(username) from public.users");
    }
}