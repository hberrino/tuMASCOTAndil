package com.buscatumascotandil.find.service;

import com.buscatumascotandil.find.exception.NotFoundException;
import com.buscatumascotandil.find.model.AvisoEncuentro;
import com.buscatumascotandil.find.repository.AvisoEncuentroRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AvisoEncuentroServiceTest {

    @Mock
    private AvisoEncuentroRepository repository;

    @InjectMocks
    private AvisoEncuentroService service;

    @Test
    void eliminarBorraElAvisoExistente() {
        AvisoEncuentro aviso = new AvisoEncuentro();
        aviso.setId(42L);
        aviso.setNombreMascota("Luna");
        when(repository.findById(42L)).thenReturn(Optional.of(aviso));

        service.eliminar(42L);

        verify(repository).delete(aviso);
    }

    @Test
    void eliminarInformaCuandoElAvisoNoExiste() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> service.eliminar(99L));

        verify(repository, never()).delete(org.mockito.ArgumentMatchers.any());
    }
}
