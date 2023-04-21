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

    // Контроллер для загрузки фотографии
    // размер изображения ограничен до 3 mb
    // Поэтому нет проблем с загрузкой изображения в db
    @PostMapping("/upload")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file, FileDB formsGetTimeStamp) {
        System.out.println(file);
        String message = "";

        try {
            storageService.store(file, formsGetTimeStamp.GetTimeStampShort(), formsGetTimeStamp.GetTimeStampLong(), formsGetTimeStamp.GetChatID(), formsGetTimeStamp.GetChatSender());
            message = "Файл успешно загружен: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        }

        catch (Exception e) {
            message = "Не можем загрузить файл: " + file.getOriginalFilename() + "!" + " С такими данными - " + formsGetTimeStamp.GetTimeStampShort() + formsGetTimeStamp.GetTimeStampLong() + formsGetTimeStamp.GetChatID() + formsGetTimeStamp.GetChatSender() + " " + e;
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    // Контроллер для получения списка всех файлов
    @GetMapping("/files")
    @ResponseBody
    @CrossOrigin("*")
    public List<Map<String, Object>> getListFiles() {
        return jdbcTemplate.queryForList("select * from image_message");
    }

    // Получения изображения по id
    @GetMapping("/files/{IdImage}")
    public ResponseEntity<byte[]> getDataImage(@PathVariable String IdImage) {
        FileDB fileDB = storageService.getFile(IdImage);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "image/png; filename=\"" + fileDB.getName() + "\"")
                .body(fileDB.getData());
    }
}