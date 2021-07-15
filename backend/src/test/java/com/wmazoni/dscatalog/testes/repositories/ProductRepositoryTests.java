package com.wmazoni.dscatalog.testes.repositories;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;

import com.wmazoni.dscatalog.entities.Product;
import com.wmazoni.dscatalog.repositories.ProductRepository;

@DataJpaTest
public class ProductRepositoryTests {
	
	@Autowired
	private ProductRepository productRepository;
	
	private Long existingId;
	private Long nonExistingId;
	
	@BeforeEach
	void setup() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
	}
	
	@Test
	public void deleteShouldDeleteObjectWhenIdExists() {
		productRepository.deleteById(existingId);
		
		Optional<Product> result = productRepository.findById(existingId);
		
		Assertions.assertFalse(result.isPresent());
	}
	
	@Test
	public void deleteShouldThrowEmptyResultDataAccessExceptionWhenIdDoesNotExists() {
		
		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
			productRepository.deleteById(nonExistingId);
		});
	}

}
