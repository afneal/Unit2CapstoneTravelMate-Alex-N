package com.travel_mate_backend.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
//import org.springframework.web.servlet.resource.NoResourceFoundException;
import com.travel_mate_backend.exceptions.ErrorObject;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.List;
import java.util.stream.Collectors;

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


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorObject> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        List<String> errors = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(field -> field.getDefaultMessage())
                .collect(Collectors.toList());

        String combinedErrors = String.join("; ", errors);

        ErrorObject errorObject = new ErrorObject(
                HttpStatus.BAD_REQUEST.value(),
                combinedErrors,
                "VALIDATION_ERROR"
        );


        return new ResponseEntity<>(errorObject, HttpStatus.BAD_REQUEST);
    }
}
