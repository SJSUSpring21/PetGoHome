package team10spring2021cmpe272.petgohome.Service.Impl;

import org.springframework.stereotype.Service;
import team10spring2021cmpe272.petgohome.Backend.Pet;
import team10spring2021cmpe272.petgohome.Dao.PetDao;
import team10spring2021cmpe272.petgohome.Service.PetService;

import java.util.ArrayList;
import java.util.List;

@Service
public class PetServiceImpl implements PetService {
    private PetDao petDao;

    @Override
    public void addNewLostPet(Pet pet) {
        petDao.save(pet);
    }

    @Override
    public void updatePetInfo(Pet pet) {
    }

    @Override
    public void removeYourPet(long petId) {
        petDao.deletePetByPetId(petId);
    }

    @Override
    public Pet findPetByPetId(long petId) {
        return petDao.searchPetByPetId(petId);
    }

    @Override
    public List<Pet> findPetsByCounty(String county, String state) {
        List<Pet> result = petDao.searchPetByCounty(county, state);
        return result;
    }
}
