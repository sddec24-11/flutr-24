package com.flutr.backend.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;

@Service
public class StorageService {
    private final AmazonS3 s3client;

    @Autowired
    public StorageService(@Value("${DIGITALOCEAN_SPACES_ACCESSKEY}") String accessKey,
                                      @Value("${DIGITALOCEAN_SPACES_SECRETKEY}") String secretKey,
                                      @Value("${digitalocean.spaces.region}") String region,
                                      @Value("${digitalocean.spaces.endpoint}") String endpoint) {
        BasicAWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
        this.s3client = AmazonS3ClientBuilder.standard()
            .withCredentials(new AWSStaticCredentialsProvider(credentials))
            .withEndpointConfiguration(new AmazonS3ClientBuilder.EndpointConfiguration(endpoint, region))
            .build();
    }

    public String uploadFile(String bucketName, String key, MultipartFile multipartFile) throws IOException {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, key, multipartFile.getInputStream(), metadata)
            .withCannedAcl(CannedAccessControlList.PublicRead); // This makes the file publicly accessible

        s3client.putObject(putObjectRequest);
        return s3client.getUrl(bucketName, key).toString(); // Returns the public URL
    }
    
}
