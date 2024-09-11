package com.flutr.backend.controller;

import com.flutr.backend.dto.*;
import com.flutr.backend.model.User;
import com.flutr.backend.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @DeleteMapping("/delete")
    public void deleteUser(@RequestBody DeleteUserRequest request) {
        userService.deleteUser(request.getId());
    }

    @PutMapping("/edit")
    public User editUser(@RequestBody EditUserRequest request) {
        return userService.editUser(request.getId(), request.getUser())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }
}