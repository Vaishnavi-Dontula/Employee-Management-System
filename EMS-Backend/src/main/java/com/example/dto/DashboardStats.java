package com.example.dto;

import java.math.BigDecimal;

public class DashboardStats {

    private long totalEmployees;
    private long totalDepartments;
    private Double totalPayroll;
    private long totalLeaves;
    private long approvedLeaves;
    private long pendingLeaves;
    private long rejectedLeaves;

    public DashboardStats(long totalEmployees,
                          long totalDepartments,
                          Double payroll,
                          long totalLeaves,
                          long approvedLeaves,
                          long pendingLeaves,
                          long rejectedLeaves) {
        this.totalEmployees = totalEmployees;
        this.totalDepartments = totalDepartments;
        this.totalPayroll = payroll;
        this.totalLeaves = totalLeaves;
        this.approvedLeaves = approvedLeaves;
        this.pendingLeaves = pendingLeaves;
        this.rejectedLeaves = rejectedLeaves;
    }

    public long getTotalEmployees() {
        return totalEmployees;
    }

    public long getTotalDepartments() {
        return totalDepartments;
    }

    public Double getTotalPayroll() {
        return totalPayroll;
    }

    public long getTotalLeaves() {
        return totalLeaves;
    }

    public long getApprovedLeaves() {
        return approvedLeaves;
    }

    public long getPendingLeaves() {
        return pendingLeaves;
    }

    public long getRejectedLeaves() {
        return rejectedLeaves;
    }
}
