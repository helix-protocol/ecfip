"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import { Database, Save, RefreshCw } from "lucide-react";
import { reactiveStorage, originalGlobalStorage } from "@/lib/storage";

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

// Original global storage object (never changes)
export const globalStorage: GlobalStorage = {
  // All Entities (Legal and Natural)
  entities: {
    // Legal Entities (Companies/Institutions)
    FR12345678901: {
      id: "FR12345678901",
      name: "LVMH Moët Hennessy Louis Vuitton SE",
      type: EntityType.LEGAL,
    },
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
    FR1234567890123: {
      id: "FR1234567890123",
      name: "Marie Dubois",
      type: EntityType.NATURAL,
    },
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
      fromEntityId: "FR1234567890123", // Marie Dubois
      toEntityId: "FR12345678901", // LVMH
      description: "Senior Operations Manager",
    },
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

export function GlobalStateViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const [jsonData, setJsonData] = useState("");

  // Validate JSON and get error message
  const { isValid, error } = useMemo(() => {
    if (!jsonData.trim()) {
      return { isValid: false, error: "JSON is empty" };
    }

    try {
      const parsed = JSON.parse(jsonData);

      // Validate structure
      if (!parsed.entities || !parsed.entityRelationships) {
        return {
          isValid: false,
          error:
            "Invalid structure. Must contain 'entities' and 'entityRelationships'.",
        };
      }

      return { isValid: true, error: null };
    } catch (err) {
      return {
        isValid: false,
        error: err instanceof Error ? err.message : "Invalid JSON syntax",
      };
    }
  }, [jsonData]);

  const handleOpen = () => {
    // Format the global storage as pretty JSON when opening
    const formattedJson = JSON.stringify(reactiveStorage.storage, null, 2);
    setJsonData(formattedJson);
    setIsOpen(true);
  };

  const handleSave = () => {
    if (!isValid) return;

    try {
      // Parse the JSON to validate it
      const parsedData = JSON.parse(jsonData);

      // Validate the structure
      if (!parsedData.entities || !parsedData.entityRelationships) {
        throw new Error(
          "Invalid storage structure. Must contain 'entities' and 'entityRelationships'."
        );
      }

      // Update the reactive storage
      reactiveStorage.update(parsedData);

      console.log("Updated global storage:", parsedData);

      // Optionally close the dialog
      setIsOpen(false);
    } catch (error) {
      alert(
        `Error: ${
          error instanceof Error
            ? error.message
            : "Invalid JSON format. Please check your syntax."
        }`
      );
    }
  };

  const handleReset = () => {
    // Reset to the original state (never changes)
    const formattedJson = JSON.stringify(originalGlobalStorage, null, 2);
    setJsonData(formattedJson);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-4 right-4 z-50 shadow-lg"
          onClick={handleOpen}
        >
          <Database className="h-4 w-4 mr-2" />
          Global State
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Global State Viewer
          </DialogTitle>
          <DialogDescription>
            View and edit the global application state. Changes will be applied
            immediately when you save.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="default"
              onClick={handleReset}
              className="flex items-center gap-2 flex-1"
            >
              <RefreshCw className="h-4 w-4" />
              Reset
            </Button>

            <TooltipProvider>
              <Tooltip>
                <Button
                  onClick={handleSave}
                  disabled={!isValid}
                  size="default"
                  className="flex items-center gap-2 flex-1"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
                {!isValid && (
                  <TooltipContent>
                    <p>{error}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>

          <Textarea
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
            className="font-mono text-sm h-[60vh] resize-none"
            placeholder="Loading global state..."
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
