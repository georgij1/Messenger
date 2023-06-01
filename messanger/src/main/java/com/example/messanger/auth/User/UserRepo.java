// В этом файле описаны запросы такие как:
//  get, post и delete

package com.example.messanger.auth.User;

import com.auth0.jwt.JWT;
import com.example.messanger.auth.forms.AuthForm.RegistrationForm;
import com.example.messanger.auth.forms.Users.UsernameUserID;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.config.authentication.PasswordEncoderParser;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.StandardPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.beans.Encoder;
import java.nio.file.StandardCopyOption;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
@Repository
@Controller
@RequestMapping("/")
@CrossOrigin("*")
public class UserRepo {
    public JdbcTemplate jdbcTemplate;

    // Метод для создания аккаунта
    public boolean create(RegistrationForm registrationForm, Model model) {
        try {
            System.out.println("try");

            if (registrationForm.getLogin().length() > 0) {
                System.out.println("if");
                System.out.println(registrationForm);
                jdbcTemplate.update(
                        "insert into public.users(username, password_hash, id_image, data, type) values (?, ?, 'DefaultAva', 0, 'image/default')",
                        registrationForm.getLogin(),
                        BCrypt.hashpw(registrationForm.getPassword(), BCrypt.gensalt())
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

    // Метод для проверки пароля
    public boolean validPassword(String username, String password){
        var hashed = jdbcTemplate.queryForObject("select password_hash from users where username=?", String.class, username);
        return BCrypt.checkpw(password, hashed);
    }

    // Получение списка всех пользователей
    @GetMapping("all_users")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> all_users() {
        return jdbcTemplate.queryForList("select * from users");
    }

    @GetMapping("/password/encode/{IdUser}")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> GetNormalPassword (@PathVariable int IdUser) {
        System.out.println(IdUser);
        Object GetPasswordHash = jdbcTemplate.queryForMap("select password_hash from users where id=?", IdUser).get("password_hash");
        System.out.println(GetPasswordHash);
        System.out.println(jdbcTemplate.queryForMap("select password_hash from users where id=?", IdUser).get("password_hash"));
        return jdbcTemplate.queryForList("select * from users");
    }

    // Получение изображения пользователя
    @GetMapping("/image_profile")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> image_profile(HttpServletRequest request, Model model) {
        var cookies = request.getCookies();
        String token = null;
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("auth_token")) {
                token = cookie.getValue();
                var json = JWT.decode(token.formatted("utf-8")).getSubject();
                model.addAttribute("username", json);
                model.addAttribute("all_message", jdbcTemplate.queryForList("select * from public.message"));
//                model.addAttribute( "icon_profile", jdbcTemplate.queryForList("select image_url from users where username=?", json));
                return jdbcTemplate.queryForList("select * from users where username=?", json);
            }
        }
        return null;
    }

    // Получения конкретного пользователя по username по условии where
    @PostMapping("/username")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> userChatID(@RequestBody UsernameUserID usernameUserID) {
        return jdbcTemplate.queryForList("select id from users where username=?", usernameUserID.getUsername());
    }

    // Удаления пользователя по id
    @ResponseBody
    @CrossOrigin("*")
    @DeleteMapping("delete_user/{id}/{id_1}")
    public List<Map<String, Object>> delete_user(@PathVariable String id, @PathVariable int id_1) {
        jdbcTemplate.update("delete from message where sender_id=?", id_1);
        jdbcTemplate.update("delete from chat where owner=(select username from users where id=?)", id_1);
        jdbcTemplate.update("delete from public.users where id=?", id_1);
        jdbcTemplate.update("delete from users_chat where name=(select username from users where id=?)", id_1);
        return jdbcTemplate.queryForList("select * from users");
    }

    // Получение пользователя по id
    @ResponseBody
    @CrossOrigin("*")
    @GetMapping("user/id")
    public List<Map<String, Object>> getUserID(HttpServletRequest request) {
        var cookies = request.getCookies();
        String token = null;
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("auth_token")) {
                token = cookie.getValue();
                break;
            }
        }

        var json = JWT.decode(token.formatted("utf-8")).getSubject();
        return jdbcTemplate.queryForList("select id from public.users where username=?", json);
    }
}