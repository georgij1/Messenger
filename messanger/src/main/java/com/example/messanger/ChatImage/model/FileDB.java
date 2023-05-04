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
@Table(name = "message")
public class FileDB {
    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    public String id_image;

    private String image_name;

    private String type;

    @Lob
    private byte[] data;

    public String time_stamp_short;

    public String time_stamp_long;

    public String chat_id;

    public Integer sender_id;

    public String text;

    public FileDB(String name, String type, byte[] data, String timeStampShort, String timeStampLong, String getChatID, Integer getChatSender, String PlaceHolderImage) {
        this.image_name = name;
        this.type = type;
        this.data = data;
        this.time_stamp_short = timeStampShort;
        this.time_stamp_long = timeStampLong;
        this.chat_id = getChatID;
        this.sender_id = getChatSender;
        this.text = PlaceHolderImage;
    }

    public String getId() {
        return id_image;
    }

    public String getName() {
        return image_name;
    }

    public void setName(String name) {
        this.image_name = name;
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
        return time_stamp_short;
    }

    public String GetTimeStampLong() {
        return time_stamp_long;
    }

    public String GetChatID() {
        return chat_id;
    }

    public Integer GetChatSender() {
        return sender_id;
    }

    public String GetPlaceHolderImage() {
        return text;
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