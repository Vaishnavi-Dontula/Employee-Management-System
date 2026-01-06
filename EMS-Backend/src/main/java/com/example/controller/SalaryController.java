package com.example.controller;

import com.example.dto.SalaryDto;
import com.example.entity.Salary;
import com.example.entity.User;
import com.example.repository.SalaryRepository;
import com.example.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/salary")
@CrossOrigin("*")
public class SalaryController {

    private final SalaryRepository salaryRepository;
    private final UserRepository userRepository;

    public SalaryController(SalaryRepository salaryRepository,
                                 UserRepository userRepository) {
        this.salaryRepository = salaryRepository;
        this.userRepository = userRepository;
    }

    // ✅ CREATE
    @PostMapping
    public ResponseEntity<?> addSalary(@RequestBody SalaryDto dto) {

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Salary salary = new Salary();
        salary.setBasicSalary(dto.getBasicSalary());
        salary.setAllowances(dto.getAllowances());
        salary.setDeductions(dto.getDeductions());
        salary.setNetSalary(
                dto.getBasicSalary()
                + dto.getAllowances()
                - dto.getDeductions()
        );
        salary.setMonth(dto.getMonth());
        salary.setYear(dto.getYear());
        salary.setPaymentDate(dto.getPaymentDate());
        salary.setUser(user);

        salaryRepository.save(salary);
        return ResponseEntity.ok("Salary added");
    }

    // ✅ GET ALL (DTO SAFE)
    @GetMapping
    public List<SalaryDto> getAllSalaries() {
        return salaryRepository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSalary(
            @PathVariable Long id,
            @RequestBody SalaryDto dto) {

        Salary salary = salaryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Salary not found"));

        salary.setBasicSalary(dto.getBasicSalary());
        salary.setAllowances(dto.getAllowances());
        salary.setDeductions(dto.getDeductions());
        salary.setNetSalary(
                dto.getBasicSalary()
                + dto.getAllowances()
                - dto.getDeductions()
        );
        salary.setMonth(dto.getMonth());
        salary.setYear(dto.getYear());
        salary.setPaymentDate(dto.getPaymentDate());

        salaryRepository.save(salary);
        return ResponseEntity.ok("Salary updated");
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSalary(@PathVariable Long id) {
        salaryRepository.deleteById(id);
        return ResponseEntity.ok("Salary deleted");
    }

    // 🔁 ENTITY → DTO
    private SalaryDto toDto(Salary s) {
        SalaryDto dto = new SalaryDto();
        dto.setId(s.getId());
        dto.setBasicSalary(s.getBasicSalary());
        dto.setAllowances(s.getAllowances());
        dto.setDeductions(s.getDeductions());
        dto.setNetSalary(s.getNetSalary());
        dto.setMonth(s.getMonth());
        dto.setYear(s.getYear());
        dto.setPaymentDate(s.getPaymentDate());

        if (s.getUser() != null) {
            dto.setUserId(s.getUser().getId());
            dto.setUserName(s.getUser().getFullName());
        }
        return dto;
    }
}
