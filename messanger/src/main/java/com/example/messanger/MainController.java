package com.example.messanger;

import com.auth0.jwt.JWT;
import com.example.messanger.auth.User.UserRepo;
import com.example.messanger.auth.forms.LoginForm;
import com.example.messanger.auth.forms.RegistrationForm;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/")
@AllArgsConstructor
public class MainController {
    UserRepo userRepo;
    @GetMapping
    public String start_page() {return "start_page";}

    public JdbcTemplate jdbcTemplate;

    @GetMapping("settings")
    public String settings(Model model, RegistrationForm registrationForm, HttpServletRequest request) {
        var cookies = request.getCookies();
        String token = null;

        if (cookies == null) {
            return "main_page";
        }

        else {
            for (Cookie cookie: cookies) {
                if (cookie.getName().equals("auth_token")) {
                    token = cookie.getValue();
                    System.out.println(token);
                    var json = JWT.decode(token.formatted("utf-8")).getSubject();
                    System.out.println(json);
                    model.addAttribute("username", json);
                    String phone_number = jdbcTemplate.queryForList("select number_phone from users where username=?", json).toString();
                    model.addAttribute("phone_number", phone_number);
                    return "user/settings";
                }
            }
        }
        return "main_page";
    }

    @GetMapping("main_page")
    public String main_page(LoginForm loginForm, RegistrationForm registrationForm, HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {
        var cookies = request.getCookies();
        String token = null;

        if (cookies == null) {
            return "main_page";
        }

        else {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("auth_token")) {
                    token = cookie.getValue();
                    System.out.println(token);
                    var json = JWT.decode(token.formatted("utf-8")).getSubject();
                    System.out.println(json);
                    model.addAttribute("username", json);
                    return "home_page";
                }
            }
        }

        return "main_page";
    }

    @DeleteMapping("main_page")
    public String DeleteUser(HttpServletResponse response, HttpServletRequest request) {
        var cookies = request.getCookies();
        String token = null;

        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("auth_token")) {
                token = cookie.getValue();
                System.out.println(token);
                var json = JWT.decode(token.formatted("utf-8")).getSubject();
                System.out.println(json);
                jdbcTemplate.queryForObject("delete from users where username=?", String.class, json);

                return "redirect:/registration";
            }
        }

        return "redirect:/registration";
    }
}