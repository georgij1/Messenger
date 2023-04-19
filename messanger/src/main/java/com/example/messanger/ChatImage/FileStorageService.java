// Хранилище файлов

package com.example.messanger.ChatImage;

import com.example.messanger.ChatImage.model.FileDB;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
@AllArgsConstructor
public class FileStorageService {
    private FileDBRepository fileDBRepository;

    // Метод для сохранения файлов
    public FileDB store(MultipartFile file, String timeStampShort, String timeStampLong, String GetChatID, String GetChatSender) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        FileDB FileDB = new FileDB(fileName, file.getContentType(), file.getBytes(), timeStampShort, timeStampLong, GetChatID, GetChatSender);

        System.out.println(timeStampShort);
        System.out.println(timeStampLong);
        System.out.println(FileDB);

        return fileDBRepository.save(FileDB);
    }

    // Метод для получения файлов
    public FileDB getFile(String id) {
        return fileDBRepository.findById(id).get();
    }
}