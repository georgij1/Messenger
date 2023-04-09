package com.example.messanger.WebSocket.Controller;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Controller
public class MessageDeliver {
    private List<MessageDeliver> messageDeliverList = new ArrayList<>();

    @PostMapping("/deliver")
    public void deliver(@RequestParam int messageId) {
//        messageDeliverList.get(messageId).setDelivered(true);
    }

    @PostMapping("/read")
    public void read(@RequestParam int messageId) {
//        messageDeliverList.get(messageId).setRead(true);
    }
}