// Описание db для изображения

package com.example.messanger.ChatImage.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@NoArgsConstructor
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
}