package petgohome.Backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import team10spring2021cmpe272.petgohome.Service.PetService;
import team10spring2021cmpe272.petgohome.Backend.Pet;

import java.util.List;

@Controller
@RequestMapping("/pet")
public class PetController {
    @Autowired
    private PetService petService;

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public String create(Pet pet) {
        petService.addNewLostPet(pet);
        return "success";
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public String delete(long petId){
        petService.removeYourPet(petId);
        return "success";
    }

    @RequestMapping(value = "/searchPets", method = RequestMethod.POST)
    public List<Pet> locatingPets(String county, String state) {
        return petService.findPetsByCounty(county, state);
    }
}
