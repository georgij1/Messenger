package com.example.messanger.WebSocket.Controller;

import com.auth0.jwt.JWT;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import java.io.File;
import java.io.IOException;

@Controller
@RequestMapping("/")
public class AddPhotoController {
    @GetMapping("/add_photo")
    public String add_photo(HttpServletRequest request, HttpServletResponse response, Model model) {
        var cookies = request.getCookies();
        String token = null;

        if (cookies == null) {
            return "redirect:/";
        }

        else {
            for (Cookie cookie : cookies) {
                try {
                    token = cookie.getValue();
                    var json = JWT.decode(token.formatted("utf-8")).getSubject();
                    return "chat_websocket/add_image";
                } catch (org.springframework.dao.DataIntegrityViolationException exception) {
                    return "redirect:/";
                }
            }
        }
        return "chat_websocket/add_image";
    }

    @PostMapping("/add_photo")
    public String upload_file(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes, HttpServletResponse response, HttpServletRequest request) throws IOException {
        var cookies = request.getCookies();
        String token = null;

        if (cookies == null) {
            return "redirect:/";
        }

        else {
            for (Cookie cookie : cookies) {
                try {
                    token = cookie.getValue();
                    var json = JWT.decode(token.formatted("utf-8")).getSubject();
                    redirectAttributes.addFlashAttribute("message", "You successfully uploaded " + file.getOriginalFilename() + "!");
                    String fileName = "/uploads" + '/' + json + '/' + file.getOriginalFilename();
                    System.out.println(fileName);
                    StringBuilder fileNames_1 = new StringBuilder();
                    System.out.println(fileNames_1);
                    Boolean directory = new File("uploads/" + json).mkdir();
                    System.out.println(directory);
                    return "chat_websocket/add_image";
                }

                catch (org.springframework.dao.DataIntegrityViolationException exception) {
                    return "redirect:/";
                }
            }
        }
        return "chat_websocket/add_image";
    }
}