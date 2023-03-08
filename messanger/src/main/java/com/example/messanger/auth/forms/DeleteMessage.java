package com.example.messanger.auth.forms;

import lombok.Data;

@Data
public class DeleteMessage {
    private String id;
    private String message;
    private String login;
}