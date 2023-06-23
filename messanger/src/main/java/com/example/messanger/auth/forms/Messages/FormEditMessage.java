package com.example.messanger.auth.forms.Messages;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

// Form edit message with json object
@Data
public class FormEditMessage {
    @JsonProperty("message")
    public String message;
    @JsonProperty("time_stamp_short")
    public String time_stamp_short;
    @JsonProperty("time_stamp_long")
    public String time_stamp_long;
}