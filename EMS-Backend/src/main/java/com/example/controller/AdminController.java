package com.example.controller;

import com.example.dto.DashboardStats;

import com.example.dto.*;
import com.example.entity.Leave;
import com.example.entity.User;
import com.example.repository.DepartmentRepository;
import com.example.repository.LeaveRepository;
import com.example.repository.SalaryRepository;
import com.example.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final LeaveRepository leaveRepository;
    private final SalaryRepository salaryRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminController(UserRepository userRepository,
                           DepartmentRepository departmentRepository,
                           LeaveRepository leaveRepository,
                           SalaryRepository salaryRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.leaveRepository = leaveRepository;
        this.salaryRepository = salaryRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /* ================= DASHBOARD ================= */

    @GetMapping("/dashboard/stats")
    public ResponseEntity<DashboardStats> getDashboardStats() {

        Double payroll = salaryRepository.getTotalMonthlyPayroll(1, 2026);
        if (payroll == null) payroll = 0.0;

        DashboardStats stats = new DashboardStats(
                userRepository.countByRole(User.Role.EMPLOYEE),
                departmentRepository.count(),
                payroll,
                leaveRepository.count(),
                leaveRepository.countByStatus(Leave.Status.APPROVED),
                leaveRepository.countByStatus(Leave.Status.PENDING),
                leaveRepository.countByStatus(Leave.Status.REJECTED)
        );

        return ResponseEntity.ok(stats);
    }

    /* ================= ADD EMPLOYEE ================= */

    @PostMapping("/employees")
    public ResponseEntity<?> addEmployee(@RequestBody UserDto dto) {

        User user = new User();
        mapDtoToUser(dto, user, true);

        userRepository.save(user);
        return ResponseEntity.ok("Employee created");
    }

    /* ================= UPDATE EMPLOYEE ================= */

    @PutMapping("/employees/{id}")
    public ResponseEntity<?> updateEmployee(
            @PathVariable Long id,
            @RequestBody UserDto dto) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        mapDtoToUser(dto, user, false);

        userRepository.save(user);
        return ResponseEntity.ok("Employee updated");
    }

    /* ================= VIEW EMPLOYEES ================= */

    @GetMapping("/employees")
    public ResponseEntity<List<UserDto>> getAllEmployees() {

        List<UserDto> employees = userRepository
                .findByRole(User.Role.EMPLOYEE)
                .stream()
                .map(this::convertToDto)
                .toList();

        return ResponseEntity.ok(employees);
    }

    /* ================= DELETE ================= */

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        userRepository.delete(user);
        return ResponseEntity.ok("Employee deleted successfully");
    }

    /* ================= DTO → ENTITY MAPPER ================= */

    private void mapDtoToUser(UserDto dto, User user, boolean isCreate) {

        user.setFullName(dto.getFullName());
        user.setEmail(dto.getEmail());
        user.setEmployeeId(dto.getEmployeeId());
        user.setRole(User.Role.valueOf(dto.getRole()));

        // Password only on CREATE or when provided
        if (isCreate && dto.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        if (dto.getGender() != null) {
            user.setGender(User.Gender.valueOf(dto.getGender()));
        }

        if (dto.getMaritalStatus() != null) {
            user.setMaritalStatus(User.MaritalStatus.valueOf(dto.getMaritalStatus()));
        }

        user.setDob(dto.getDob());

        if (dto.getDepartmentId() != null) {
            user.setDepartment(
                    departmentRepository.findById(dto.getDepartmentId())
                            .orElseThrow(() -> new RuntimeException("Department not found"))
            );
        }
    }

    /* ================= ENTITY → DTO ================= */

    private UserDto convertToDto(User user) {

        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setEmployeeId(user.getEmployeeId());
        dto.setRole(user.getRole().name());
        dto.setDob(user.getDob());

        dto.setGender(user.getGender() != null ? user.getGender().name() : null);
        dto.setMaritalStatus(user.getMaritalStatus() != null ? user.getMaritalStatus().name() : null);

        if (user.getDepartment() != null) {
            dto.setDepartmentId(user.getDepartment().getId());
            dto.setDepartmentName(user.getDepartment().getName());
        }

        dto.setProfileImage(user.getProfileImage());
        return dto;
    }
}
