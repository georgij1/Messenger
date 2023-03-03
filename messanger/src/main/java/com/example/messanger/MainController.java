package com.example.messanger;

import com.auth0.jwt.JWT;
import com.example.messanger.auth.User.UserRepo;
import com.example.messanger.auth.forms.LoginForm;
import com.example.messanger.auth.forms.RegistrationForm;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;

@Controller
@RequestMapping("/")
@AllArgsConstructor
public class MainController {
    UserRepo userRepo;
    @GetMapping
    public String start_page() {return "start_page";}

    @GetMapping("settings")
    public String settings(Model model, RegistrationForm registrationForm) {
        //model.addAttribute("PhoneNumber", userRepository.selectPhoneNumber(registrationForm));
        System.out.println(registrationForm.getLogin());
        //System.out.println(userRepository.select_username(registrationForm));
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
                    return "home_page";
                }
            }
        }

        return "main_page";
    }
}