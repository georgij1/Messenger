// Контроллер для share

package com.example.messanger.share;

import com.example.messanger.aop.JWT_AUTH.AuthorizedUser;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.HttpRequestHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ShareController {
    @GetMapping("/share/TextMessage/{TextMessage}")
    @AuthorizedUser
    public String share(HttpServletRequest request, Model model, @PathVariable String TextMessage) {
        model.addAttribute("share_text", TextMessage);
        return "user/share/ShareTextMessage";
    }

    @GetMapping("/share/ImageMessage/files/{ChatId}/{ImageID}")
    @AuthorizedUser
    public String ShareImage(HttpServletRequest request, Model model, @PathVariable String ImageID, @PathVariable String ChatId) {
        model.addAttribute("ImageId", ImageID);
        model.addAttribute("ChatId", ChatId);
        String FullPath = "/files/" + ChatId + "/" + ImageID;
        model.addAttribute("FullPath", FullPath);
        return "user/share/ShareImageMessage";
    }
}
