package com.example.messanger.ChatImage;

import com.example.messanger.ChatImage.model.FileDB;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;

@Controller
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping
public class FileController {
    private FileStorageService storageService;
    public JdbcTemplate jdbcTemplate;

    // controller for load image
    // size image before 3 mb
    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file, FileDB formsGetTimeStamp) {
        System.out.println(file);
        String message;

        try {
            storageService.store(file, formsGetTimeStamp.getTime_stamp_short(), formsGetTimeStamp.getTime_stamp_long(), formsGetTimeStamp.getChat_id(), formsGetTimeStamp.getSender_id(), formsGetTimeStamp.getText());
            message = "Файл успешно загружен: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body((message));
        }

        catch (Exception e) {
            message = "Не можем загрузить файл: " + file.getOriginalFilename() + "!" + " С такими данными - " + formsGetTimeStamp.getTime_stamp_short() + formsGetTimeStamp.getTime_stamp_long() + formsGetTimeStamp.getChat_id() + formsGetTimeStamp.getSender_id() + " " + e;
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body((message));
        }
    }

    // controller for get list all files
    @GetMapping("/files/{IdChat}")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> getListFilesByIdChat(@PathVariable String IdChat) {
        return jdbcTemplate.queryForList("select * from message where data!=0 and chat_id=?", IdChat);
    }

    @GetMapping("/files/limit/{IdChat}")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> getListFilesByIdChatByLimit(@PathVariable String IdChat) {
        return jdbcTemplate.queryForList("select * from message where data!=0 and chat_id=? limit 10", IdChat);
    }

    @GetMapping("/files/count/{IdChat}")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> getCountFiles(@PathVariable String IdChat) {
        return jdbcTemplate.queryForList("select count(*) from message where data!=0 and chat_id=?", IdChat);
    }

    // get image by id
    @GetMapping("/files/{IdChat}/{IdImage}")
    public ResponseEntity<byte[]> getDataImageByIdChat(@PathVariable String IdChat, @PathVariable String IdImage) {
        FileDB fileDB = storageService.getFile(IdImage);
        System.out.println(fileDB.getType());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "image/png; image/jpeg; image/gif; filename=\"" + fileDB + "\"")
                .body(fileDB.getData());
    }

    @DeleteMapping("/files/tools/delete/{IdMessage}")
    @CrossOrigin("*")
    @ResponseBody
    public List<Map<String, Object>> DeleteImageDB(@PathVariable int IdMessage) {
        jdbcTemplate.update("delete from message where id_message=?", IdMessage);
        return jdbcTemplate.queryForList("select * from message");
    }
}