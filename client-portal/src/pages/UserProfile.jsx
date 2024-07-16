import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import defaultImg from '../assets/ava.png';

const UserProfile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserDetails(docSnap.data());
                } else {
                    toast.error('User not found');
                }
            }
        });
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.error('No file selected');
            return;
        }

        try {
            const user = auth.currentUser;
            if (!user) {
                toast.error('No authenticated user found');
                return;
            }

            const storageRef = ref(storage, `profilePictures/${user.uid}`);
            await uploadBytes(storageRef, selectedFile);
            const url = await getDownloadURL(storageRef);

            const userDocRef = doc(db, "Users", user.uid);
            await updateDoc(userDocRef, { photoURL: url });

            setUserDetails((prevDetails) => ({ ...prevDetails, photoURL: url }));
            toast.success('Profile picture updated');
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Failed to upload profile picture');
        }
    };

    return (
        <div>
            {userDetails ? (
                <>
                    <h1>Welcome {userDetails.fullname}</h1>
                    <div>
                        <p>Email: {userDetails.email}</p>
                        <img src={userDetails.photoURL || defaultImg} alt="Profile" className='h-24 w-24 rounded-full' />
                        <input type="file" onChange={handleFileChange} />
                        <button onClick={handleUpload}>Upload Profile Picture</button>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserProfile;
