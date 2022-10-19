package com.kinsella.kinsellaBackend.repositories;

import com.kinsella.kinsellaBackend.model.Accounts;
import net.bytebuddy.jar.asm.commons.Remapper;
import org.springframework.data.jpa.domain.AbstractPersistable;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.metamodel.SingularAttribute;
import java.io.Serializable;
import java.util.Collection;
import java.util.List;


public interface AccountsRepository extends JpaRepository<Accounts, Integer>{
    Collection<Accounts> findByUserID(Long userID);
}
