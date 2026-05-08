'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { type PersonnelRoleKey, PERSONNEL_ROLES, type PersonnelRoleDefinition } from '@/data/mockData';

export interface RoleUser {
  roleKey: PersonnelRoleKey;
  name: string;
  initials: string;
}

interface RoleContextValue {
  currentRole: RoleUser | null;
  roleDefinition: PersonnelRoleDefinition | null;
  setRole: (role: RoleUser) => void;
  clearRole: () => void;
  isLoggedIn: boolean;
}

const RoleContext = createContext<RoleContextValue>({
  currentRole: null,
  roleDefinition: null,
  setRole: () => {},
  clearRole: () => {},
  isLoggedIn: false,
});

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<RoleUser | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('eliar_role');
      if (stored) {
        setCurrentRole(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const setRole = (role: RoleUser) => {
    setCurrentRole(role);
    try {
      sessionStorage.setItem('eliar_role', JSON.stringify(role));
    } catch {}
  };

  const clearRole = () => {
    setCurrentRole(null);
    try {
      sessionStorage.removeItem('eliar_role');
    } catch {}
  };

  const roleDefinition = currentRole
    ? PERSONNEL_ROLES.find(r => r.key === currentRole.roleKey) ?? null
    : null;

  return (
    <RoleContext.Provider value={{ currentRole, roleDefinition, setRole, clearRole, isLoggedIn: !!currentRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
