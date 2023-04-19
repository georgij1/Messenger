package com.example.messanger.aop.JWT_AUTH;

import com.auth0.jwt.JWT;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;

@Aspect
@Component
@AllArgsConstructor
public class AuthorizedUserAspect {

    HttpServletRequest request;
    HttpServletResponse response;

    @Around("@within(com.example.messanger.aop.JWT_AUTH.AuthorizedUser) || @annotation(com.example.messanger.aop.JWT_AUTH.AuthorizedUser)")
    public Object checkUser(ProceedingJoinPoint joinPoint) throws Throwable {

        var cookies = request.getCookies();

        if (cookies == null) {
            return "redirect:/login";
        }

        String token = null;

        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("auth_token")) {
                token = cookie.getValue();
                break;
            }
        }

        try {
            var json = JWT.decode(token.formatted("utf-8")).getSubject();
            ((Model) joinPoint.getArgs()[1]).addAttribute("username", json);
            return joinPoint.proceed();
        }

        catch (org.springframework.dao.DataIntegrityViolationException exception) {
            return "redirect:/login";
        }
    }
}
