package com.example.pmt_backend.DTO;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TaskResponseDTO {
    private Long id;
    private String heading;
    private String description;
    private String status;
    private String type;
    private String priority;
    private String createdBy;
    private LocalDateTime createdAt;
    private String startDate;
    private String endDate;
    private int optimisticEstimate;
    private int mostLikelyEstimate;
    private int pessimisticEstimate;
    private List<String> assigneeEmails;
}
