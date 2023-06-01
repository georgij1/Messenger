// Контроллер для создания группового чата (3 и более человек)
package com.example.messanger.Controllers;

import com.example.messanger.aop.JWT_AUTH.AuthorizedUser;
import com.example.messanger.auth.forms.chat_form.AddUserChat;
import com.example.messanger.auth.forms.chat_form.FormCreateChat;
import com.example.messanger.auth.forms.chat_form.UpdateDescChat;
import com.example.messanger.auth.forms.chat_form.UpdateNameChat;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping
@AllArgsConstructor
public class CreateChat {
    public JdbcTemplate jdbcTemplate;

    @AuthorizedUser
    @GetMapping("websocket_chat")
    public String chat(HttpServletRequest request, Model model) {
        return "chat_websocket/index";
    }

    @PostMapping("/create_chat")
    @CrossOrigin("*")
    public String CreateChat_1(@RequestBody FormCreateChat formCreateChat, HttpServletRequest request, Model model) {

        jdbcTemplate.update("insert into public.chat(name, desc_chat, type, owner) values (?, ?, ?, ?)", formCreateChat.getName_chat(), formCreateChat.getDesc_chat(), formCreateChat.getType(), formCreateChat.getOwner());

        String getUserChat = String.join(" ", formCreateChat.getUser_chat());

        for (int cursor = 0; cursor < formCreateChat.getUser_chat().size(); ++cursor) {
            jdbcTemplate.update(
                    "insert into users_chat(name, chat_nane, image_user) values (?, ?, ?)",
                    formCreateChat.getUser_chat().get(cursor),
                    formCreateChat.getName_chat(),
                    formCreateChat.getImageUser().get(cursor));
        }

        System.out.println(formCreateChat.getUser_chat());
        System.out.println("formCreateChat.getUser_chat().toArray().length - "+ formCreateChat.getUser_chat().toArray().length);
        System.out.println("getUserChat - " + getUserChat);

        return "chat_websocket/index";
    }

    @PostMapping("/AddUserChatAdmin")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> AddUserChatAdmin(@RequestBody AddUserChat addUserChat) {
        System.out.println("ChatName - " + addUserChat.getChat_name());
        System.out.println("NameUser - " + addUserChat.getName());
        System.out.println("ImageUser - " + addUserChat.getImage_user());

        for (int cursor = 0; cursor < addUserChat.getName().size(); ++cursor) {
            System.out.println("for is running");

            var isExists = jdbcTemplate.queryForObject("select exists(select name from users_chat where name=? and chat_nane=?)", Boolean.class, addUserChat.getName().get(cursor), addUserChat.getChat_name());

            if (Boolean.TRUE.equals(isExists)) {
                System.out.println("The same Object");
            }

            else {
                System.out.println("The Object is not same");
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
    @GetMapping("find/by/NameChat/{ChatName}")
    public List<Map<String, Object>> FindByChatName(@PathVariable String ChatName) {
        return jdbcTemplate.queryForList("select * from chat where name like ?", ChatName + '%');
    }
}