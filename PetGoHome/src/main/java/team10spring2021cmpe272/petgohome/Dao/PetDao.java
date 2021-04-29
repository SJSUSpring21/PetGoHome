package team10spring2021cmpe272.petgohome.Dao;

import team10spring2021cmpe272.petgohome.Backend.Pet;

import java.util.List;

public interface PetDao {
    public int save(Pet pet);

    public void update(Pet pet);

    public void deletePetByPetId(long petId);

    public Pet searchPetByPetId(long petId);

    public List<Pet> searchPetByCounty(String county, String state);
}
