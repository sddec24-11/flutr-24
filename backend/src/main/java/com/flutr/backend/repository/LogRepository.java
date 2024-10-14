package com.flutr.backend.repository;

import com.flutr.backend.model.LogEntry;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LogRepository extends MongoRepository<LogEntry, String> {
}
