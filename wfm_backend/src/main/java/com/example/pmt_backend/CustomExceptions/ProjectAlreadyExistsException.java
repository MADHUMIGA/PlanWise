package com.example.pmt_backend.CustomExceptions;

public class ProjectAlreadyExistsException extends RuntimeException {
    public ProjectAlreadyExistsException(String message) {
        super(message);
    }
}
