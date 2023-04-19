// Контроллер для получения доступа в чат

package com.example.messanger.WebSocket.Controller.Access;

import com.example.messanger.auth.forms.chat_form.UserPostAccessChat;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping
@AllArgsConstructor
public class SendAccessToChat {
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/UserPostAccessChat")
    @CrossOrigin("*")
    @ResponseBody
    public String SendAccessToChatPost(@RequestBody UserPostAccessChat userPostAccessChat) {
        System.out.println(userPostAccessChat.getUsernameSentOfferAccess());
        System.out.println(userPostAccessChat.getChat_name());
        System.out.println(userPostAccessChat.getUsernameOwnerChat());
        jdbcTemplate.update("insert into public.send_access_to_chat_post(usernamefromsent, chat_name, usernametosent, access) values (?, ?, ?, false)", userPostAccessChat.getUsernameSentOfferAccess(), userPostAccessChat.getChat_name(), userPostAccessChat.getUsernameOwnerChat());
        return "[{\"AccessStatus\":\"success send\"}]";
    }
}