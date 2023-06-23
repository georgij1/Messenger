// Controllers for MainPage

package com.example.messanger;

import com.auth0.jwt.JWT;
import com.example.messanger.aop.JWT_AUTH.AuthorizedUser;
import com.example.messanger.auth.User.UserRepo;
import com.example.messanger.auth.forms.AuthForm.LoginForm;
import com.example.messanger.auth.forms.AuthForm.RegistrationForm;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Controller
@RequestMapping("/")
@AllArgsConstructor
public class MainController {
    UserRepo userRepo;
    @GetMapping
    public String start_page(HttpServletRequest request, Model model) {
        var cookies = request.getCookies();
        String token = null;

        if (cookies == null) {
            return "start_page";
        }

        else {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("auth_token")) {
                    token = cookie.getValue();
                    System.out.println(token);
                    var json = JWT.decode(token.formatted("utf-8")).getSubject();
                    System.out.println(json);
                    model.addAttribute("username", json);
                    return "/user/home_page";
                }
            }
        }

        return "start_page";
    }

    public JdbcTemplate jdbcTemplate;

    @GetMapping("settings")
    @AuthorizedUser
    public String settings(HttpServletRequest request, Model model) {
        return "user/settings";
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
                    return "/user/home_page";
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