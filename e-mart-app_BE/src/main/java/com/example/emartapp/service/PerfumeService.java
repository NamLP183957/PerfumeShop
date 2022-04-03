package com.example.emartapp.service;

import com.example.emartapp.domain.Perfume;
import graphql.schema.DataFetcher;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

public interface PerfumeService {

    DataFetcher<Perfume> getPerfumeByQuery();

    DataFetcher<List<Perfume>> getPerfumesByQuery();

    DataFetcher<List<Perfume>> getPerfumesByIdsQuery();

    Perfume findPerfumeById(Long perfumeId);

    List<Perfume> findAllPerfumes();

    List<Perfume> findPerfumesByIds(List<Long> perfumesId);

    List<Perfume> filter(List<String> perfumers, List<String> genders, List<Integer> prices, boolean sortByPrice);

    Perfume savePerfume(Perfume perfume, MultipartFile file);

    List<Perfume> deletePerfume(Long perfumeId);

    List<Perfume> getOtherPerfumes(Long perfumeId);

    Perfume updatePerfume(Perfume perfume, MultipartFile file);
}
