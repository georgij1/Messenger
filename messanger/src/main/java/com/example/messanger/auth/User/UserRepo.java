package com.example.messanger.auth.User;

import com.auth0.jwt.JWT;
import com.example.messanger.auth.forms.RegistrationForm;
import io.jsonwebtoken.io.IOException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.dao.DataAccessException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.InputStream;
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

    public boolean create(RegistrationForm registrationForm, Model model, String fileName) {
        try {
            if (registrationForm.getLogin().length() > 0) {
                jdbcTemplate.update(
                        "insert into public.users(username, password_hash, number_phone, email, image) values (?, ?, ?, ?, ?)",
                        registrationForm.getLogin(),
                        BCrypt.hashpw(registrationForm.getPassword(), BCrypt.gensalt()),
                        registrationForm.getNumberPhone(),
                        registrationForm.getEmail(),
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

    public String select_username(RegistrationForm registrationForm) {
        return jdbcTemplate.queryForObject("select username from users where username=?", String.class, registrationForm.getLogin());
    }

    public boolean validPassword(String username, String password){
        var hashed = jdbcTemplate.queryForObject(
                "select password_hash from users where username=?", String.class, username);
        return BCrypt.checkpw(password, hashed);
    }

    @GetMapping("all_users")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> all_users() {
        return jdbcTemplate.queryForList("select username from users");
    }

    @GetMapping("/image_profile")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> image_profile(HttpServletRequest request, Model model) {
        var cookies = request.getCookies();
        String token = null;
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("auth_token")) {
                token = cookie.getValue();
                System.out.println(token);
                var json = JWT.decode(token.formatted("utf-8")).getSubject();
                System.out.println(json);
                model.addAttribute("username", json);
                model.addAttribute("all_message", jdbcTemplate.queryForList("select * from public.message"));
                model.addAttribute( "icon_profile", jdbcTemplate.queryForList("select image from users where username=?", json));
                System.out.println(jdbcTemplate.queryForList("select image from users where username=?", json));
                return jdbcTemplate.queryForList("select image from users where username=?", json);
            }
        }
        return null;
    }

    /*    @GetMapping("/image_profile")
    public ResponseEntity<byte[]> getImage(HttpServletRequest request, Model model) throws IOException, java.io.IOException {

        var cookies = request.getCookies();
        String token;

        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("auth_token")) {
                token = cookie.getValue();
                System.out.println(token);
                var json = JWT.decode(token.formatted("utf-8")).getSubject();
                System.out.println(json);
                model.addAttribute("username", json);
                model.addAttribute("all_message", jdbcTemplate.queryForList("select * from public.message"));
                model.addAttribute( "icon_profile", jdbcTemplate.queryForList("select image from users where username=?", json));
                System.out.println(jdbcTemplate.queryForList("select image from users where username=?", json));

                System.out.println(jdbcTemplate.queryForObject("select image from users where username=?", String.class, json));

                ClassLoader classLoader = getClass().getClassLoader();
                InputStream inputStream = classLoader.getResourceAsStream(jdbcTemplate.queryForObject("select image from users where username=?", String.class, json));
                byte[] imageBytes = IOUtils.toByteArray(inputStream);
                return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
            }
        }
        return null;
    }
 */

    @GetMapping("/all_message")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> all_message() {
        System.out.println(jdbcTemplate.queryForList("select * from message"));
        return jdbcTemplate.queryForList("select * from message");
    }

    @ResponseBody
    @CrossOrigin("*")
    @DeleteMapping("delete_message/{id}")
    public List<Map<String, Object>> delete_message(@PathVariable int id) {
        jdbcTemplate.update("delete from public.message where id=?", id);
        return jdbcTemplate.queryForList("select * from message");
    }
}