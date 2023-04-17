package com.example.messanger.ChatImage;

import com.example.messanger.ChatImage.model.FileDB;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
public class FileStorageService {
    private FileDBRepository fileDBRepository;

    public FileDB store(MultipartFile file, String timeStampShort, String timeStampLong) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        FileDB FileDB = new FileDB(fileName, file.getContentType(), file.getBytes(), timeStampShort, timeStampLong);

        System.out.println(timeStampShort);
        System.out.println(timeStampLong);
        System.out.println(FileDB);

        return fileDBRepository.save(FileDB);
    }

    public FileDB getFile(String id) {
        return fileDBRepository.findById(id).get();
    }

    public Stream<FileDB> getAllFiles() {
        return fileDBRepository.findAll().stream();
    }
}