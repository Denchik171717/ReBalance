import { NavLink } from "react-router";
import { LayoutDashboard, ClipboardList, BookOpen, TrendingUp, Heart, Moon, Sun } from "lucide-react";
import { useTheme } from "~/hooks/use-theme";
import styles from "./header.module.css";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          <Heart className={styles.logoIcon} />
          <span>ReBalance</span>
        </NavLink>
        <nav className={styles.nav}>
          <NavLink to="/" end className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}>
            <LayoutDashboard className={styles.navIcon} />
            <span className={styles.navText}>Главная</span>
          </NavLink>
          <NavLink to="/assessment" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}>
            <ClipboardList className={styles.navIcon} />
            <span className={styles.navText}>Тест</span>
          </NavLink>
          <NavLink to="/resources" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}>
            <BookOpen className={styles.navIcon} />
            <span className={styles.navText}>Ресурсы</span>
          </NavLink>
          <NavLink to="/progress" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}>
            <TrendingUp className={styles.navIcon} />
            <span className={styles.navText}>Прогресс</span>
          </NavLink>
        </nav>
        <button onClick={toggleTheme} className={styles.themeButton} aria-label="Переключить тему">
          {theme === 'light' ? <Moon className={styles.themeIcon} /> : <Sun className={styles.themeIcon} />}
        </button>
      </div>
    </header>
  );
}