package com.klef.cicd;
import org.springframework.data.jpa.repository.JpaRepository;
import com.klef.cicd.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {}

