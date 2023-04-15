package com.example.messanger.auth.Rings;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AllRequestAccessChatForm {
    @JsonProperty("username_from_sent")
    public String username_from_sent;
}