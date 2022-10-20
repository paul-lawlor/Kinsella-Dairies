package com.kinsella.kinsellaBackend;

import com.kinsella.kinsellaBackend.model.Products;
import com.kinsella.kinsellaBackend.repositories.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class KinsellaBackendApplication implements CommandLineRunner {

	public KinsellaBackendApplication(ProductsRepository productsRepository) {
		this.productsRepository = productsRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(KinsellaBackendApplication.class, args);
	}

	@Autowired
	private final ProductsRepository productsRepository;

	@Override
	public void run(String... args) throws Exception {
	this.productsRepository.save(new Products(1L, "1 pint skimmed milk",  1.30));
	this.productsRepository.save(new Products(2L, "1 pint whole milk (glass)", 1.30));
	this.productsRepository.save(new Products(3L, "1 pint skimmed milk organic (glass)", 1.80));
	this.productsRepository.save(new Products(4L, "1 pint whole milk organic (glass)", 1.80));
	this.productsRepository.save(new Products(5L, "Eggs x 6", 1.80));
	this.productsRepository.save(new Products(6L, "1 pint Orange Juice", 2.00));
	this.productsRepository.save(new Products(7L, "1 litre Orange Juice", 3.00));
	this.productsRepository.save(new Products(8L, "1 litre Apple Juice", 3.00));
	}
}



