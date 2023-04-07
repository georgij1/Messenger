package com.example.messanger.auth.forms.chat_form;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Data;

import java.util.ArrayList;

@Data
public class FormCreateChat {
    @JsonProperty("desc_chat")
    public String desc_chat;

    @JsonProperty("name_chat")
    public String name_chat;

    @JsonProperty("user_chat")
    public ArrayList<String> user_chat;

    @JsonProperty("type")
    public String type;

    @JsonProperty("owner")
    public String owner;

    @JsonProperty("user_id")
    public String user_id;

//    @JsonProperty("chat_id")
//    public String chat_id;

//    @JsonProperty("role_id_admin")
//    public String role_id_admin;

//    @JsonProperty("role_id_user")
//    public String role_id_user;
}