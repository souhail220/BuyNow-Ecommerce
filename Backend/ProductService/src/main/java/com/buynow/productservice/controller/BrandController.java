package com.buynow.productservice.controller;

import com.buynow.productservice.data.dto.ImagePart;
import com.buynow.productservice.data.entity.Brand;
import com.buynow.productservice.service.BrandService;
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
@RequestMapping("/api/v1/brands")
public class BrandController {

    private final BrandService brandService;

    @Autowired
    public BrandController(BrandService brandService){
        this.brandService = brandService;
    }

    @GetMapping
    public Page<Brand> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size){
        return brandService.getAll(page, size);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Brand> addBrand(
            @RequestPart("data") String brandName,
            @RequestPart("images") List<MultipartFile> images,
            @RequestParam(value = "url", required = false) List<String> urls,
            @RequestParam(value = "isMain", defaultValue = "false") List<Boolean> isMains
            ) throws IOException {

        List<ImagePart> imageParts = new ArrayList<>();
        int size = images == null ? 0 : images.size();
        for (int i = 0; i < size; i++) {
            String url = (urls != null && urls.size() > i) ? urls.get(i) : "";
            boolean main = i < isMains.size() && Boolean.TRUE.equals(isMains.get(i));

            imageParts.add(new ImagePart(
                    images.get(i), url, main
            ));
        }

        Brand brand = brandService.createBrand(brandName, imageParts);
        return ResponseEntity.ok(brand);
    }
}
