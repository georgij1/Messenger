package com.example.messanger.auth.User;

import com.example.messanger.auth.Controllers.Registration.models.ModelUser;
import com.example.messanger.auth.forms.AuthForm.RegistrationForm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvatarCrudRepo extends JpaRepository<ModelUser, String> {
}