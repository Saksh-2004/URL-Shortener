import supabase, { supabaseUrl } from "./supabase";

// Login function
export async function login(credentials) {
  if (!credentials || !credentials.email || !credentials.password) {
    throw new Error("Email and password are required");
  }

  const { email, password } = credentials;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

// Signup function with profile pic upload
export async function signup({ name, email, password, profilepic }) {
  const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("profilepic")
    .upload(fileName, profilepic);

  if (storageError) throw new Error(storageError.message);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profilepic: `${supabaseUrl}/storage/v1/object/public/profilepic/${fileName}`,
      },
    },
  });

  if (error) throw new Error(error.message);
  return data;
}

// Get the currently logged-in user
export async function getCurrentUser() {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) throw new Error(sessionError.message);
  if (!session) return null;

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw new Error(userError.message);
  return user;
}

// Logout function
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
