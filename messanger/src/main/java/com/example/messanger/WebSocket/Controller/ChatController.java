// Контроллер для группового чата

package com.example.messanger.WebSocket.Controller;

import com.example.messanger.WebSocket.model.ChatMessage;
import com.example.messanger.WebSocket.model.UpdateMessage;
import com.example.messanger.aop.JWT_AUTH.AuthorizedUser;
import com.example.messanger.auth.forms.Messages.FormEditMessage;
import com.example.messanger.auth.forms.chat_form.AccessChat;
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
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Controller
@RequestMapping("/")
@AllArgsConstructor
public class ChatController {
    public JdbcTemplate jdbcTemplate;

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage (@Payload ChatMessage chatMessage) {
        int sender_id = Integer.parseInt(chatMessage.getSender());
        int chat_id = Integer.parseInt(chatMessage.getChat_id());
        KeyHolder keyHolder = new GeneratedKeyHolder();
        String sql = "insert into public.message(text, sender_id, chat_id, time_stamp_short, time_stamp_long, type, id_image, image_name, data) values (?, ?, ?, ?, ?, 'text', 'TextMessage', 'TextMessage', 0)";
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

        System.out.println(keyHolder.getKey());

        System.out.println(jdbcTemplate.queryForList("select username from users where id=?", sender_id));
        chatMessage.setSender((String) jdbcTemplate.queryForMap("select username from users where id=?", sender_id).get("username"));
        chatMessage.setImage((String) jdbcTemplate.queryForMap("select image from users where id=?", sender_id).get("image"));
        chatMessage.setGetMessage(jdbcTemplate.queryForMap("select get from message where id_message=?", keyHolder.getKey()).get("get").toString());
        chatMessage.setReadMessage(jdbcTemplate.queryForMap("select read from message where id_message=?", keyHolder.getKey()).get("read").toString());

        System.out.println("Read" + jdbcTemplate.queryForList("select read from message"));
        System.out.println("Get" + jdbcTemplate.queryForList("select get from message"));

        return chatMessage;
    }

    @MessageMapping("/chat.deleteMessage")
    @SendTo("topic/public")
    public ChatMessage deleteMessage (@Payload ChatMessage chatMessage) {
        chatMessage.setIDMessage(chatMessage.getIDMessage());
        jdbcTemplate.update("delete from message where id_message=?", chatMessage.getIDMessage());
        return chatMessage;
    }

//    @MessageMapping("chat.updateMessage")
//    @SendTo("topic/public")
//    public UpdateMessage updateMessage (@Payload UpdateMessage chatMessage) {
//        chatMessage.setIDMessage(chatMessage.getIDMessage());
//        System.out.println(chatMessage.getIDMessage());
//        System.out.println(chatMessage.getContent());
//        System.out.println(chatMessage);
//        chatMessage.setContent(chatMessage.getContent());
//        chatMessage.setIDMessage(chatMessage.getIDMessage());
//        jdbcTemplate.update("update message set text=? where id_message=?", chatMessage.getContent(), chatMessage.getIDMessage());
//        return chatMessage;
//    }

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
        jdbcTemplate.update("update message set text=? where id_message=?", formEditMessage.getMessage(), id);
        return jdbcTemplate.queryForList("select * from message where id_message=?", id);
    }

    @GetMapping("/chat/{id}")
    @AuthorizedUser
    public String OpenChat(@PathVariable String id, Model model, HttpServletRequest request) {
        model.addAttribute("IdChat", id);
        return "chat_websocket/OpeningChat";
    }

    @PostMapping("/Find/{UserNameChat}")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> FindUsersByChatName(@PathVariable String UserNameChat) {
        return jdbcTemplate.queryForList("select * from users_chat where chat_nane=?", UserNameChat);
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