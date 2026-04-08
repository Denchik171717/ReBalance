import { useLoaderData, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "./ui/button/button";
import { Input } from "./ui/input/input";
import { Label } from "./ui/label/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card/card";
import styles from "./auth-guard.module.css";

interface AuthGuardProps {
  children: React.ReactNode;
  user: { id: string; name: string; email: string } | null;
}

export function AuthGuard({ children, user }: AuthGuardProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (user) {
    return <>{children}</>;
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardHeader>
          <CardTitle>Добро пожаловать!</CardTitle>
          <CardDescription>
            Войдите, чтобы начать подготовку к экзамену
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form method="post" action="/api/auth/login" className={styles.form}>
            <div className={styles.field}>
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className={styles.field}>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className={styles.button}>
              Войти
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
