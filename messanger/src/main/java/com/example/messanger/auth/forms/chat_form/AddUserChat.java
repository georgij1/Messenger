package com.example.messanger.auth.forms.chat_form;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.sql.Array;
import java.util.ArrayList;
import java.util.List;

@Data
public class AddUserChat {
    @JsonProperty("name")
    public String name;
    @JsonProperty("image_user")
    public String image_user;
    @JsonProperty("chat_name")
    public String chat_name;
}