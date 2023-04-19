package com.example.messanger.auth.forms.ComandDev;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/* Форма для добавления разработчика в команду разработчиков
 (это определённый список из разработчиков)
*/
@Data
public class AddCommandDev {
    @JsonProperty("name")
    public String name;
    @JsonProperty("about_me")
    public String about_me;
    @JsonProperty("link_portfolio")
    public String link_portfolio;
}