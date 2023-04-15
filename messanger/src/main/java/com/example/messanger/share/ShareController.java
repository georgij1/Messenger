package com.example.messanger.share;

import com.example.messanger.aop.JWT_AUTH.AuthorizedUser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ShareController {

    @GetMapping("/share/{message}")
    @AuthorizedUser
    public String share(@PathVariable String message, Model model) {
        model.addAttribute("share_text", message);
        return "user/share/share";
    }
}
