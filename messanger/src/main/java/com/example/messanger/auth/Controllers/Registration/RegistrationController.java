package com.example.messanger.auth.Controllers.Registration;

import com.example.messanger.auth.Controllers.Registration.models.ModelUser;
import com.example.messanger.auth.User.AvatarCrudRepo;
import com.example.messanger.auth.User.CrudRepository;
import com.example.messanger.auth.User.UserRepo;
import com.example.messanger.auth.forms.AuthForm.RegistrationForm;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;

@Controller
@RequestMapping
@AllArgsConstructor
public class RegistrationController {
    public UserRepo userRepo;
    public JdbcTemplate jdbcTemplate;
    public AvatarCrudRepo crudRepository;

    //  Контроллер для отображения страницы /auth/registration в браузере
    @GetMapping("registration")
    public String registration_redirect(HttpServletResponse response, HttpServletRequest request) {
        var cookies = request.getCookies();
        String token = null;

        if (cookies == null) {
            return "/auth/registration";
        }

        else {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("auth_token")) {
                    token = cookie.getValue();
                }
            }

            if (token != null) {
                return "redirect:/";
            }
        }

        return "/auth/registration";
    }

    private ImageStorageService storageServiceImage;

    @PostMapping("registration")
    public String registration_user(RegistrationForm registrationForm, Model model, HttpServletResponse response, HttpServletRequest request, @RequestParam("avatar") MultipartFile file, ModelUser modelUser) throws IOException {
        if ((Objects.equals(registrationForm.getPassword(), "😩🍆💦💦💦")) && (Objects.equals(registrationForm.getRepeatPassword(), "😩🍆💦💦💦"))) {
            response.sendError(400);
        }

        else if ((registrationForm.getLogin().length() > 0 && registrationForm.getPassword().length() >= 8 && registrationForm.getRepeatPassword().length() >= 8)) {
//            System.out.println(jdbcTemplate.queryForMap("select username from users where username=?", registrationForm.getLogin()).get("username"));
//            .get("username")
            System.out.println(crudRepository.findById(registrationForm.getLogin()));
            if ((Objects.equals(registrationForm.getPassword(), registrationForm.getRepeatPassword()))) {
                if (Boolean.TRUE.equals(jdbcTemplate.queryForObject("select exists(select username from users where username=?)", Boolean.class, registrationForm.getLogin()))) {
                    System.out.println("This user is exists");
                    return "/auth/ErrorsPage/error_name";
                }

                else if (Objects.equals(file.getOriginalFilename(), "")) {
                    userRepo.create(registrationForm, model);
                }

                else {
                    storageServiceImage.SaveUserWithAvatar(file.getContentType(), file.getBytes(), registrationForm.getLogin(), registrationForm.getPassword(), "NameAvatarFile");
                }

                return "redirect:login";
            }

            else {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST);
                return "/auth/registration";
            }
        }

        else {
            return "/auth/ErrorsPage/password_not_correct";
        }

        return "/auth/registration";
    }
}