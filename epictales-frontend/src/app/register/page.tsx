'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, login } from '@/utils/auth';

export default function RegisterPage() {
  const [form, setForm] = useState({ nom: '', email: '', username: '', motDePasse: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const data = await register(form);
    if (data.utilisateur) {
      // Connexion automatique après inscription
      const loginData = await login({ email: form.email, motDePasse: form.motDePasse });
      if (loginData.token && loginData.utilisateur) {
        localStorage.setItem('token', loginData.token);
        if (loginData.utilisateur.role === 'Admin') {
          router.push('/dashboard');
        } else {
          router.push('/accueil/profil');
        }
      } else {
        setError(data || 'Erreur lors de la connexion');
      }
    } else {
      setError(data.message || 'Erreur lors de l\'inscription');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-16 flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-2">Inscription</h2>
      <input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} required className="border p-2 rounded" />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="border p-2 rounded" />
      <input name="username" placeholder="Nom d'utilisateur" value={form.username} onChange={handleChange} required className="border p-2 rounded" />
      <input name="motDePasse" type="password" placeholder="Mot de passe" value={form.motDePasse} onChange={handleChange} required className="border p-2 rounded" />
      <button type="submit" className="bg-purple-600 text-white py-2 rounded">S'inscrire</button>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
}