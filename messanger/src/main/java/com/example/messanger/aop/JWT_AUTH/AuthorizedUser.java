package com.example.messanger.aop.JWT_AUTH;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/*
    Аннотация для jwt token
    Аннотация не используется в таких контроллерах как:
        1) auth/Controllers/LoginController
        2) auth/Controllers/RegistrationController
    В остальных она используется
    Обязательным условием для jwt token является прописать в параметрах функции.
    К примеру:
        @GetMapping("/getUserPage")
        public String getUserPage(HttpServletRequest request, Model model) {
            //тело метода
        }
* */
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface AuthorizedUser {
}
