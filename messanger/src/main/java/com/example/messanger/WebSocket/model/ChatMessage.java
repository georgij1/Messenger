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
    private String image;
    private String ReadMessage;
    private String GetMessage;
    private String IDMessage;

    public enum MessageType {CHAT, JOIN, LEAVE}
    public MessageType getType() {return type;}
    public void setType(MessageType type) {this.type = type;}
    public String getContent() {return content;}
    public void setReadMessage(String ReadMessage) {this.ReadMessage = ReadMessage;}
    public void setGetMessage(String GetMessage) {this.GetMessage = GetMessage;}
    public void setContent(String content) {this.content = content;}
    public String getSender() {return sender;}
    public String getChat_id() {return chat_id;}
    public void setSender(String sender) {this.sender = sender;}
    public void setImage(String image) {this.image = image;}
    public String GetTimeStampShort() {return TimeStampShort;}
    public String GetTimeStampLong() {return TimeStampLong;}
}