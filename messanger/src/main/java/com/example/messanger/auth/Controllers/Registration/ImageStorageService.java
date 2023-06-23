package com.example.messanger.auth.Controllers.Registration;

import com.example.messanger.auth.Controllers.Registration.models.ModelUser;
import com.example.messanger.auth.User.AvatarCrudRepo;
import com.example.messanger.auth.forms.AuthForm.RegistrationForm;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
@AllArgsConstructor
public class ImageStorageService {
    AvatarCrudRepo avatarCrudRepo;

    public ModelUser getFileAvatar(String id_image) {
        return avatarCrudRepo.findById(id_image).get();
    }

    public ModelUser SaveUserWithAvatar(String ContentType, byte[] GetBytes, String login, String password, String originalFilename) throws IOException {
        ModelUser ModelUser = new ModelUser(
            ContentType,
            GetBytes,
            login,
            BCrypt.hashpw(password, BCrypt.gensalt()),
            originalFilename
        );
        return avatarCrudRepo.save(ModelUser);
    }
}