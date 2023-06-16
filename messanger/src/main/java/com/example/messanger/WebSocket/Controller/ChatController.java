// Контроллер для группового чата

package com.example.messanger.WebSocket.Controller;

import com.auth0.jwt.JWT;
import com.example.messanger.WebSocket.WebSocketForm.GetStatusUser;
import com.example.messanger.WebSocket.model.ChatMessage;
import com.example.messanger.auth.forms.Messages.FormEditMessage;
import com.example.messanger.auth.forms.chat_form.AccessChat;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.*;

@Controller
@RequestMapping("/")
@AllArgsConstructor
public class ChatController {
    public JdbcTemplate jdbcTemplate;

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        Objects.requireNonNull(headerAccessor.getSessionAttributes()).put("username", chatMessage.getSender());
        return chatMessage;
    }

    @PostMapping("/edit_message/{id}")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> EditMessage(@PathVariable int id, @RequestBody FormEditMessage formEditMessage) {
        jdbcTemplate.update("update message set text=?, time_stamp_short=?, time_stamp_long=? where id_message=?", formEditMessage.getMessage(), formEditMessage.getTime_stamp_short(), formEditMessage.getTime_stamp_long(), id);
        return jdbcTemplate.queryForList("select * from message where id_message=?", id);
    }

    @GetMapping("/chat/{id}/{Username}/{ChatName}")
    public String OpenChat(@PathVariable int id, @PathVariable String Username, @PathVariable String ChatName, Model model, HttpServletRequest request) {
        var ChatIdGetDB = jdbcTemplate.queryForObject("select exists(select id from chat where id=?)", Boolean.class, id);
        var isUserNameExists = jdbcTemplate.queryForObject("select exists(select name from users_chat where name=? and chat_nane=?)", Boolean.class, Username, ChatName);
        var isAdminNameExists = jdbcTemplate.queryForObject("select exists(select owner from chat where owner=? and name=?)", Boolean.class, Username, ChatName);
        var cookies = request.getCookies();

        if (cookies == null) {
            return "redirect:/login";
        }

        String token = null;

        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("auth_token")) {
                token = cookie.getValue();
                break;
            }
        }

        try {
            var json = JWT.decode(token.formatted("utf-8")).getSubject();
            model.addAttribute("username", json);

            System.out.println(isUserNameExists + " " + ChatIdGetDB + " " + isAdminNameExists);

            if (Boolean.TRUE.equals(ChatIdGetDB) && Boolean.TRUE.equals(isAdminNameExists)) {
                System.out.println("chat is exist and admin exist in chat");
                model.addAttribute("IdChat", id);
                return "chat_websocket/OpeningChat";
            }

            else if (Boolean.TRUE.equals(ChatIdGetDB) && Boolean.TRUE.equals(isUserNameExists)) {
                System.out.println("chat is exist and username exist in chat");
                model.addAttribute("IdChat", id);
                return "chat_websocket/OpeningChat";
            }

            else {
                System.out.println("else run no boolean if");
                return "chat_websocket/not_valid_chat_url";
            }
        }

        catch (org.springframework.dao.DataIntegrityViolationException exception) {
            return "redirect:/login";
        }
    }

    @PostMapping("/Find/{UserNameChat}")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> FindUsersByChatName(@PathVariable String UserNameChat) {
        return jdbcTemplate.queryForList("select * from users_chat where chat_nane=?", UserNameChat);
    }

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage (@Payload ChatMessage chatMessage) {
        int sender_id = Integer.parseInt(chatMessage.getSender());
        int chat_id = Integer.parseInt(chatMessage.getChat_id());
        KeyHolder keyHolder = new GeneratedKeyHolder();
        String sql = "insert into public.message(text, sender_id, chat_id, time_stamp_short, time_stamp_long, type, id_image_message, image_name, data) values (?, ?, ?, ?, ?, 'text', 'TextMessage', 'TextMessage', 0)";
        jdbcTemplate.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                PreparedStatement preparedStatement = con.prepareStatement(sql, new String[]{"id_message"});
                preparedStatement.setString(1, chatMessage.getContent());
                preparedStatement.setInt(2, sender_id);
                preparedStatement.setInt(3, chat_id);
                preparedStatement.setString(4, chatMessage.GetTimeStampShort());
                preparedStatement.setString(5, chatMessage.GetTimeStampLong());
                return preparedStatement;
            }
        }, keyHolder);

        chatMessage.setIDMessage(Objects.requireNonNull(keyHolder.getKey()).toString());

        chatMessage.setSender((String) jdbcTemplate.queryForMap("select username from users where id=?", sender_id).get("username"));
        chatMessage.setImage((String) jdbcTemplate.queryForMap("select id_image from users where id=?", sender_id).get("id_image"));
        chatMessage.setGetMessage(jdbcTemplate.queryForMap("select get from message where id_message=?", keyHolder.getKey()).get("get").toString());
        chatMessage.setReadMessage(jdbcTemplate.queryForMap("select read from message where id_message=?", keyHolder.getKey()).get("read").toString());

        return chatMessage;
    }

    @MessageMapping("/statusUser")
    @SendTo("/topic/public")
    @CrossOrigin("*")
    @ResponseBody
    public GetStatusUser  FindUserOffOnLine(@Payload GetStatusUser getStatusUser) {
        getStatusUser.setList_ONOFLineUser(
                jdbcTemplate.queryForList("select * from users_chat where chat_nane=?", getStatusUser.getNameChat())
        );

        return getStatusUser;
    }

    @PostMapping("/Access")
    @CrossOrigin("*")
    @ResponseBody
    public String Access(@RequestBody AccessChat accessChat) {
        var is_available = jdbcTemplate.queryForObject("select exists(select * from users_chat where name=? and chat_nane=?)", Boolean.class, accessChat.getUsername(), accessChat.getNameChat());
        var is_available1 = jdbcTemplate.queryForObject("select exists(select * from chat where owner=? and name=?)",  Boolean.class, accessChat.getUsername(), accessChat.getNameChat());

        System.out.println(is_available);
        System.out.println(is_available1);

        if (Boolean.TRUE.equals(is_available)) {
            System.out.println("success with user");
            return "[{\"status\":\"success\"}]";
        }

        else if (Boolean.TRUE.equals(is_available1)) {
            return "[{\"status\":\"success\"}]";
        }

        else {
            System.out.println("permission denied");
            return "[{\"status\":\"permission denied\"}]";
        }
    }
}