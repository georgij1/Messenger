// ������ ���������� ����

package com.example.messanger.WebSocket.model;

import lombok.Data;

@Data
public class ChatMessage {
    private MessageType type;
    private String content;
    private String sender;
    private String chat_id;
    public String TimeStampShort;
    public String TimeStampLong;
    public enum MessageType {CHAT, JOIN, LEAVE}
    public MessageType getType() {return type;}
    public void setType(MessageType type) {this.type = type;}
    public String getContent() {return content;}
    public void setContent(String content) {this.content = content;}
    public String getSender() {return sender;}
    public void setChat_id(String chat_id) {this.chat_id = chat_id;}
    public String getChat_id() {return chat_id;}
    public void setSender(String sender) {this.sender = sender;}
    public String GetTimeStampShort() {return TimeStampShort;}
    public String GetTimeStampLong() {return TimeStampLong;}
}