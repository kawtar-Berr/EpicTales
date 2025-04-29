export async function login({ email, motDePasse }: { email: string; motDePasse: string }) {
    const res = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, motDePasse }),
    });
    return await res.json();
  }
  
  export async function register({ nom, email, username, motDePasse }: { nom: string; email: string; username: string; motDePasse: string }) {
    const res = await fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, email, username, motDePasse }),
    });
    return await res.json();
  }
  
  // Fonction utilitaire pour les appels API protégés côté client
  export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    if (typeof window === 'undefined') throw new Error('fetchWithAuth doit être utilisé côté client');
    const token = localStorage.getItem('token');
    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      throw new Error('Réponse inattendue du serveur: ' + text);
    }
  }