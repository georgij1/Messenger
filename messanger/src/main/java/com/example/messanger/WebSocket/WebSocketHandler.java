package com.example.messanger.WebSocket;

import com.example.messanger.auth.forms.Messages.DeleteMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.io.IOException;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.List;

@Component
public class WebSocketHandler extends TextWebSocketHandler {

    private final List<WebSocketSession> sessions = new ArrayList<>();
    private final List<DeleteMessage> messages = new ArrayList<>();

    @Override
    public void handleTextMessage(@NotNull WebSocketSession session, TextMessage message) throws IOException, java.io.IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        DeleteMessage messageObj = objectMapper.readValue(message.getPayload(), DeleteMessage.class);
        messages.add(messageObj);
        for (WebSocketSession webSocketSession : sessions) {
            webSocketSession.sendMessage(new TextMessage(objectMapper.writeValueAsString(messageObj)));
        }
    }

    @Override
    public void afterConnectionEstablished(@NotNull WebSocketSession session) throws Exception {
        sessions.add(session);
        for (DeleteMessage message : messages) {
            session.sendMessage(new TextMessage(new ObjectMapper().writeValueAsString(message)));
        }
    }

    @Override
    public void afterConnectionClosed(@NotNull WebSocketSession session, @NotNull CloseStatus status) throws Exception {
        sessions.remove(session);
    }
}