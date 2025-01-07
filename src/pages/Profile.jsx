import { useEffect, useState } from "react";
import "../assets/styles/pages/profile.scss";

// Components
import { getProfile } from "../services/apiService";
import { FaSave } from "react-icons/fa";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    user: "",
    bio: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getProfile();
        if (profileData) {
          setProfile(profileData);
          setFormData({
            user:
              profileData?.first_name +
              " " +
              profileData?.second_name +
              " " +
              profileData?.parents_name,
            bio: profileData?.bio,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container profile-page">
      <div className="profile-details">
        <div className="profile-img">
          <div className="profile-img__img">
            <img src={profile?.profile_pic_url} alt="" />
            <div className="middle">
              <button type="button">UPDATE</button>
            </div>
          </div>
          <button type="button" className="image-action">
            Olib Tashlash
          </button>
        </div>
        <div className="profile-info">
          <form action="" className="profile-info__form">
            <div className="profile_name">
              <label htmlFor="profile-name">Avtor</label>
              <div className="input">
                <input
                  onChange={handleInputChange}
                  value={formData.user}
                  type="text"
                  name="user"
                  id="profile-name"
                />
                <FaSave />
              </div>
            </div>
            <div className="profile-bio">
              <label htmlFor="profile-bio">Bio</label>
              <div className="input">
                <textarea
                  onChange={handleInputChange}
                  value={formData.bio}
                  name="bio"
                  id="profile-bio"
                ></textarea>
                <FaSave />
              </div>
            </div>
          </form>
        </div>
        <div className="profile-notifications">
          <button type="button" className="write-article">
            Maqola yozish
          </button>
        </div>
      </div>
      <div className="profile-articles"></div>
    </div>
  );
};

export default Profile;
