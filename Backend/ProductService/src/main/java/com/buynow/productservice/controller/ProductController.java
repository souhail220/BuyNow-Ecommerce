package com.buynow.productservice.controller;

import com.buynow.productservice.data.dto.CreateProductRequest;
import com.buynow.productservice.data.dto.ImagePart;
import com.buynow.productservice.data.entity.Product;
import com.buynow.productservice.data.entity.ProductImageRef;
import com.buynow.productservice.service.ProductService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping
    public Page<Product> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return productService.getAll(page, size);
    }

    @GetMapping("{id}")
    public Product getProduct(@PathVariable ObjectId id){
        return productService.getProductWithImageRefs(id);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createProduct(
            @RequestPart("data") CreateProductRequest dataJson,
            @RequestPart(value = "images", required = false) List<MultipartFile> files,
            @RequestParam(value = "url", required = false) List<String> urls,
            @RequestParam(value = "isMain", defaultValue = "false") List<Boolean> isMains
    ) throws IOException {

        // Build image list manually (Spring doesn't bind nested multipart perfectly)
        List<ImagePart> imageParts = new ArrayList<>();
        int size = files == null ? 0 : files.size();
        for (int i = 0; i < size; i++) {
            String url = (urls != null && urls.size() > i) ? urls.get(i) : "";
            boolean main = i < isMains.size() && Boolean.TRUE.equals(isMains.get(i));

            imageParts.add(new ImagePart(
                    files.get(i), url, main
            ));
        }

        ObjectId productId = productService.createProduct(dataJson, imageParts);
        return ResponseEntity.ok(productId.toHexString());
    }
}
