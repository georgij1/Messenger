// ������������ spring security ��� ������ �� ������� � �������� jwt token

package com.example.messanger.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.logout(logout ->
                logout.logoutUrl("/logout").logoutSuccessUrl("/login").deleteCookies("auth_token"));
        http = http.formLogin().disable().csrf().disable();
        return http.build();
    }
}