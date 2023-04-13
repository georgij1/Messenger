package com.example.messanger.auth.Controllers;

import com.example.messanger.auth.User.UserRepo;
import com.example.messanger.auth.forms.RegistrationForm;
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
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;

@Controller
@RequestMapping
@AllArgsConstructor
public class RegistrationController {
    public UserRepo userRepo;

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

    public JdbcTemplate jdbcTemplate;

    @PostMapping("registration")
    public String registration_user(RegistrationForm registrationForm, Model model, HttpServletResponse response, HttpServletRequest request, @RequestParam("avatar") MultipartFile file) throws IOException {
        if ((Objects.equals(registrationForm.getPassword(), "😩🍆💦💦💦")) && (Objects.equals(registrationForm.getRepeatPassword(), "😩🍆💦💦💦"))) {
            response.sendError(400);
        }

        else if ((registrationForm.getLogin().length() > 0 && registrationForm.getPassword().length() >= 8 && registrationForm.getRepeatPassword().length() >= 8)) {
            if ((Objects.equals(registrationForm.getPassword(), registrationForm.getRepeatPassword()))) {
                System.out.println(file.getOriginalFilename());
                    System.out.println(file.getOriginalFilename());
                    if (Objects.equals(file.getOriginalFilename(), "")) {
                            String DirectoryPath = "../messanger/src/main/resources/static/uploads" + "/" + registrationForm.getLogin();
                            File directory = new File(DirectoryPath);
                            if (!directory.exists()) {
                                boolean result = directory.mkdir();
                                System.out.println(result);

                                if (result) {
                                    System.out.println("Directory is create");
                                    userRepo.create(registrationForm, model, "../image/settings/icon_profile.png");
                                    System.out.println(DirectoryPath);
                                    return "/auth/ErrorsPage/success_create_account";
                                }

                                else {
                                    return "/auth/ErrorsPage/error_register";
                                }
                            }

                            else {
                                return "/auth/ErrorsPage/error_name";
                            }
                    }

                    else {
                        new File("../messanger/src/main/resources/static/uploads/" + registrationForm.getLogin()).mkdirs();
                        String fileName = "../messanger/src/main/resources/static/uploads/" + registrationForm.getLogin() + "/" + file.getOriginalFilename();
                        String filePathDB = "/uploads/" + registrationForm.getLogin() + "/" + file.getOriginalFilename();
                        userRepo.create(registrationForm, model, filePathDB);
                        response.setStatus(HttpServletResponse.SC_SEE_OTHER);
                        StringBuilder fileNames = new StringBuilder();
                        Path fileNameAndPath = Paths.get(fileName);
                        fileNames.append(file.getOriginalFilename());
                        Files.write(fileNameAndPath, file.getBytes());
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