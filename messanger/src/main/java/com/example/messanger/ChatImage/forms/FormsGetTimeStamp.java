package com.example.messanger.ChatImage.forms;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class FormsGetTimeStamp {
    @JsonProperty("TimeStampShort")
    public String TimeStampShort;
    @JsonProperty("TimeStampLong")
    public String TimeStampLong;
}