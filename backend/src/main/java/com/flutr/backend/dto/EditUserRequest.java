package com.flutr.backend.dto;

import com.flutr.backend.model.User;

public class EditUserRequest {
    private String id;
    private User user;
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    } 
    
}
