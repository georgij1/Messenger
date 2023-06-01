package com.example.messanger.auth.Controllers.Registration;

import com.example.messanger.auth.Controllers.Registration.models.ModelUser;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping
public class GetAvatar {
    private ImageStorageService imageStorageService;
    public JdbcTemplate jdbcTemplate;

    @GetMapping("/AvatarImage/{IdUserString}")
    @ResponseBody
    @CrossOrigin("*")
    public Object getListFilesByIdChat(@PathVariable String IdUserString) {
        System.out.println(Boolean.TRUE.equals(jdbcTemplate.queryForObject("select exists(select * from users where username=? and type='image/default')", Boolean.class, IdUserString)));

        if (Boolean.TRUE.equals(jdbcTemplate.queryForObject("select exists(select * from users where username=? and type='image/default')", Boolean.class, IdUserString))) {
            return "[{\"id_image\":\"/image/settings/icon_profile.png\"}]";
        }

        else {
            return jdbcTemplate.queryForList("select * from users where data!=0 and username=?", IdUserString);
        }
    }

    @GetMapping("/AvatarImage/limit/{IdUser}")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> getListFilesByIdChatByLimit(@PathVariable int IdUser) {
        return jdbcTemplate.queryForList("select * from users where data!=0 and id=? limit 10", IdUser);
    }

    @GetMapping("/AvatarImage/{IdUser}/{IdImage}")
    public ResponseEntity<byte[]> getDataImageByIdChat(@PathVariable String IdImage, @PathVariable String IdUser) {
        ModelUser modelUser = imageStorageService.getFileAvatar(IdImage);
        System.out.println(modelUser.getType());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "image/png; image/jpeg; image/gif; filename=\"" + modelUser.getName_image() + "\"")
                .body(modelUser.getData());
    }
}