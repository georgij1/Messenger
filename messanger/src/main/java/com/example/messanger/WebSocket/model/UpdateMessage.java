package com.example.messanger.WebSocket.model;

import lombok.Data;

@Data
public class UpdateMessage {
    public String content;
    public String IDMessage;
    public String TimeStampShort;
    public String TimeStampLong;
}