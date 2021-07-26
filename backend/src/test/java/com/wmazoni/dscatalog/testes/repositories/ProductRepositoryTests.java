package com.wmazoni.dscatalog.testes.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.wmazoni.dscatalog.entities.Category;
import com.wmazoni.dscatalog.entities.Product;
import com.wmazoni.dscatalog.repositories.ProductRepository;
import com.wmazoni.dscatalog.testes.factories.ProductFactory;

@DataJpaTest
public class ProductRepositoryTests {
	
	@Autowired
	private ProductRepository productRepository;
	
	private Long existingId;
	private Long nonExistingId;
	private Long countTotalProducts;
	private Long countPCGamerProducts;
	private Long countCategory3Products;
	private PageRequest pageRequest;
	
	@BeforeEach
	void setup() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		countTotalProducts = 25L;
		countPCGamerProducts = 21L;
		countCategory3Products = 23L;
		pageRequest = PageRequest.of(0, 10);
	}
	
	@Test
	public void findShouldReturnOnlySelectedCategoryWhenCategoryInformed() {
		
		List<Category> categories = new ArrayList<>();
		categories.add(new Category(3L, null));
		
		Page<Product> result = productRepository.find(categories, "", pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countCategory3Products, result.getTotalElements());
	}
	
	@Test
	public void findShouldReturnAllProductsWhenCategoryNotInformed() {
		
		List<Category> categories = null;
		
		Page<Product> result = productRepository.find(categories, "", pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
	}
	
	@Test
	public void findShouldReturnAllProductsWheNameIsEmpty() {
		String name = "";
		
		
		Page<Product> result = productRepository.find(null, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
	}
	
	@Test
	public void findShouldReturnProductsWheNameExistsIgnoringCase() {
		String name = "pc GAMeR";
		
		Page<Product> result = productRepository.find(null, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());
	}
	
	@Test
	public void findShouldReturnProductsWheNameExists() {
		String name = "PC Gamer";
		
		Page<Product> result = productRepository.find(null, name, pageRequest);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPCGamerProducts, result.getTotalElements());
	}
	
	@Test
	public void saveShouldPersistWithAutoIncrement() {
		Product product = ProductFactory.createProduct();
		product.setId(null);
		
		product = productRepository.save(product);
		Optional<Product> result = productRepository.findById(product.getId());
		
		Assertions.assertNotNull(product.getId());
		Assertions.assertEquals(countTotalProducts + 1L, product.getId());
		Assertions.assertTrue(result.isPresent());
		Assertions.assertSame(result.get(), product);
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
