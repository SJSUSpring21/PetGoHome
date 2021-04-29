package team10spring2021cmpe272.petgohome.Service;

import team10spring2021cmpe272.petgohome.Backend.Pet;

import java.util.List;

public interface PetService {
    void addNewLostPet(Pet pet);
    void updatePetInfo(Pet pet);
    void removeYourPet(Pet pet);
    Pet findPetByPetId(long petId);
    List<Pet> findPetsByCounty(String county, String state);

}
