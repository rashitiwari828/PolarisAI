const AUTH_USERS_KEY = "polaris_users";
const AUTH_SESSION_KEY = "polaris_authenticated";
const AUTH_CURRENT_USER_KEY = "polaris_current_user";

/**
 * Get all registered users.
 */
function getUsers() {
  const storedUsers = localStorage.getItem(AUTH_USERS_KEY);

  if (!storedUsers) {
    return [];
  }

  try {
    return JSON.parse(storedUsers);
  } catch {
    return [];
  }
}

/**
 * Save all registered users.
 */
function saveUsers(users) {
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

/**
 * Create a new account.
 */
export function signupUser(
  name,
  email,
  password,
) {
  const users = getUsers();

  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.email.toLowerCase() === cleanEmail
  );

  if (existingUser) {
    return {
      success: false,
      message: "An account with this email already exists.",
    };
  }

  const newUser = {
    name: cleanName,
    email: cleanEmail,
    password,
  };

  users.push(newUser);

  saveUsers(users);

  // Set this user as the currently logged-in user.
  localStorage.setItem(AUTH_SESSION_KEY, "true");
  localStorage.setItem(AUTH_CURRENT_USER_KEY, cleanEmail);

  return {
    success: true,
    message: "Account created successfully.",
  };
}

/**
 * Login an existing user.
 */
export function loginUser(
  email,
  password,
) {
  const users = getUsers();

  const cleanEmail = email.trim().toLowerCase();

  const user = users.find(
    (item) => item.email.toLowerCase() === cleanEmail
  );

  if (!user) {
    return {
      success: false,
      message: "No account found. Please sign up first.",
    };
  }

  if (user.password !== password) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  // Set this user as the current session.
  localStorage.setItem(AUTH_SESSION_KEY, "true");
  localStorage.setItem(AUTH_CURRENT_USER_KEY, user.email);

  return {
    success: true,
    message: "Login successful.",
  };
}

/**
 * Check authentication status.
 */
export function isAuthenticated() {
  return localStorage.getItem(AUTH_SESSION_KEY) === "true";
}

/**
 * Get currently logged-in user.
 */
export function getCurrentUser() {
  const users = getUsers();

  const currentEmail = localStorage.getItem(
    AUTH_CURRENT_USER_KEY
  );

  if (!currentEmail) {
    return null;
  }

  const user = users.find(
    (item) =>
      item.email.toLowerCase() ===
      currentEmail.toLowerCase()
  );

  return user || null;
}

/**
 * Logout current user.
 */
export function logoutUser() {
  localStorage.removeItem(AUTH_SESSION_KEY);
  localStorage.removeItem(AUTH_CURRENT_USER_KEY);
}