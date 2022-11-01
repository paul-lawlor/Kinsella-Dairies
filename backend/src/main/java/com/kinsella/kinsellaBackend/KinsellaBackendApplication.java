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
	this.productsRepository.save(new Products(1L, "Skimmed Milk (1 pint)", 1.30, "/1.jpeg"));
	this.productsRepository.save(new Products(2L, "Whole Milk (1 pint) - glass", 1.30, "/2.jpeg"));
	this.productsRepository.save(new Products(3L, "Organic Skimmed Milk (1 pint) - glass", 1.80, "/3.jpeg"));
	this.productsRepository.save(new Products(4L, "Organic Whole Milk (1 pint) - glass", 1.80, "/4.jpeg"));
	this.productsRepository.save(new Products(5L, "Eggs x 6", 1.80, "/5.jpg"));
	this.productsRepository.save(new Products(6L, "Orange Juice (1 pint)", 2.00, "/6.jpg"));
	this.productsRepository.save(new Products(7L, "Orange Juice (1 litre)", 3.00, "/7.jpg" ));
	this.productsRepository.save(new Products(8L, "Apple Juice (1 litre)", 3.00, "/8.jpg"));
	}
}



