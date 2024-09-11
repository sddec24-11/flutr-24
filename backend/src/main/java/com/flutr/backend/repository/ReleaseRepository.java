package com.flutr.backend.repository;

import com.flutr.backend.model.Release;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReleaseRepository extends MongoRepository<Release, String> {
}