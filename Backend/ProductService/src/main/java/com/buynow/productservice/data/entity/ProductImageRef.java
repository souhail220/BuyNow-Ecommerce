package com.buynow.productservice.data.entity;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Field;

public class ProductImageRef {
    @Field("productId") ObjectId productId;
    @Field("fileId") ObjectId fileId;
    String url;
    boolean isMain;
    int order;

    public ProductImageRef(ObjectId productId, ObjectId fileId, String url, boolean isMain, int order) {
        this.productId = productId;
        this.fileId = fileId;
        this.url = url;
        this.isMain = isMain;
        this.order = order;
    }

    public ObjectId getProductId() {
        return productId;
    }

    public void setProductId(ObjectId productId) {
        this.productId = productId;
    }

    public ObjectId getFileId() {
        return fileId;
    }

    public void setFileId(ObjectId fileId) {
        this.fileId = fileId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public boolean isMain() {
        return isMain;
    }

    public void setMain(boolean main) {
        isMain = main;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }
}
