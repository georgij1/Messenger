// Прослушка websocket

package com.example.messanger.WebSocket;

import com.example.messanger.WebSocket.model.ChatMessage;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import java.util.Objects;

@Component
public class WebSocketEventListener {
    private final SimpMessageSendingOperations messagingTemplate;

    public WebSocketEventListener(SimpMessageSendingOperations messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        System.out.println("Received a new web socket connection");
        System.out.println("event connect - " + event.getMessage());
        System.out.println("event connect - " + event);
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        String username = (String) Objects.requireNonNull(headerAccessor.getSessionAttributes()).get("username");

        System.out.println("event disconnect - " + event);

        if (username != null) {
            if (username.equals("Имя")) {
                System.out.println("User Disconnected: " + username);
                ChatMessage chatMessage = new ChatMessage();
                chatMessage.setType(ChatMessage.MessageType.LEAVE);
                chatMessage.setSender("ExampleUserWebsocket");
                messagingTemplate.convertAndSend("/topic/public", chatMessage);
            }

            else {
                System.out.println("User Disconnected: " + username);
                ChatMessage chatMessage = new ChatMessage();
                chatMessage.setType(ChatMessage.MessageType.LEAVE);
                chatMessage.setSender(username);
                messagingTemplate.convertAndSend("/topic/public", chatMessage);
            }
        }
    }
}