package com.example.messanger.auth.Rings;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class SetRequestAccessChatStatusForm {
    @JsonProperty("id")
    public String id;
    @JsonProperty("access")
    public String access;
}