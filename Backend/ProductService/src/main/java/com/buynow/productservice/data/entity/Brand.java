package com.buynow.productservice.data.entity;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("brands")
public class Brand {

    @Id
    @Field("id") private ObjectId brandId;
    private String name;
    private ObjectId imageId;

    public Brand(String name, ObjectId imageId) {
        this.name = name;
        this.imageId = imageId;
    }

    public ObjectId getBrandId() {
        return brandId;
    }

    public void setBrandId(ObjectId brandId) {
        this.brandId = brandId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ObjectId getImageId() {
        return imageId;
    }

    public void setImageId(ObjectId imageId) {
        this.imageId = imageId;
    }
}
