package com.example.emartapp.controller;

import com.example.emartapp.dto.GraphQLRequest;
import com.example.emartapp.dto.perfume.OtherPerfumesSearch;
import com.example.emartapp.dto.perfume.PerfumeSearchRequest;
import com.example.emartapp.mapper.PerfumeMapper;
import com.example.emartapp.service.grapql.GraphQLProvider;
import jdk.internal.dynalink.linker.LinkerServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("api/v1/perfumes")
@RequiredArgsConstructor
public class PerfumeController {
    private final PerfumeMapper perfumeMapper;
    private final GraphQLProvider graphQLProvider;

    @GetMapping
    public ResponseEntity<Object> getAllPerfumes() {
        return ResponseEntity.ok(perfumeMapper.findAllPerfumes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getPerfumeById(@PathVariable("id") Long perfumeId) {
        return ResponseEntity.ok(perfumeMapper.getPerfumeById(perfumeId));
    }

    @PostMapping("/search")
    public ResponseEntity<Object> findPerfumesByFilterParams(@RequestBody PerfumeSearchRequest request) {
        return ResponseEntity.ok(perfumeMapper.filterPerfumesBYFilterParams(request));
    }

    @GetMapping("/other-perfumes/{id}")
    public ResponseEntity<Object> getOtherPerfumes(@PathVariable("id") Long perfumeId) {
        return ResponseEntity.ok(perfumeMapper.getOtherPerfumes(perfumeId));
    }

    @PostMapping("/graphql/ids")
    public ResponseEntity<Object> getPerfumesByIdsQuery(@RequestBody GraphQLRequest request) {
        return ResponseEntity.ok(graphQLProvider.getGraphQL().execute(request.getQuery()));
    }

    @PostMapping("/graphql/perfumes")
    public ResponseEntity<Object> getAllPerfumesByQuery(@RequestBody GraphQLRequest request) {
        return ResponseEntity.ok(graphQLProvider.getGraphQL().execute(request.getQuery()));
    }

    @PostMapping("/graphql/perfume")
    public ResponseEntity<Object> getPerfumeByQuery(@RequestBody GraphQLRequest request) {
        return ResponseEntity.ok(graphQLProvider.getGraphQL().execute(request.getQuery()));
    }
}
