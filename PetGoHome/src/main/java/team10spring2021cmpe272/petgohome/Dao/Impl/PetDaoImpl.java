package team10spring2021cmpe272.petgohome.Dao.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.stereotype.Repository;
import team10spring2021cmpe272.petgohome.Backend.Pet;
import team10spring2021cmpe272.petgohome.Dao.PetDao;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

@Repository
public class PetDaoImpl implements PetDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    final String INSERT_QUERY = "insert into pet (petid, ownerid, pet_name, type, weight, height, gender, breed, color, hair_length, age, phone, email, missing_date, lost_location, picture, description) values (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?)";
    final String UPDATE_QUERY = "update pet set pet_name = ? where id = ?";
    final String DELETE_QUERY = "delete from pet where petid = ?";
    final String SEARCH_QUERY = "select * from pet where petid = ?";
    final String SEARCH_BY_COUNTY_QUERY = "select * from pet where state = ? and county = ?";

    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int save(Pet pet) {
        return jdbcTemplate.update(INSERT_QUERY,
                pet.getPetId(),
                pet.getOwnerId(),
                pet.getPetName(),
                pet.getType(),
                pet.getWeight(),
                pet.getHeight(),
                pet.getGender(),
                pet.getBreed(),
                pet.getColor(),
                pet.getHairLength(),
                pet.getAge(),
                pet.getPhone(),
                pet.getEmail(),
                pet.getMissingDate(),
                pet.getState(),
                pet.getCounty(),
                pet.getLostLocation(),
                pet.getPictureUrl(),
                pet.getDescription());
    }

    @Override
    public void update(Pet pet) {

    }

    @Override
    public void deletePetByPetId(long petId) {
        int status = jdbcTemplate.update(DELETE_QUERY, petId);
        if(status != 0){
            System.out.println("Pet data deleted for Pet ID " + petId);
        }else{
            System.out.println("No pet found with Pet ID " + petId);
        }
    }

    @Override
    public Pet searchPetByPetId(long petId){
        Pet result = jdbcTemplate.queryForObject(SEARCH_QUERY, BeanPropertyRowMapper.newInstance(Pet.class) ,petId);
        return result;
    }

    @Override
    public List<Pet> searchPetByCounty(String county, String state) {
        List<Pet> result = jdbcTemplate.query(SEARCH_BY_COUNTY_QUERY, BeanPropertyRowMapper.newInstance(Pet.class), state, county);
        return result;
    }
}
