package com.example.messanger.auth.Controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Date;
import java.util.Objects;

@Controller
@RequestMapping
@AllArgsConstructor
public class LoginConroller {
    public UserRepo userRepository;

    @GetMapping("login")
    public String login(HttpServletRequest request, HttpServletResponse response, Model model) {
        var cookies = request.getCookies();

        String token = null;

        if (cookies == null) {
            return "login";
        }

        else {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("auth_token")) {
                    token = cookie.getValue();
                }
            }
        }

        try {
            if (token != null) {
                return "redirect:/main_page";
            }
        }

        catch (NullPointerException exception) {
            model.addAttribute("error_login", "Ошибка в логин");
        }

        return "login";
    }

    @PostMapping("login")
    public String login(LoginForm form, Model model, RegistrationForm registrationForm, HttpServletResponse response, HttpServletRequest request) {
        var cookies = request.getCookies();
        String token = null;

        if (cookies == null) {
            if (Objects.equals(form.getLogin(), "")) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }

            else {
                try {
                    if (token != null) {
                        response.setStatus(HttpServletResponse.SC_SEE_OTHER);
                        return "redirect:/main_page";
                    }

                    else {
                        String secret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXUyJ9.eyJpc3MiOiJhdXRoMCJ9.AbIJTDMFc7yUa5MhvcP03nJPyCPzZtQcGEp-zWfOkEE";

                        try {
                            if (form.getLogin().length() > 8 && form.getPassword().length() > 8) {
                                if (userRepository.validPassword(form.getLogin(), form.getPassword())) {
                                    model.addAttribute("username", userRepository.select_username(registrationForm));
//                                    model.addAttribute("PhoneNumber", userRepository.selectPhoneNumber(registrationForm));
//                                    System.out.println(userRepository.selectPhoneNumber());
                                    try {
                                        Algorithm algorithm = Algorithm.HMAC512(secret);
                                        String jwtToken = JWT.create()
                                                .withIssuer(form.getLogin())
                                                .withClaim("userId", "1234")
                                                .withSubject(form.getLogin())
                                                .withIssuedAt(new Date())
                                                .withExpiresAt(new Date(System.currentTimeMillis() + 50000L))
                                                .sign(algorithm);
                                        JWTVerifier verifier = JWT.require(Algorithm.HMAC512(secret))
                                                .build();
                                        DecodedJWT decodedJWT = verifier.verify(jwtToken);
                                        Cookie cookie = new Cookie("auth_token", jwtToken);
                                        response.addCookie(cookie);
                                    } catch (JWTCreationException | org.springframework.dao.EmptyResultDataAccessException |
                                             org.springframework.dao.DataIntegrityViolationException exception) {
                                    }
                                    return "redirect:/main_page";
                                }
                            }
                        }

                        catch (org.springframework.dao.EmptyResultDataAccessException | org.springframework.dao.DataIntegrityViolationException exception) {
                            model.addAttribute("not_valid_user", "Такого пользователя не существует");
                            return "login";
                        }
                    }
                }

                catch (NullPointerException exception) {
                    model.addAttribute("error_login", "Ошибка в логине");
                }
            }

            return "login";
        }

        return "login";
    }
}