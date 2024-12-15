import UserRoutes from './user';

const Profile = () => {
  return (
    <section
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <UserRoutes />
    </section>
  );
};

export default Profile;
