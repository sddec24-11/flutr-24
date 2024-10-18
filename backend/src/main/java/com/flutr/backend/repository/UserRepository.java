package com.flutr.backend.repository;

import com.flutr.backend.model.User;

import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);

    List<User> findAllByHouseId(String houseId);
}