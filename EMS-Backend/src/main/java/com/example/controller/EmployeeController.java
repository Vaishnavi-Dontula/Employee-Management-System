package com.example.controller;

import com.example.dto.UserDto;
import com.example.entity.Salary;
import com.example.entity.User;
import com.example.repository.SalaryRepository;
import com.example.repository.UserRepository;
import com.example.dto.*;
import com.example.entity.*;
import com.example.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = "*")
public class EmployeeController {

    private final UserRepository userRepository;
    private final SalaryRepository salaryRepository;
    private final LeaveRepository leaveRepository;

    public EmployeeController(UserRepository userRepository,
                              SalaryRepository salaryRepository,
                              LeaveRepository leaveRepository) {
        this.userRepository = userRepository;
        this.salaryRepository = salaryRepository;
        this.leaveRepository = leaveRepository;
    }


    /* ================= PROFILE ================= */

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getProfile(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return ResponseEntity.ok(convertToDto(user));
    }

    /* ================= SALARY ================= */

    @GetMapping("/salary")
    public ResponseEntity<List<Salary>> getMySalary(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<Salary> salaries =
                salaryRepository.findByUser(user);

        return ResponseEntity.ok(salaries);
    }

    /* ================= DTO CONVERTER ================= */

    private UserDto convertToDto(User user) {

        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole().name());
        dto.setEmployeeId(user.getEmployeeId());
        dto.setDob(user.getDob());
        dto.setGender(
                user.getGender() != null
                        ? user.getGender().name()
                        : null
        );
        dto.setMaritalStatus(
                user.getMaritalStatus() != null
                        ? user.getMaritalStatus().name()
                        : null
        );
        dto.setDepartmentName(
                user.getDepartment() != null
                        ? user.getDepartment().getName()
                        : null
        );
        dto.setProfileImage(user.getProfileImage());

        return dto;
    }
    /* ================= APPLY LEAVE ================= */

    @PostMapping("/leave")
    public ResponseEntity<?> applyLeave(
            @RequestBody LeaveRequestDto request,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Leave leave = new Leave();
        leave.setUser(user);
        leave.setStartDate(request.getStartDate());
        leave.setEndDate(request.getEndDate());
        leave.setReason(request.getReason());
        leave.setStatus(Leave.Status.PENDING);

        leaveRepository.save(leave);

        return ResponseEntity.ok("Leave applied successfully");
    }

}
