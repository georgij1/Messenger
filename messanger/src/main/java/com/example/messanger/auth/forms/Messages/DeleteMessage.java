package com.example.messanger.auth.forms.Messages;

import lombok.Data;

// ����� ��� �������� ��������� ��� JSON Object
@Data
public class DeleteMessage {
    private String id;
    private String message;
    private String login;
}