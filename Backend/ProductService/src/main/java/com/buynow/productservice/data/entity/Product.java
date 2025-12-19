package com.buynow.productservice.data.entity;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;
import java.util.List;

@Document("products")
public class Product {
    @Id
    @Field("id") private ObjectId productId;
    private String title;
    private double price;
    private ObjectId brandId;
    private ObjectId categoryId;
    private List<String> sizes;
    private List<String> colors;

    @Field("images")
    private List<ProductImageRef> imageRefs;

    @CreatedDate private Instant createDate;

    public Product(String title, double price, ObjectId brandId, ObjectId categoryId
            , List<String> sizes, List<String> colors, Instant createDate
    ) {
        this.title = title;
        this.price = price;
        this.brandId = brandId;
        this.categoryId = categoryId;
        this.sizes = sizes;
        this.colors = colors;
        this.createDate = createDate;
    }

    public ObjectId getProductId() {
        return productId;
    }

    public void setProductId(ObjectId productId) {
        this.productId = productId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public ObjectId getBrandId() {
        return brandId;
    }

    public void setBrandId(ObjectId brandId) {
        this.brandId = brandId;
    }

    public ObjectId getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(ObjectId categoryId) {
        this.categoryId = categoryId;
    }

    public List<String> getSizes() {
        return sizes;
    }

    public void setSizes(List<String> sizes) {
        this.sizes = sizes;
    }

    public List<String> getColors() {
        return colors;
    }

    public void setColors(List<String> colors) {
        this.colors = colors;
    }

    public List<ProductImageRef> getImageRefs() {
        return imageRefs;
    }

    public void setImageRefs(List<ProductImageRef> imageRefs) {
        this.imageRefs = imageRefs;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }
}
