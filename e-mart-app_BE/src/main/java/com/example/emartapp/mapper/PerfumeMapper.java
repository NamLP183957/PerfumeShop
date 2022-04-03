package com.example.emartapp.mapper;

import com.example.emartapp.domain.Perfume;
import com.example.emartapp.dto.perfume.PerfumeRequest;
import com.example.emartapp.dto.perfume.PerfumeResponse;
import com.example.emartapp.dto.perfume.PerfumeSearchRequest;
import com.example.emartapp.service.PerfumeService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PerfumeMapper {
    private Logger LOGGER = LoggerFactory.getLogger(this.getClass().getName());
    private final PerfumeService perfumeService;
    private final ModelMapper modelMapper;

    Perfume convertToEntity(PerfumeRequest perfumeRequest) {
        return modelMapper.map(perfumeRequest, Perfume.class);
    }

    PerfumeResponse convertToResponseDto(Perfume perfume) {
        return modelMapper.map(perfume, PerfumeResponse.class);
    }

    List<PerfumeResponse> convertListToResponseDtos(List<Perfume> perfumes) {
        return perfumes.stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }

    Set<PerfumeResponse> convertSetToResponseDtos(Set<Perfume> perfumes) {
        return perfumes.stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toSet());
    }

    public List<PerfumeResponse> findAllPerfumes() {
        return convertListToResponseDtos(perfumeService.findAllPerfumes());
    }

    public List<PerfumeResponse> filterPerfumesBYFilterParams(PerfumeSearchRequest request) {
        return convertListToResponseDtos(perfumeService.filter(request.getPerfumers(), request.getGenders(), request.getPrices(), request.isSortByPrice()));
    }

    public List<PerfumeResponse> getOtherPerfumes(Long perfumeId) {
        return convertListToResponseDtos(perfumeService.getOtherPerfumes(perfumeId));
    }

    public PerfumeResponse savePerfume(PerfumeRequest perfumeRequest, MultipartFile file) {
        Perfume perfume = convertToEntity(perfumeRequest);
        return convertToResponseDto(perfumeService.savePerfume(perfume, file));
//        return convertToResponseDto(convertToEntity(perfumeRequest));
    }

    public List<PerfumeResponse> deletePerfume(Long perfumeId) {
        return convertListToResponseDtos(perfumeService.deletePerfume(perfumeId));
    }

    public PerfumeResponse updatePerfume(PerfumeRequest perfumeRequest, MultipartFile file) {
        return convertToResponseDto(perfumeService.updatePerfume(convertToEntity(perfumeRequest), file));
    }

    public PerfumeResponse getPerfumeById(Long perfumeId) {
        return convertToResponseDto(perfumeService.findPerfumeById(perfumeId));
    }
}
