package com.search.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.search.model.SearchEntryEntity;
import com.search.repository.SearchEntryRepository;

@Service
public class SearchEntryService {

	@Autowired
	private SearchEntryRepository repository;

	public List<SearchEntryEntity> findAll() {
		return repository.findAll();
	}

	public SearchEntryEntity save(SearchEntryEntity entry) {
		return repository.save(entry);
	}

	public void deleteById(Long id) {
		repository.deleteById(id);
	}
}