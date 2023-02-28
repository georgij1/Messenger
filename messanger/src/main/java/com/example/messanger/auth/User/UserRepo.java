package com.example.messanger.auth.User;

import com.example.messanger.auth.forms.RegistrationForm;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

@Service
@AllArgsConstructor
public class UserRepo {
    public JdbcTemplate jdbcTemplate;

    public boolean create(RegistrationForm registrationForm, Model model) {
        try {
            if (registrationForm.getLogin().length() > 0) {
                jdbcTemplate.update(
                        "insert into public.users(username, password_hash, number_phone, email, image_profile) values (?, ?, ?, ?, ?)",
                        registrationForm.getLogin(),
                        BCrypt.hashpw(registrationForm.getPassword(), BCrypt.gensalt()),
                        registrationForm.getNumberPhone(),
                        registrationForm.getEmail(),
                        registrationForm.getAvatar()
                );
            }

            else {
                model.addAttribute("ErrorCreateUser", "Ошибка в регистрации");
            }
        }

        catch (DataAccessException exception) {
            return false;
        }

        return true;
    }

    public String select_username(RegistrationForm registrationForm) {
        return jdbcTemplate.queryForObject("select username from users where username=?", String.class, registrationForm.getLogin());
    }

    public String selectPhoneNumber(RegistrationForm registrationForm) {
        return jdbcTemplate.queryForObject("select number_phone from public.users where username=?", String.class, registrationForm.getLogin());
    }

    public boolean validPassword(String username, String password){
        var hashed = jdbcTemplate.queryForObject(
                "select password_hash from users where username=?", String.class, username);
        return BCrypt.checkpw(password, hashed);
    }
}