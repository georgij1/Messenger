package com.example.messanger.auth.User;

import com.example.messanger.auth.forms.LoginForm;
import com.example.messanger.auth.forms.MessageForm;
import com.example.messanger.auth.forms.RegistrationForm;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RestController;

@Service
@AllArgsConstructor
@Repository
public class UserRepo {
    public JdbcTemplate jdbcTemplate;

    public boolean save_message(MessageForm messageForm, Model model) {
        try {
            if (messageForm.getMessage_send().length() > 0) {
                jdbcTemplate.update(
                        "insert into public.message(message) values (?)",
                        messageForm.getMessage_send()
                );
            }

            else {
                model.addAttribute("ErrorAddMessage", "Ошибка в отправки сообщения");
            }
        }

        catch (DataAccessException exception) {
            return false;
        }

        return true;
    }

    public boolean create(RegistrationForm registrationForm, Model model) {
        try {
            if (registrationForm.getLogin().length() > 0) {
                jdbcTemplate.update(
                        "insert into public.users(username, password_hash, number_phone, email) values (?, ?, ?, ?)",
                        registrationForm.getLogin(),
                        BCrypt.hashpw(registrationForm.getPassword(), BCrypt.gensalt()),
                        registrationForm.getNumberPhone(),
                        registrationForm.getEmail()
                        // registrationForm.getAvatar()
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

    public boolean validPassword(String username, String password){
        var hashed = jdbcTemplate.queryForObject(
                "select password_hash from users where username=?", String.class, username);
        return BCrypt.checkpw(password, hashed);
    }
}