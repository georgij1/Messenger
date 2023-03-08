package com.example.messanger.auth.Controllers;

import com.example.messanger.auth.User.UserRepo;
import com.example.messanger.auth.forms.RegistrationForm;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
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

    public static String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "/uploads";

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

    @PostMapping("registration")
    public String registration_user(RegistrationForm registrationForm, Model model, HttpServletResponse response, HttpServletRequest request, @RequestParam("avatar") MultipartFile file) throws IOException {
        if ((Objects.equals(registrationForm.getPassword(), "😩🍆💦💦💦")) && (Objects.equals(registrationForm.getRepeatPassword(), "😩🍆💦💦💦"))) {
            response.sendError(400);
        }

        else if ((registrationForm.getLogin().length() > 0 && registrationForm.getPassword().length() >= 8 && registrationForm.getRepeatPassword().length() >= 8)) {
            if ((Objects.equals(registrationForm.getPassword(), registrationForm.getRepeatPassword()))) {
                userRepo.create(registrationForm, model);
                response.setStatus(HttpServletResponse.SC_SEE_OTHER);
                StringBuilder fileNames = new StringBuilder();
                new File("uploads/" + registrationForm.getLogin()).mkdirs();
                Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, registrationForm.getLogin(), file.getOriginalFilename());
                fileNames.append(file.getOriginalFilename());
                Files.write(fileNameAndPath, file.getBytes());
                return "redirect:login";
            }

            else {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST);
                return "registration";
            }
        }

        else {
            response.setStatus(400);
        }

        return "registration";
    }
}