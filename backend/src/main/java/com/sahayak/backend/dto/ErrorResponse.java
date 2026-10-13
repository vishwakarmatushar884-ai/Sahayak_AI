package com.sahayak.backend.dto;

import java.time.Instant;

public record ErrorResponse(int status, String message, Instant timestamp) {
}