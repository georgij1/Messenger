package com.example.messanger.ChatImage;

import com.example.messanger.ChatImage.forms.FormsGetTimeStamp;
import com.example.messanger.ChatImage.model.FileDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@CrossOrigin("*")
public class FileController {
    @Autowired
    private FileStorageService storageService;

    @PostMapping("/upload")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file, FileDB formsGetTimeStamp) {
        System.out.println(file);
        String message = "";

        try {
            storageService.store(file, formsGetTimeStamp.GetTimeStampShort(), formsGetTimeStamp.GetTimeStampLong());
            message = "Файл успешно загружен: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        }

        catch (Exception e) {
            message = "Не можем загрузить файл: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }

    @GetMapping("/files")
    public ResponseEntity<List<ResponseFile>> getListFiles() {
        List<ResponseFile> files = storageService.getAllFiles().map(dbFile -> {
            String fileDownloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/files/")
                    .path(String.valueOf(dbFile.getId()))
                    .toUriString();

            return new ResponseFile(
                    dbFile.getName(),
                    fileDownloadUri,
                    dbFile.getType(),
                    dbFile.getData().length);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(files);
    }

    @GetMapping("/files/{id}")
    public ResponseEntity<byte[]> getDataImage(@PathVariable String id, Model model) {
        FileDB fileDB = storageService.getFile(id);
        model.addAttribute("ImageChat", ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, fileDB.getType() + "filename=\"" + fileDB.getName() + "\"")
                .body(fileDB.getData())
        );

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "image/png; filename=\"" + fileDB.getName() + "\"")
                .body(fileDB.getData());
    }
}