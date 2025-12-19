package com.buynow.productservice.service;

import com.buynow.productservice.data.dto.CreateProductRequest;
import com.buynow.productservice.data.dto.ImagePart;
import com.buynow.productservice.data.entity.Brand;
import com.buynow.productservice.data.entity.Category;
import com.buynow.productservice.data.entity.Product;
import com.buynow.productservice.data.entity.ProductImageRef;
import com.buynow.productservice.repository.BrandRepository;
import com.buynow.productservice.repository.CategoryRepository;
import com.buynow.productservice.repository.ProductRepository;
import org.apache.coyote.BadRequestException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.Instant;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final ImageService imageService;

    @Autowired
    public ProductService(
            ProductRepository productRepository, CategoryRepository categoryRepository,
            BrandRepository brandRepository, ImageService imageService
    ){
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.brandRepository = brandRepository;
        this.imageService = imageService;
    }


    public Page<Product> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        Page<Product> p = productRepository.findAll(pageable);
        return p;
    }

    @Cacheable(value = "products", key = "#productId")
    public Product getProductWithImageRefs(ObjectId productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Transactional
    public ObjectId createProduct(CreateProductRequest req, List<ImagePart> images) throws IOException {

        // 1. Validate input
        if (req == null || req.title() == null || req.title().isBlank()) {
            throw new BadRequestException("Product title is required");
        }
        if (images == null || images.isEmpty()) {
            throw new BadRequestException("At least one valid image is required");
        }

        // 2. Resolve Brand & Category by name
        Brand brand = req.brand() == null ? null : brandRepository.findByNameIgnoreCase(req.brand().trim()).orElse(null);
        Category category = req.category() == null ? null : categoryRepository.findByNameIgnoreCase(req.category().trim()).orElse(null);

        // 4. Create and save Product with embedded images
        Product product = new Product(
                req.title().trim(),
                req.price(),
                brand != null ? brand.getBrandId() : null,
                category != null ? category.getCategoryId() : null,
                req.sizes(),
                req.colors(),
                Instant.now()
        );
        product = productRepository.save(product);

        // 3. Prepare image references list
        List<ProductImageRef> imageRefs = imageService.saveProductImages(product.getProductId(), images);
        product.setImageRefs(imageRefs);
        productRepository.save(product);

        return product.getProductId(); // ← returns ObjectId
    }


}
