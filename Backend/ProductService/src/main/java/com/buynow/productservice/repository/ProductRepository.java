package com.buynow.productservice.repository;

import com.buynow.productservice.data.entity.Product;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends MongoRepository<Product, ObjectId> {
    Page<Product> findByTitleContainingIgnoreCase(String name, Pageable pageable);

    @Override
    Page<Product> findAll(Pageable pageable);
}
