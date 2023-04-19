// Описание db для изображения

package com.example.messanger.ChatImage.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "image_message")
public class FileDB {
    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    public String id;

    private String name;

    private String type;

    @Lob
    private byte[] data;

    public String timeStampShort;

    public String timeStampLong;

    public String ChatID;

    public String ChatSender;

    public FileDB(String name, String type, byte[] data, String timeStampShort, String timeStampLong, String getChatID, String getChatSender) {
        this.name = name;
        this.type = type;
        this.data = data;
        this.timeStampShort = timeStampShort;
        this.timeStampLong = timeStampLong;
        this.ChatID = getChatID;
        this.ChatSender = getChatSender;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String GetTimeStampShort() {
        return timeStampShort;
    }

    public String GetTimeStampLong() {
        return timeStampLong;
    }

    public String GetChatID() {
        return ChatID;
    }

    public String GetChatSender() {
        return ChatSender;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FileDB fileDB = (FileDB) o;
        return getId() != null && Objects.equals(getId(), fileDB.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}