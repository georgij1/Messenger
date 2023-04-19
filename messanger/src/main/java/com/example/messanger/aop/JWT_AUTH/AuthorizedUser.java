package com.example.messanger.aop.JWT_AUTH;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/*
    ��������� ��� jwt token
    ��������� �� ������������ � ����� ������������ ���:
        1) auth/Controllers/LoginController
        2) auth/Controllers/RegistrationController
    � ��������� ��� ������������
    ������������ �������� ��� jwt token �������� ��������� � ���������� �������.
    � �������:
        @GetMapping("/getUserPage")
        public String getUserPage(HttpServletRequest request, Model model) {
            //���� ������
        }
* */
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface AuthorizedUser {
}
