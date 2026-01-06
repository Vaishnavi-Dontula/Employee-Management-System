package com.example.repository;

import com.example.entity.Salary;
import com.example.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SalaryRepository extends JpaRepository<Salary, Long> {

    List<Salary> findByUser(User user);

    @Query("""
        SELECT COALESCE(SUM(s.netSalary),0)
        FROM Salary s
        WHERE s.month = :month AND s.year = :year
    """)
    Double getTotalMonthlyPayroll(
            @Param("month") int month,
            @Param("year") int year
        );
}
