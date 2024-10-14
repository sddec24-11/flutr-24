package com.flutr.backend.service;

import com.flutr.backend.model.User;
import com.flutr.backend.model.UserRole;
import com.flutr.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User newUser) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = findUserByUsername(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("Current user not found"));

        if (currentUser.getRole() == UserRole.EMPLOYEE) {
            throw new SecurityException("Employees are not authorized to add users");
        }

        if (currentUser.getRole() == UserRole.ADMIN && newUser.getRole() == UserRole.SUPERUSER) {
            throw new SecurityException("Admins cannot create superusers");
        }

        if (userRepository.findByUsername(newUser.getUsername()).isPresent()) {
            throw new IllegalStateException("Username already taken");
        }

        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        newUser.setHouseId(currentUser.getRole() == UserRole.SUPERUSER ? newUser.getHouseId() : currentUser.getHouseId());
        return userRepository.save(newUser);
    }

    @Transactional
    public User updateUserByUsername(User updatedUser) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = findUserByUsername(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("Current user not found"));

        if (authentication.getName().equals(updatedUser.getUsername())) {
            throw new SecurityException("Users cannot delete or update themselves");
        }

        User existingUser = userRepository.findByUsername(updatedUser.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not found with username: " + updatedUser.getUsername()));

        if (!currentUser.getRole().equals(UserRole.SUPERUSER) && !existingUser.getHouseId().equals(currentUser.getHouseId())) {
            throw new SecurityException("Unauthorized operation");
        }

        if (currentUser.getRole() == UserRole.ADMIN && existingUser.getRole() == UserRole.SUPERUSER) {
            throw new SecurityException("Admins cannot update superusers");
        }

        existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        existingUser.setRole(updatedUser.getRole());
        return existingUser;
    }

    public void deleteUserByUsername(String username) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = findUserByUsername(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("Current user not found"));

        if (authentication.getName().equals(username)) {
            throw new SecurityException("Users cannot delete themselves");
        }

        if (currentUser.getRole() == UserRole.EMPLOYEE) {
            throw new SecurityException("Employees are not authorized to delete users");
        }

        User userToDelete = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found with username: " + username));

        if (currentUser.getRole() != UserRole.SUPERUSER && !userToDelete.getHouseId().equals(currentUser.getHouseId())) {
            throw new SecurityException("Not authorized to delete user outside your house");
        }

        if (currentUser.getRole() == UserRole.ADMIN && userToDelete.getRole() == UserRole.SUPERUSER) {
            throw new SecurityException("Admins cannot delete superusers");
        }

        userRepository.delete(userToDelete);
    }

    public List<User> findAllUsers() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = findUserByUsername(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("Current user not found"));

        if (currentUser.getRole() == UserRole.SUPERUSER || currentUser.getRole() == UserRole.ADMIN) {
            return currentUser.getRole() == UserRole.SUPERUSER ? userRepository.findAll() : userRepository.findAllByHouseId(currentUser.getHouseId());
        } else {
            throw new SecurityException("Employees are not authorized to view all users");
        }
    }

    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
