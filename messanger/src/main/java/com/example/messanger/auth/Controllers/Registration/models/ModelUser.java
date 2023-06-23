package com.example.messanger.auth.Controllers.Registration.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@Table(name = "users")
public class ModelUser {
    @Id
    @GeneratedValue(strategy= GenerationType.UUID)
    public String id_image;
    @Lob
    private byte[] data;
    private String type;
    private String username;
    private String password_hash;
    private String name_image;

    public ModelUser(String type, byte[] data, String username, String password_hash, String name_image) {
        this.type = type;
        this.data = data;
        this.username = username;
        this.password_hash = password_hash;
        this.name_image = name_image;
    }
}