package com.example.messanger.auth.forms.Users;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

// ����� ��� ��������� ������ �� ������� users ��� JSON Object
@Data
public class UsernameUserID {
    @JsonProperty("username")
    public String username;
}