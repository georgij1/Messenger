// Контроллер для создания группового чата (3 и более человек)
package com.example.messanger.Controllers;

import com.example.messanger.aop.JWT_AUTH.AuthorizedUser;
import com.example.messanger.auth.forms.chat_form.AddUserChat;
import com.example.messanger.auth.forms.chat_form.FormCreateChat;
import com.example.messanger.auth.forms.chat_form.UpdateDescChat;
import com.example.messanger.auth.forms.chat_form.UpdateNameChat;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.parser.Parser;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping
@AllArgsConstructor
public class CreateChat {
    public JdbcTemplate jdbcTemplate;

    @AuthorizedUser
    @GetMapping("/websocket_chat")
    public String chat(HttpServletRequest request, Model model) {
        return "chat_websocket/index";
    }

    @PostMapping("/create_chat")
    @CrossOrigin("*")
    public String CreateChat_1(@RequestBody FormCreateChat formCreateChat, HttpServletRequest request, Model model) {

        jdbcTemplate.update("insert into public.chat(name, desc_chat, type, owner, time_creator) values (?, ?, ?, ?, ?)", formCreateChat.getName_chat(), formCreateChat.getDesc_chat(), formCreateChat.getType(), formCreateChat.getOwner(), formCreateChat.getTime_creator());

        for (int cursor = 0; cursor < formCreateChat.getUser_chat().size(); ++cursor) {
            jdbcTemplate.update(
                    "insert into users_chat(name, chat_nane, image_user) values (?, ?, ?)",
                    formCreateChat.getUser_chat().get(cursor),
                    formCreateChat.getName_chat(),
                    formCreateChat.getImageUser().get(cursor));
        }

        return "chat_websocket/index";
    }

    @PostMapping("/AddUserChatAdmin")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> AddUserChatAdmin(@RequestBody AddUserChat addUserChat) {
        for (int cursor = 0; cursor < addUserChat.getName().size(); ++cursor) {
            System.out.println("for is running");

            var isExistsUsers = jdbcTemplate.queryForObject("select exists(select name from users_chat where name=? and chat_nane=?)", Boolean.class, addUserChat.getName().get(cursor), addUserChat.getChat_name());
            var isExistsAdmin = jdbcTemplate.queryForObject("select exists(select owner from chat where owner=? and name=?)", Boolean.class, addUserChat.getName().get(cursor), addUserChat.getChat_name());

            System.out.println(isExistsAdmin);
            System.out.println(isExistsUsers);

            if (Boolean.TRUE.equals(isExistsAdmin)) {
                System.out.println("The same Object Admin if");
            }

            else if (Boolean.TRUE.equals(isExistsUsers)) {
                System.out.println("The same Object user if");
            }
            else {
                System.out.println("The Object is not same else");
                jdbcTemplate.update("insert into users_chat (name, chat_nane, image_user) values (?, ?, ?)",
                        addUserChat.getName().get(cursor),
                        addUserChat.getChat_name(),
                        addUserChat.getImage_user().get(cursor));
            }
        }

        return jdbcTemplate.queryForList("select * from users_chat");
    }

    @PostMapping("/users/{chat_id}")
    @CrossOrigin("*")
    public List<Map<String, Object>> getUsersChat(@PathVariable String chat_id) {
        return jdbcTemplate.queryForList("select * from users_chat where name=?", chat_id);
    }

    @PostMapping("/chats/{ChatId}")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> OpenChat(@PathVariable String ChatId) {
        return jdbcTemplate.queryForList("select * from users join message m on users.id = m.sender_id where chat_id=? order by id_message", ChatId);
    }

    @PostMapping("/MyChats/{owner_chat}")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> MyChats(@PathVariable String owner_chat) {
        return jdbcTemplate.queryForList("select * from chat join users_chat m on chat.owner = m.name where m.name=? and owner=?", owner_chat, owner_chat);
    }

    @PostMapping("/ChatName/{IdChat}")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> ChatName(@PathVariable int IdChat) {
        return jdbcTemplate.queryForList("select * from chat where id=?", IdChat);
    }

    @PostMapping("/EditNameChat/{id}")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> EditNameChat1(@PathVariable int id, @RequestBody UpdateNameChat updateNameChat) {
        jdbcTemplate.update("update chat set name=? where id=?", updateNameChat.getNewNameChat(), id);
        return jdbcTemplate.queryForList("select * from chat");
    }

    @PostMapping("/EditDescChat/{id}")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> EditDescChat(@PathVariable int id, @RequestBody UpdateDescChat updateDescChat) {
        jdbcTemplate.update("update chat set desc_chat=? where id=?", updateDescChat.getNewNameDescChat(), id);
        return jdbcTemplate.queryForList("select * from chat");
    }

    @DeleteMapping("/delete_chat/{StringId}/{IntegerId}")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> DeleteChat_1(@PathVariable String StringId, @PathVariable int IntegerId) {
        jdbcTemplate.update("delete from public.message where chat_id=?", StringId);
        jdbcTemplate.update("delete from public.users_chat where chat_nane=?", jdbcTemplate.queryForMap("select name from chat where id=?", IntegerId).get("name"));
        jdbcTemplate.update("delete from public.chat where id=?", IntegerId);
        return jdbcTemplate.queryForList("select * from chat");
    }

    @DeleteMapping("/DeleteUser/{ChatId}")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> EditUserChatAdmin(@PathVariable int ChatId) {
        jdbcTemplate.update("delete from users_chat where id=?", ChatId);
        return jdbcTemplate.queryForList("select * from users_chat");
    }

    @DeleteMapping("/DeleteUser/{UserName}/{NameChat}")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> LogOutUserChat(@PathVariable String UserName, @PathVariable String NameChat) {
        jdbcTemplate.update("delete from users_chat where name=? and chat_nane=?", UserName, NameChat);
        return jdbcTemplate.queryForList("select * from users_chat");
    }

    // Получение списка всех чатов
    @ResponseBody
    @CrossOrigin("*")
    @GetMapping("list_chats")
    public List<Map<String, Object>> getListChats() {
        return jdbcTemplate.queryForList("select * from chat where type='group_chat'");
    }

    // Получение списка всех сообщений
    @GetMapping("/all_message")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> all_message() {
        return jdbcTemplate.queryForList("select * from message");
    }

    // Удаления сообщения по id
    @ResponseBody
    @CrossOrigin("*")
    @DeleteMapping("delete_message/{id}")
    public List<Map<String, Object>> delete_message(@PathVariable int id) {
        jdbcTemplate.update("delete from message where id_message=?", id);
        return jdbcTemplate.queryForList("select * from message");
    }

    @ResponseBody
    @CrossOrigin("*")
    @GetMapping("find/by/NameChat/{UserNameQuery}/{ChatName}")
    public List<Map<String, Object>> FindByChatName(@PathVariable String UserNameQuery, @PathVariable String ChatName) throws IOException {
        var isFound = jdbcTemplate.queryForObject("select exists(select * from chat where name like ?)", Boolean.class,ChatName + '%');

        jdbcTemplate.update("insert into query_history_find_chat (username, query) values (?, ?)", UserNameQuery, ChatName);

        if (Boolean.TRUE.equals(isFound)) {
            return jdbcTemplate.queryForList("select * from chat where name like ?", ChatName + '%');
        }

        else {
            return jdbcTemplate.queryForList("select exists(select * from chat where name like ?)", ChatName + '%');
        }
    }

    @ResponseBody
    @CrossOrigin("*")
    @GetMapping("find/history_query/{username}/pagination/offset/{count_element}/limit/{count_element1}")
    public List<Map<String, Object>> GetAllQueryUsernamePagination(@PathVariable int count_element, @PathVariable int count_element1, @PathVariable String username) {
        System.out.println(jdbcTemplate.queryForList("select count(*) from query_history_find_chat where username=?", username));
        return jdbcTemplate.queryForList("select * from query_history_find_chat where username=? offset ? limit ?", username, count_element, count_element1);
    }

    @ResponseBody
    @CrossOrigin("*")
    @GetMapping("count/list/{username}/history/query/find/chat")
    public List<Map<String, Object>> count_history(@PathVariable String username) {
        return jdbcTemplate.queryForList("select count(*) from query_history_find_chat where username=?", username);
    }

    @ResponseBody
    @CrossOrigin("*")
    @DeleteMapping("/clear/query/history/{username}")
    public List<Map<String, Object>> DeleteByUserNameHistoryQuery(@PathVariable String username) {
        jdbcTemplate.update("delete from query_history_find_chat where username=?", username);
        return jdbcTemplate.queryForList("select * from query_history_find_chat");
    }

    @ResponseBody
    @CrossOrigin("*")
    @GetMapping("/filter/asc/order/name")
    public List<Map<String, Object>> AscOrderByName() {
        return jdbcTemplate.queryForList("select * from chat where type='group_chat' order by name");
    }

    @ResponseBody
    @CrossOrigin("*")
    @GetMapping("/filter/desc/order/name")
    public List<Map<String, Object>> DescOrderByName() {
        return jdbcTemplate.queryForList("select * from chat where type='group_chat' order by name desc");
    }

    @ResponseBody
    @CrossOrigin("*")
    @GetMapping("/filter/time/order/time")
    public List<Map<String, Object>> OrderByTime() {
        return jdbcTemplate.queryForList("select * from chat order by time_creator");
    }
}