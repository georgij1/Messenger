// Модель для удаления сообщения чата

package com.example.messanger.WebSocket.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class DeleteChatMessage implements Serializable {
    private String text;
    private String userId;
}