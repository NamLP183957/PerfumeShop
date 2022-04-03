package com.example.emartapp.repository;

import com.example.emartapp.domain.Perfume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PerfumeRepository extends JpaRepository<Perfume, Long> {

    public List<Perfume> findAllByOrderByIdAsc();

    public List<Perfume> findByIdIn(List<Long> perfumeIds);

    public List<Perfume> findByPerfumerIn(List<String> perfumers);

    public List<Perfume> findByPerfumeGenderIn(List<String> genders);

    public List<Perfume> findByPriceBetween(Integer startingPrice, Integer endingPrice);

}
