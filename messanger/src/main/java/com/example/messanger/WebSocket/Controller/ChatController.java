// Контроллер для группового чата

package com.example.messanger.WebSocket.Controller;

import com.auth0.jwt.JWT;
import com.example.messanger.WebSocket.WebSocketForm.GetStatusUser;
import com.example.messanger.WebSocket.model.ChatMessage;
import com.example.messanger.auth.forms.Messages.FormEditMessage;
import com.example.messanger.auth.forms.chat_form.AccessChat;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

            else if (Boolean.FALSE.equals(ChatIdGetDB)) {
                System.out.println("else run no boolean if");
                return "chat_websocket/not_valid_chat_url";
            }

            else if (Boolean.FALSE.equals(isAdminNameExists)) {
                model.addAttribute("id_chat", id);
                model.addAttribute("who_username", Username);
                model.addAttribute("chat_name", ChatName);
                model.addAttribute("owner_chat", jdbcTemplate.queryForMap("select * from chat where id=?", id).get("owner"));
                return "chat_websocket/userIsNotExist";
            }

            else {
                return "chat_websocket/error_be";
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

        LocalDateTime myDateObj1 = LocalDateTime.now();
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("HH:mm");
        String ShortTimeStamp = myDateObj1.format(myFormatObj);
        System.out.println("ShortTimeStamp " + ShortTimeStamp);

        // getting month
        java.util.Date date= new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        int month = cal.get(Calendar.MONTH);
        System.out.println(month+1);

        if (month+1 == 1) {
            System.out.println("Январь");
            LocalDateTime myDateObj = LocalDateTime.now();
            DateTimeFormatter myFormatObj2 = DateTimeFormatter.ofPattern("dd" + " Январь" + " yyyy г." + " HH:mm:ss");
            String LongTimeStamp = myDateObj.format(myFormatObj2);
            System.out.println("After formatting: " + LongTimeStamp);

            jdbcTemplate.update(new PreparedStatementCreator() {
                @Override
                public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                    PreparedStatement preparedStatement = con.prepareStatement(sql, new String[]{"id_message"});
                    preparedStatement.setString(1, chatMessage.getContent());
                    preparedStatement.setInt(2, sender_id);
                    preparedStatement.setInt(3, chat_id);
                    preparedStatement.setString(4, ShortTimeStamp);
                    preparedStatement.setString(5, LongTimeStamp);
                    return preparedStatement;
                }
            }, keyHolder);

            chatMessage.setIDMessage(Objects.requireNonNull(keyHolder.getKey()).toString());

            chatMessage.setSender((String) jdbcTemplate.queryForMap("select username from users where id=?", sender_id).get("username"));
            chatMessage.setImage((String) jdbcTemplate.queryForMap("select id_image from users where id=?", sender_id).get("id_image"));
            chatMessage.setGetMessage(jdbcTemplate.queryForMap("select get from message where id_message=?", keyHolder.getKey()).get("get").toString());
            chatMessage.setReadMessage(jdbcTemplate.queryForMap("select read from message where id_message=?", keyHolder.getKey()).get("read").toString());
        }

        else if (month+1 == 2) {
            System.out.println("Февраль");
            LocalDateTime myDateObj = LocalDateTime.now();
            DateTimeFormatter myFormatObj3 = DateTimeFormatter.ofPattern("dd" + " Февраль" + " yyyy г." + " HH:mm:ss");
            String formattedDate2 = myDateObj.format(myFormatObj3);
            System.out.println("After formatting: " + formattedDate2);

            jdbcTemplate.update(new PreparedStatementCreator() {
                @Override
                public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                    PreparedStatement preparedStatement = con.prepareStatement(sql, new String[]{"id_message"});
                    preparedStatement.setString(1, chatMessage.getContent());
                    preparedStatement.setInt(2, sender_id);
                    preparedStatement.setInt(3, chat_id);
                    preparedStatement.setString(4, ShortTimeStamp);
                    preparedStatement.setString(5, formattedDate2);
                    return preparedStatement;
                }
            }, keyHolder);

            chatMessage.setIDMessage(Objects.requireNonNull(keyHolder.getKey()).toString());

            chatMessage.setSender((String) jdbcTemplate.queryForMap("select username from users where id=?", sender_id).get("username"));
            chatMessage.setImage((String) jdbcTemplate.queryForMap("select id_image from users where id=?", sender_id).get("id_image"));
            chatMessage.setGetMessage(jdbcTemplate.queryForMap("select get from message where id_message=?", keyHolder.getKey()).get("get").toString());
            chatMessage.setReadMessage(jdbcTemplate.queryForMap("select read from message where id_message=?", keyHolder.getKey()).get("read").toString());
        }

        else if (month+1 == 3) {
            System.out.println("Март");
            LocalDateTime myDateObj = LocalDateTime.now();
            DateTimeFormatter myFormatObj4 = DateTimeFormatter.ofPattern("dd" + " Март" + " yyyy г." + " HH:mm:ss");
            String formattedDate3 = myDateObj.format(myFormatObj4);
            System.out.println("After formatting: " + formattedDate3);

            jdbcTemplate.update(new PreparedStatementCreator() {
                @Override
                public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                    PreparedStatement preparedStatement = con.prepareStatement(sql, new String[]{"id_message"});
                    preparedStatement.setString(1, chatMessage.getContent());
                    preparedStatement.setInt(2, sender_id);
                    preparedStatement.setInt(3, chat_id);
                    preparedStatement.setString(4, ShortTimeStamp);
                    preparedStatement.setString(5, formattedDate3);
                    return preparedStatement;
                }
            }, keyHolder);

            chatMessage.setIDMessage(Objects.requireNonNull(keyHolder.getKey()).toString());

            chatMessage.setSender((String) jdbcTemplate.queryForMap("select username from users where id=?", sender_id).get("username"));
            chatMessage.setImage((String) jdbcTemplate.queryForMap("select id_image from users where id=?", sender_id).get("id_image"));
            chatMessage.setGetMessage(jdbcTemplate.queryForMap("select get from message where id_message=?", keyHolder.getKey()).get("get").toString());
            chatMessage.setReadMessage(jdbcTemplate.queryForMap("select read from message where id_message=?", keyHolder.getKey()).get("read").toString());
        }

        else if (month+1 == 4) {
            System.out.println("Апрель");
            LocalDateTime myDateObj = LocalDateTime.now();
            DateTimeFormatter myFormatObj5 = DateTimeFormatter.ofPattern("dd" + " Апрель" + " yyyy г." + " HH:mm:ss");
            String formattedDate4 = myDateObj.format(myFormatObj5);
            System.out.println("After formatting: " + formattedDate4);

            jdbcTemplate.update(new PreparedStatementCreator() {
                @Override
                public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                    PreparedStatement preparedStatement = con.prepareStatement(sql, new String[]{"id_message"});
                    preparedStatement.setString(1, chatMessage.getContent());
                    preparedStatement.setInt(2, sender_id);
                    preparedStatement.setInt(3, chat_id);
                    preparedStatement.setString(4, ShortTimeStamp);
                    preparedStatement.setString(5, formattedDate4);
                    return preparedStatement;
                }
            }, keyHolder);

            chatMessage.setIDMessage(Objects.requireNonNull(keyHolder.getKey()).toString());

            chatMessage.setSender((String) jdbcTemplate.queryForMap("select username from users where id=?", sender_id).get("username"));
            chatMessage.setImage((String) jdbcTemplate.queryForMap("select id_image from users where id=?", sender_id).get("id_image"));
            chatMessage.setGetMessage(jdbcTemplate.queryForMap("select get from message where id_message=?", keyHolder.getKey()).get("get").toString());
            chatMessage.setReadMessage(jdbcTemplate.queryForMap("select read from message where id_message=?", keyHolder.getKey()).get("read").toString());
        }

        else if (month+1 == 5) {
            System.out.println("Май");
            LocalDateTime myDateObj = LocalDateTime.now();
            DateTimeFormatter myFormatObj6 = DateTimeFormatter.ofPattern("dd" + " Май" + " yyyy г." + " HH:mm:ss");
            String formattedDate5 = myDateObj.format(myFormatObj6);
            System.out.println("After formatting: " + formattedDate5);

            jdbcTemplate.update(new PreparedStatementCreator() {
                @Override
                public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                    PreparedStatement preparedStatement = con.prepareStatement(sql, new String[]{"id_message"});
                    preparedStatement.setString(1, chatMessage.getContent());
                    preparedStatement.setInt(2, sender_id);
                    preparedStatement.setInt(3, chat_id);
                    preparedStatement.setString(4, ShortTimeStamp);
                    preparedStatement.setString(5, formattedDate5);
                    return preparedStatement;
                }
            }, keyHolder);

            chatMessage.setIDMessage(Objects.requireNonNull(keyHolder.getKey()).toString());

            chatMessage.setSender((String) jdbcTemplate.queryForMap("select username from users where id=?", sender_id).get("username"));
            chatMessage.setImage((String) jdbcTemplate.queryForMap("select id_image from users where id=?", sender_id).get("id_image"));
            chatMessage.setGetMessage(jdbcTemplate.queryForMap("select get from message where id_message=?", keyHolder.getKey()).get("get").toString());
            chatMessage.setReadMessage(jdbcTemplate.queryForMap("select read from message where id_message=?", keyHolder.getKey()).get("read").toString());
        }

        else if (month+1 == 6) {
            System.out.println("Июнь");
            LocalDateTime myDateObj = LocalDateTime.now();
            DateTimeFormatter myFormatObj7 = DateTimeFormatter.ofPattern("dd" + " Июнь" + " yyyy г." + " HH:mm:ss");
            String formattedDate6 = myDateObj.format(myFormatObj7);
            System.out.println("After formatting: " + formattedDate6);

            jdbcTemplate.update(new PreparedStatementCreator() {
                @Override
                public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                    PreparedStatement preparedStatement = con.prepareStatement(sql, new String[]{"id_message"});
                    preparedStatement.setString(1, chatMessage.getContent());
                    preparedStatement.setInt(2, sender_id);
                    preparedStatement.setInt(3, chat_id);
                    preparedStatement.setString(4, ShortTimeStamp);
                    preparedStatement.setString(5, formattedDate6);
                    return preparedStatement;
                }
            }, keyHolder);

            chatMessage.setIDMessage(Objects.requireNonNull(keyHolder.getKey()).toString());

            chatMessage.setSender((String) jdbcTemplate.queryForMap("select username from users where id=?", sender_id).get("username"));
            chatMessage.setImage((String) jdbcTemplate.queryForMap("select id_image from users where id=?", sender_id).get("id_image"));
            chatMessage.setGetMessage(jdbcTemplate.queryForMap("select get from message where id_message=?", keyHolder.getKey()).get("get").toString());
            chatMessage.setReadMessage(jdbcTemplate.queryForMap("select read from message where id_message=?", keyHolder.getKey()).get("read").toString());
        }

        else if (month+1 == 7) {
            System.out.println("Июль");
            LocalDateTime myDateObj = LocalDateTime.now();
            DateTimeFormatter myFormatObj8 = DateTimeFormatter.ofPattern("dd" + " Июль" + " yyyy г." + " HH:mm:ss");
            String formattedDate7 = myDateObj.format(myFormatObj8);
            System.out.println("After formatting: " + formattedDate7);

            jdbcTemplate.update(new PreparedStatementCreator() {
                @Override
                public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                    PreparedStatement preparedStatement = con.prepareStatement(sql, new String[]{"id_message"});
                    preparedStatement.setString(1, chatMessage.getContent());
                    preparedStatement.setInt(2, sender_id);
                    preparedStatement.setInt(3, chat_id);
                    preparedStatement.setString(4, ShortTimeStamp);
                    preparedStatement.setString(5, formattedDate7);
                    return preparedStatement;
                }
            }, keyHolder);

            chatMessage.setIDMessage(Objects.requireNonNull(keyHolder.getKey()).toString());

            chatMessage.setSender((String) jdbcTemplate.queryForMap("select username from users where id=?", sender_id).get("username"));
            chatMessage.setImage((String) jdbcTemplate.queryForMap("select id_image from users where id=?", sender_id).get("id_image"));
            chatMessage.setGetMessage(jdbcTemplate.queryForMap("select get from message where id_message=?", keyHolder.getKey()).get("get").toString());
            chatMessage.setReadMessage(jdbcTemplate.queryForMap("select read from message where id_message=?", keyHolder.getKey()).get("read").toString());
        }

        else if (month+1 == 8) {
            System.out.println("Август");
            LocalDateTime myDateObj = LocalDateTime.now();
            DateTimeFormatter myFormatObj9 = DateTimeFormatter.ofPattern("dd" + " Август" + " yyyy г." + " HH:mm:ss");
            String formattedDate8 = myDateObj.format(myFormatObj9);
            System.out.println("After formatting: " + formattedDate8);

            jdbcTemplate.update(new PreparedStatementCreator() {
                @Override
                public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                    PreparedStatement preparedStatement = con.prepareStatement(sql, new String[]{"id_message"});
                    preparedStatement.setString(1, chatMessage.getContent());
                    preparedStatement.setInt(2, sender_id);
                    preparedStatement.setInt(3, chat_id);
                    preparedStatement.setString(4, ShortTimeStamp);
                    preparedStatement.setString(5, formattedDate8);
                    return preparedStatement;
                }
            }, keyHolder);

            chatMessage.setIDMessage(Objects.requireNonNull(keyHolder.getKey()).toString());

            chatMessage.setSender((String) jdbcTemplate.queryForMap("select username from users where id=?", sender_id).get("username"));
            chatMessage.setImage((String) jdbcTemplate.queryForMap("select id_image from users where id=?", sender_id).get("id_image"));
            chatMessage.setGetMessage(jdbcTemplate.queryForMap("select get from message where id_message=?", keyHolder.getKey()).get("get").toString());
            chatMessage.setReadMessage(jdbcTemplate.queryForMap("select read from message where id_message=?", keyHolder.getKey()).get("read").toString());
        }

        else if (month+1 == 9) {
            System.out.println("Сентябрь");
            LocalDateTime myDateObj = LocalDateTime.now();
            DateTimeFormatter myFormatObj10 = DateTimeFormatter.ofPattern("dd" + " Сентябрь" + " yyyy г." + "HH:mm:ss");
            String formattedDate9 = myDateObj.format(myFormatObj10);
            System.out.println("After formatting: " + formattedDate9);

            jdbcTemplate.update(new PreparedStatementCreator() {
                @Override
                public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                    PreparedStatement preparedStatement = con.prepareStatement(sql, new String[]{"id_message"});
                    preparedStatement.setString(1, chatMessage.getContent());
                    preparedStatement.setInt(2, sender_id);
                    preparedStatement.setInt(3, chat_id);
                    preparedStatement.setString(4, ShortTimeStamp);
                    preparedStatement.setString(5, formattedDate9);
                    return preparedStatement;
                }
            }, keyHolder);

            chatMessage.setIDMessage(Objects.requireNonNull(keyHolder.getKey()).toString());

            chatMessage.setSender((String) jdbcTemplate.queryForMap("select username from users where id=?", sender_id).get("username"));
            chatMessage.setImage((String) jdbcTemplate.queryForMap("select id_image from users where id=?", sender_id).get("id_image"));
            chatMessage.setGetMessage(jdbcTemplate.queryForMap("select get from message where id_message=?", keyHolder.getKey()).get("get").toString());
            chatMessage.setReadMessage(jdbcTemplate.queryForMap("select read from message where id_message=?", keyHolder.getKey()).get("read").toString());
        }

        else if (month+1 == 10) {
            System.out.println("Октябрь");
            LocalDateTime myDateObj = LocalDateTime.now();
            DateTimeFormatter myFormatObj11 = DateTimeFormatter.ofPattern("dd" + " Октябрь" + " yyyy г." + " HH:mm:ss");
            String formattedDate10 = myDateObj.format(myFormatObj11);
            System.out.println("After formatting: " + formattedDate10);

            jdbcTemplate.update(new PreparedStatementCreator() {
                @Override
                public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                    PreparedStatement preparedStatement = con.prepareStatement(sql, new String[]{"id_message"});
                    preparedStatement.setString(1, chatMessage.getContent());
                    preparedStatement.setInt(2, sender_id);
                    preparedStatement.setInt(3, chat_id);
                    preparedStatement.setString(4, ShortTimeStamp);
                    preparedStatement.setString(5, formattedDate10);
                    return preparedStatement;
                }
            }, keyHolder);

            chatMessage.setIDMessage(Objects.requireNonNull(keyHolder.getKey()).toString());

            chatMessage.setSender((String) jdbcTemplate.queryForMap("select username from users where id=?", sender_id).get("username"));
            chatMessage.setImage((String) jdbcTemplate.queryForMap("select id_image from users where id=?", sender_id).get("id_image"));
            chatMessage.setGetMessage(jdbcTemplate.queryForMap("select get from message where id_message=?", keyHolder.getKey()).get("get").toString());
            chatMessage.setReadMessage(jdbcTemplate.queryForMap("select read from message where id_message=?", keyHolder.getKey()).get("read").toString());
        }

        else if (month+1 == 11) {
            System.out.println("Ноябрь");
            LocalDateTime myDateObj = LocalDateTime.now();
            DateTimeFormatter myFormatObj12 = DateTimeFormatter.ofPattern("dd" + " Ноябрь" + " yyyy г." + " HH:mm:ss");
            String formattedDate11 = myDateObj.format(myFormatObj12);
            System.out.println("After formatting: " + formattedDate11);

            jdbcTemplate.update(new PreparedStatementCreator() {
                @Override
                public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                    PreparedStatement preparedStatement = con.prepareStatement(sql, new String[]{"id_message"});
                    preparedStatement.setString(1, chatMessage.getContent());
                    preparedStatement.setInt(2, sender_id);
                    preparedStatement.setInt(3, chat_id);
                    preparedStatement.setString(4, ShortTimeStamp);
                    preparedStatement.setString(5, formattedDate11);
                    return preparedStatement;
                }
            }, keyHolder);

            chatMessage.setIDMessage(Objects.requireNonNull(keyHolder.getKey()).toString());

            chatMessage.setSender((String) jdbcTemplate.queryForMap("select username from users where id=?", sender_id).get("username"));
            chatMessage.setImage((String) jdbcTemplate.queryForMap("select id_image from users where id=?", sender_id).get("id_image"));
            chatMessage.setGetMessage(jdbcTemplate.queryForMap("select get from message where id_message=?", keyHolder.getKey()).get("get").toString());
            chatMessage.setReadMessage(jdbcTemplate.queryForMap("select read from message where id_message=?", keyHolder.getKey()).get("read").toString());
        }

        else if (month+1 == 12) {
            System.out.println("Декабрь");
            LocalDateTime myDateObj = LocalDateTime.now();
            DateTimeFormatter myFormatObj13 = DateTimeFormatter.ofPattern("dd" + " Декабрь" + " yyyy г." + " HH:mm:ss");
            String formattedDate12 = myDateObj.format(myFormatObj13);
            System.out.println("After formatting: " + formattedDate12);

            jdbcTemplate.update(new PreparedStatementCreator() {
                @Override
                public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                    PreparedStatement preparedStatement = con.prepareStatement(sql, new String[]{"id_message"});
                    preparedStatement.setString(1, chatMessage.getContent());
                    preparedStatement.setInt(2, sender_id);
                    preparedStatement.setInt(3, chat_id);
                    preparedStatement.setString(4, ShortTimeStamp);
                    preparedStatement.setString(5, formattedDate12);
                    return preparedStatement;
                }
            }, keyHolder);

            chatMessage.setIDMessage(Objects.requireNonNull(keyHolder.getKey()).toString());

            chatMessage.setSender((String) jdbcTemplate.queryForMap("select username from users where id=?", sender_id).get("username"));
            chatMessage.setImage((String) jdbcTemplate.queryForMap("select id_image from users where id=?", sender_id).get("id_image"));
            chatMessage.setGetMessage(jdbcTemplate.queryForMap("select get from message where id_message=?", keyHolder.getKey()).get("get").toString());
            chatMessage.setReadMessage(jdbcTemplate.queryForMap("select read from message where id_message=?", keyHolder.getKey()).get("read").toString());
        }

        else {
            LocalDateTime myDateObj = LocalDateTime.now();
            DateTimeFormatter myFormatObj14 = DateTimeFormatter.ofPattern("dd" + " Месяц не удалось определить" + " yyyy г." + " HH:mm:ss");
            String formattedDate13 = myDateObj.format(myFormatObj14);
            System.out.println("After formatting: " + formattedDate13);

            jdbcTemplate.update(new PreparedStatementCreator() {
                @Override
                public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                    PreparedStatement preparedStatement = con.prepareStatement(sql, new String[]{"id_message"});
                    preparedStatement.setString(1, chatMessage.getContent());
                    preparedStatement.setInt(2, sender_id);
                    preparedStatement.setInt(3, chat_id);
                    preparedStatement.setString(4, ShortTimeStamp);
                    preparedStatement.setString(5, formattedDate13);
                    return preparedStatement;
                }
            }, keyHolder);

            chatMessage.setIDMessage(Objects.requireNonNull(keyHolder.getKey()).toString());

            chatMessage.setSender((String) jdbcTemplate.queryForMap("select username from users where id=?", sender_id).get("username"));
            chatMessage.setImage((String) jdbcTemplate.queryForMap("select id_image from users where id=?", sender_id).get("id_image"));
            chatMessage.setGetMessage(jdbcTemplate.queryForMap("select get from message where id_message=?", keyHolder.getKey()).get("get").toString());
            chatMessage.setReadMessage(jdbcTemplate.queryForMap("select read from message where id_message=?", keyHolder.getKey()).get("read").toString());
        }

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

    @PostMapping("/check_valid/name_chat/{name_chat}")
    @ResponseBody
    public boolean chat_validNameChat(@PathVariable String name_chat, HttpServletResponse response, HttpServletRequest request) {
        System.out.println("NameChat " + name_chat);

        var check_valid_name_chat = jdbcTemplate.queryForObject("select exists(select name from chat where name=?)", Boolean.class, name_chat);

        if (Boolean.TRUE.equals(check_valid_name_chat)) {
            System.out.println("This name chat is exists");
            response.setStatus(404);
            return false;
        }

        response.setStatus(200);
        return true;
    }
}