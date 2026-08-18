package org.web.backend.dto;

public class ApplicationRequest {

    private Long petId;

    private String fullName;

    private String email;

    private String phone;

    private String city;

    private String address;

    private String reason;

    private String previousPet;

    private String otherPets;

    private String housing;

    private String permission;

    private String contactMethod;

    private boolean agreement;


    public ApplicationRequest() {
    }


    public Long getPetId() {
        return petId;
    }

    public void setPetId(Long petId) {
        this.petId = petId;
    }


    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }


    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }


    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }


    public String getPreviousPet() {
        return previousPet;
    }

    public void setPreviousPet(String previousPet) {
        this.previousPet = previousPet;
    }


    public String getOtherPets() {
        return otherPets;
    }

    public void setOtherPets(String otherPets) {
        this.otherPets = otherPets;
    }


    public String getHousing() {
        return housing;
    }

    public void setHousing(String housing) {
        this.housing = housing;
    }


    public String getPermission() {
        return permission;
    }

    public void setPermission(String permission) {
        this.permission = permission;
    }


    public String getContactMethod() {
        return contactMethod;
    }

    public void setContactMethod(String contactMethod) {
        this.contactMethod = contactMethod;
    }


    public boolean isAgreement() {
        return agreement;
    }

    public void setAgreement(boolean agreement) {
        this.agreement = agreement;
    }
}