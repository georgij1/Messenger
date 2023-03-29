package com.example.messanger.auth.forms.chat_form;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Data;

import java.sql.Array;
import java.util.ArrayList;
import java.util.List;

@Data
public class FormCreateChat {
    @JsonProperty("desc_chat")
    public String desc_chat;

    @JsonProperty("name_chat")
    public String name_chat;

    @JsonProperty("user_chat")
    public ArrayList<String> user_chat;
}