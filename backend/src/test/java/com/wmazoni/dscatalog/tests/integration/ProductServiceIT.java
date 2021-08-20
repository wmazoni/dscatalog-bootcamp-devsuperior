package com.wmazoni.dscatalog.tests.integration;

import com.wmazoni.dscatalog.dto.ProductDTO;

import com.wmazoni.dscatalog.services.ProductService;
import com.wmazoni.dscatalog.services.exceptions.ResourceNotFoundException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
public class ProductServiceIT {

    @Autowired
    private ProductService productService;

    private long existingId;
    private long nonExistingId;
    private Long countTotalProducts;
    private Long countPCGamerProducts;
    private PageRequest pageRequest;

    @BeforeEach
    void setup() throws Exception {
        existingId = 1L;
        nonExistingId = 1000L;
        countTotalProducts = 25L;
        countPCGamerProducts = 21L;
        pageRequest = PageRequest.of(0, 10);
    }

    @Test
    public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            productService.delete(nonExistingId);
        });
    }

    @Test
    public void deleteShouldDoNothingWhenIdExists() {
        Assertions.assertDoesNotThrow(() -> {
            productService.delete(existingId);
        });
    }

    @Test
    public void findAllPagedShouldReturnNothingWhenNameDoesNotExist() {

        String name = "Camera";

        Page<ProductDTO> result = productService.findAllPaged(0L, name, pageRequest);

        Assertions.assertTrue(result.isEmpty());
    }

    @Test
    public void findAllPagedShouldReturnAllProductsWheNameIsEmpty() {
        String name = "";

        Page<ProductDTO> result = productService.findAllPaged(0L, name, pageRequest);

        Assertions.assertFalse(result.isEmpty());
        Assertions.assertEquals(countTotalProducts, result.getTotalElements());
    }

    @Test
    public void findAllPagedShouldReturnProductsWheNameExistsIgnoringCase() {
        String name = "pc GAMeR";

        Page<ProductDTO> result = productService.findAllPaged(0L, name, pageRequest);

        Assertions.assertFalse(result.isEmpty());
        Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());
    }
}
