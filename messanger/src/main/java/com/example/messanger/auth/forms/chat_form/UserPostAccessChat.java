package com.example.messanger.auth.forms.chat_form;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

// ����� ��� �������� �� ��������� ������� � JSON Object
@Data
public class UserPostAccessChat {
    @JsonProperty("UsernameSentOfferAccess")
    public String UsernameSentOfferAccess;
    @JsonProperty("chat_name")
    public String chat_name;
    @JsonProperty("UsernameOwnerChat")
    public String UsernameOwnerChat;
    @JsonProperty("InfoAboutUserForAdmin")
    public String InfoAboutUserForAdmin;
}