//Контроллер для уведомлений

package com.example.messanger.Controllers;

import com.example.messanger.aop.JWT_AUTH.AuthorizedUser;
import com.example.messanger.auth.forms.Rings.AllRequestAccessChatForm;
import com.example.messanger.auth.forms.Rings.DeleteRequest;
import com.example.messanger.auth.forms.Rings.RequestAccessChatNotCheckedForm;
import com.example.messanger.auth.forms.Rings.SetRequestAccessChatStatusForm;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Controller
@RequestMapping
@AllArgsConstructor
public class RingsController {
    private JdbcTemplate jdbcTemplate;

    @AuthorizedUser
    @GetMapping("/rings")
    public String Rings(HttpServletRequest request, Model model) {
        return "user/rings";
    }

    @PostMapping("/rings/AllRequestAccessChat")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> AllRequestAccessChat(@RequestBody AllRequestAccessChatForm allRequestAccessChatForm) {
        System.out.println(allRequestAccessChatForm.getUsername_from_sent());
        return jdbcTemplate.queryForList("select * from public.send_access_to_chat_post where usernametosent=?", allRequestAccessChatForm.getUsername_from_sent());
    }

    @DeleteMapping("/request/delete/chat")
    @CrossOrigin("*")
    @ResponseBody
    public HttpServletResponse DeleteRequestChat(
            @RequestBody DeleteRequest deleteRequest,
            HttpServletResponse response
    ) {
        var isNoteExist = jdbcTemplate.queryForObject("select exists(select * from send_access_to_chat_post where usernamefromsent=? and chat_name=?)",
                Boolean.class,
                deleteRequest.getUsername_from_sent(),
                deleteRequest.getChat_name()
        );

        if (Boolean.TRUE.equals(isNoteExist)) {
            jdbcTemplate.update("delete from send_access_to_chat_post where chat_name=? and usernamefromsent=?",
                    deleteRequest.getChat_name(),
                    deleteRequest.getUsername_from_sent()
            );
            response.setStatus(200);
        }

        else {
            response.setStatus(404);
        }

        return response;
    }

    @PostMapping("/rings/SentRequestAccessChat")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> SentRequestAccessChat(@RequestBody AllRequestAccessChatForm allRequestAccessChatForm) {
        System.out.println(allRequestAccessChatForm.getUsername_from_sent());
        return jdbcTemplate.queryForList("select * from public.send_access_to_chat_post where usernametosent=? and access=true and cancel=false", allRequestAccessChatForm.getUsername_from_sent());
    }

    @PostMapping("/rings/CheckRequestAccessChat")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> CheckRequestAccessChat(@RequestBody AllRequestAccessChatForm allRequestAccessChatForm) {
        System.out.println(allRequestAccessChatForm.getUsername_from_sent());
        return jdbcTemplate.queryForList("select * from public.send_access_to_chat_post where usernametosent=? and access=true and order_status=false and cancel=false", allRequestAccessChatForm.getUsername_from_sent());
    }

    @PostMapping("/rings/CancelRequestAccessChat")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> CancelRequestAccessChat(@RequestBody AllRequestAccessChatForm allRequestAccessChatForm) {
        System.out.println(allRequestAccessChatForm.getUsername_from_sent());
        return jdbcTemplate.queryForList("select * from public.send_access_to_chat_post where usernamefromsent=? and access=false and order_status=false and cancel=true", allRequestAccessChatForm.getUsername_from_sent());
    }

    @PostMapping("/rings/UpdateRequestAccessChatStatus")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> SetRequestAccessChatStatus(@RequestBody SetRequestAccessChatStatusForm setRequestAccessChatStatusForm) {
        System.out.println(setRequestAccessChatStatusForm);

        if (Objects.equals(setRequestAccessChatStatusForm.getAccess(), "true")) {
            System.out.println("Админ принял заявку");
            jdbcTemplate.update("update send_access_to_chat_post set access=true where id=?", setRequestAccessChatStatusForm.getId());
            jdbcTemplate.update("update send_access_to_chat_post set order_status=false where id=?", setRequestAccessChatStatusForm.getId());
            jdbcTemplate.update("insert into users_chat(name, chat_nane, image_user) values (?, ?, ?)", setRequestAccessChatStatusForm.getUsername(), setRequestAccessChatStatusForm.getChat_nane(), setRequestAccessChatStatusForm.getImage_user());
        }

        else {
            System.out.println("Админ отклонил заявку");
            jdbcTemplate.update("update send_access_to_chat_post set order_status=false, cancel=true, access=false where id=?", setRequestAccessChatStatusForm.getId());
        }

        return jdbcTemplate.queryForList("select * from send_access_to_chat_post");
    }

    @PostMapping("/rings/RequestAccessChatNotChecked")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> RequestAccessChatNotChecked(@RequestBody RequestAccessChatNotCheckedForm requestAccessChatNotCheckedForm) {
        return jdbcTemplate.queryForList("select * from send_access_to_chat_post where usernamefromsent!=? and order_status=true", requestAccessChatNotCheckedForm.getUsername());
    }
}