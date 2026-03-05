package com.travel_mate_backend.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
//import org.springframework.web.servlet.resource.NoResourceFoundException;
import com.travel_mate_backend.exceptions.ErrorObject;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorObject> handleNoResourceFoundException(NoResourceFoundException exception) {
        ErrorObject errorObject = new ErrorObject(
                HttpStatus.NOT_FOUND.value(),
                "No data found for " + exception.getResourcePath(),
                "NOT_FOUND"
        );
        return new ResponseEntity<>(errorObject, HttpStatus.NOT_FOUND);
    }

}
