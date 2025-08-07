import { useState, useEffect } from "react";

// European Certified Financial Intermediary Portal - Global Storage
// FASTER (Financial Access via a Single European Digital Identity)

export enum EntityType {
  LEGAL = "legal",
  NATURAL = "natural",
}

export interface Entity {
  id: string; // Helix ID (typically: country code + TIN)
  name: string;
  type: EntityType;
}

export interface EntityRelationship {
  fromEntityId: string;
  toEntityId: string;
  description: string;
}

export interface GlobalStorage {
  entities: Record<string, Entity>;
  entityRelationships: EntityRelationship[];
}

// Global storage object containing only data
export const globalStorage: GlobalStorage = {
  // All Entities (Legal and Natural)
  entities: {
    // Legal Entities (Companies/Institutions)
    FR98765432109: {
      id: "FR98765432109",
      name: "BNP Paribas Securities Services",
      type: EntityType.LEGAL,
    },
    BE0123456789: {
      id: "BE0123456789",
      name: "Euroclear Bank S.A./N.V.",
      type: EntityType.LEGAL,
    },
    LU12345678: {
      id: "LU12345678",
      name: "Clearstream Banking S.A.",
      type: EntityType.LEGAL,
    },
    DE123456789: {
      id: "DE123456789",
      name: "DWS Group",
      type: EntityType.LEGAL,
    },
    DE987654321: {
      id: "DE987654321",
      name: "Commerzbank AG",
      type: EntityType.LEGAL,
    },
    // Natural Entities (People)
    FR2345678901234: {
      id: "FR2345678901234",
      name: "Jean-Luc Moreau",
      type: EntityType.NATURAL,
    },
    BE12345678901: {
      id: "BE12345678901",
      name: "Sophie van der Berg",
      type: EntityType.NATURAL,
    },
    LU1234567890123: {
      id: "LU1234567890123",
      name: "Dr. Hans Mueller",
      type: EntityType.NATURAL,
    },
    DE1234567890123: {
      id: "DE1234567890123",
      name: "Dr. Thomas Weber",
      type: EntityType.NATURAL,
    },
    DE2345678901234: {
      id: "DE2345678901234",
      name: "Stefan Mueller",
      type: EntityType.NATURAL,
    },
    FR3456789012345: {
      id: "FR3456789012345",
      name: "Pierre Moreau",
      type: EntityType.NATURAL,
    },
    DE3456789012345: {
      id: "DE3456789012345",
      name: "Klaus Weber",
      type: EntityType.NATURAL,
    },
  },

  // Entity Relationships (How entities are connected)
  entityRelationships: [
    // People to their companies (employment relationships)
    {
      fromEntityId: "FR2345678901234", // Jean-Luc Moreau
      toEntityId: "FR98765432109", // BNP Paribas Securities Services
      description: "Senior Custody Manager",
    },
    {
      fromEntityId: "BE12345678901", // Sophie van der Berg
      toEntityId: "BE0123456789", // Euroclear
      description: "Head of Tax",
    },
    {
      fromEntityId: "LU1234567890123", // Dr. Hans Mueller
      toEntityId: "LU12345678", // Clearstream
      description: "Head of Tax",
    },
    {
      fromEntityId: "DE1234567890123", // Dr. Thomas Weber
      toEntityId: "DE123456789", // DWS Group
      description: "Head of Tax",
    },
    {
      fromEntityId: "DE2345678901234", // Stefan Mueller
      toEntityId: "DE987654321", // Commerzbank
      description: "Head of Tax",
    },
  ] as EntityRelationship[],
};

// Reactive state management
type StorageUpdateListener = (storage: GlobalStorage) => void;

class ReactiveStorage {
  private listeners: StorageUpdateListener[] = [];
  private _storage: GlobalStorage = globalStorage;

  get storage(): GlobalStorage {
    return this._storage;
  }

  subscribe(listener: StorageUpdateListener): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  update(newStorage: GlobalStorage): void {
    this._storage = newStorage;
    this.listeners.forEach((listener) => listener(this._storage));
  }

  // Update specific parts of the storage
  updateEntities(entities: Record<string, Entity>): void {
    this.update({
      ...this._storage,
      entities,
    });
  }

  updateRelationships(relationships: EntityRelationship[]): void {
    this.update({
      ...this._storage,
      entityRelationships: relationships,
    });
  }
}

export const reactiveStorage = new ReactiveStorage();

// Helper functions that use reactive storage
export function getEntityById(entityId: string): Entity {
  return reactiveStorage.storage.entities[entityId];
}

export function getRelationshipsForEntity(
  entityId: string
): EntityRelationship[] {
  return reactiveStorage.storage.entityRelationships.filter(
    (rel) => rel.fromEntityId === entityId || rel.toEntityId === entityId
  );
}

export function getConnectedEntities(entityId: string): Entity[] {
  const relationships = getRelationshipsForEntity(entityId);
  const connectedIds = relationships.map((rel) =>
    rel.fromEntityId === entityId ? rel.toEntityId : rel.fromEntityId
  );

  return connectedIds
    .map((id) => reactiveStorage.storage.entities[id])
    .filter(Boolean) as Entity[];
}

// Get entities for the login interface (only natural entities)
export function getEntitiesForLogin(): Entity[] {
  return Object.values(reactiveStorage.storage.entities).filter(
    (entity) => entity.type === EntityType.NATURAL
  );
}

export function getRoleForEntity(entityId: string): string {
  const entity = getEntityById(entityId);
  const relationships = getRelationshipsForEntity(entityId);
  if (relationships.length === 0) {
    return entity.type === EntityType.NATURAL
      ? "Retail Investor"
      : "Legal Entity";
  }

  const connectedEntity = getEntityById(relationships[0].toEntityId);
  return `${connectedEntity.name} - ${relationships[0].description}`;
}

// Export individual parts for convenience
export const entities = reactiveStorage.storage.entities;
export const entityRelationships = reactiveStorage.storage.entityRelationships;

// Export original storage for reset functionality
export const originalGlobalStorage = globalStorage;

// React hook for subscribing to storage changes
export function useStorage() {
  const [storage, setStorage] = useState(reactiveStorage.storage);

  useEffect(() => {
    const unsubscribe = reactiveStorage.subscribe((newStorage) => {
      setStorage(newStorage);
    });

    return unsubscribe;
  }, []);

  return storage;
}
