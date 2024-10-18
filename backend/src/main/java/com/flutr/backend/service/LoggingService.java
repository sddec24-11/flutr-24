package com.flutr.backend.service;

import com.flutr.backend.model.LogEntry;
import com.flutr.backend.repository.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoggingService {

    @Autowired
    private LogRepository logRepository;

    public void log(String operation, String status, String details) {
        LogEntry logEntry = new LogEntry(operation, status, details);
        logRepository.save(logEntry);
    }
}
