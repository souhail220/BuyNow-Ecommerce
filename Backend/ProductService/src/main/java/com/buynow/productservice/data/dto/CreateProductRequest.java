package com.buynow.productservice.data.dto;

import java.util.List;

public record CreateProductRequest(
        String title,
        Double price,
        String brand,
        String category,
        List<String> sizes,
        List<String> colors,

        List<ImagePart> images
) {}