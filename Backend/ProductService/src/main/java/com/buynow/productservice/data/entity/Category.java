package com.buynow.productservice.data.entity;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("categories")
public class Category {

    @Id
    @Field("id") private ObjectId categoryId;
    private String name;
    private ObjectId imageId;

    public Category(ObjectId categoryId, String name, ObjectId imageId) {
        this.categoryId = categoryId;
        this.name = name;
        this.imageId = imageId;
    }

    public ObjectId getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(ObjectId categoryId) {
        this.categoryId = categoryId;
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
