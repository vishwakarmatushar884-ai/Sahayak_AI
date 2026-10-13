package com.sahayak.backend.dto;

public record AuthResponse(String token, UserResponse user) {
}