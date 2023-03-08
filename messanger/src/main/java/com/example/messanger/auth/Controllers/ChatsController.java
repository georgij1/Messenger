package com.example.messanger.auth.Controllers;

import com.auth0.jwt.JWT;
import com.example.messanger.auth.forms.DeleteMessage;
import com.example.messanger.auth.forms.FormEditMessage;
import com.example.messanger.auth.forms.MessageForm;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping
@AllArgsConstructor
@CrossOrigin("*")
public class ChatsController {

    public JdbcTemplate jdbcTemplate;

    @GetMapping("chats")
    public String chats_get(HttpServletRequest request, Model model) {
        var cookies = request.getCookies();
        String token = null;

        if (cookies == null) {
            return "main_page";
        } else {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("auth_token")) {
                    token = cookie.getValue();
                    System.out.println(token);
                    var json = JWT.decode(token.formatted("utf-8")).getSubject();
                    System.out.println(json);
                    // model.addAttribute("username", json);
                    model.addAttribute("all_message", jdbcTemplate.queryForList("select * from public.message"));
                    return "user/chats";
                }
            }
        }

        return "user/chats";
    }

    @GetMapping("/all_message")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> all_message() {
        System.out.println(jdbcTemplate.queryForList("select * from message"));
//        jdbcTemplate.update("select * from message");
        JSONObject jsonObject = new JSONObject("{aaa: hi}");
//        return jsonObject.toString();
        return jdbcTemplate.queryForList("select * from message");
    }

    @ResponseBody
    @CrossOrigin("*")
    @DeleteMapping("delete_message/{id}")
    public List<Map<String, Object>> delete_message(@PathVariable int id) {
        jdbcTemplate.update("delete from public.message where id=?", id);
        return jdbcTemplate.queryForList("select * from message");
    }

    @PostMapping("chats")
    public String chats_post(MessageForm messageForm, Model model, HttpServletRequest request) {
         System.out.println(messageForm.getMessage_send());
         var cookies = request.getCookies();
         String token = null;
         for (Cookie cookie : cookies) {
             try {
                 token = cookie.getValue();
                 System.out.println(token);
                 var json = JWT.decode(token.formatted("utf-8")).getSubject();
                 System.out.println(json);
                 model.addAttribute("all_message", jdbcTemplate.queryForList("select * from public.message"));
                 jdbcTemplate.queryForMap("insert into public.message(message, author) values (?, ?)", messageForm.getMessage_send(), json);
                 return "user/chats";
             }

             catch (org.springframework.dao.DataIntegrityViolationException exception) {
                 return "user/chats";
             }
         }
         return "user/chats";
    }
}