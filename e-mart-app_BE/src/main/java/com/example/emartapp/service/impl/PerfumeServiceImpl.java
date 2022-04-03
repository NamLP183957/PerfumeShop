package com.example.emartapp.service.impl;

import com.example.emartapp.domain.Perfume;
import com.example.emartapp.repository.PerfumeRepository;
import com.example.emartapp.repository.ReviewRepository;
import com.example.emartapp.service.FileService;
import com.example.emartapp.service.PerfumeService;
import com.google.common.collect.Lists;
import graphql.schema.DataFetcher;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PerfumeServiceImpl implements PerfumeService {
    private Logger LOGGER = LoggerFactory.getLogger(this.getClass().getName());
    private final PerfumeRepository perfumeRepository;
    private final ReviewRepository reviewRepository;
    private final FileService fileService;

    @Override
    public DataFetcher<Perfume> getPerfumeByQuery() {
        return dataFetchingEnvironment -> {
            Long perfumeId = Long.parseLong(dataFetchingEnvironment.getArgument("id"));
//            LOGGER.info("perfumeId" + perfumeId);
            return perfumeRepository.findById(perfumeId).get();
        };
    }

    @Override
    public DataFetcher<List<Perfume>> getPerfumesByQuery() {
        return dataFetchingEnvironment -> perfumeRepository.findAllByOrderByIdAsc();
    }

    @Override
    public DataFetcher<List<Perfume>> getPerfumesByIdsQuery() {
        return dataFetchingEnvironment -> {
            List<String> objects = dataFetchingEnvironment.getArgument("ids");
            List<Long> ids = objects.stream()
                    .map((obj) -> Long.parseLong(obj))
                    .collect(Collectors.toList());
            return perfumeRepository.findByIdIn(ids);
        };
    }

    @Override
    public Perfume findPerfumeById(Long perfumeId) {
        return perfumeRepository.findById(perfumeId).get();
    }

    @Override
    public List<Perfume> findAllPerfumes() {
        return perfumeRepository.findAllByOrderByIdAsc();
    }

    @Override
    public List<Perfume> findPerfumesByIds(List<Long> perfumesId) {
        return perfumeRepository.findByIdIn(perfumesId);
    }

    @Override
    public List<Perfume> getOtherPerfumes(Long perfumeId) {
        Perfume perfume = perfumeRepository.findById(perfumeId).get();
        List<Perfume> perfumeList = new ArrayList<>();
        List<Perfume> brandList = perfumeRepository.findByPerfumerIn(Arrays.asList(perfume.getPerfumer()));
        List<Perfume> genderList = perfumeRepository.findByPerfumeGenderIn(Arrays.asList(perfume.getPerfumeGender()));
        perfumeList.addAll(brandList);
        perfumeList.addAll(genderList);
        return perfumeList.size() <= 10 ? perfumeList : perfumeList.subList(0, 10);
    }

    @Override
    public Perfume updatePerfume(Perfume perfume, MultipartFile file) {
        if (file != null) {
            String imageLink = fileService.uploadFile(file);
            perfume.setFilename(imageLink);
        }

        return perfumeRepository.save(perfume);
    }

    @Override
    public List<Perfume> filter(List<String> perfumers, List<String> genders, List<Integer> prices, boolean sortByPrice) {
        List<Perfume> perfumeList = new ArrayList<>();

        if ( !perfumers.isEmpty() || !genders.isEmpty() || !prices.isEmpty()) {
            if ( !perfumers.isEmpty()) {
                if ( !perfumeList.isEmpty()) {
                    List<Perfume> perfumerList = new ArrayList<>();
                    for (String perfumer : perfumers) {
                        perfumerList.addAll(perfumeList.stream()
                                .filter(perfume -> perfume.getPerfumer().equals(perfumer))
                                .collect(Collectors.toList())
                        );
                    }
                    perfumeList = perfumerList;
                } else {
                    perfumeList.addAll(perfumeRepository.findByPerfumerIn(perfumers));
                }
            }
            if ( !genders.isEmpty()) {
                if ( !perfumeList.isEmpty()) {
                    List<Perfume> genderList = new ArrayList<>();
                    for (String gender : genders) {
                        genderList.addAll(perfumeList.stream()
                                .filter(perfume -> perfume.getPerfumeGender().equals(gender))
                                .collect(Collectors.toList())
                        );
                    }
                    perfumeList = genderList;
                } else {
                    perfumeList.addAll(perfumeRepository.findByPerfumeGenderIn(genders));
                }
            }
            if ( !prices.isEmpty()) {
                int startingPrice = prices.get(1);
                int endingPrice = prices.get(0);

                if ( !perfumeList.isEmpty()) {
                    List<Perfume> priceList = new ArrayList<>();
                    priceList.addAll(perfumeList.stream()
                            .filter(perfume -> (perfume.getPrice() >= startingPrice && perfume.getPrice() <= endingPrice))
                            .collect(Collectors.toList()));
                    perfumeList = priceList;
                } else {
                    perfumeList.addAll(perfumeRepository.findByPriceBetween(startingPrice, endingPrice));
                }
            }
        } else {
            perfumeList = perfumeRepository.findAllByOrderByIdAsc();
        }

        if (sortByPrice) {
            perfumeList.sort(Comparator.comparing(Perfume::getPrice));
        }

        return perfumeList;
    }

    @Override
    public Perfume savePerfume(Perfume perfume, MultipartFile file) {
        System.out.println("Start upload file...");
        String link = fileService.uploadFile(file);
        System.out.println("Link: " + link);
        perfume.setFilename(link);
        return perfumeRepository.save(perfume);
    }

    @Override
    @Transactional
    public List<Perfume> deletePerfume(Long perfumeId) {
        Perfume perfume = perfumeRepository.findById(perfumeId).get();
        perfume.getReviews().forEach(review -> reviewRepository.deleteById(review.getId()));

        perfumeRepository.delete(perfume);
        return perfumeRepository.findAllByOrderByIdAsc();
    }
}
