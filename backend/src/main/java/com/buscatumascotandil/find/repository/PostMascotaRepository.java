package com.buscatumascotandil.find.repository;

import com.buscatumascotandil.find.model.PostMascota;
import com.buscatumascotandil.find.model.EstadoPublicacion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostMascotaRepository extends JpaRepository<PostMascota, Long> {

    List<PostMascota> findByEstadoAndActivoTrue(EstadoPublicacion estado);
    
    List<PostMascota> findByEstadoAndActivoTrueOrderByFechaCreacionDesc(EstadoPublicacion estado);

    List<PostMascota> findByActivoTrue();

}
