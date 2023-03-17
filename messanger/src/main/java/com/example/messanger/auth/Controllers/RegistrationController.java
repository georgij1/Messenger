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
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Objects;

@Controller
@RequestMapping
@AllArgsConstructor
public class RegistrationController {
    public UserRepo userRepo;

    public static String UPLOAD_DIRECTORY = "uploads";

    @GetMapping("registration")
    public String registration_redirect(HttpServletResponse response, HttpServletRequest request) {
        var cookies = request.getCookies();
        String token = null;

        if (cookies == null) {
            return "registration";
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

        return "registration";
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
                            String DirectotyPath = "../messanger/src/main/resources/static/uploads" + "/" + registrationForm.getLogin();
                            File directory = new File(DirectotyPath);
                            if (!directory.exists()) {
                                boolean result = directory.mkdir();
                                System.out.println(result);
                                if (result) {
                                    System.out.println("Directory is create");
                                    userRepo.create(registrationForm, model, "../image/settings/icon_profile.png");
                                    System.out.println(DirectotyPath);
                                }

                                else {
                                    System.out.println("Error on create directory");
                                }
                            }
                            else {
                                System.out.println("Directory is exists");
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


//                        ClassLoader classLoader = getClass().getClassLoader();
//                        System.out.println(classLoader);
//                        new File(Objects.requireNonNull(classLoader.getResource("static/uploads")).getFile());

//                        System.out.println(file_new);
//                        new File().;
//                        FileOutputStream outputStream = new FileOutputStream(file_new);
//                        System.out.println(outputStream);
//                        outputStream.write(file.getBytes());
//                        outputStream.close();
                    }
                return "redirect:login";
            }

            else {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST);
                return "registration";
            }
        }

        else {
            response.sendError(400, "Пароль и повторение пароля меньше 8");
        }

        return "registration";
    }
}