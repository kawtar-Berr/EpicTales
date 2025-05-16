"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { toast } from "sonner"; 
import { apiHelpers } from "@/utils/apiClient";

interface AddStoryRoomProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddStoryRoom({ isOpen, onClose }: AddStoryRoomProps) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Public");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await apiHelpers.post('/storyrooms', {
        nom: name,
        statut: status,
        dateCreation: new Date().toISOString().split("T")[0],
      });
      toast.success(`Salle créée : ${name} (${data.code})`);
      router.push(`/accueil/room/${data.code}/`);
      onClose();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Erreur lors de la création");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="text-center">Créer une nouvelle salle</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} className="space-y-6 text-center">
            <Input
              label="Nom de la salle"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Select
              label="Statut"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <SelectItem key="Public" value="Public">Publique</SelectItem>
              <SelectItem key="Privé" value="Privé">Privée</SelectItem>
            </Select>
            <Button type="submit" color="primary" className="mx-auto">Enregistrer</Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
