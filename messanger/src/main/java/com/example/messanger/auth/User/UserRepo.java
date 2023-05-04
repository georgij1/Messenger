// В этом файле описаны запросы такие как:
//  get, post и delete

package com.example.messanger.auth.User;

import com.auth0.jwt.JWT;
import com.example.messanger.auth.forms.AccountsSettings.EditPerson;
import com.example.messanger.auth.forms.AuthForm.RegistrationForm;
import com.example.messanger.auth.forms.Users.UsernameUserID;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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
    public boolean create(RegistrationForm registrationForm, Model model, String fileName) {
        try {
            if (registrationForm.getLogin().length() > 0) {
                jdbcTemplate.update(
                        "insert into public.users(username, password_hash, image) values (?, ?, ?)",
                        registrationForm.getLogin(),
                        BCrypt.hashpw(registrationForm.getPassword(), BCrypt.gensalt()),
                        fileName
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

    // Метод для проверки пароля и успешной авторизации
    public boolean validPassword(String username, String password){
        var hashed = jdbcTemplate.queryForObject(
                "select password_hash from users where username=?", String.class, username);
        return BCrypt.checkpw(password, hashed);
    }

    // Получение списка всех пользователей
    @GetMapping("all_users")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> all_users() {
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
                model.addAttribute( "icon_profile", jdbcTemplate.queryForList("select image from users where username=?", json));
                return jdbcTemplate.queryForList("select * from users where username=?", json);
            }
        }
        return null;
    }

    // Получение списка всех сообщений
    @GetMapping("/all_message")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> all_message() {
        return jdbcTemplate.queryForList("select * from message");
    }

    // Получения конкретного пользователя по username по условии where
        @PostMapping("/username")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> userChatID(@RequestBody UsernameUserID usernameUserID) {
        return jdbcTemplate.queryForList("select id from users where username=?", usernameUserID.getUsername());
    }

    // Удаления сообщения по id
    @ResponseBody
    @CrossOrigin("*")
    @DeleteMapping("delete_message/{id}")
    public List<Map<String, Object>> delete_message(@PathVariable int id) {
        jdbcTemplate.update("delete from message where id_message=?", id);
        return jdbcTemplate.queryForList("select * from message");
    }

    // Удаления пользователя по id
    @ResponseBody
    @CrossOrigin("*")
    @DeleteMapping("delete_user/{id}/{id_1}")
    public List<Map<String, Object>> delete_user(@PathVariable String id, @PathVariable int id_1) {
        jdbcTemplate.update("delete from message where sender_id=?", id);
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

    // Получение колл-во username
    @ResponseBody
    @CrossOrigin("*")
    @GetMapping("count/username")
    public List<Map<String, Object>> getCountUserName(HttpServletRequest request) {
        return jdbcTemplate.queryForList("select count(username) from public.users");
    }

    // Получение списка всех чатов
    @ResponseBody
    @CrossOrigin("*")
    @GetMapping("list_chats")
    public List<Map<String, Object>> getListChats() {
        return jdbcTemplate.queryForList("select * from chat where type='group_chat'");
    }

    // Получения id пользователя
    @ResponseBody
    @CrossOrigin("*")
    @GetMapping("GetIdPerson/{UserName}")
    public List<Map<String, Object>> getUserId(@PathVariable String UserName) {
        return jdbcTemplate.queryForList("select * from users where username=?", UserName);
    }

    @ResponseBody
    @CrossOrigin("*")
    @PostMapping("EditPersonsById/{IdPerson}")
    public List<Map<String, Object>> EditPersonsById (@PathVariable int IdPerson, @RequestBody EditPerson editPerson) {
        jdbcTemplate.update("update users set username=? where id=?", editPerson.getNewUsername(), IdPerson);
        return jdbcTemplate.queryForList("select * from users");
    }
}