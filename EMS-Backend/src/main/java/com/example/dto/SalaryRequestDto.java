package com.example.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class SalaryRequestDto {
    private Long userId;
    private Double basicSalary;
    private Double allowances;
    private Double deductions;
    private Integer month;
    private Integer year;
    private LocalDate paymentDate;
    
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Double getBasicSalary() {
		return basicSalary;
	}
	public void setBasicSalary(Double basicSalary) {
		this.basicSalary = basicSalary;
	}
	public Double getAllowances() {
		return allowances;
	}
	public void setAllowances(Double allowances) {
		this.allowances = allowances;
	}
	public Double getDeductions() {
		return deductions;
	}
	public void setDeductions(Double deductions) {
		this.deductions = deductions;
	}
	public Integer getMonth() {
		return month;
	}
	public void setMonth(Integer month) {
		this.month = month;
	}
	public Integer getYear() {
		return year;
	}
	public void setYear(Integer year) {
		this.year = year;
	}
	public LocalDate getPaymentDate() {
		return paymentDate;
	}
	public void setPaymentDate(LocalDate paymentDate) {
		this.paymentDate = paymentDate;
	}
}

