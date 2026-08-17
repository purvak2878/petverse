package org.web.backend.dto;

public class LoginResponse {

    private String token;
    private UserResponse user;

    public LoginResponse() {
    }

    public LoginResponse(String token, UserResponse user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserResponse getUser() {
        return user;
    }

    public void setUser(UserResponse user) {
        this.user = user;
    }


    public static class UserResponse {

        private Long id;
        private String name;
        private String email;
        private String phone;
        private String location;
        private String profileImage;

        public UserResponse() {
        }

        public UserResponse(
                Long id,
                String name,
                String email,
                String phone,
                String location,
                String profileImage
        ) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.phone = phone;
            this.location = location;
            this.profileImage = profileImage;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
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

        public String getLocation() {
            return location;
        }

        public void setLocation(String location) {
            this.location = location;
        }

        public String getProfileImage() {
            return profileImage;
        }

        public void setProfileImage(String profileImage) {
            this.profileImage = profileImage;
        }
    }
}