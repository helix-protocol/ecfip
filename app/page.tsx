"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import { useStorage, EntityType, getRoleForEntity } from "@/lib/storage";
import { getCountryDisplay } from "@/lib/country";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLoggingIn, setIsLoggingIn] = useState<string | null>(null);
  const storage = useStorage();
  const router = useRouter();

  // Get entities for login (only natural entities)
  const userEntities = Object.values(storage.entities).filter(
    (entity) => entity.type === EntityType.NATURAL
  );

  const handleQuickLogin = async (entityId: string) => {
    setIsLoggingIn(entityId);

    // Navigate to dashboard for Jean-Luc Moreau (BNP Paribas Securities Services)
    if (entityId === "FR2345678901234") {
      router.push("/dashboard");
    } else {
      // For other users, show a message that their dashboard is not yet implemented
      setTimeout(() => {
        alert(
          `Dashboard for ${
            userEntities.find((r) => r.id === entityId)?.name
          } is not yet implemented.`
        );
        setIsLoggingIn(null);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">
                European Certified Financial Intermediary Portal
              </CardTitle>
              <CardDescription>FASTER, secure and efficient.</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold mb-2">
              Recent Login Sessions
            </h3>
            <p className="text-sm text-muted-foreground">
              Click on your profile to sign in quickly
            </p>
          </div>

          <div className="grid gap-2">
            {userEntities.map((entity) => {
              const countryDisplay = getCountryDisplay(entity.id);
              const role = getRoleForEntity(entity.id);
              return (
                <Card
                  key={entity.id}
                  className={`cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] ${
                    isLoggingIn === entity.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => handleQuickLogin(entity.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback
                          className={`font-semibold ${
                            entity.type === EntityType.NATURAL
                              ? "bg-blue-100 text-blue-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {entity.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm">
                            {entity.name}
                          </h4>
                          <Badge variant="secondary" className="text-xs">
                            {countryDisplay.flag} {countryDisplay.name}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {role}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {isLoggingIn === entity.id ? (
                          <div className="text-xs text-blue-600 font-medium">
                            Signing in...
                          </div>
                        ) : (
                          <div className="text-xs text-muted-foreground">
                            Click to sign in
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
