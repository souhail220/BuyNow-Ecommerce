package com.buynow.productservice.service;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.mongodb.client.gridfs.model.GridFSUploadOptions;
import com.mongodb.client.model.Filters;
import jakarta.servlet.http.HttpServletResponse;
import org.bson.BsonString;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;

@Service
public class GridFSService {

    private final GridFSBucket gridFSBucket;

    @Autowired
    public GridFSService(GridFSBucket gridFSBucket) {
        this.gridFSBucket = gridFSBucket;
    }


    public ObjectId uploadImage(MultipartFile file, ObjectId productId) throws IOException {
        Document metadata = new Document();
        metadata.put("productID", productId.toString());

        return gridFSBucket.uploadFromStream(
                Objects.requireNonNull(file.getOriginalFilename()),
                file.getInputStream(),
                new GridFSUploadOptions().metadata(metadata)
        );
    }

    public GridFSFile findFile(ObjectId fileId) {
        return gridFSBucket.find(Filters.eq("_id", fileId)).first();
    }

    public void downloadFile(ObjectId fileId, HttpServletResponse response) throws IOException {
        GridFSFile file = findFile(fileId);
        if(file.getMetadata() == null){
            return;
        }
        response.setContentType(file.getMetadata().getString("contentType"));
        response.setHeader("Content-Disposition", "attachment; filename=\"" + file.getFilename() + "\"");
        gridFSBucket.downloadToStream(fileId, response.getOutputStream());
    }
}
