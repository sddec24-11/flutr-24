package com.flutr.backend.dto;

public class Response<T> {
    private boolean success;
    private T payload;
    private ErrorDetails error;

    public Response(boolean success, T payload) {
        this.success = success;
        this.payload = payload;
    }

    public Response(boolean success, T payload, ErrorDetails error) {
        this.success = success;
        this.payload = payload;
        this.error = error;
    }

    

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public T getPayload() {
        return payload;
    }

    public void setPayload(T payload) {
        this.payload = payload;
    }

    public ErrorDetails getError() {
        return error;
    }

    public void setError(ErrorDetails error) {
        this.error = error;
    }



    public static class ErrorDetails {
        private int code;
        private String message;

        public ErrorDetails(int code, String message) {
            this.code = code;
            this.message = message;
        }

        public int getCode() {
            return code;
        }

        public void setCode(int code) {
            this.code = code;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        
    }
}
