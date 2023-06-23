// Контроллер для получения доступа в чат

package com.example.messanger.WebSocket.Controller.Access;

import com.example.messanger.auth.forms.chat_form.UserPostAccessChat;
import jakarta.servlet.http.HttpServletResponse;
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
    public void SendAccessToChatPost(
            @RequestBody UserPostAccessChat userPostAccessChat,
            HttpServletResponse response
    ) {
        var isChatExistUserExist = jdbcTemplate.queryForObject("select exists(select * from send_access_to_chat_post where usernamefromsent=? and chat_name=?)", Boolean.class, userPostAccessChat.getUsernameSentOfferAccess(), userPostAccessChat.getChat_name());

        if (Boolean.TRUE.equals(isChatExistUserExist)) {
            response.setStatus(404);
        }
        
        else {
            jdbcTemplate.update(
                    "insert into public.send_access_to_chat_post(usernamefromsent, chat_name, " +
                            "usernametosent, access, info_about_user) " +
                            "values (?, ?, ?, false, ?)",
                    userPostAccessChat.getUsernameSentOfferAccess(),
                    userPostAccessChat.getChat_name(),
                    userPostAccessChat.getUsernameOwnerChat(),
                    userPostAccessChat.getInfoAboutUserForAdmin()
            );
            response.setStatus(200);
        }
    }
}