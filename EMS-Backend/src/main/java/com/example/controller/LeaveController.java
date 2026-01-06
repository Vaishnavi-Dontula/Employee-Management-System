package com.example.controller;

import com.example.dto.LeaveDto;
import com.example.entity.Leave;
import com.example.entity.User;
import com.example.repository.LeaveRepository;
import com.example.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class LeaveController {

    private final LeaveRepository leaveRepository;
    private final UserRepository userRepository;

    // ✅ MANUAL CONSTRUCTOR
    public LeaveController(LeaveRepository leaveRepository,
                           UserRepository userRepository) {
        this.leaveRepository = leaveRepository;
        this.userRepository = userRepository;
    }

    /* ================= EMPLOYEE ================= */

    @PostMapping("/employee/leaves")
    public ResponseEntity<LeaveDto> applyLeave(
            @Valid @RequestBody LeaveDto leaveDto,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Leave leave = new Leave();
        leave.setUser(user);
        leave.setLeaveType(
                Leave.LeaveType.valueOf(leaveDto.getLeaveType())
        );
        leave.setStartDate(leaveDto.getStartDate());
        leave.setEndDate(leaveDto.getEndDate());
        leave.setReason(leaveDto.getReason());
        leave.setStatus(Leave.Status.PENDING);

        Leave savedLeave = leaveRepository.save(leave);

        return ResponseEntity.ok(convertToDto(savedLeave));
    }

    @GetMapping("/employee/leaves")
    public ResponseEntity<List<LeaveDto>> getMyLeaves(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<LeaveDto> leaves = leaveRepository
                .findByUser(user)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(leaves);
    }

    /* ================= ADMIN ================= */

    @GetMapping("/admin/leaves")
    public ResponseEntity<List<LeaveDto>> getAllLeaves() {

        List<LeaveDto> leaves = leaveRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(leaves);
    }

    @PutMapping("/admin/leaves/{id}/approve")
    public ResponseEntity<LeaveDto> approveLeave(
            @PathVariable Long id,
            @RequestBody(required = false)
            Map<String, String> body) {

        Leave leave = leaveRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Leave not found"));

        leave.setStatus(Leave.Status.APPROVED);

        if (body != null && body.containsKey("comment")) {
            leave.setAdminComment(body.get("comment"));
        }

        return ResponseEntity.ok(
                convertToDto(leaveRepository.save(leave))
        );
    }

    @PutMapping("/admin/leaves/{id}/reject")
    public ResponseEntity<LeaveDto> rejectLeave(
            @PathVariable Long id,
            @RequestBody(required = false)
            Map<String, String> body) {

        Leave leave = leaveRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Leave not found"));

        leave.setStatus(Leave.Status.REJECTED);

        if (body != null && body.containsKey("comment")) {
            leave.setAdminComment(body.get("comment"));
        }

        return ResponseEntity.ok(
                convertToDto(leaveRepository.save(leave))
        );
    }

    /* ================= DTO CONVERTER ================= */

    private LeaveDto convertToDto(Leave leave) {

        LeaveDto dto = new LeaveDto();
        dto.setId(leave.getId());
        dto.setLeaveType(leave.getLeaveType().name());
        dto.setStartDate(leave.getStartDate());
        dto.setEndDate(leave.getEndDate());
        dto.setReason(leave.getReason());
        dto.setStatus(leave.getStatus().name());
        dto.setAdminComment(leave.getAdminComment());

        // 👇 ADD THIS BLOCK
        if (leave.getUser() != null) {
            dto.setEmployeeId(leave.getUser().getId());
            dto.setEmployeeName(leave.getUser().getFullName()); // or getName()
            dto.setEmployeeEmail(leave.getUser().getEmail());
        }

        return dto;
    }

}
