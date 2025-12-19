package com.buynow.productservice.service;

import com.buynow.productservice.data.dto.ImagePart;
import com.buynow.productservice.data.entity.ProductImageRef;
import com.buynow.productservice.repository.ProductImageRepository;
import org.apache.coyote.BadRequestException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ImageService {

    private final ProductImageRepository productImageRepository;
    private final GridFSService gridFS;

    @Autowired
    public ImageService(ProductImageRepository productImageRepository, GridFSService gridFS){
        this.productImageRepository = productImageRepository;
        this.gridFS = gridFS;
    }

    @Transactional // This ensures rollback if ANYTHING fails during image upload
    public List<ProductImageRef> saveProductImages(ObjectId productId, List<ImagePart> images) throws IOException {
        if (images == null || images.isEmpty()) {
            throw new BadRequestException("Images are required");
        }

        List<ProductImageRef> imageRefArrayList = new ArrayList<>();
        int order = 1;

        for (ImagePart image : images) {
            // This will throw IOException → rolls back entire @Transactional method
            if (image == null || image.file() == null) {
                throw new BadRequestException("Invalid image file at position " + order);
            }

            ObjectId fileId = gridFS.uploadImage(image.file(), productId);

            boolean isPrimary = (order == 1);
            ProductImageRef imageRef = new ProductImageRef(productId, fileId,image.url(), isPrimary, order);
            imageRefArrayList.add(imageRef);
            order++;
        }

        return imageRefArrayList;
    }
}
