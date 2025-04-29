import apiClient from './apiClient';

interface User {
  id: number;
  nom: string;
  email: string;
  username: string;
  role: string;
  IsReported: boolean;
  isAbandoner: boolean;
  created_at: string;
  updated_at: string;
}

interface LoginResponse {
  token: string;
  utilisateur: User;
}
export async function login({ email, motDePasse }: { email: string; motDePasse: string }) {
  try {
    console.log('Attempting login for:', email);
    const { data } = await apiClient.post<LoginResponse>('/login', { 
      email, 
      motDePasse 
    });
    
    if (data.token && data.utilisateur) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.utilisateur));
      return {
        success: true,
        token: data.token,
        utilisateur: data.utilisateur
      };
    }
    
    return {
      success: false,
      error: 'Invalid response format'
    };
    
  } catch (error: any) {
    console.error('Login error details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });

    if (error.message === 'Network Error') {
      return {
        success: false,
        error: 'Impossible de se connecter au serveur. Vérifiez que le serveur est en cours d\'exécution.'
      };
    }

    return {
      success: false,
      error: error.response?.data?.message || 'Erreur de connexion au serveur'
    };
  }
}


// Function to get the current user
export function getCurrentUser(): User | null {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

// Function to check if user is authenticated
export function isAuthenticated(): boolean {
  return !!(localStorage.getItem('token') && getCurrentUser());
}

export async function register({ nom, email, username, motDePasse }: { nom: string; email: string; username: string; motDePasse: string }) {
  try {
    const { data } = await apiClient.post('/register', { nom, email, username, motDePasse });
    return data;
  } catch (error: any) {
    return { error: error.response?.data?.message || 'Une erreur est survenue' };
  }
}

// Fonction utilitaire pour les appels API protégés côté client
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  // Cette fonction peut être supprimée car nous utilisons maintenant apiClient
  // qui gère automatiquement l'authentification
  console.warn('fetchWithAuth est déprécié. Utilisez apiClient à la place.');
}