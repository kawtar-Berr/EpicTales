"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "join" | "create";
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, type }) => {
  const [roomCode, setRoomCode] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Fermer le modal en cliquant en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Fermer avec la touche Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique pour rejoindre ou créer une salle
    console.log(type === "join" ? `Joining room: ${roomCode}` : `Creating room: ${roomName}`);
    onClose();
  };
  
  // Animations
  const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  
  const modal = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 15 } }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <motion.div
            className={styles.backdrop}
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />
          
          <motion.div
            className={styles.modalContainer}
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="hidden"
            ref={modalRef}
          >
            <button className={styles.closeButton} onClick={onClose}>
              ✕
            </button>
            
            <div className={styles.modalHeader}>
              <h2>
                {type === "join" ? "Rejoindre une salle" : "Créer une nouvelle salle"}
              </h2>
            </div>
            
            <div className={styles.modalBody}>
              <form onSubmit={handleSubmit}>
                {type === "join" ? (
                  <div className={styles.formGroup}>
                    <label htmlFor="roomCode">Code de la salle</label>
                    <input
                      type="text"
                      id="roomCode"
                      value={roomCode}
                      onChange={(e) => setRoomCode(e.target.value)}
                      placeholder="Entrez le code de la salle"
                      required
                      className={styles.input}
                    />
                    <p className={styles.hint}>
                      Vous pouvez demander le code à un ami ou utiliser un lien d'invitation.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className={styles.formGroup}>
                      <label htmlFor="roomName">Nom de la salle</label>
                      <input
                        type="text"
                        id="roomName"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        placeholder="Donnez un nom à votre salle"
                        required
                        className={styles.input}
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="roomDescription">Description (optionnel)</label>
                      <textarea
                        id="roomDescription"
                        value={roomDescription}
                        onChange={(e) => setRoomDescription(e.target.value)}
                        placeholder="Décrivez brièvement votre salle"
                        className={styles.textarea}
                        rows={3}
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <div className={styles.checkbox}>
                        <input
                          type="checkbox"
                          id="isPrivate"
                          checked={isPrivate}
                          onChange={(e) => setIsPrivate(e.target.checked)}
                        />
                        <label htmlFor="isPrivate">Salle privée</label>
                      </div>
                      <p className={styles.hint}>
                        Seuls les utilisateurs avec un code d'invitation pourront rejoindre.
                      </p>
                    </div>
                  </>
                )}
                
                <div className={styles.modalFooter}>
                  <button type="button" className={styles.cancelButton} onClick={onClose}>
                    Annuler
                  </button>
                  <button type="submit" className={styles.submitButton}>
                    {type === "join" ? "Rejoindre" : "Créer"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;