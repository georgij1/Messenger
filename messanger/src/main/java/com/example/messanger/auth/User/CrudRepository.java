package com.example.messanger.auth.User;

import com.example.messanger.ChatImage.model.FileDB;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// CrudRepo db
@Repository
public interface CrudRepository extends JpaRepository<FileDB, String> {
}