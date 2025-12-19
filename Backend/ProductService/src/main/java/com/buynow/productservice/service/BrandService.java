package com.buynow.productservice.service;

import com.buynow.productservice.data.dto.ImagePart;
import com.buynow.productservice.data.entity.Brand;
import com.buynow.productservice.repository.BrandRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;

@Service
public class BrandService {

    private final BrandRepository brandRepository;
    private final ImageService imageService;

    @Autowired
    public BrandService(BrandRepository brandRepository, ImageService imageService){
        this.brandRepository = brandRepository;
        this.imageService = imageService;
    }

    public Page<Brand> getAll(int page, int size){
        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        return brandRepository.findAll(pageable);
    }

    @Transactional
    public Brand createBrand(String brandName, List<ImagePart> images) throws IOException {
        // 1. Check if brand exists
        Brand brand = brandRepository.findByNameIgnoreCase(brandName).orElse(null);
        if(brand != null){
            return brand;
        }

        // 2. Validate mandatory data
        if (images == null || images.isEmpty()) {
            throw new BadRequestException("At least one valid image is required");
        }

        // 3. Create and persist Brand
        brand = new Brand(brandName, null);
        brand = brandRepository.save(brand);

        // 4. Save images
        imageService.saveProductImages(brand.getBrandId(), images);

        return brand;
    }
}
