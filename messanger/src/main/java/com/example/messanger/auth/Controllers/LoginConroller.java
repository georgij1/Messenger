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

import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.Objects;

@Controller
@RequestMapping
@AllArgsConstructor
public class LoginConroller {
    public UserRepo userRepository;

    // controller for visible pages auth/login.html in browser
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

    // Controller for auth - for add jwt tokens
    @PostMapping("login")
    public String login(LoginForm form, Model model, RegistrationForm registrationForm, HttpServletResponse response, HttpServletRequest request) {
        var cookies = request.getCookies();
        String token = null;

        System.out.println(form);

        if (cookies == null) {
            System.out.println("cookies is " + cookies);
            if (Objects.equals(form.getLogin(), "")) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                System.out.println("form_login is null" + "or is " + form.getLogin());
                System.out.println("Objects.equals(form.getLogin(), \"\")");
                return "/auth/ErrorsPage/error_login";
            }

            else if (Objects.equals(form.getPassword(), "")) {
                System.out.println("Objects.equals(form.getPassword(), \"\")");
                return "/auth/ErrorsPage/password_not_correct";
            }

            else {
                System.out.println("else");
                try {
                    if (token != null) {
                        response.setStatus(HttpServletResponse.SC_SEE_OTHER);
                        System.out.println("jwt token not null");
                        return "redirect:/main_page";
                    }

                    else {
                        System.out.println("jwt token is null");
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

//                                        if (decodedJWT == verifier.verify(jwtToken)) {
//                                            System.out.println("if decoded jwt");
                                            Cookie cookie = new Cookie("auth_token", jwtToken);
                                            response.addCookie(cookie);
                                            response.setStatus(200);
//                                        }
//
//                                        else {
//                                            System.out.println("else decoded jwt");
//                                            response.sendError(404, "Error in verified jwt token");
//                                        }
                                    }

                                    catch (JWTCreationException | org.springframework.dao.EmptyResultDataAccessException | org.springframework.dao.DataIntegrityViolationException ignored) {
                                        System.out.println("catch - JWTCreationException | org.springframework.dao.EmptyResultDataAccessException | org.springframework.dao.DataIntegrityViolationException ignored");
                                    }

//                                    catch (IOException e) {
//                                        throw new RuntimeException(e);
//                                    }

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

        else {
            return "/auth/login";
        }
    }
}