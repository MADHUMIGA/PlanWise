package com.example.pmt_backend.DTO;

import java.util.List;

import com.example.pmt_backend.model.Task;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequestDTO {
    private Task task;
    private List<String> assigneeIds;
}
