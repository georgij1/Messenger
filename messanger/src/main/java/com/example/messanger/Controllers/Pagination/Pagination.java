package com.example.messanger.Controllers.Pagination;

import com.example.messanger.auth.User.User;
import com.example.messanger.auth.User.UserRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.awt.print.Pageable;

public class Pagination {
    @GetMapping("/pagination")
    public String pagination(Model model, @RequestParam(defaultValue = "0") int page) {
        int pageSize = 10;
//        Pageable pageable = PageRequest.of(page, pageSize);
//        Page<User> users = UserRepo.findAll(pageable);
//        model.addAttribute("users", users);
//        model.addAttribute("currentPage", page);
//        model.addAttribute("totalPages", users.getTotalPages());
        return "example_pagination/users";
    }
}