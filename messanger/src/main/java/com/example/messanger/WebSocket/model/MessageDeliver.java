package com.example.messanger.WebSocket.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageDeliver {
    private String text;
    private LocalDateTime sentAt;
    private boolean read;
}