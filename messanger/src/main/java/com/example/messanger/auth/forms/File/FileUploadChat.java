package com.example.messanger.auth.forms.File;

import lombok.Data;

@Data
public class FileUploadChat {
    private String name;
    private byte[] data;

    public FileUploadChat(String fileName, byte[] data) {
    }
}