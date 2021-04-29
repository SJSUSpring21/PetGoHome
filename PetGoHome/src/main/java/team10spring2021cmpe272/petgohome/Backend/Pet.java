package team10spring2021cmpe272.petgohome.Backend;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder(toBuilder=true)
public class Pet {

    @Getter
    @Setter
    private Long petId;
    @Getter
    @Setter
    private Long ownerId;
    @Getter
    @Setter
    private String petName;
    @Getter
    @Setter
    private String type;
    @Getter
    @Setter
    private String gender;
    @Getter
    @Setter
    private String breed;
    @Getter
    @Setter
    private String color;
    @Getter
    @Setter
    private String hairLength;
    @Getter
    @Setter
    private int age;
    @Getter
    @Setter
    private float weight;
    @Getter
    @Setter
    private float height;
    @Getter
    @Setter
    private String phone;
    @Getter
    @Setter
    private String email;
    @Getter
    @Setter
    private String missingDate;
    @Getter
    @Setter
    private String state;
    @Getter
    @Setter
    private String county;
    @Getter
    @Setter
    private String lostLocation;
    @Getter
    @Setter
    private String[] description;
    @Getter
    @Setter
    private String pictureUrl;
}
