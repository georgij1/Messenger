// Controller for create group chat
package com.example.messanger.Controllers;

import com.example.messanger.aop.JWT_AUTH.AuthorizedUser;
import com.example.messanger.auth.forms.chat_form.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.revwalk.RevCommit;
import org.eclipse.jgit.revwalk.RevWalk;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.Ref;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.transport.FetchResult;
import org.eclipse.jgit.transport.RemoteConfig;
import org.eclipse.jgit.transport.URIish;
import org.eclipse.jgit.util.StringUtils;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Date;
import java.util.List;

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

    @GetMapping("/last_commit_date")
    @ResponseBody
    public String getDateLastCommit() {
        try {
            // URL удаленного репозитория
            String remoteRepoUrl = "http://10.3.8.167:8080/git/i21s597/Messanger.git";

            // Создание объекта Git
            Git git = Git.init().call();

            // Получение списка удаленных репозиториев
            List<RemoteConfig> remoteConfigs = git.remoteList().call();

            // Добавление удаленного репозитория
            RemoteConfig remoteConfig = new RemoteConfig(git.getRepository().getConfig(), "origin");
            remoteConfig.addURI(new URIish(remoteRepoUrl));
            remoteConfigs.add(remoteConfig);

            // Выполнение операции fetch для получения информации о репозитории
            FetchResult fetchResult = git.fetch().setRemote("master").call();

            // Получение списка доступных веток
            Collection<Ref> branches = fetchResult.getAdvertisedRefs();

            // Поиск последнего коммита среди всех веток
            Date lastCommitDate = null;
            for (Ref branch : branches) {
                String branchName = branch.getName();
                if (!StringUtils.isEmptyOrNull(branchName) && branchName.startsWith("refs/heads/")) {
                    Iterable<RevCommit> commits = git.log().add(branch.getObjectId()).setMaxCount(1).call();
                    RevCommit lastCommit = commits.iterator().next();
                    if (lastCommitDate == null || lastCommit.getCommitTime() > lastCommitDate.getTime()) {
                        lastCommitDate = new Date(lastCommit.getCommitTime() * 1000L);
                    }
                }
            }

            // getting month
            java.util.Date date= new Date();
            Calendar cal = Calendar.getInstance();
            cal.setTime(date);
            int month = cal.get(Calendar.MONTH);

            if (month+1 == 1) {
                // Форматирование даты
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd Январь yyyy г. HH:mm:ss", new Locale("ru"));
                String formattedDate = dateFormat.format(lastCommitDate);
                return "Дата последнего обновления: " + formattedDate;
            }

            else if (month+1 == 2) {
                // Форматирование даты
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd Февраль yyyy г. HH:mm:ss", new Locale("ru"));
                String formattedDate = dateFormat.format(lastCommitDate);
                return "Дата последнего обновления: " + formattedDate;
            }

            else if (month+1 == 3) {
                // Форматирование даты
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd Март yyyy г. HH:mm:ss", new Locale("ru"));
                String formattedDate = dateFormat.format(lastCommitDate);
                return "Дата последнего обновления: " + formattedDate;
            }

            else if (month+1 == 4) {
                // Форматирование даты
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd Апрель yyyy г. HH:mm:ss", new Locale("ru"));
                String formattedDate = dateFormat.format(lastCommitDate);
                return "Дата последнего обновления: " + formattedDate;
            }

            else if (month+1 == 5) {
                // Форматирование даты
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd Май yyyy г. HH:mm:ss", new Locale("ru"));
                String formattedDate = dateFormat.format(lastCommitDate);
                return "Дата последнего обновления: " + formattedDate;
            }

            else if (month+1 == 6) {
                // Форматирование даты
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd Июнь yyyy г. HH:mm:ss", new Locale("ru"));
                String formattedDate = dateFormat.format(lastCommitDate);
                return "Дата последнего обновления: " + formattedDate;
            }

            else if (month+1 == 7) {
                // Форматирование даты
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd Июль yyyy г. HH:mm:ss", new Locale("ru"));
                String formattedDate = dateFormat.format(lastCommitDate);
                return "Дата последнего обновления: " + formattedDate;
            }

            else if (month+1 == 8) {
                // Форматирование даты
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd Август yyyy г. HH:mm:ss", new Locale("ru"));
                String formattedDate = dateFormat.format(lastCommitDate);
                return "Дата последнего обновления: " + formattedDate;
            }

            else if (month+1 == 9) {
                // Форматирование даты
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd Сентябрь yyyy г. HH:mm:ss", new Locale("ru"));
                String formattedDate = dateFormat.format(lastCommitDate);
                return "Дата последнего обновления: " + formattedDate;
            }

            else if (month+1 == 10) {
                // Форматирование даты
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd Октябрь yyyy г. HH:mm:ss", new Locale("ru"));
                String formattedDate = dateFormat.format(lastCommitDate);
                return "Дата последнего обновления: " + formattedDate;
            }

            else if (month+1 == 11) {
                // Форматирование даты
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd Ноябрь yyyy г. HH:mm:ss", new Locale("ru"));
                String formattedDate = dateFormat.format(lastCommitDate);
                return "Дата последнего обновления: " + formattedDate;
            }

            else if (month+1 == 12) {
                // Форматирование даты
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd Декабрь yyyy г. HH:mm:ss", new Locale("ru"));
                String formattedDate = dateFormat.format(lastCommitDate);
                return "Дата последнего обновления: " + formattedDate;
            }

            else {
                // Форматирование даты
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd MM yyyy г. HH:mm:ss", new Locale("ru"));
                String formattedDate = dateFormat.format(lastCommitDate);
                return "Дата последнего обновления: " + formattedDate;
            }
        } catch (IOException | GitAPIException | URISyntaxException e) {
            e.printStackTrace();
            return "Ошибка в дате последнего обновления";
        }
    }

    @PostMapping("/create_chat")
    @CrossOrigin("*")
    @ResponseBody
    public Boolean CreateChat_1(@RequestBody FormCreateChat formCreateChat, HttpServletResponse response) {
        var isNameChatExist = jdbcTemplate.queryForObject("select exists(select * from chat where name=?)", Boolean.class, formCreateChat.getName_chat());

        if (Boolean.TRUE.equals(isNameChatExist)) {
            response.setStatus(500);
            return false;
        }

        else {

            // getting month
            java.util.Date date= new Date();
            Calendar cal = Calendar.getInstance();
            cal.setTime(date);
            int month = cal.get(Calendar.MONTH);
            System.out.println(month+1);

            if (month+1 == 1) {
                LocalDateTime myDateObj = LocalDateTime.now();
                DateTimeFormatter myFormatObj2 = DateTimeFormatter.ofPattern("dd" + " Январь" + " yyyy г." + " HH:mm:ss");
                String LongTimeStamp = myDateObj.format(myFormatObj2);
                System.out.println(LongTimeStamp);

                jdbcTemplate.update("insert into public.chat(name, desc_chat, type, owner, time_creator) values (?, ?, ?, ?, ?)", formCreateChat.getName_chat(), formCreateChat.getDesc_chat(), formCreateChat.getType(), formCreateChat.getOwner(),
                        LongTimeStamp
                );
            }

            else if (month+1 == 2) {
                LocalDateTime myDateObj = LocalDateTime.now();
                DateTimeFormatter myFormatObj2 = DateTimeFormatter.ofPattern("dd" + " Февраль" + " yyyy г." + " HH:mm:ss");
                String LongTimeStamp = myDateObj.format(myFormatObj2);
                System.out.println(LongTimeStamp);

                jdbcTemplate.update("insert into public.chat(name, desc_chat, type, owner, time_creator) values (?, ?, ?, ?, ?)", formCreateChat.getName_chat(), formCreateChat.getDesc_chat(), formCreateChat.getType(), formCreateChat.getOwner(),
                        LongTimeStamp
                );
            }

            else if (month+1 == 3) {
                LocalDateTime myDateObj = LocalDateTime.now();
                DateTimeFormatter myFormatObj2 = DateTimeFormatter.ofPattern("dd" + " Март" + " yyyy г." + " HH:mm:ss");
                String LongTimeStamp = myDateObj.format(myFormatObj2);
                System.out.println(LongTimeStamp);

                jdbcTemplate.update("insert into public.chat(name, desc_chat, type, owner, time_creator) values (?, ?, ?, ?, ?)", formCreateChat.getName_chat(), formCreateChat.getDesc_chat(), formCreateChat.getType(), formCreateChat.getOwner(),
                        LongTimeStamp
                );
            }

            else if (month+1 == 4) {
                LocalDateTime myDateObj = LocalDateTime.now();
                DateTimeFormatter myFormatObj2 = DateTimeFormatter.ofPattern("dd" + " Апрель" + " yyyy г." + " HH:mm:ss");
                String LongTimeStamp = myDateObj.format(myFormatObj2);
                System.out.println(LongTimeStamp);
            }

            else if (month+1 == 5) {
                LocalDateTime myDateObj = LocalDateTime.now();
                DateTimeFormatter myFormatObj2 = DateTimeFormatter.ofPattern("dd" + " Май" + " yyyy г." + " HH:mm:ss");
                String LongTimeStamp = myDateObj.format(myFormatObj2);
                System.out.println(LongTimeStamp);

                jdbcTemplate.update("insert into public.chat(name, desc_chat, type, owner, time_creator) values (?, ?, ?, ?, ?)", formCreateChat.getName_chat(), formCreateChat.getDesc_chat(), formCreateChat.getType(), formCreateChat.getOwner(),
                        LongTimeStamp
                );
            }

            else if (month+1 == 6) {
                LocalDateTime myDateObj = LocalDateTime.now();
                DateTimeFormatter myFormatObj2 = DateTimeFormatter.ofPattern("dd" + " Июнь" + " yyyy г." + " HH:mm:ss");
                String LongTimeStamp = myDateObj.format(myFormatObj2);
                System.out.println(LongTimeStamp);

                jdbcTemplate.update("insert into public.chat(name, desc_chat, type, owner, time_creator) values (?, ?, ?, ?, ?)", formCreateChat.getName_chat(), formCreateChat.getDesc_chat(), formCreateChat.getType(), formCreateChat.getOwner(),
                        LongTimeStamp
                );
            }

            else if (month+1 == 7) {
                LocalDateTime myDateObj = LocalDateTime.now();
                DateTimeFormatter myFormatObj2 = DateTimeFormatter.ofPattern("dd" + " Июль" + " yyyy г." + " HH:mm:ss");
                String LongTimeStamp = myDateObj.format(myFormatObj2);
                System.out.println(LongTimeStamp);

                jdbcTemplate.update("insert into public.chat(name, desc_chat, type, owner, time_creator) values (?, ?, ?, ?, ?)", formCreateChat.getName_chat(), formCreateChat.getDesc_chat(), formCreateChat.getType(), formCreateChat.getOwner(),
                        LongTimeStamp
                );
            }

            else if (month+1 == 8) {
                LocalDateTime myDateObj = LocalDateTime.now();
                DateTimeFormatter myFormatObj2 = DateTimeFormatter.ofPattern("dd" + " Август" + " yyyy г." + " HH:mm:ss");
                String LongTimeStamp = myDateObj.format(myFormatObj2);
                System.out.println(LongTimeStamp);

                jdbcTemplate.update("insert into public.chat(name, desc_chat, type, owner, time_creator) values (?, ?, ?, ?, ?)", formCreateChat.getName_chat(), formCreateChat.getDesc_chat(), formCreateChat.getType(), formCreateChat.getOwner(),
                        LongTimeStamp
                );
            }

            else if (month+1 == 9) {
                LocalDateTime myDateObj = LocalDateTime.now();
                DateTimeFormatter myFormatObj2 = DateTimeFormatter.ofPattern("dd" + " Сентябрь" + " yyyy г." + " HH:mm:ss");
                String LongTimeStamp = myDateObj.format(myFormatObj2);
                System.out.println(LongTimeStamp);

                jdbcTemplate.update("insert into public.chat(name, desc_chat, type, owner, time_creator) values (?, ?, ?, ?, ?)", formCreateChat.getName_chat(), formCreateChat.getDesc_chat(), formCreateChat.getType(), formCreateChat.getOwner(),
                        LongTimeStamp
                );
            }

            else if (month+1 == 10) {
                LocalDateTime myDateObj = LocalDateTime.now();
                DateTimeFormatter myFormatObj2 = DateTimeFormatter.ofPattern("dd" + " Октябрь" + " yyyy г." + " HH:mm:ss");
                String LongTimeStamp = myDateObj.format(myFormatObj2);
                System.out.println(LongTimeStamp);

                jdbcTemplate.update("insert into public.chat(name, desc_chat, type, owner, time_creator) values (?, ?, ?, ?, ?)", formCreateChat.getName_chat(), formCreateChat.getDesc_chat(), formCreateChat.getType(), formCreateChat.getOwner(),
                        LongTimeStamp
                );
            }

            else if (month+1 == 11) {
                LocalDateTime myDateObj = LocalDateTime.now();
                DateTimeFormatter myFormatObj2 = DateTimeFormatter.ofPattern("dd" + " Ноябрь" + " yyyy г." + " HH:mm:ss");
                String LongTimeStamp = myDateObj.format(myFormatObj2);
                System.out.println(LongTimeStamp);

                jdbcTemplate.update("insert into public.chat(name, desc_chat, type, owner, time_creator) values (?, ?, ?, ?, ?)", formCreateChat.getName_chat(), formCreateChat.getDesc_chat(), formCreateChat.getType(), formCreateChat.getOwner(),
                        LongTimeStamp
                );
            }

            else if (month+1 == 12) {
                LocalDateTime myDateObj = LocalDateTime.now();
                DateTimeFormatter myFormatObj2 = DateTimeFormatter.ofPattern("dd" + " Декабрь" + " yyyy г." + " HH:mm:ss");
                String LongTimeStamp = myDateObj.format(myFormatObj2);
                System.out.println(LongTimeStamp);

                jdbcTemplate.update("insert into public.chat(name, desc_chat, type, owner, time_creator) values (?, ?, ?, ?, ?)", formCreateChat.getName_chat(), formCreateChat.getDesc_chat(), formCreateChat.getType(), formCreateChat.getOwner(),
                        LongTimeStamp
                );
            }

            else {
                LocalDateTime myDateObj = LocalDateTime.now();
                DateTimeFormatter myFormatObj2 = DateTimeFormatter.ofPattern("dd" + " Месяц не удалось определить" + " yyyy г." + " HH:mm:ss");
                String LongTimeStamp = myDateObj.format(myFormatObj2);
                System.out.println(LongTimeStamp);

                jdbcTemplate.update("insert into public.chat(name, desc_chat, type, owner, time_creator) values (?, ?, ?, ?, ?)", formCreateChat.getName_chat(), formCreateChat.getDesc_chat(), formCreateChat.getType(), formCreateChat.getOwner(),
                        LongTimeStamp
                );
            }

            for (int cursor = 0; cursor < formCreateChat.getUser_chat().size(); ++cursor) {
                jdbcTemplate.update(
                        "insert into users_chat(name, chat_nane, image_user) values (?, ?, ?)",
                        formCreateChat.getUser_chat().get(cursor),
                        formCreateChat.getName_chat(),
                        formCreateChat.getImageUser().get(cursor));
            }

            response.setStatus(200);

            return true;
        }
    }

    @PostMapping("/AddUserChatAdmin")
    @CrossOrigin("*")
    @ResponseBody
    public Boolean AddUserChatAdmin(@RequestBody AddUserChat addUserChat, HttpServletResponse response) {
        var isExistsUsers = jdbcTemplate.queryForObject("select exists(select name from users_chat where name=? and chat_nane=?)", Boolean.class, addUserChat.getName(), addUserChat.getChat_name());
        var isExistsAdmin = jdbcTemplate.queryForObject("select exists(select owner from chat where owner=? and name=?)", Boolean.class, addUserChat.getName(), addUserChat.getChat_name());

        System.out.println(isExistsAdmin);
        System.out.println(isExistsUsers);

        if (Boolean.TRUE.equals(isExistsAdmin)) {
            System.out.println("The same Object Admin if");
            response.setStatus(201);
            return false;
        }

        else if (Boolean.TRUE.equals(isExistsUsers)) {
            System.out.println("The same Object user if");
            response.setStatus(400);
            return false;
        }

        else {
            System.out.println("The Object is not same else");
            jdbcTemplate.update("insert into users_chat (name, chat_nane, image_user) values (?, ?, ?)",
                    addUserChat.getName(),
                    addUserChat.getChat_name(),
                    addUserChat.getImage_user());
            response.setStatus(200);
            return true;
        }
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
    public Boolean EditNameChat1(@PathVariable int id, @RequestBody UpdateNameChat updateNameChat, HttpServletResponse response) {
        var existNameChat = jdbcTemplate.queryForObject("select exists(select * from chat where name=? and id=?)", Boolean.class, updateNameChat.getNewNameChat(), id);
        if (Boolean.TRUE.equals(existNameChat)) {
            response.setStatus(400);
            return false;
        }

        else {
            jdbcTemplate.update("update chat set name=? where id=?", updateNameChat.getNewNameChat(), id);
            response.setStatus(200);
            return true;
        }
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

    @DeleteMapping("/DeleteUser/chat")
    @CrossOrigin("*")
    @ResponseBody
    public Boolean EditUserChatAdmin(HttpServletResponse response, @RequestBody DeleteUserChat deleteUserChat) {
        var isExistUser = jdbcTemplate.queryForObject("select exists(select * from users_chat where chat_nane=? and name=?)", Boolean.class, deleteUserChat.getChat_name(), deleteUserChat.getUsername());

        if (Boolean.TRUE.equals(isExistUser)) {
            jdbcTemplate.update("delete from users_chat where chat_nane=? and name=?", deleteUserChat.getChat_name(), deleteUserChat.getUsername());
            response.setStatus(200);
            return true;
        }

        else {
            response.setStatus(400);
            return false;
        }

    }

    @DeleteMapping("/DeleteUser/{UserName}/{NameChat}")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> LogOutUserChat(@PathVariable String UserName, @PathVariable String NameChat) {
        jdbcTemplate.update("delete from users_chat where name=? and chat_nane=?", UserName, NameChat);
        return jdbcTemplate.queryForList("select * from users_chat");
    }

    // get all chats list
    @ResponseBody
    @CrossOrigin("*")
    @GetMapping("list_chats")
    public List<Map<String, Object>> getListChats() {
        return jdbcTemplate.queryForList("select * from chat where type='group_chat'");
    }

    // get all message
    @GetMapping("/all_message")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> all_message() {
        return jdbcTemplate.queryForList("select * from message");
    }

    // delete message by id
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