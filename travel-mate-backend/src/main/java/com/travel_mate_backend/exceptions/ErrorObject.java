package com.travel_mate_backend.exceptions;

public class ErrorObject {

    private Integer statusCode;
    private String message;
    private String error;

    public ErrorObject() {

    }

    public ErrorObject(Integer statusCode, String message, String error) {
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
    }

    public Integer getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(Integer statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
