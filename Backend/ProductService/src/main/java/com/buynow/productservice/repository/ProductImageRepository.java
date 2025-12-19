package com.buynow.productservice.repository;

import com.buynow.productservice.data.entity.ProductImageRef;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductImageRepository extends MongoRepository<ProductImageRef, ObjectId> {
}
