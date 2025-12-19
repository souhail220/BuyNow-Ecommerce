package com.buynow.productservice.data.dto;

import org.springframework.web.multipart.MultipartFile;

public record ImagePart(
        MultipartFile file,     // the binary
        String url,
        boolean isMain
) {}
