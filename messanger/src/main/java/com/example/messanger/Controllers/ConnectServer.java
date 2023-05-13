package com.example.messanger.Controllers;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping
@CrossOrigin("*")
public class ConnectServer {
    @GetMapping("/connect")
    @CrossOrigin("*")
    @ResponseBody
    @JsonProperty
    public String ConnectOk () {
        return "ok";
    }
}