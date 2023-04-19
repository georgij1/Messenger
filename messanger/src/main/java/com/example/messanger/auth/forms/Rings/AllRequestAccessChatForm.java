package com.example.messanger.auth.forms.Rings;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

// форма для получения всех запросов на доступ в чат с JSON Object
@Data
public class AllRequestAccessChatForm {
    @JsonProperty("username_from_sent")
    public String username_from_sent;
}