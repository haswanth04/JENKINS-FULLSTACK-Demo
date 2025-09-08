package com.klef.cicd;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TaskService {
    private final TaskRepository repo;

    public TaskService(TaskRepository repo) {
        this.repo = repo;
    }

    public List<Task> getAll() { return repo.findAll(); }
    public Task save(Task t) { return repo.save(t); }
    public Task update(Long id, Task t) {
        Task existing = repo.findById(id).orElseThrow();
        existing.setTitle(t.getTitle());
        existing.setDescription(t.getDescription());
        existing.setStatus(t.getStatus());
        return repo.save(existing);
    }
    public void delete(Long id) { repo.deleteById(id); }
}