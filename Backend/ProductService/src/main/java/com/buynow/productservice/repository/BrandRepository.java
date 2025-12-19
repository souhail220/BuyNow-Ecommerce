package com.buynow.productservice.repository;

import com.buynow.productservice.data.entity.Brand;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BrandRepository extends MongoRepository<Brand, ObjectId> {
    Optional<Brand> findByNameIgnoreCase(String name);
}
