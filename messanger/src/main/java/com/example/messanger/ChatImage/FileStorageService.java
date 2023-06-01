// ��������� ������

package com.example.messanger.ChatImage;

import com.example.messanger.ChatImage.model.FileDB;
import com.example.messanger.auth.User.CrudRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Objects;

@Service
@AllArgsConstructor
public class FileStorageService {
    private CrudRepository fileDBRepository;

    // ����� ��� ���������� ������
    public FileDB store(MultipartFile file, String timeStampShort, String timeStampLong, String GetChatID, Integer GetChatSender, String GetPlaceHolderImage) throws IOException {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        FileDB FileDB = new FileDB(fileName, file.getContentType(), file.getBytes(), timeStampShort, timeStampLong, GetChatID, GetChatSender, GetPlaceHolderImage);
        return fileDBRepository.save(FileDB);
    }

    // ����� ��� ��������� ������
    public FileDB getFile(String IdImage) {
        return fileDBRepository.findById(IdImage).get();
    }
}