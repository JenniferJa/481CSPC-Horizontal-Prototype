import React from 'react';
import { styles } from '../../styles/styles';

function ProfilePage({ textSize }) {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentBox(textSize)}>
        <h2>User Profile</h2>
        <p>Manage your account and library preferences here.</p>
      </div>
    </div>
  );
}

export default ProfilePage;