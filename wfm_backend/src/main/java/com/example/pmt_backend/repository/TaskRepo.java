package com.example.pmt_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.pmt_backend.model.Task;

public interface TaskRepo extends JpaRepository<Task,Long>{
    // List<Task> findAllByDependenciesContaining(Task task);

    @Query("SELECT t FROM Task t WHERE :task MEMBER OF t.dependencies")
List<Task> findAllByDependenciesContaining(@Param("task") Task task);

@Query(value = "SELECT t.* FROM task t " +
               "JOIN task_dependencies td ON t.id = td.dependency_id " +
               "WHERE td.task_id = :taskId", nativeQuery = true)
List<Task> findAllByTaskIdAsDependency(@Param("taskId") Long taskId);

@EntityGraph(attributePaths = "dependencies")
@Query("SELECT t FROM Task t WHERE t.id = :taskId")
Task findByIdWithDependencies(@Param("taskId") Long taskId);




    //  @Query("SELECT t FROM Task t JOIN t.dependencies d WHERE d.id = :taskId")
    // List<Task> findAllByDependenciesContaining(@Param("taskId") Long taskId);
}
