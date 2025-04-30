'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/utils/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const data = await login({ email, motDePasse });
    if (data.token && data.utilisateur) {
      localStorage.setItem('token', data.token);
      if (data.utilisateur.role === 'Admin') {
        router.push('/dashboard');
      } else {
        router.push('/accueil');
      }
    } else {
      setError(data.message || 'Identifiants invalides');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-16 flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-2">Connexion</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={motDePasse}
        onChange={e => setMotDePasse(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-purple-600 text-white py-2 rounded">Se connecter</button>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
}