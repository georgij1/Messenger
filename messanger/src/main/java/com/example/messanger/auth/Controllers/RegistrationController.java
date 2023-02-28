package com.example.messanger.auth.Controllers;

import com.example.messanger.auth.User.UserRepo;
import com.example.messanger.auth.forms.RegistrationForm;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.util.Objects;

@Controller
@RequestMapping
@AllArgsConstructor
public class RegistrationController {
    public UserRepo userRepo;

    @GetMapping("registration")
    public String registration_redirect(HttpServletResponse response, HttpServletRequest request) {
        var cookies = request.getCookies();
        String token = null;

        if (cookies == null) {
            return "registration";
        }

        else {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("auth_token")) {
                    token = cookie.getValue();
                }
            }

            if (token != null) {
                return "redirect:/";
            }
        }

        return "registration";
    }

    @PostMapping("registration")
    public String registration_user(RegistrationForm registrationForm, Model model, HttpServletResponse response, HttpServletRequest request) throws IOException {
        if ((Objects.equals(registrationForm.getPassword(), "😩🍆💦💦💦")) && (Objects.equals(registrationForm.getRepeatPassword(), "😩🍆💦💦💦"))) {
            response.sendError(400);
        }

        else if ((registrationForm.getLogin().length() > 0 && registrationForm.getPassword().length() > 0 && registrationForm.getRepeatPassword().length() > 0)) {
            if ((Objects.equals(registrationForm.getPassword(), registrationForm.getRepeatPassword()))) {
                userRepo.create(registrationForm, model);
                response.setStatus(HttpServletResponse.SC_SEE_OTHER);
                return "redirect:login";
            }

            else {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST);
                return "registration";
            }
        }

        else {
            response.setStatus(400);
        }

        return "registration";
    }
}