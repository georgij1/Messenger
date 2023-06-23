package com.example.messanger.auth.forms.Rings;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class DeleteRequest {
    @JsonProperty("chat_name")
    public String chat_name;
    @JsonProperty("username_from_sent")
    public String username_from_sent;
}