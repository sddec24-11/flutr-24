package com.flutr.backend.repository;

import com.flutr.backend.model.Org;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrgRepository extends MongoRepository<Org, String> {
    boolean existsByHouseId(String houseId);
}
