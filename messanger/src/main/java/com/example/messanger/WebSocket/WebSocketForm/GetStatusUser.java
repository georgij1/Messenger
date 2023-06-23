package com.example.messanger.WebSocket.WebSocketForm;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
public class GetStatusUser {
    public String NameChat;
    public List<Map<String, Object>> list_ONOFLineUser;
}