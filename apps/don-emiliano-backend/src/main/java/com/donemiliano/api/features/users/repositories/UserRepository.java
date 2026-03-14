package com.donemiliano.api.features.users.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.donemiliano.api.features.users.entities.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long>, JpaSpecificationExecutor<UserEntity> {

  @EntityGraph(attributePaths = { "roles" })
  @Query("SELECT u FROM UserEntity u")
  public List<UserEntity> findAllWithRoles();

}
