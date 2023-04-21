package com.example.messanger.auth.Controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.messanger.auth.User.UserRepo;
import com.example.messanger.auth.forms.AuthForm.LoginForm;
import com.example.messanger.auth.forms.AuthForm.RegistrationForm;
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

    //  онтроллер дл€ отображени€ страницы auth/login.html в браузере
    @GetMapping("login")
    public String login(HttpServletRequest request, HttpServletResponse response, Model model) {
        var cookies = request.getCookies();

        String token = null;

        if (cookies == null) {
            return "/auth/login";
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
            return "/auth/ErrorsPage/error_login";
        }

        return "auth/login";
    }

    //  онтроллер дл€ авторизации - дл€ добавлени€ jwt token's
    @PostMapping("login")
    public String login(LoginForm form, Model model, RegistrationForm registrationForm, HttpServletResponse response, HttpServletRequest request) {
        var cookies = request.getCookies();
        String token = null;

        if (cookies == null) {
            System.out.println(cookies + "is null");
            if (Objects.equals(form.getLogin(), "")) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                System.out.println("form_login is null" + "or is " + form.getLogin());
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
                            if (form.getLogin().length() > 0 && form.getPassword().length() >= 8) {
                                if (userRepository.validPassword(form.getLogin(), form.getPassword())) {
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
                                    }

                                    catch (JWTCreationException | org.springframework.dao.EmptyResultDataAccessException | org.springframework.dao.DataIntegrityViolationException ignored) {
                                        System.out.println("catch - JWTCreationException | org.springframework.dao.EmptyResultDataAccessException | org.springframework.dao.DataIntegrityViolationException ignored");
                                    }

                                    return "redirect:/main_page";
                                }
                            }
                        }

                        catch (org.springframework.dao.EmptyResultDataAccessException | org.springframework.dao.DataIntegrityViolationException exception) {
                            return "/auth/ErrorsPage/not_valid_user";
                        }
                    }
                }

                catch (NullPointerException exception) {
                    return "/auth/ErrorsPage/error_login";
                }
            }

            return "/auth/login";
        }

        return "/auth/login";
    }
}