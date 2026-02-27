package com.buscatumascotandil.find.repository;

import com.buscatumascotandil.find.model.AvisoEncuentro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AvisoEncuentroRepository extends JpaRepository<AvisoEncuentro, Long> {
    List<AvisoEncuentro> findAllByOrderByFechaCreacionDesc();
}
