package com.flutr.backend.service;

import com.flutr.backend.model.User;
import com.flutr.backend.model.UserRole;
import com.flutr.backend.repository.OrgRepository;
import com.flutr.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
    private OrgRepository orgRepository;

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
    
        if (currentUser.getRole() == UserRole.SUPERUSER && newUser.getHouseId() != null && !orgRepository.existsByHouseId(newUser.getHouseId())) {
            throw new IllegalStateException("Invalid houseId: No such organization exists");
        }
    
        newUser.setPassword(passwordEncoder.encode("butterfly123"));
        newUser.setHouseId(currentUser.getRole() == UserRole.SUPERUSER ? newUser.getHouseId() : currentUser.getHouseId());
        newUser.setSubdomain(currentUser.getRole() == UserRole.SUPERUSER ? newUser.getSubdomain() : currentUser.getSubdomain());
        return userRepository.save(newUser);
    }

    public boolean changeUserPassword(String username, String oldPassword, String newPassword) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new IllegalArgumentException("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return true;
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

    public void deactivateUserByUsername(String username) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("Current user not found"));
    
        if (authentication.getName().equals(username)) {
            throw new SecurityException("Users cannot deactivate themselves");
        }
    
        User userToDeactivate = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found with username: " + username));
    
        if (currentUser.getRole() != UserRole.SUPERUSER && !userToDeactivate.getHouseId().equals(currentUser.getHouseId())) {
            throw new SecurityException("Not authorized to deactivate user outside your house");
        }
    
        if (currentUser.getRole() == UserRole.ADMIN && userToDeactivate.getRole() == UserRole.SUPERUSER) {
            throw new SecurityException("Admins cannot deactivate superusers");
        }
    
        userToDeactivate.setActive(false);
        userRepository.save(userToDeactivate);
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
