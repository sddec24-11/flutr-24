package com.flutr.backend.controller;

import com.flutr.backend.dto.Response;
import com.flutr.backend.dto.users.PasswordChangeRequest;
import com.flutr.backend.model.User;
import com.flutr.backend.service.UserService;
import com.flutr.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://206.81.3.155", "http://flutr.org"}, maxAge = 3600)
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<Response<String>> login(@RequestBody User loginRequest) {
        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
            if (passwordEncoder.matches(loginRequest.getPassword(), userDetails.getPassword())) {
                User user = (User) userDetails;
                String houseId = user.getHouseId();
                String subdomain = user.getSubdomain();
                String role = user.getRole().toString();
                String token = jwtUtil.generateToken(userDetails.getUsername(), houseId, subdomain, role);
                return ResponseEntity.ok(new Response<>(true, token, null));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new Response<>(false, null, new Response.ErrorDetails(401, "Invalid credentials")));
            }
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new Response<>(false, null, new Response.ErrorDetails(401, "Username not found")));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal server error")));
        }
    }

    @PostMapping("/register")
    @PreAuthorize("hasAuthority('ROLE_SUPERUSER') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Response<User>> registerUser(@RequestBody User user) {
        User savedUser = userService.registerUser(user);
        return ResponseEntity.ok(new Response<>(true, savedUser));
    }

    @PutMapping("/update")
    @PreAuthorize("hasAuthority('ROLE_SUPERUSER') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Response<User>> updateUser(@RequestBody User user) {
        User updatedUser = userService.updateUserByUsername(user);
        return ResponseEntity.ok(new Response<>(true, updatedUser));
    }

    @PostMapping("/deactivate/{username}")
    @PreAuthorize("hasAuthority('ROLE_SUPERUSER') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Response<String>> deactivateUser(@PathVariable String username) {
        userService.deactivateUserByUsername(username);
        return ResponseEntity.ok(new Response<>(true, "User deactivated successfully."));
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ROLE_SUPERUSER') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Response<Iterable<User>>> getAllUsers() {
        Iterable<User> users = userService.findAllUsers();
        return ResponseEntity.ok(new Response<>(true, users));
    }

    @PostMapping("/change-password")
    public ResponseEntity<Response<String>> changePassword(@RequestBody PasswordChangeRequest passwordChangeRequest) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String currentUsername = authentication.getName();

            userService.changeUserPassword(currentUsername, passwordChangeRequest.getOldPassword(), passwordChangeRequest.getNewPassword());
            return ResponseEntity.ok(new Response<>(true, "Password changed successfully", null));
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new Response<>(false, null, new Response.ErrorDetails(HttpStatus.NOT_FOUND.value(), "User not found")));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new Response<>(false, null, new Response.ErrorDetails(HttpStatus.BAD_REQUEST.value(), e.getMessage())));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new Response<>(false, null, new Response.ErrorDetails(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal server error")));
        }
    }


    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<Response<String>> handleUsernameNotFound(UsernameNotFoundException ex) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(new Response<>(false, null, new Response.ErrorDetails(404, ex.getMessage())));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Response<String>> handleGeneralError(Exception ex) {
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(new Response<>(false, null, new Response.ErrorDetails(500, "Internal Server Error")));
    }
    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<Response<String>> handleSecurityException(SecurityException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new Response<>(false, null, new Response.ErrorDetails(HttpStatus.FORBIDDEN.value(), ex.getMessage())));
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Response<String>> handleIllegalStateException(IllegalStateException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new Response<>(false, null, new Response.ErrorDetails(HttpStatus.BAD_REQUEST.value(), ex.getMessage())));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Response<String>> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new Response<>(false, null, new Response.ErrorDetails(HttpStatus.NOT_FOUND.value(), ex.getMessage())));
    }

}
