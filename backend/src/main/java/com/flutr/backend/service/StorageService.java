package com.flutr.backend.service;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.CannedAccessControlList;

@Service
public class StorageService {
    private final AmazonS3 s3client;

    @Autowired
    public StorageService(@Value("${digitalocean.spaces.accessKey}") String accessKey,
                                      @Value("${digitalocean.spaces.secretKey}") String secretKey,
                                      @Value("${digitalocean.spaces.region}") String region,
                                      @Value("${digitalocean.spaces.endpoint}") String endpoint) {
        BasicAWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
        this.s3client = AmazonS3ClientBuilder.standard()
            .withCredentials(new AWSStaticCredentialsProvider(credentials))
            .withEndpointConfiguration(new AmazonS3ClientBuilder.EndpointConfiguration(endpoint, region))
            .build();
    }

    public String uploadFile(String bucketName, String key, File file) {
        s3client.putObject(new PutObjectRequest(bucketName, key, file)
            .withCannedAcl(CannedAccessControlList.PublicRead)); // This makes the file publicly accessible
        return s3client.getUrl(bucketName, key).toString(); // Returns the public URL
    }
    
}
