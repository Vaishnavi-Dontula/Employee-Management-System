package com.example.repository;

import com.example.entity.Leave;
import com.example.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveRepository extends JpaRepository<Leave, Long> {
    List<Leave> findByUser(User user);
    List<Leave> findByStatus(Leave.Status status);
    Long countByStatus(Leave.Status status);
}