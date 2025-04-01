import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);

  // Sign up
  const signUpNewUser = async (username, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password: password,
      options: {
        data: { username }, // Stores username in user_metadata
      },
    });

    if (error) {
      console.error("Error signing up: ", error);
      return { success: false, error };
    }

    return { success: true, data };
  };

  // Sign in
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });

      // Handle Supabase error explicitly
      if (error) {
        console.error("Sign-in error:", error.message); // Log the error for debugging
        return { success: false, error: error.message }; // Return the error
      }

      // If no error, return success
      console.log("Sign-in success:", data);
      return { success: true, data }; // Return the user data
    } catch (error) {
      // Handle unexpected issues
      console.error("Unexpected error during sign-in:", err.message);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };
  
  const uploadProfilePicture = async (file) => {
    if (!file) {
      console.error("No file selected.");
      return { success: false, error: "No file selected" };
    }
  
    console.log("Uploading file:", file.name, file.type || "Unknown Type", file.size);
  
    // Fetch authenticated user
    const { data: user, error: userError } = await supabase.auth.getUser();
    if (userError || !user?.user) {
      console.error("Error fetching user:", userError || "User not authenticated");
      return { success: false, error: userError?.message || "User not authenticated" };
    }
  
    const userId = user.user.id;
  
    // Ensure file has a valid extension
    const fileExtension = file.type?.split("/")[1] || "png"; // Default to PNG if undefined
    const fileName = `profile_${userId}.${fileExtension}`;
  
    try {
      // Upload file directly in "avatars" bucket
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { cacheControl: "3600", upsert: true });
  
      if (error) {
        throw error;
      }
  
      // Fetch the public URL correctly
      const { data: publicUrlData } = supabase.storage.from("avatars").getPublicUrl(fileName);
      const profilePictureUrl = publicUrlData.publicUrl;
  
      // Update user metadata with the new profile picture URL
      const { error: updateError } = await supabase.auth.updateUser({
        data: { profile_picture: profilePictureUrl }
      });
  
      if (updateError) {
        throw updateError;
      }
  
      console.log("Profile picture updated successfully in metadata:", profilePictureUrl);
      return { success: true, url: profilePictureUrl };
  
    } catch (error) {
      console.error("Error uploading profile picture:", error.message);
      return { success: false, error: error.message };
    }
  };
 
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // Sign out
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ signUpNewUser, signInUser, session, signOut, uploadProfilePicture }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};