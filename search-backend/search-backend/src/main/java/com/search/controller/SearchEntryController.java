package com.search.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.search.model.SearchEntryEntity;
import com.search.service.SearchEntryService;

@RestController
@RequestMapping("/api/entries")
public class SearchEntryController {
    
    @Autowired
    private SearchEntryService service;

    @GetMapping
    public List<SearchEntryEntity> getAllEntries() {
        return service.findAll();
    }

    @PostMapping
    public SearchEntryEntity createEntry(@RequestBody SearchEntryEntity entry) {
        return service.save(entry);
    }

    @DeleteMapping("/{id}")
    public void deleteEntry(@PathVariable Long id) {
        service.deleteById(id);
    }
}
