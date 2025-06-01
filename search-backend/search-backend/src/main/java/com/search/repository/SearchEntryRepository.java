package com.search.repository;

import com.search.model.SearchEntryEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchEntryRepository extends JpaRepository<SearchEntryEntity, Long> {
}
