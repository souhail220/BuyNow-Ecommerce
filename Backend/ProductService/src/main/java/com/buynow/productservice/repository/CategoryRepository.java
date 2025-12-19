package com.buynow.productservice.repository;

import com.buynow.productservice.data.entity.Category;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends MongoRepository<Category, ObjectId> {
    Optional<Category> findByNameIgnoreCase(String name);
}
