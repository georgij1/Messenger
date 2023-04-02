package com.example.messanger.WebSocket.Controller;

import com.example.messanger.WebSocket.WebSocketHandler;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@AllArgsConstructor
public class DeleteMessage {
    private WebSocketHandler webSocketHandler;

    @DeleteMapping("/messages/{id}")
    public ResponseEntity<String> deleteMessage(@PathVariable String id) {
        webSocketHandler.deleteMessage(id);
        return ResponseEntity.ok("Message deleted successfully");
    }
}
